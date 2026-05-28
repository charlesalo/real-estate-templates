const BASE_URL = 'https://api.simplyrets.com'
const USERNAME = process.env.SIMPLYRETS_USERNAME
const PASSWORD = process.env.SIMPLYRETS_PASSWORD

function authHeader() {
  const encoded = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')
  return { Authorization: `Basic ${encoded}` }
}

export async function getListings(filters = {}) {
  const params = new URLSearchParams()
  if (filters.q)        params.set('q', filters.q)
  if (filters.status)   params.set('status', filters.status)
  if (filters.minprice) params.set('minprice', filters.minprice)
  if (filters.maxprice) params.set('maxprice', filters.maxprice)
  if (filters.minbeds)  params.set('minbeds', filters.minbeds)
  if (filters.minbaths) params.set('minbaths', filters.minbaths)
  if (filters.type)     params.set('type', filters.type)
  if (filters.minarea)  params.set('minarea', filters.minarea)
  if (filters.sort)     params.set('sort', filters.sort)
  if (filters.cities)   filters.cities.forEach(c => params.append('cities', c))
  params.set('limit', filters.limit ?? 12)
  if (filters.offset)   params.set('offset', filters.offset)

  // X-Total-Count is a custom response header — Next.js drops it on cached
  // responses. Pass liveCount: true (search pages) to bypass cache and get
  // an accurate count; other callers keep the 5-min revalidation window.
  const fetchOpts = filters.liveCount
    ? { headers: authHeader(), cache: 'no-store' }
    : { headers: authHeader(), next: { revalidate: 300 } }

  const res = await fetch(`${BASE_URL}/properties?${params}`, fetchOpts)
  if (!res.ok) throw new Error(`SimplyRETS error: ${res.status}`)

  const rawCount = parseInt(res.headers.get('X-Total-Count') ?? '0')
  const hasMore  = (res.headers.get('Link') ?? '').includes('rel="next"')
  const listings = await res.json()
  // Demo accounts omit X-Total-Count. Use rawCount when present;
  // otherwise signal open-ended pagination via hasMore.
  const totalCount = rawCount || listings.length
  return { listings, totalCount, hasMore }
}

export async function getListingById(mlsId) {
  const res = await fetch(`${BASE_URL}/properties/${mlsId}`, {
    headers: authHeader(),
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`SimplyRETS error: ${res.status}`)
  return res.json()
}

export async function getFeaturedListings(limit = 6) {
  const { listings } = await getListings({ status: 'Active', limit })
  return listings
}
