import Image from 'next/image'
import Link from 'next/link'
import ParallaxBanner from '@/components/sections/ParallaxBanner'
import { Bed, Bath, Maximize2, ChevronRight } from 'lucide-react'
import { FEATURED_LISTINGS } from '@/lib/featured-listings'
import CTASection from '@/components/sections/CTASection'
import ShowingTrigger from '@/components/real-estate/ShowingTrigger'

export const metadata = {
  title: 'Featured Listings',
  description:
    'Exclusive and off-market properties represented by Victoria Sinclair — a curated portfolio of the finest homes in Beverly Hills, Bel Air, and Holmby Hills.',
}

const BADGE_STYLES = {
  'Exclusive Listing': 'bg-[#C9A96E] text-[#0A0A0A]',
  'Off-Market':        'bg-[#C9A96E]/70 text-[#0A0A0A]',
  'Coming Soon':       'bg-[#C9A96E]/55 text-[#0A0A0A]',
}

export default function FeaturedListingsPage() {
  const active = FEATURED_LISTINGS.filter(l => l.badge !== 'Sold')
  const [hero, ...rest] = active

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">

      {/* ── Page header ─────────────────────────────────────────── */}
      <ParallaxBanner src="/images/luxury-agent/xtra8.jpg" priority>
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-4 font-sans">
          Exclusively Represented
        </p>
        <h1 className="font-heading text-5xl lg:text-6xl font-normal text-white mb-5">
          Featured Listings
        </h1>
        <div className="w-12 h-px bg-[#C9A96E] mb-5" />
        <p className="text-white/45 font-sans text-base max-w-xl leading-relaxed">
          A hand-selected portfolio of off-market, exclusive, and coming-soon properties — available only through Victoria Sinclair.
        </p>
      </ParallaxBanner>

      {/* ── Hero listing ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28">
        <div className="group border border-white/[0.07] overflow-hidden hover:border-white/15 transition-colors grid lg:grid-cols-2 gap-0">

          {/* Image — links to detail */}
          <Link href={`/luxury-agent/featured-listings/${hero.id}`} className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] overflow-hidden block">
            <Image
              src={hero.image}
              alt={hero.address}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
            <div className="absolute top-6 left-6">
              <span className={`inline-block px-3 py-1.5 text-[9px] tracking-[0.25em] uppercase font-semibold ${BADGE_STYLES[hero.badge] ?? 'bg-white/15 text-white backdrop-blur-sm'}`}>
                {hero.badge}
              </span>
            </div>
          </Link>

          {/* Details */}
          <div className="bg-[#0D0D0D] p-8 lg:p-12 flex flex-col justify-center">
            <Link href={`/luxury-agent/featured-listings/${hero.id}`} className="block">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] mb-4 font-sans">
                {hero.city}, {hero.state}
              </p>
              <h2 className="font-heading text-3xl lg:text-4xl font-normal text-white mb-2 leading-snug">
                {hero.address}
              </h2>
              <p className="font-heading text-4xl lg:text-5xl text-white font-normal mb-6">
                ${hero.price.toLocaleString()}
              </p>

              <div className="flex items-center gap-6 text-sm text-white/40 font-sans mb-7 border-t border-white/[0.07] pt-6">
                <span className="flex items-center gap-2"><Bed      size={13} strokeWidth={1.5} />{hero.beds} Beds</span>
                <span className="flex items-center gap-2"><Bath     size={13} strokeWidth={1.5} />{hero.baths} Baths</span>
                <span className="flex items-center gap-2"><Maximize2 size={13} strokeWidth={1.5} />{hero.sqft.toLocaleString()} sqft</span>
              </div>

              <p className="text-white/50 text-sm leading-relaxed font-sans mb-8">
                {hero.description}
              </p>

              {/* Features */}
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-10">
                {hero.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/40 font-sans">
                    <span className="w-1 h-1 bg-[#C9A96E] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </Link>

            <ShowingTrigger listing={hero} className="self-start px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium bg-[#C9A96E] text-[#0A0A0A] hover:opacity-90 transition-opacity">
              Request a Private Showing
            </ShowingTrigger>
          </div>
        </div>
      </div>

      {/* ── Rest of listings ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 lg:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rest.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>

      {/* ── MLS callout ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="border border-white/[0.07] bg-[#0D0D0D] px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] mb-2 font-sans">
              Browse the Full Market
            </p>
            <h2 className="font-heading text-2xl lg:text-3xl text-white font-normal">
              Looking for more options?
            </h2>
            <p className="text-white/40 text-sm mt-1 font-sans">
              Search all active MLS listings across the greater Los Angeles area.
            </p>
          </div>
          <Link
            href="/luxury-agent/listings"
            className="flex-shrink-0 flex items-center gap-2 px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase border border-white/25 text-white/70 hover:border-white hover:text-white transition-all font-sans"
          >
            Browse Homes<ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <CTASection
        template="luxury-agent"
        background={{ image: '/images/luxury-agent/work-with-me.jpg' }}
        headline="Can't Find the Right Home?"
        subheadline="Victoria has access to an extensive network of off-market properties. Reach out for a private consultation."
        cta={{ label: 'Let\'s Connect', modal: true }}
      />
    </div>
  )
}

function ListingCard({ listing }) {
  return (
    <div className="group border border-white/[0.07] overflow-hidden flex flex-col hover:border-white/15 transition-colors">
      <Link href={`/luxury-agent/featured-listings/${listing.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={listing.image}
            alt={listing.address}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-2.5 py-1 text-[9px] tracking-[0.25em] uppercase font-semibold ${BADGE_STYLES[listing.badge] ?? 'bg-white/15 text-white backdrop-blur-sm'}`}>
              {listing.badge}
            </span>
          </div>
          <div className="absolute bottom-4 left-4">
            <p className="font-heading text-2xl text-white font-normal">
              ${listing.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#0D0D0D] p-6 pb-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] mb-1 font-sans">
            {listing.city}, {listing.state}
          </p>
          <h3 className="font-heading text-xl text-white font-normal mb-4">
            {listing.address}
          </h3>

          <div className="flex items-center gap-5 text-xs text-white/40 font-sans mb-5">
            <span className="flex items-center gap-1.5"><Bed      size={11} strokeWidth={1.5} />{listing.beds} Beds</span>
            <span className="flex items-center gap-1.5"><Bath     size={11} strokeWidth={1.5} />{listing.baths} Baths</span>
            <span className="flex items-center gap-1.5"><Maximize2 size={11} strokeWidth={1.5} />{listing.sqft.toLocaleString()} sqft</span>
          </div>

          <p className="text-white/45 text-sm leading-relaxed font-sans mb-5 line-clamp-3">
            {listing.description}
          </p>

          {/* Features row */}
          <div className="flex flex-wrap gap-2 mb-6">
            {listing.features.slice(0, 3).map(f => (
              <span key={f} className="px-2.5 py-1 text-[10px] border border-white/10 text-white/35 font-sans">
                {f}
              </span>
            ))}
            {listing.features.length > 3 && (
              <span className="px-2.5 py-1 text-[10px] text-white/20 font-sans">
                +{listing.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* CTA — outside Link to avoid nested interactive elements */}
      <div className="bg-[#0D0D0D] px-6 pb-6 flex items-center justify-between">
        <ShowingTrigger listing={listing} className="px-6 py-3 text-[11px] tracking-[0.2em] uppercase border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all font-sans">
          Request a Showing
        </ShowingTrigger>
        <Link
          href={`/luxury-agent/featured-listings/${listing.id}`}
          className="text-[10px] tracking-[0.2em] uppercase text-white/25 hover:text-white/60 transition-colors font-sans"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}
