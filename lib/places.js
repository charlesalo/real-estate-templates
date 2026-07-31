import SNAPSHOT from './places-snapshot.json'

export const PLACE_CATEGORIES = [
  { key: 'restaurants', label: 'Restaurants', type: 'restaurant',    color: '#D97706' },
  { key: 'shopping',    label: 'Shopping',    type: 'shopping_mall', color: '#7C3AED' },
  { key: 'active',      label: 'Active',      type: 'gym',           color: '#059669' },
  { key: 'beauty',      label: 'Beauty',      type: 'beauty_salon',  color: '#DB2777' },
  { key: 'nightlife',   label: 'Nightlife',   type: 'bar',           color: '#2563EB' },
]

// Amenity data is served from a committed snapshot rather than the Places API.
// These are demo sites that never need current data, and legacy Nearby Search
// has no field mask — every live call billed the Contact and Atmosphere SKUs on
// top of the base search. See scripts/snapshot-places.mjs to regenerate.
//
// Must match coordKey() in that script so a float from JS and one parsed from
// JSON produce the same key.
function coordKey(lat, lng) {
  return `${lat.toFixed(4)},${lng.toFixed(4)}`
}

// Kept async: callers await this alongside the live Census/WalkScore/schools
// lookups in a Promise.all.
export async function getNearbyPlaces(lat, lng) {
  const places = SNAPSHOT[coordKey(lat, lng)]
  // A neighborhood added since the last snapshot run — most likely authored in
  // Sanity — has no entry. Return null so the amenities section drops out,
  // matching how every other optional data source here degrades.
  if (!places) return null

  return { categories: PLACE_CATEGORIES, places }
}
