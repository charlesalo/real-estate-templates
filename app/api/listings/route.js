import { NextResponse } from 'next/server'
import { getListings } from '@/lib/simplyrets'

// Ungated MLS feed. Still used by the luxury-agent / local-expert search
// clients and by Past Transactions (sold comps, not part of the wall).
// Templates behind the registration wall call /api/listings/search instead —
// see docs/gated-search-setup.md for what closes this route down once the gate
// is ported to the remaining templates.
export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const filters = {
    q:        searchParams.get('q')        || undefined,
    status:   searchParams.get('status')   || undefined,
    minprice: searchParams.get('minprice') || undefined,
    maxprice: searchParams.get('maxprice') || undefined,
    minbeds:  searchParams.get('minbeds')  || undefined,
    minbaths: searchParams.get('minbaths') || undefined,
    type:     searchParams.get('type')     || undefined,
    minarea:  searchParams.get('minarea')  || undefined,
    sort:     searchParams.get('sort')     || undefined,
    limit:    parseInt(searchParams.get('limit')  || '12'),
    offset:   parseInt(searchParams.get('offset') || '0'),
  }

  try {
    const { listings, totalCount, hasMore } = await getListings(filters)
    return NextResponse.json({ listings, totalCount, hasMore })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
