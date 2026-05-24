import ModernTeamSearchClient from '@/components/real-estate/ModernTeamSearchClient'
import { getListings } from '@/lib/simplyrets'

export const metadata = {
  title: 'Search Homes',
  description: 'Search homes for sale across Greater Houston — The Heights, River Oaks, Memorial, Sugar Land, The Woodlands, and more.',
}

export default async function ListingsPage({ searchParams }) {
  const params = await searchParams

  let initialListings = []
  let initialTotal    = 0
  let initialHasMore  = false

  try {
    const offset = params.page ? (parseInt(params.page) - 1) * 12 : 0
    const { listings, totalCount, hasMore } = await getListings({
      q:         params.q,
      status:    params.status,
      minprice:  params.minprice,
      maxprice:  params.maxprice,
      minbeds:   params.minbeds,
      minbaths:  params.minbaths,
      type:      params.type,
      minarea:   params.minarea,
      sort:      params.sort,
      limit:     12,
      offset,
      liveCount: true,
    })
    initialListings = listings
    initialTotal    = totalCount
    initialHasMore  = hasMore
  } catch {}

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Navy strip gives the transparent navbar a visible dark backdrop */}
      <div className="h-20 bg-[#1A2D5A]" aria-hidden="true" />
      <h1 className="sr-only">Search Houston Homes</h1>

      <ModernTeamSearchClient
        initialListings={initialListings}
        initialTotal={initialTotal}
        initialHasMore={initialHasMore}
        initialFilters={params}
      />
    </div>
  )
}
