import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Square, SlidersHorizontal } from 'lucide-react'
import { LISTINGS } from '@/lib/local-expert-data'

export const metadata = {
  title: 'Homes for Sale',
  description:
    'Curated NYC homes for sale — West Village, Tribeca, Brooklyn Heights, DUMBO, Park Slope, and the Upper East Side.',
}

function formatPrice(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`
  return `$${n.toLocaleString()}`
}

export default function ListingsPage({ searchParams }) {
  const q = searchParams?.q?.toLowerCase() ?? ''
  const filtered = q
    ? LISTINGS.filter(
        (l) =>
          l.neighborhood.toLowerCase().includes(q) ||
          l.address.toLowerCase().includes(q) ||
          l.type.toLowerCase().includes(q),
      )
    : LISTINGS

  return (
    <>
      <section className="pt-[112px] pb-[64px] lg:pt-[144px] lg:pb-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          {/* Header */}
          <div className="mb-10">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-3">Chapter Three</p>
            <h1
              className="text-[40px] lg:text-[54px] font-normal text-[#24180F] leading-[1.05] mb-4"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              Curated Local Homes
            </h1>
            <p className="text-[15px] text-[#1B3B2B]/50 max-w-xl">
              {filtered.length} active listing{filtered.length !== 1 ? 's' : ''} in neighborhoods I know block by block.
              {q && ` Showing results for "${searchParams.q}".`}
            </p>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { label: 'All', href: '/local-expert/listings' },
              { label: 'West Village', href: '?q=West+Village' },
              { label: 'Tribeca', href: '?q=Tribeca' },
              { label: 'Brooklyn Heights', href: '?q=Brooklyn+Heights' },
              { label: 'DUMBO', href: '?q=DUMBO' },
              { label: 'Park Slope', href: '?q=Park+Slope' },
              { label: 'Upper East Side', href: '?q=Upper+East+Side' },
            ].map((f) => (
              <Link
                key={f.label}
                href={f.href}
                className="px-4 py-2 text-[11px] font-medium rounded-full border border-[#E5E0D8] text-[#1B3B2B]/60 hover:border-[#1B3B2B]/30 hover:text-[#1B3B2B] transition-colors"
              >
                {f.label}
              </Link>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[#1B3B2B]/40">No listings match your search. <Link href="/local-expert/listings" className="underline">Clear filters</Link></p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {/* Compliance */}
          <div className="mt-12 pt-8 border-t border-[#E5E0D8]">
            <p className="text-[10px] text-[#1B3B2B]/30 leading-relaxed">
              All listing information is deemed reliable but not guaranteed and should be independently reviewed
              and verified. All properties are subject to prior sale or withdrawal. Equal Housing Opportunity.
              Compass Real Estate LLC is a licensed real estate broker. NY Lic# 109802832.
              Some listings may be represented by the listing broker or its associates. Listing data provided
              courtesy of the Real Estate Board of New York (REBNY MLS).
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function ListingCard({ listing }) {
  return (
    <Link href={`/local-expert/listings/${listing.id}`} className="group block">
      <article className="rounded-xl overflow-hidden border border-[#E5E0D8] bg-white hover:shadow-md transition-shadow">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={listing.images[0]}
            alt={listing.address}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/92 text-[#1B3B2B]">
              {listing.type}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div
            className="text-[22px] font-normal text-[#24180F] leading-none mb-1"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            {formatPrice(listing.price)}
          </div>
          <p className="text-[13px] font-semibold text-[#1B3B2B] mt-1">{listing.address}</p>
          <p className="text-[11px] text-[#1B3B2B]/45">{listing.neighborhood}, {listing.city} {listing.zip}</p>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#E5E0D8]">
            <span className="flex items-center gap-1 text-[11px] text-[#1B3B2B]/50">
              <Bed size={12} /> {listing.beds} bd
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[#1B3B2B]/50">
              <Bath size={12} /> {listing.baths} ba
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[#1B3B2B]/50">
              <Square size={12} /> {listing.sqft.toLocaleString()} sf
            </span>
          </div>
          <p className="text-[9px] text-[#1B3B2B]/25 mt-2.5 leading-snug">
            Listing Provided Courtesy of {listing.listingBrokerage} · {listing.mlsId}
          </p>
        </div>
      </article>
    </Link>
  )
}
