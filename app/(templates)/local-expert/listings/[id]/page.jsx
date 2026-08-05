import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Bed, Bath, Square, MapPin, CheckCircle, Footprints } from 'lucide-react'
import { LISTINGS, AGENT, NEIGHBORHOODS } from '@/lib/local-expert-data'
import { notFound } from 'next/navigation'
import ContactTeaser from '../../_components/sections/ContactTeaser'
import PropertyContactForm from './PropertyContactForm'
import MortgageCalculator from './MortgageCalculator'
import { fitWithin } from '@/lib/seo'

export async function generateStaticParams() {
  return LISTINGS.map((l) => ({ id: l.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const listing = LISTINGS.find((l) => l.id === id)
  if (!listing) return {}
  return {
    alternates: { canonical: `/local-expert/listings/${id}` },
    // `absolute` because the layout's " | Nadia Osei" suffix pushed these past
    // the ~60 characters a search result will show.
    title: {
      absolute: fitWithin(
        [
          `${listing.address}, ${listing.neighborhood} — ${listing.beds}BR ${listing.type} for Sale in NYC`,
          `${listing.address} — ${listing.neighborhood} ${listing.type} for Sale`,
          `${listing.address} — ${listing.neighborhood} Home for Sale`,
          `${listing.address} — ${listing.neighborhood}`,
        ],
        60,
      ),
    },
    // Was 42–53 characters — too thin for a search result to render usefully.
    description: fitWithin(
      [
        `${listing.beds}BR/${listing.baths}BA ${listing.type} in ${listing.neighborhood}, ${listing.city}. ${listing.sqft.toLocaleString()} sq ft, asking $${listing.price.toLocaleString()}. See photos, floor plans and full neighborhood details.`,
        `${listing.beds}BR/${listing.baths}BA ${listing.type} in ${listing.neighborhood}, ${listing.city}. ${listing.sqft.toLocaleString()} sq ft, asking $${listing.price.toLocaleString()}. See photos and neighborhood details.`,
      ],
      155,
    ),
  }
}

function formatPrice(n) {
  return `$${n.toLocaleString()}`
}

export default async function PropertyDetailPage({ params }) {
  const { id } = await params
  const listing = LISTINGS.find((l) => l.id === id)
  if (!listing) notFound()

  const similar = LISTINGS.filter((l) => l.id !== listing.id && l.neighborhood === listing.neighborhood).slice(0, 3)
  const hood = NEIGHBORHOODS.find((n) => n.name === listing.neighborhood)

  const excluded = new Set([listing.id, ...similar.map((s) => s.id)])
  const featured = LISTINGS.filter((l) => !excluded.has(l.id)).slice(0, 3)

  return (
    <>
    <section className="pt-[112px] pb-[96px] lg:pt-[144px] lg:pb-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <Link
          href="/local-expert/listings"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#2C1E11]/55 hover:text-[#BA5B3E] transition-colors mb-8"
        >
          <ArrowLeft size={13} /> Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
          <div>
            {/* Image gallery */}
            <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden mb-8">
              <div className="relative col-span-2 aspect-[16/9]">
                <Image src={listing.images[0]} alt={listing.address} fill className="object-cover" priority />
              </div>
              {listing.images.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-[16/10]">
                  <Image src={img} alt={`${listing.address} — photo ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 text-[12px] font-bold uppercase tracking-wider rounded-full border border-[#E5E0D8] text-[#2C1E11]/60">{listing.type}</span>
              <span className="px-3 py-1 text-[12px] font-bold uppercase tracking-wider rounded-full bg-[#8B9E8B]/20 text-[#24180F]">{listing.status}</span>
            </div>

            <div className="text-[40px] font-normal text-[#24180F] leading-none mb-2" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
              {formatPrice(listing.price)}
            </div>

            <div className="flex items-start gap-1.5 text-[16px] text-[#2C1E11] mb-1">
              <MapPin size={15} className="mt-0.5 text-[#2C1E11]/40 flex-shrink-0" />
              <span>{listing.address}, {listing.neighborhood}, {listing.city}, {listing.state} {listing.zip}</span>
            </div>

            <div className="flex flex-wrap items-center gap-5 py-5 my-5 border-y border-[#E5E0D8]">
              <span className="flex items-center gap-1.5 text-[16px] text-[#2C1E11]/70"><Bed size={16} className="text-[#2C1E11]/40" /> <strong>{listing.beds}</strong> Bedrooms</span>
              <span className="flex items-center gap-1.5 text-[16px] text-[#2C1E11]/70"><Bath size={16} className="text-[#2C1E11]/40" /> <strong>{listing.baths}</strong> Bathrooms</span>
              <span className="flex items-center gap-1.5 text-[16px] text-[#24180F]/70"><Square size={16} className="text-[#24180F]/40" /> <strong>{listing.sqft.toLocaleString()}</strong> sq ft</span>
            </div>

            <div className="flex items-center justify-between gap-3 mb-8">
              <p className="text-[12px] text-[#2C1E11]/40">
                Listing Provided Courtesy of {listing.listingBrokerage} · {listing.mlsId}
              </p>
              <Image
                src="/images/RLS at REBNY.png"
                alt="RLS at REBNY"
                width={40}
                height={24}
                className="h-4 w-auto flex-shrink-0"
              />
            </div>

            <h2 className="text-[19px] font-bold text-[#24180F] mb-3 text-balance" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>About this home</h2>
            <p className="text-[16px] text-[#24180F]/65 leading-relaxed mb-8">{listing.description}</p>

            <h3 className="text-[19px] font-normal text-[#24180F] mb-4 text-balance" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>Highlights</h3>
            <div className="grid grid-cols-2 gap-2.5 mb-10">
              {listing.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-[14px] text-[#24180F]/65">
                  <CheckCircle size={14} className="text-[#8B9E8B] flex-shrink-0" /> {f}
                </div>
              ))}
            </div>

            <h3 className="text-[19px] font-normal text-[#24180F] mb-4 text-balance" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>Location</h3>
            <div className="rounded-xl overflow-hidden border border-[#E5E0D8] aspect-[16/9] mb-10">
              <iframe
                title="Property location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`)}&output=embed&z=15`}
              />
            </div>

            {hood && (
              <div className="mb-10 mt-12 pt-10 border-t border-[#E5E0D8]">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#BA5B3E] mb-3">The Neighborhood</p>
                <h3 className="text-[30px] lg:text-[34px] font-normal text-[#24180F] leading-tight mb-1 text-balance" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                  {hood.name}
                </h3>
                <p className="text-[13px] uppercase tracking-wider text-[#2C1E11]/40 mb-6">{hood.borough}</p>

                <div className="relative aspect-[16/8] rounded-sm overflow-hidden mb-6">
                  <Image src={hood.image} alt={hood.name} fill className="object-cover" />
                </div>

                <p className="text-[19px] lg:text-[21px] font-normal text-[#24180F]/80 leading-snug italic mb-5" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                  {hood.tagline}
                </p>
                <p className="text-[16px] text-[#24180F]/65 leading-relaxed mb-8 first-letter:text-[44px] first-letter:font-normal first-letter:text-[#24180F] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.85] first-letter:[font-family:var(--font-gelasio,Georgia,serif)]">
                  {hood.description}
                </p>

                <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4 py-5 border-y border-[#E5E0D8] mb-6">
                  <div>
                    <p className="text-[24px] font-normal text-[#24180F] leading-none" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{hood.medianPrice}</p>
                    <p className="text-[11px] uppercase tracking-wider text-[#2C1E11]/45 mt-1.5">Median Price</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[24px] font-normal text-[#24180F] leading-none" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                      <Footprints size={18} className="text-[#8B9E8B]" />{hood.walkScore}
                    </p>
                    <p className="text-[11px] uppercase tracking-wider text-[#2C1E11]/45 mt-1.5">Walk Score</p>
                  </div>
                  <div>
                    <p className="text-[24px] font-normal text-[#24180F] leading-none" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{hood.activeListings}</p>
                    <p className="text-[11px] uppercase tracking-wider text-[#2C1E11]/45 mt-1.5">Active Listings</p>
                  </div>
                </div>

                <p className="text-[14px] text-[#2C1E11]/55 mb-6">
                  Known for{' '}
                  {hood.vibes.map((v, i) => (
                    <span key={v}>
                      <span className="text-[#24180F]/75">{v.toLowerCase()}</span>
                      {i < hood.vibes.length - 1 && <span className="text-[#2C1E11]/30">{i === hood.vibes.length - 2 ? ' & ' : ', '}</span>}
                    </span>
                  ))}.
                </p>

                <Link
                  href={`/local-expert/neighborhoods/${hood.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors"
                >
                  Explore {hood.name} <ArrowRight size={14} />
                </Link>
              </div>
            )}

            <MortgageCalculator listPrice={listing.price} />

            <div className="p-4 rounded-xl border border-[#E5E0D8] bg-[#F4F0EA]">
              <p className="text-[12px] text-[#2C1E11]/35 leading-relaxed">
                Listing Provided Courtesy of {listing.listingBrokerage}. MLS ID: {listing.mlsId}.
                All information is deemed reliable but not guaranteed and should be independently reviewed and verified.
                All properties are subject to prior sale or withdrawal. Equal Housing Opportunity. Compass Real Estate LLC, NY Lic# 109802832.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 self-start">
            <PropertyContactForm listing={listing} agent={AGENT} />
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#E5E0D8]">
            <h2 className="text-[24px] font-normal text-[#24180F] mb-6 text-balance" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
              More in {listing.neighborhood}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {similar.map((l) => (
                <Link key={l.id} href={`/local-expert/listings/${l.id}`} className="group block rounded-xl overflow-hidden border border-[#E5E0D8]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={l.images[0]} alt={l.address} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-[24px] font-normal text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{formatPrice(l.price)}</p>
                    <p className="text-[12px] text-[#24180F]/50 mt-0.5">{l.address}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>

    {featured.length >= 3 && (
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F2ECE1' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <h2
                  className="text-[34px] lg:text-[40px] font-normal text-[#24180F] leading-tight mb-2 text-balance"
                  style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                >
                  Featured Properties
                </h2>
                <p className="text-[15px] text-[#2C1E11]/40 max-w-lg text-pretty">
                  Homes in neighborhoods I know — not just listed here, but actually considered.
                </p>
              </div>
              <Link
                href="/local-expert/listings"
                className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors whitespace-nowrap"
              >
                View all active listings <ArrowRight size={13} />
              </Link>
            </div>

            {/* Asymmetric feature layout: hero left, two sidebar cards right */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-3 lg:h-[560px]">
              <HeroListingCard listing={featured[0]} />
              <div className="flex flex-col gap-3 h-full">
                <SideListingCard listing={featured[1]} />
                <SideListingCard listing={featured[2]} />
              </div>
            </div>

            <Link
              href="/local-expert/listings"
              className="flex md:hidden items-center gap-1.5 text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors mt-6"
            >
              View all active listings <ArrowRight size={13} />
            </Link>
        </div>
      </section>
    )}

    <ContactTeaser />
    </>
  )
}

function HeroListingCard({ listing }) {
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
          <p className="text-[10px] text-white/45 mt-1.5">
            Listing Provided Courtesy of {listing.listingBrokerage} · {listing.mlsId}
          </p>
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

function SideListingCard({ listing }) {
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
          <p className="text-[10px] text-white/45 mt-1 truncate">
            Listing Provided Courtesy of {listing.listingBrokerage} · {listing.mlsId}
          </p>
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
