/**
 * extract-nta-boundaries.mjs
 *
 * Fetches NYC 2020 NTA boundaries directly from NYC Open Data's Socrata API,
 * finds the matching features for each neighborhood in the template,
 * and prints the FALLBACK_BOUNDARIES object ready to paste into
 * NeighborhoodMap.jsx.
 *
 * Usage (no file download needed):
 *   node scripts/extract-nta-boundaries.mjs
 *
 * Or pass a locally downloaded GeoJSON file:
 *   node scripts/extract-nta-boundaries.mjs ~/Downloads/geo_export.geojson
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// ── Which neighborhoods we want, and what to look for in the NTA data ────────
// Right column is a substring match against the NTA's "ntaname" field.
// If the script can't find a match it will tell you the full list to pick from.
const TARGETS = [
  { slug: 'west-village',    search: 'West Village' },
  { slug: 'tribeca',         search: 'Tribeca' },
  { slug: 'upper-east-side', search: 'Upper East Side' },
  { slug: 'brooklyn-heights',search: 'Brooklyn Heights' },
  { slug: 'dumbo',           search: 'DUMBO' },
  { slug: 'park-slope',      search: 'Park Slope' },
]

// ─────────────────────────────────────────────────────────────────────────────

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: node scripts/extract-nta-boundaries.mjs <path-to-file.geojson>')
  process.exit(1)
}

let geojson
try {
  geojson = JSON.parse(readFileSync(resolve(filePath), 'utf8'))
} catch (e) {
  console.error('Could not read file:', e.message)
  process.exit(1)
}

const features = geojson.features ?? []
if (!features.length) {
  console.error('No features found — is this a valid GeoJSON FeatureCollection?')
  process.exit(1)
}

// Print all NTA names so you can spot-check / fix the search strings above
const allNames = features
  .map(f => f.properties?.ntaname ?? f.properties?.NTAName ?? f.properties?.name ?? '(no name)')
  .sort()

console.log('\n── All NTA names in file (' + allNames.length + ' total) ──────────────────')
allNames.forEach(n => console.log(' ', n))
console.log()

// ── Find each target ─────────────────────────────────────────────────────────
const found = {}
const missing = []

for (const { slug, search } of TARGETS) {
  const match = features.find(f => {
    const name = f.properties?.ntaname ?? f.properties?.NTAName ?? f.properties?.name ?? ''
    return name.toLowerCase().includes(search.toLowerCase())
  })

  if (!match) {
    missing.push({ slug, search })
    continue
  }

  const ntaName = match.properties?.ntaname ?? match.properties?.NTAName ?? match.properties?.name
  console.log(`✓  ${slug}  →  "${ntaName}"`)

  // Grab just the outer ring of the first polygon
  // (MultiPolygon: coordinates[0][0], Polygon: coordinates[0])
  const geom = match.geometry
  let ring
  if (geom.type === 'Polygon') {
    ring = geom.coordinates[0]
  } else if (geom.type === 'MultiPolygon') {
    // pick the largest part by point count
    ring = geom.coordinates
      .map(p => p[0])
      .sort((a, b) => b.length - a.length)[0]
  }

  // Round to 6 decimal places to keep the output clean
  found[slug] = ring.map(([lng, lat]) => [
    Math.round(lng * 1e6) / 1e6,
    Math.round(lat * 1e6) / 1e6,
  ])
}

if (missing.length) {
  console.log('\n── Could not find matches for ─────────────────────────────────────')
  missing.forEach(({ slug, search }) =>
    console.log(`  ${slug}  (searched for "${search}") — check the name list above and update TARGETS`)
  )
}

// ── Print the ready-to-paste output ──────────────────────────────────────────
if (Object.keys(found).length) {
  console.log('\n── Paste this into NeighborhoodMap.jsx → FALLBACK_BOUNDARIES ────────\n')
  console.log('const FALLBACK_BOUNDARIES = {')
  for (const [slug, ring] of Object.entries(found)) {
    const coords = ring.map(c => `[${c[0]}, ${c[1]}]`).join(', ')
    console.log(`  '${slug}': [${coords}],`)
  }
  console.log('}')
}
