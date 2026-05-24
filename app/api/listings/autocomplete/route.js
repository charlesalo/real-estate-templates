import { NextResponse } from 'next/server'
import { getListings } from '@/lib/simplyrets'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ predictions: [] })
  }

  try {
    const { listings } = await getListings({ q, limit: 6, liveCount: false })

    const predictions = listings.map(l => {
      const street = l.address?.full
        ?? [l.address?.streetNumber, l.address?.streetName].filter(Boolean).join(' ')
      const city    = l.address?.city    ?? ''
      const state   = l.address?.state   ?? ''
      const zip     = l.address?.postalCode ?? ''
      const secondary = [city, state, zip].filter(Boolean).join(', ')

      return {
        mlsId:         l.mlsId,
        mainText:      street,
        secondaryText: secondary,
      }
    }).filter(p => p.mainText)

    return NextResponse.json({ predictions })
  } catch {
    return NextResponse.json({ predictions: [] })
  }
}
