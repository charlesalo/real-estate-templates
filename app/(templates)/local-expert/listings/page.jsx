import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Square } from 'lucide-react'
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
            <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-3">Chapter Three</p>
            <h1
              className="text-[43px] lg:text-[58px] font-normal text-[#24180F] leading-[1.05] mb-4"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              Curated Local Homes
            </h1>
            <p className="text-[16px] text-[#2C1E11]/50 max-w-xl">
              {filtered.length} active listing{filtered.length !== 1 ? 's' : ''} in neighborhoods I know block by block.
              {q && ` Showing results for "${searchParams.q}".`}
            </p>
          </div>

          {/* Section tabs */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 mb-12 pb-5 border-b border-[#BEB7A9]/50">
            {[
              { label: 'All', q: '' },
              { label: 'West Village', q: 'West Village' },
              { label: 'Tribeca', q: 'Tribeca' },
              { label: 'Brooklyn Heights', q: 'Brooklyn Heights' },
              { label: 'DUMBO', q: 'DUMBO' },
              { label: 'Park Slope', q: 'Park Slope' },
              { label: 'Upper East Side', q: 'Upper East Side' },
            ].map((f) => {
              const isActive = (searchParams?.q ?? '') === f.q
              return (
                <Link
                  key={f.label}
                  href={f.q ? `?q=${encodeURIComponent(f.q)}` : '/local-expert/listings'}
                  className={`text-[12px] tracking-[0.18em] uppercase pb-1 border-b-2 transition-colors ${
                    isActive
                      ? 'text-[#1B3B2B] border-[#BA5B3E]'
                      : 'text-[#2C1E11]/45 border-transparent hover:text-[#24180F]'
                  }`}
                >
                  {f.label}
                </Link>
              )
            })}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[#2C1E11]/40">No listings match your search. <Link href="/local-expert/listings" className="underline">Clear filters</Link></p>
            </div>
          ) : (
            <>
              <LeadListing listing={filtered[0]} />
              {filtered.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {filtered.slice(1).map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Compliance */}
          <div className="mt-12 pt-8 border-t border-[#E5E0D8]">
            <p className="text-[12px] text-[#2C1E11]/30 leading-relaxed">
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

function LeadListing({ listing }) {
  return (
    <Link href={`/local-expert/listings/${listing.id}`} className="group block mb-16 lg:mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center">
        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
          <Image
            src={listing.images[0]}
            alt={listing.address}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#BA5B3E] mb-3">Featured · {listing.type}</p>
          <div
            className="text-[44px] lg:text-[52px] font-normal text-[#24180F] leading-none transition-colors group-hover:text-[#BA5B3E]"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            {formatPrice(listing.price)}
          </div>
          <p className="text-[18px] text-[#24180F]/70 mt-4" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
            {listing.address}
          </p>
          <p className="text-[14px] text-[#24180F]/45 mt-1">{listing.neighborhood}, {listing.city} {listing.zip}</p>
          <div className="flex gap-6 mt-6 pt-6 border-t border-[#BEB7A9]/50 text-[12px] tracking-[0.16em] uppercase text-[#24180F]/55">
            <span className="flex items-center gap-1.5"><Bed size={13} /> {listing.beds} bd</span>
            <span className="flex items-center gap-1.5"><Bath size={13} /> {listing.baths} ba</span>
            <span className="flex items-center gap-1.5"><Square size={13} /> {listing.sqft.toLocaleString()} sqft</span>
          </div>
          <p className="text-[9px] text-[#2C1E11]/25 mt-4">
            Listing Provided Courtesy of {listing.listingBrokerage} · {listing.mlsId}
          </p>
        </div>
      </div>
    </Link>
  )
}

function ListingCard({ listing }) {
  return (
    <Link href={`/local-expert/listings/${listing.id}`} className="group block">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
        <Image
          src={listing.images[0]}
          alt={listing.address}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <p className="text-[11px] tracking-[0.3em] uppercase text-[#BA5B3E] mb-2">{listing.type}</p>
      <div
        className="text-[28px] font-normal text-[#24180F] leading-none transition-colors group-hover:text-[#BA5B3E]"
        style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
      >
        {formatPrice(listing.price)}
      </div>
      <p className="text-[14px] text-[#24180F]/55 mt-2">{listing.address}</p>
      <p className="text-[13px] text-[#24180F]/40">{listing.neighborhood}, {listing.city} {listing.zip}</p>
      <div className="flex gap-5 mt-4 pt-4 border-t border-[#BEB7A9]/50 text-[11px] tracking-[0.16em] uppercase text-[#24180F]/50">
        <span className="flex items-center gap-1.5"><Bed size={12} /> {listing.beds} bd</span>
        <span className="flex items-center gap-1.5"><Bath size={12} /> {listing.baths} ba</span>
        <span className="flex items-center gap-1.5"><Square size={12} /> {listing.sqft.toLocaleString()} sqft</span>
      </div>
      <p className="text-[9px] text-[#2C1E11]/25 mt-3">
        Listing Provided Courtesy of {listing.listingBrokerage} · {listing.mlsId}
      </p>
    </Link>
  )
}
