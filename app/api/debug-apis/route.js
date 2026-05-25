import { NextResponse } from 'next/server'

// Temporary diagnostic endpoint — delete after debugging
// Visit: /api/debug-apis to see which APIs are failing on Vercel

const TEST_LAT = 29.7933
const TEST_LNG = -95.4061
const TEST_ZIP = '77008'

export const dynamic = 'force-dynamic'

export async function GET() {
  const results = {}

  // 1. Env var presence check (never expose values)
  results.envVars = {
    CENSUS_API_KEY:       !!process.env.CENSUS_API_KEY,
    GOOGLE_PLACES_API_KEY: !!process.env.GOOGLE_PLACES_API_KEY,
    RAPIDAPI_KEY:         !!process.env.RAPIDAPI_KEY,
    WALKSCORE_API_KEY:    !!process.env.WALKSCORE_API_KEY,
  }

  // 2. Census
  try {
    const KEY = process.env.CENSUS_API_KEY ? `&key=${process.env.CENSUS_API_KEY}` : ''
    const url = `https://api.census.gov/data/2023/acs/acs5?get=B01003_001E&for=zip%20code%20tabulation%20area:${TEST_ZIP}${KEY}`
    const res = await fetch(url)
    results.census = { status: res.status, ok: res.ok, body: res.ok ? await res.json() : await res.text() }
  } catch (e) {
    results.census = { error: e.message }
  }

  // 3. Google Places
  try {
    const key = process.env.GOOGLE_PLACES_API_KEY
    if (!key) {
      results.places = { error: 'GOOGLE_PLACES_API_KEY not set' }
    } else {
      const params = new URLSearchParams({ location: `${TEST_LAT},${TEST_LNG}`, radius: '1000', type: 'restaurant', key })
      const res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`)
      const body = await res.json()
      results.places = { status: res.status, ok: res.ok, apiStatus: body.status, errorMessage: body.error_message }
    }
  } catch (e) {
    results.places = { error: e.message }
  }

  // 4. Walk Score
  try {
    const key = process.env.WALKSCORE_API_KEY
    if (!key) {
      results.walkscore = { error: 'WALKSCORE_API_KEY not set' }
    } else {
      const params = new URLSearchParams({ format: 'json', address: 'Houston Heights, TX', lat: String(TEST_LAT), lon: String(TEST_LNG), wsapikey: key })
      const res = await fetch(`https://api.walkscore.com/score?${params}`)
      const body = await res.json()
      results.walkscore = { status: res.status, wsStatus: body.status, description: body.description, snapped: body.snapped_lat }
    }
  } catch (e) {
    results.walkscore = { error: e.message }
  }

  // 5. SchoolDigger (RapidAPI)
  try {
    const key = process.env.RAPIDAPI_KEY
    if (!key) {
      results.schooldigger = { error: 'RAPIDAPI_KEY not set' }
    } else {
      const res = await fetch(
        `https://schooldigger-k-12-school-data-api.p.rapidapi.com/v1.2/schools?st=TX&zip=${TEST_ZIP}&perPage=1`,
        { headers: { 'X-RapidAPI-Key': key, 'X-RapidAPI-Host': 'schooldigger-k-12-school-data-api.p.rapidapi.com' } }
      )
      const body = await res.json()
      results.schooldigger = { status: res.status, ok: res.ok, schoolCount: body.schoolList?.length, message: body.message }
    }
  } catch (e) {
    results.schooldigger = { error: e.message }
  }

  return NextResponse.json(results, { status: 200 })
}
