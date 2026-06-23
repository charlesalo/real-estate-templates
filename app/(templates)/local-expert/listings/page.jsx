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

export default async function ListingsPage({ searchParams }) {
  const sp = await searchParams
  const rawQ = sp?.q ?? ''
  const q = rawQ.toLowerCase()
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
              {q && ` Showing results for "${rawQ}".`}
            </p>
          </div>

          {/* Listings — alternating image/details rows */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[#2C1E11]/40">No listings match your search. <Link href="/local-expert/listings" className="underline">Clear filters</Link></p>
            </div>
          ) : (
            <div className="space-y-16 lg:space-y-24">
              {filtered.map((listing, i) => (
                <ListingRow key={listing.id} listing={listing} reverse={i % 2 === 1} priority={i === 0} />
              ))}
            </div>
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

function ListingRow({ listing, reverse = false, priority = false }) {
  return (
    <Link href={`/local-expert/listings/${listing.id}`} className="group block">
      <div className={`grid grid-cols-1 gap-8 lg:gap-12 items-center ${reverse ? 'lg:grid-cols-[1fr_640px]' : 'lg:grid-cols-[640px_1fr]'}`}>
        <div className={`relative aspect-[3/2] w-full max-w-[640px] rounded-2xl overflow-hidden lg:row-start-1 ${reverse ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
          <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#24180F] text-[#F8F3EB]">
            {listing.status}
          </span>
          <Image
            src={listing.images[0]}
            alt={listing.address}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className={`lg:row-start-1 ${reverse ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#BA5B3E] mb-3">{listing.status} · {listing.type}</p>
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
          <div className="flex items-center justify-between gap-6 mt-6 pt-6 border-t border-[#BEB7A9]/50 text-[12px] tracking-[0.16em] uppercase text-[#24180F]/55">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5"><Bed size={13} /> {listing.beds} bd</span>
              <span className="flex items-center gap-1.5"><Bath size={13} /> {listing.baths} ba</span>
              <span className="flex items-center gap-1.5"><Square size={13} /> {listing.sqft.toLocaleString()} sqft</span>
            </div>
            <Image
              src="/images/RLS at REBNY.png"
              alt="RLS at REBNY"
              width={40}
              height={24}
              className="h-6 w-auto flex-shrink-0"
            />
          </div>
          <p className="text-[9px] text-[#2C1E11]/25 mt-4">
            Listing Provided Courtesy of {listing.listingBrokerage} · {listing.mlsId}
          </p>
        </div>
      </div>
    </Link>
  )
}
