import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square } from 'lucide-react'
import ModalTrigger from '@/components/ui/ModalTrigger'
import { FEATURED_LISTINGS } from './data'

export const metadata = {
  title: 'Featured Listings',
  description: "Browse the Hargrove Group's hand-picked active listings across Greater Houston — curated properties available for sale right now.",
}

export default function FeaturedListingsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=60"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-4 font-sans">
              Hand-Picked Properties
            </p>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              Featured Listings
            </h1>
            <div className="w-12 h-0.5 bg-white/30 mb-6" />
            <p className="text-white/60 text-lg font-sans leading-relaxed">
              A curated selection of active Houston properties — personally selected by the Hargrove Group for their value, location, and quality.
            </p>
          </div>
        </div>
      </div>

      {/* ── Listings Grid ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_LISTINGS.map((listing) => (
            <Link
              key={listing.slug}
              href={`/modern-team/featured-listings/${listing.slug}`}
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#1A2D5A]/6 transition-shadow duration-300 group block"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={listing.photos[0]}
                  alt={listing.address}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A2D5A]/85 backdrop-blur-sm text-white text-[12px] font-semibold rounded-md tracking-wide uppercase font-sans">
                  {listing.status}
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <h3
                  className="text-base font-bold text-[#111827] leading-snug mb-1"
                  style={{ fontFamily: 'var(--font-inter, system-ui)' }}
                >
                  {listing.address}
                </h3>
                <div className="flex items-center gap-1 text-sm text-[#6B7280] font-sans mb-4">
                  <MapPin size={12} className="flex-shrink-0 text-[#4B6090]" />
                  {listing.neighborhood}, Houston TX
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span
                    className="text-xl font-bold text-[#1A2D5A]"
                    style={{ fontFamily: 'var(--font-inter, system-ui)' }}
                  >
                    {listing.listPrice}
                  </span>
                  <span className="text-xs text-[#9CA3AF] font-sans">list price</span>
                </div>

                {/* Property facts */}
                <div className="flex items-center gap-4 text-sm text-[#4B5563] font-sans mb-4">
                  <span className="flex items-center gap-1.5">
                    <Bed size={13} className="text-[#4B6090]" />
                    {listing.beds} bd
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath size={13} className="text-[#4B6090]" />
                    {listing.baths} ba
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Square size={13} className="text-[#4B6090]" />
                    {listing.sqft} sf
                  </span>
                </div>

                {/* Meta row */}
                <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
                  <span className="text-[12px] px-2.5 py-1 rounded-full border border-[#D5DBE9] text-[#4B6090] font-sans">
                    {listing.type}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A2D5A] font-sans">
                    View Details <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA — Search All MLS Listings ────────────────────────── */}
      <section className="bg-[#EEF1F7] border-y border-[#D5DBE9] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-2xl lg:text-4xl font-bold text-[#111827]"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              Find Your Dream Home Today
            </h2>
            <p className="text-[#6B7280] text-sm font-sans mt-2">Browse Houston's latest active listings — updated daily from the MLS.</p>
          </div>
          <Link
            href="/modern-team/listings"
            className="flex-shrink-0 px-10 py-4 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-[#243870] transition-colors duration-200"
          >
            Browse Homes
          </Link>
        </div>
      </section>

      {/* ── Work With Us ─────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=80"
          alt=""
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#0F1E3E]/60" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 text-center py-20">
          <h2
            className="text-2xl lg:text-4xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-inter, system-ui)' }}
          >
            Let's Get Started in Houston Real Estate
          </h2>
          <div className="w-16 h-px bg-white/40 mx-auto mb-8" />
          <p className="text-white/70 text-base lg:text-lg font-sans leading-relaxed mb-10 max-w-xl mx-auto">
            Buying, selling, or just exploring your options — the Hargrove Group is here to give you honest guidance, local expertise, and the attentive service you deserve.
          </p>
          <ModalTrigger className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-white hover:text-[#1A2D5A] transition-all duration-300 cursor-pointer">
            Contact Us
          </ModalTrigger>
        </div>
      </section>

    </div>
  )
}
