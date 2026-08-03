import PastTransactionsClient from '../_components/listings/PastTransactionsClient'
import { getListings } from '@/lib/simplyrets'

export const metadata = {
  alternates: { canonical: '/luxury-agent/past-transactions' },
  title: 'Recently Sold Properties in California',
  description: 'Browse Victoria Sinclair\'s closed sales — a proven record of exceptional results across Beverly Hills, Bel Air, and Holmby Hills.',
}

export default async function PastTransactionsPage({ searchParams }) {
  const params = await searchParams

  let initialListings = []
  let initialTotal    = 0

  try {
    const offset = params.page ? (parseInt(params.page) - 1) * 12 : 0
    const { listings, totalCount } = await getListings({
      status:   'Closed',
      q:        params.q,
      type:     params.type,
      minprice: params.minprice,
      maxprice: params.maxprice,
      sort:     params.sort,
      limit:    12,
      offset,
    })
    initialListings = listings
    initialTotal    = totalCount
  } catch {}

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <PastTransactionsClient
        initialListings={initialListings}
        initialTotal={initialTotal}
        initialFilters={params}
        template="luxury-agent"
      />
    </div>
  )
}
