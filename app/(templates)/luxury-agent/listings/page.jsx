import { Suspense } from 'react'
import SearchBar from '@/components/real-estate/SearchBar'
import ListingGrid from '@/components/real-estate/ListingGrid'
import MapView from '@/components/real-estate/MapView'
import { getListings } from '@/lib/simplyrets'

export const metadata = {
  title: 'Listings',
  description: 'Browse luxury properties in Beverly Hills, Bel Air, and Holmby Hills.',
}

async function fetchListings(searchParams) {
  try {
    return await getListings({
      q: searchParams.q,
      minprice: searchParams.minprice,
      maxprice: searchParams.maxprice,
      minbeds: searchParams.minbeds,
      type: searchParams.type,
      limit: 12,
      offset: searchParams.page ? (parseInt(searchParams.page) - 1) * 12 : 0,
    })
  } catch {
    return []
  }
}

export default async function ListingsPage({ searchParams }) {
  const params = await searchParams
  const listings = await fetchListings(params)

  const normalized = listings.map(l => ({
    id: l.mlsId,
    mlsId: l.mlsId,
    price: l.listPrice,
    address: l.address?.full ?? [l.address?.streetNumber, l.address?.streetName].filter(Boolean).join(' '),
    city: l.address?.city,
    state: l.address?.state,
    zip: l.address?.postalCode,
    beds: l.property?.bedrooms,
    baths: l.property?.bathsFull,
    sqft: l.property?.area,
    status: l.mls?.status ?? 'Active',
    image: l.photos?.[0],
    geo: l.geo,
  }))

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* Page header */}
      <div className="border-b border-white/10 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">
            Properties
          </p>
          <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white mb-8">
            Available Listings
          </h1>
          <SearchBar
            template="luxury-agent"
            basePath="/luxury-agent/listings"
            defaultValues={params}
          />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <ListingGrid
          listings={normalized}
          totalCount={normalized.length}
          template="luxury-agent"
        />
      </div>
    </div>
  )
}
