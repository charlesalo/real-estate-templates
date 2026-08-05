import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Square } from 'lucide-react'

// The paired cards behind the asymmetric "featured homes" layout: one tall hero
// card alongside a stack of shorter ones. Used by the homepage and the about
// page, which both run that layout with different framing copy.

function formatPrice(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`
  return `$${n.toLocaleString()}`
}

export function HeroListingCard({ listing }) {
  return (
    <Link href={`/local-expert/listings/${listing.id}`} className="group block h-full">
      <article className="relative rounded-2xl overflow-hidden h-full min-h-[420px] lg:min-h-0">
        <Image
          src={listing.images[0]}
          alt={listing.address}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute top-4 left-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/90 text-[#2C1E11]">
            {listing.status}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#24180F]/80 via-[#24180F]/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 lg:px-8 lg:py-7">
          <div
            className="text-[36px] lg:text-[44px] font-normal text-white leading-none mb-1.5"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            {formatPrice(listing.price)}
          </div>
          <p className="text-[13px] text-white/65">{listing.address}</p>
          <div className="flex items-center justify-between gap-3 mt-1.5">
            <p className="text-[10px] text-white/45 flex-1">
              Listing Provided Courtesy of {listing.listingBrokerage} · {listing.mlsId}
            </p>
            <div className="bg-white rounded px-1.5 py-1 flex-shrink-0 inline-flex items-center">
              <Image
                src="/images/RLS at REBNY.png"
                alt="RLS at REBNY"
                width={40}
                height={24}
                className="h-4 w-auto"
              />
            </div>
          </div>
          {/* Details — collapsed by default, slide up to reveal on hover */}
          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <div className="overflow-hidden">
              <div className="h-px w-full bg-white/25 my-3" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-[12px] text-white/55">
                    <Bed size={12} /> {listing.beds} bd
                  </span>
                  <span className="flex items-center gap-1 text-[12px] text-white/55">
                    <Bath size={12} /> {listing.baths} ba
                  </span>
                  <span className="flex items-center gap-1 text-[12px] text-white/55">
                    <Square size={12} /> {listing.sqft.toLocaleString()} sf
                  </span>
                </div>
                <span className="text-[12px] uppercase tracking-wider text-white/55">{listing.type}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export function SideListingCard({ listing }) {
  return (
    <Link href={`/local-expert/listings/${listing.id}`} className="group block flex-1 min-h-[200px] lg:min-h-0">
      <article className="relative rounded-xl overflow-hidden h-full">
        <Image
          src={listing.images[0]}
          alt={listing.address}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-[#2C1E11]">
            {listing.status}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#24180F]/75 via-[#24180F]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
          <div
            className="text-[22px] font-normal text-white leading-none"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            {formatPrice(listing.price)}
          </div>
          <p className="text-[12px] text-white/65 mt-1 truncate">{listing.address}</p>
          <div className="flex items-center justify-between gap-2 mt-1">
            <p className="text-[10px] text-white/45 truncate min-w-0 flex-1">
              Listing Provided Courtesy of {listing.listingBrokerage} · {listing.mlsId}
            </p>
            <div className="bg-white rounded px-1.5 py-0.5 flex-shrink-0 inline-flex items-center">
              <Image
                src="/images/RLS at REBNY.png"
                alt="RLS at REBNY"
                width={40}
                height={24}
                className="h-3.5 w-auto"
              />
            </div>
          </div>
          {/* Details — collapsed by default, slide up to reveal on hover */}
          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <div className="overflow-hidden">
              <div className="h-px w-full bg-white/25 my-2" />
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px] text-white/55">
                    <Bed size={11} /> {listing.beds} bd
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-white/55">
                    <Bath size={11} /> {listing.baths} ba
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-white/55">
                    <Square size={11} /> {listing.sqft.toLocaleString()} sf
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-white/55">{listing.type}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
