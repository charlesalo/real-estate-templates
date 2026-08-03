import SearchClient from '../_components/listings/SearchClient'
import { getListings } from '@/lib/simplyrets'
import { COUNT_PROBE_LIMIT, gateSearchResults, resolveGate } from '@/lib/gating'

export const metadata = {
  title: { absolute: 'Search Houston Homes for Sale | The Hargrove Group' },
  description: 'Search homes for sale across Greater Houston — The Heights, River Oaks, Memorial, Sugar Land & The Woodlands — updated with live MLS listings.',
}

export default async function ListingsPage({ searchParams }) {
  const params = await searchParams

  // Same gate the API route applies, so the first paint matches what a refresh
  // returns and the withheld listings never reach the HTML payload.
  const { gated } = await resolveGate()

  let initialListings = []
  let initialTotal    = 0
  let initialHasMore  = false
  let initialHidden   = 0
  let initialApprox   = false

  try {
    const requestedPage = gated ? 1 : (params.page ? parseInt(params.page) : 1)
    // Gated requests over-fetch to establish a result count, then get sliced
    // back to PREVIEW_LIMIT by gateSearchResults().
    const limit  = gated ? COUNT_PROBE_LIMIT : 12
    const offset = gated ? 0 : (requestedPage - 1) * 12

    const result = await getListings({
      q:         params.q,
      status:    params.status,
      minprice:  params.minprice,
      maxprice:  params.maxprice,
      minbeds:   params.minbeds,
      minbaths:  params.minbaths,
      type:      params.type,
      minarea:   params.minarea,
      sort:      params.sort,
      limit,
      offset,
      liveCount: true,
    })

    const gatedResult = gateSearchResults(result, gated)
    initialListings = gatedResult.listings
    initialTotal    = gatedResult.totalCount
    initialHasMore  = gatedResult.hasMore
    initialHidden   = gatedResult.hiddenCount
    initialApprox   = gatedResult.approximate
  } catch {}

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Navy strip gives the transparent navbar a visible dark backdrop */}
      <div className="h-20 bg-[#1A2D5A]" aria-hidden="true" />
      <h1 className="sr-only">Search Houston Homes</h1>

      <SearchClient
        initialListings={initialListings}
        initialTotal={initialTotal}
        initialHasMore={initialHasMore}
        initialFilters={gated ? { ...params, page: '1' } : params}
        initialGated={gated}
        initialHidden={initialHidden}
        initialApproximate={initialApprox}
      />
    </div>
  )
}
