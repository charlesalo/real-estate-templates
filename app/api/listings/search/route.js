import { NextResponse } from 'next/server'
import { getListings } from '@/lib/simplyrets'
import { COUNT_PROBE_LIMIT, gateSearchResults, resolveGate } from '@/lib/gating'

// Registration-walled MLS search. Enforcement lives here rather than in the
// search UI — a signed-out visitor can call this endpoint directly, so the
// withheld listings must never be fetched into the response in the first place.
export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const { gated } = await resolveGate()

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
    // Pinning limit/offset for gated requests closes the obvious hole: paging
    // through the whole MLS a preview at a time with ?offset=. The wider gated
    // limit is a count probe — gateSearchResults() slices it back to
    // PREVIEW_LIMIT before anything is serialized.
    limit:    gated ? COUNT_PROBE_LIMIT : parseInt(searchParams.get('limit')  || '12'),
    offset:   gated ? 0                 : parseInt(searchParams.get('offset') || '0'),
    // The CTA quotes a real result count, so it has to come from a live
    // (uncached) response — Next.js drops X-Total-Count on cached ones.
    liveCount: true,
  }

  try {
    const result = await getListings(filters)
    const { listings, totalCount, hasMore, hiddenCount, approximate } =
      gateSearchResults(result, gated)
    return NextResponse.json({ listings, totalCount, hasMore, gated, hiddenCount, approximate })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
