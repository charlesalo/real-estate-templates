import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const input = searchParams.get('q')?.trim()

  if (!input || input.length < 2) {
    return NextResponse.json({ predictions: [] })
  }

  const key = process.env.GOOGLE_PLACES_API_KEY
  if (!key) {
    return NextResponse.json({ predictions: [] }, { status: 500 })
  }

  const params = new URLSearchParams({
    input,
    types: 'geocode',
    components: 'country:us',
    key,
  })

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`,
    { next: { revalidate: 0 } },
  )

  if (!res.ok) return NextResponse.json({ predictions: [] })

  const data = await res.json()
  const predictions = (data.predictions ?? []).slice(0, 5).map(p => ({
    placeId:     p.place_id,
    description: p.description,
    mainText:    p.structured_formatting?.main_text ?? p.description,
    secondaryText: p.structured_formatting?.secondary_text ?? '',
  }))

  return NextResponse.json({ predictions })
}
