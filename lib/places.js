export const PLACE_CATEGORIES = [
  { key: 'restaurants', label: 'Restaurants', type: 'restaurant',    color: '#D97706' },
  { key: 'shopping',    label: 'Shopping',    type: 'shopping_mall', color: '#7C3AED' },
  { key: 'active',      label: 'Active',      type: 'gym',           color: '#059669' },
  { key: 'beauty',      label: 'Beauty',      type: 'beauty_salon',  color: '#DB2777' },
  { key: 'nightlife',   label: 'Nightlife',   type: 'bar',           color: '#2563EB' },
]

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3958.8
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2
  return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2))
}

async function fetchCategory(lat, lng, type, key) {
  const params = new URLSearchParams({
    location: `${lat},${lng}`,
    radius:   '3200',
    type,
    key,
  })
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`,
    { next: { revalidate: 3600 } },
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.results ?? []
}

export async function getNearbyPlaces(lat, lng) {
  const key = process.env.GOOGLE_PLACES_API_KEY
  if (!key) return null

  try {
    const settled = await Promise.allSettled(
      PLACE_CATEGORIES.map(cat => fetchCategory(lat, lng, cat.type, key)),
    )

    const places = {}
    PLACE_CATEGORIES.forEach((cat, i) => {
      const r = settled[i]
      places[cat.key] = r.status === 'fulfilled'
        ? r.value.slice(0, 10).map(p => ({
            id:          p.place_id,
            name:        p.name,
            address:     p.vicinity ?? '',
            // Deep-link to the place's Google profile via its place_id when we
            // have one; otherwise fall back to a plain Maps search on the
            // name + written address.
            mapsUrl:     p.place_id
              ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name)}&query_place_id=${p.place_id}`
              : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([p.name, p.vicinity].filter(Boolean).join(' '))}`,
            rating:      p.rating ?? null,
            reviewCount: p.user_ratings_total ?? 0,
            distance:    haversine(lat, lng, p.geometry.location.lat, p.geometry.location.lng),
          }))
        : []
    })

    return { categories: PLACE_CATEGORIES, places }
  } catch {
    return null
  }
}
