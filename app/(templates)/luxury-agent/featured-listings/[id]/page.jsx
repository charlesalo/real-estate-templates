import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Bed, Bath, Maximize2, ChevronLeft } from 'lucide-react'
import { ALL_AGENT_LISTINGS } from '@/lib/featured-listings'
import CTASection from '@/components/sections/CTASection'
import MortgageCalculator from '@/components/lead-tools/MortgageCalculator'
import PropertyMap from '@/components/real-estate/PropertyMap'
import ListingActions from '@/components/real-estate/ListingActions'
import ModalTrigger from '@/components/ui/ModalTrigger'

export async function generateStaticParams() {
  return ALL_AGENT_LISTINGS.map(l => ({ id: l.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const listing = ALL_AGENT_LISTINGS.find(l => l.id === id)
  if (!listing) return {}
  return {
    title: listing.address,
    description: listing.description,
  }
}

const BADGE_STYLES = {
  'Exclusive Listing': 'bg-[#C9A96E] text-[#0A0A0A]',
  'Off-Market':        'bg-[#C9A96E]/70 text-[#0A0A0A]',
  'Coming Soon':       'bg-[#C9A96E]/55 text-[#0A0A0A]',
}

export default async function FeaturedListingDetailPage({ params }) {
  const { id } = await params
  const listing = ALL_AGENT_LISTINGS.find(l => l.id === id)
  if (!listing) notFound()

  const others = ALL_AGENT_LISTINGS.filter(l => l.id !== id && l.badge !== 'Sold').slice(0, 3)

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">

      {/* ── Hero image ─────────────────────────────────────────────── */}
      <div className="relative h-[55vh] lg:h-[70vh] overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.address}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent" />

        {/* Badge */}
        <div className="absolute top-8 left-6 lg:left-10">
          <span className={`inline-block px-3 py-1.5 text-[9px] tracking-[0.25em] uppercase font-semibold ${BADGE_STYLES[listing.badge] ?? 'bg-white/15 text-white backdrop-blur-sm'}`}>
            {listing.badge}
          </span>
        </div>

        {/* Back link */}
        <div className="absolute top-8 right-6 lg:right-10">
          <Link
            href="/luxury-agent/featured-listings"
            className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors font-sans"
          >
            <ChevronLeft size={13} strokeWidth={1.5} />
            All Listings
          </Link>
        </div>
      </div>

      {/* ── Property info ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-12 relative z-10">
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">

          {/* Left: details */}
          <div>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#C9A96E] mb-3 font-sans">
              {listing.city}, {listing.state} {listing.zip}
            </p>
            <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white mb-4 leading-tight">
              {listing.address}
            </h1>
            <p className="font-heading text-4xl lg:text-5xl font-normal text-white mb-8">
              ${listing.price.toLocaleString()}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 py-6 border-t border-b border-white/[0.07] mb-10">
              {listing.beds  != null && <Stat icon={<Bed  size={14} strokeWidth={1.5} />} value={listing.beds}  label="Bedrooms" />}
              {listing.baths != null && <Stat icon={<Bath size={14} strokeWidth={1.5} />} value={listing.baths} label="Bathrooms" />}
              {listing.sqft  != null && <Stat icon={<Maximize2 size={14} strokeWidth={1.5} />} value={`${listing.sqft.toLocaleString()} sqft`} label="Interior" />}
              {listing.lotSqft != null && <Stat icon={<Maximize2 size={14} strokeWidth={1.5} />} value={`${listing.lotSqft.toLocaleString()} sqft`} label="Lot Size" />}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-heading text-xl font-normal text-white mb-4">About This Property</h2>
              <p className="text-white/55 text-base leading-relaxed font-sans">
                {listing.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-10">
              <h2 className="font-heading text-xl font-normal text-white mb-5">Property Features</h2>
              <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                {listing.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/50 font-sans">
                    <span className="w-1.5 h-px bg-[#C9A96E] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Property map */}
            <div className="pt-8 border-t border-white/[0.07]">
              <h2 className="font-heading text-xl font-normal text-white mb-6">Property Location</h2>
              <PropertyMap
                address={`${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`}
                label={listing.address}
              />
            </div>

            {/* Mortgage calculator — active listings only */}
            {listing.badge !== 'Sold' && (
              <div className="pt-8 border-t border-white/[0.07]">
                <h2 className="font-heading text-xl font-normal text-white mb-6">Mortgage Calculator</h2>
                <MortgageCalculator template="luxury-agent" defaultPrice={listing.price} />
              </div>
            )}
          </div>

          {/* Right: sticky inquiry card */}
          <div className="lg:sticky lg:top-28">
            <div className="border border-white/[0.08] bg-[#0D0D0D] p-8">
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#C9A96E] font-sans mb-1">
                Listed By
              </p>
              <p className="font-heading text-lg text-white mb-1">Victoria Sinclair</p>
              <p className="text-white/35 text-xs font-sans mb-7">
                Luxury Real Estate Specialist · DRE# 01234567
              </p>

              <div className="w-full h-px bg-white/[0.07] mb-7" />

              <p className="text-white/45 text-sm font-sans leading-relaxed mb-7">
                {listing.badge === 'Sold'
                  ? 'This property has been sold. Contact Victoria to find similar available properties.'
                  : `This is an ${listing.badge.toLowerCase()} property. Contact Victoria for full details, disclosures, and to schedule a private tour.`}
              </p>

              {listing.badge === 'Sold' ? (
                <ModalTrigger className="w-full block text-center py-3.5 border border-white/15 text-white/50 text-[11px] tracking-[0.2em] uppercase font-sans hover:border-white/40 hover:text-white transition-all">
                  Contact Victoria
                </ModalTrigger>
              ) : (
                <ListingActions
                  propertyImage={listing.image}
                  propertyAddress={`${listing.address}, ${listing.city}, ${listing.state}`}
                  propertyPrice={listing.price}
                  propertyBadge={listing.badge}
                />
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── More listings ──────────────────────────────────────────── */}
      {others.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 mt-10 border-t border-white/[0.06]">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-heading text-2xl font-normal text-white">More Exclusive Properties</h2>
            <Link
              href="/luxury-agent/featured-listings"
              className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors font-sans"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map(l => (
              <Link key={l.id} href={`/luxury-agent/featured-listings/${l.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <Image src={l.image} alt={l.address} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-block px-2 py-1 text-[9px] tracking-[0.2em] uppercase font-semibold ${BADGE_STYLES[l.badge] ?? 'bg-white/15 text-white backdrop-blur-sm'}`}>{l.badge}</span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <p className="font-heading text-xl text-white">${l.price.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-sm text-white/65 group-hover:text-white transition-colors font-sans">{l.address}</p>
                <p className="text-xs text-white/30 mt-0.5 font-sans">{l.city}, {l.state}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <CTASection
        template="luxury-agent"
        background={{ image: '/images/luxury-agent/work-with-me.jpg' }}
        headline="Looking for Something Not Listed?"
        subheadline="Victoria has access to an extensive network of off-market properties. Reach out for a private consultation."
        cta={{ label: 'Let\'s Connect', modal: true }}
      />
    </div>
  )
}

function Stat({ icon, value, label }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-[#C9A96E]/60">{icon}</div>
      <p className="font-heading text-xl text-white font-normal">{value}</p>
      <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-sans">{label}</p>
    </div>
  )
}
