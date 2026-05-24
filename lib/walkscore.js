export async function getWalkScore(lat, lon, address) {
  const key = process.env.WALKSCORE_API_KEY
  if (!key) return null

  try {
    const params = new URLSearchParams({
      format:   'json',
      address:  address,
      lat:      String(lat),
      lon:      String(lon),
      transit:  '1',
      bike:     '1',
      wsapikey: key,
    })

    const res = await fetch(`https://api.walkscore.com/score?${params}`, {
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null

    const data = await res.json()
    if (data.status !== 1) return null

    return {
      walk:    { score: data.walkscore,         description: data.description },
      bike:    data.bike    ? { score: data.bike.score,    description: data.bike.description }    : null,
      transit: data.transit ? { score: data.transit.score, description: data.transit.description } : null,
    }
  } catch {
    return null
  }
}
