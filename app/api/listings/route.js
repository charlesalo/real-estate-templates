import { NextResponse } from 'next/server'
import { getListings } from '@/lib/simplyrets'

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
    const { listings, totalCount } = await getListings(filters)
    return NextResponse.json({ listings, totalCount })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
