// One-off generator for lib/places-snapshot.json.
//
// These are demo sites, so nearby-amenity data never needs to be current.
// Rather than call Google on every render (which bills the Contact and
// Atmosphere SKUs, since legacy Nearby Search has no field mask), we fetch
// each neighborhood's amenities once and commit the result.
//
// Run with:  node scripts/snapshot-places.mjs
// Costs ~5 requests per neighborhood, well inside the free monthly caps.
//
// Re-run when neighborhoods are added, moved, or given new coordinates —
// including ones authored in Sanity, which this script cannot see. Any
// coordinate missing from the snapshot degrades to "no amenities section",
// exactly as a missing API key does today.

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'lib', 'places-snapshot.json')

// Coordinate sources. luxury-agent and modern-team keep their neighborhoods
// inline in the route file; local-expert's demo fallback lives in lib.
const SOURCES = [
  { file: 'app/(templates)/luxury-agent/neighborhoods/[slug]/page.jsx' },
  { file: 'app/(templates)/modern-team/neighborhoods/[slug]/page.jsx' },
  // Only the NEIGHBORHOODS block — LISTINGS below it carries per-property
  // coordinates that never reach getNearbyPlaces.
  { file: 'lib/local-expert-data.js', from: 'export const NEIGHBORHOODS', to: 'export const LISTINGS' },
]

async function readEnvKey() {
  const raw = await readFile(path.join(ROOT, '.env.local'), 'utf8')
  const line = raw.match(/^\s*GOOGLE_PLACES_API_KEY\s*=\s*(.+)$/m)
  if (!line) throw new Error('GOOGLE_PLACES_API_KEY not found in .env.local')
  return line[1].trim().replace(/^["']|["']$/g, '')
}

// Parse PLACE_CATEGORIES out of lib/places.js so the category list has exactly
// one definition and cannot drift from what the UI renders.
async function readCategories() {
  const src = await readFile(path.join(ROOT, 'lib', 'places.js'), 'utf8')
  const block = src.slice(src.indexOf('PLACE_CATEGORIES'), src.indexOf(']'))
  const cats = [...block.matchAll(/key:\s*'([^']+)'[^}]*?type:\s*'([^']+)'/g)]
    .map(([, key, type]) => ({ key, type }))
  if (!cats.length) throw new Error('Could not parse PLACE_CATEGORIES from lib/places.js')
  return cats
}

async function readCoords() {
  const seen = new Map()
  for (const { file, from, to } of SOURCES) {
    let text = await readFile(path.join(ROOT, file), 'utf8')
    if (from) text = text.slice(text.indexOf(from), text.indexOf(to))
    for (const [, lat, lng] of text.matchAll(/lat:\s*(-?[\d.]+),\s*lng:\s*(-?[\d.]+)/g)) {
      const coord = { lat: parseFloat(lat), lng: parseFloat(lng) }
      seen.set(coordKey(coord.lat, coord.lng), coord)
    }
  }
  return [...seen.entries()]
}

// Snapshot keys are fixed-precision so a float read from JS and one read from
// JSON always agree. Mirrored by coordKey() in lib/places.js.
function coordKey(lat, lng) {
  return `${lat.toFixed(4)},${lng.toFixed(4)}`
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3958.8
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2
  return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2))
}

// A long run of sequential requests reliably trips the odd ECONNRESET; retry
// rather than lose the whole snapshot (and re-spend the quota) to one blip.
async function fetchWithRetry(url, attempts = 4) {
  for (let i = 1; ; i++) {
    try {
      return await fetch(url)
    } catch (err) {
      if (i >= attempts) throw err
      await new Promise(r => setTimeout(r, 500 * 2 ** (i - 1)))
    }
  }
}

async function fetchCategory(lat, lng, type, key) {
  const params = new URLSearchParams({ location: `${lat},${lng}`, radius: '3200', type, key })
  const res = await fetchWithRetry(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${type} @ ${lat},${lng}`)
  const data = await res.json()
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Places status ${data.status}: ${data.error_message ?? ''}`)
  }
  return (data.results ?? []).slice(0, 10).map(p => ({
    id:          p.place_id,
    name:        p.name,
    address:     p.vicinity ?? '',
    mapsUrl:     p.place_id
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name)}&query_place_id=${p.place_id}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([p.name, p.vicinity].filter(Boolean).join(' '))}`,
    rating:      p.rating ?? null,
    reviewCount: p.user_ratings_total ?? 0,
    distance:    haversine(lat, lng, p.geometry.location.lat, p.geometry.location.lng),
  }))
}

const key = await readEnvKey()
const categories = await readCategories()
const coords = await readCoords()

console.log(`Snapshotting ${coords.length} coordinates x ${categories.length} categories ` +
            `= ${coords.length * categories.length} requests\n`)

const snapshot = {}
for (const [k, { lat, lng }] of coords) {
  const places = {}
  for (const cat of categories) {
    places[cat.key] = await fetchCategory(lat, lng, cat.type, key)
  }
  snapshot[k] = places
  const total = Object.values(places).reduce((n, list) => n + list.length, 0)
  console.log(`  ${k.padEnd(20)} ${String(total).padStart(3)} places`)
}

// Sort keys so re-runs produce minimal diffs.
const sorted = Object.fromEntries(Object.keys(snapshot).sort().map(k => [k, snapshot[k]]))
await writeFile(OUT, `${JSON.stringify(sorted, null, 2)}\n`)
console.log(`\nWrote ${path.relative(ROOT, OUT)} (${Object.keys(sorted).length} coordinates)`)
