import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Bed, Bath, Square } from 'lucide-react'
import { NEIGHBORHOODS, LISTINGS } from '@/lib/local-expert-data'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }) {
  const n = NEIGHBORHOODS.find((n) => n.slug === params.slug)
  if (!n) return {}
  return {
    title: `${n.name} — NYC Neighborhood Guide`,
    description: n.tagline,
  }
}

function formatPrice(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`
  return `$${n.toLocaleString()}`
}

export default function NeighborhoodDetailPage({ params }) {
  const neighborhood = NEIGHBORHOODS.find((n) => n.slug === params.slug)
  if (!neighborhood) notFound()

  const idx = NEIGHBORHOODS.findIndex((n) => n.slug === params.slug)
  const prev = NEIGHBORHOODS[idx - 1]
  const next = NEIGHBORHOODS[idx + 1]

  const localListings = LISTINGS.filter((l) => l.neighborhood === neighborhood.name).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-0 pb-0" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="relative h-[55vh] min-h-[400px]">
          <Image src={neighborhood.image} alt={neighborhood.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B2B]/80 via-[#1B3B2B]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 max-w-7xl mx-auto">
            <Link href="/local-expert/neighborhoods" className="inline-flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white transition-colors mb-4">
              <ArrowLeft size={12} /> All Neighborhoods
            </Link>
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/40 mb-2">{neighborhood.borough}</p>
            <h1 className="text-[48px] lg:text-[64px] font-normal text-white leading-[1.0]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
              {neighborhood.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-[24px] border-b border-[#E5E0D8]" style={{ backgroundColor: '#F4F0EA' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-wrap gap-8">
          <div><div className="text-[22px] font-normal text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{neighborhood.medianPrice}</div><div className="text-[10px] uppercase tracking-wider text-[#24180F]/40 mt-0.5">Median Price</div></div>
          <div><div className="text-[22px] font-normal text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{neighborhood.activeListings}</div><div className="text-[10px] uppercase tracking-wider text-[#24180F]/40 mt-0.5">Active Listings</div></div>
          <div><div className="text-[22px] font-normal text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{neighborhood.highlights.length}</div><div className="text-[10px] uppercase tracking-wider text-[#24180F]/40 mt-0.5">Key Highlights</div></div>
        </div>
      </section>

      {/* Description */}
      <section className="py-[64px] lg:py-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <p className="text-[15px] text-[#24180F]/65 leading-relaxed">{neighborhood.description}</p>
          <div className="mt-10">
            <h2 className="text-[18px] font-normal text-[#24180F] mb-4" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>What to know</h2>
            <ul className="space-y-2.5">
              {neighborhood.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-[15px] text-[#24180F]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B9E8B] flex-shrink-0" />{h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Local listings */}
      {localListings.length > 0 && (
        <section className="py-[64px] lg:py-[80px]" style={{ backgroundColor: '#F4F0EA' }}>
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[32px] font-normal text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                Homes in {neighborhood.name}
              </h2>
              <Link href={`/local-expert/listings?q=${encodeURIComponent(neighborhood.name)}`} className="text-[12px] font-semibold text-[#24180F]/40 hover:text-[#24180F] transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {localListings.map((listing) => (
                <Link key={listing.id} href={`/local-expert/listings/${listing.id}`} className="group block rounded-xl overflow-hidden border border-[#E5E0D8] bg-white hover:shadow-md transition-shadow">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={listing.images[0]} alt={listing.address} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <div className="text-[22px] font-normal text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{formatPrice(listing.price)}</div>
                    <p className="text-[12px] text-[#24180F]/50 mt-0.5">{listing.address}</p>
                    <div className="flex gap-3 mt-2 text-[10px] text-[#24180F]/40">
                      <span className="flex items-center gap-1"><Bed size={10} /> {listing.beds}</span>
                      <span className="flex items-center gap-1"><Bath size={10} /> {listing.baths}</span>
                      <span className="flex items-center gap-1"><Square size={10} /> {listing.sqft.toLocaleString()}</span>
                    </div>
                    <p className="text-[8.5px] text-[#2C1E11]/25 mt-2">Listing Provided Courtesy of {listing.listingBrokerage}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next navigation */}
      <section className="py-[64px] border-t border-[#E5E0D8]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex justify-between">
          {prev ? (
            <Link href={`/local-expert/neighborhoods/${prev.slug}`} className="group flex items-center gap-2 text-[13px] text-[#2C1E11]/50 hover:text-[#2C1E11] transition-colors">
              <ArrowLeft size={14} /> <span>{prev.name}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/local-expert/neighborhoods/${next.slug}`} className="group flex items-center gap-2 text-[13px] text-[#2C1E11]/50 hover:text-[#2C1E11] transition-colors">
              <span>{next.name}</span> <ArrowRight size={14} />
            </Link>
          ) : <div />}
        </div>
      </section>
    </>
  )
}
