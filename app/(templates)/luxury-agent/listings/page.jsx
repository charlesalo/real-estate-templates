import MLSSearchClient from '@/components/real-estate/MLSSearchClient'
import { getListings } from '@/lib/simplyrets'

export const metadata = {
  title: 'Listings',
  description: 'Browse luxury properties in Beverly Hills, Bel Air, and Holmby Hills.',
}

export default async function ListingsPage({ searchParams }) {
  const params = await searchParams

  let initialListings = []
  let initialTotal = 0

  try {
    const offset = params.page ? (parseInt(params.page) - 1) * 12 : 0
    const { listings, totalCount } = await getListings({
      q: params.q,
      status: params.status,
      minprice: params.minprice,
      maxprice: params.maxprice,
      minbeds: params.minbeds,
      minbaths: params.minbaths,
      type: params.type,
      minarea: params.minarea,
      sort: params.sort,
      limit: 12,
      offset,
    })
    initialListings = listings
    initialTotal = totalCount
  } catch {}

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <MLSSearchClient
        initialListings={initialListings}
        initialTotal={initialTotal}
        initialFilters={params}
        template="luxury-agent"
      />
    </div>
  )
}
