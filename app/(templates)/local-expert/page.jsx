import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Bed, Bath, Square } from 'lucide-react'
import DualSearchWidget from './DualSearchWidget'
import NeighborhoodMap from './NeighborhoodMap'
import MarketReportForm from './MarketReportForm'
import {
  AGENT,
  HERO_STATS,
  NEIGHBORHOODS,
  HOMEPAGE_LISTINGS,
  FIELD_NOTES,
  TESTIMONIAL,
  BLOG_POSTS,
} from '@/lib/local-expert-data'

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPrice(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`
  return `$${n.toLocaleString()}`
}

// ── Homepage ──────────────────────────────────────────────────────────────────

export const metadata = {
  title: 'Nadia Osei | Living in, Working in, and Loving New York',
  description:
    'Your guide to NYC\'s best neighborhoods — curated by Nadia Osei, a licensed NYC real estate broker who has called New York home for fourteen years.',
}

export default function LocalExpertHome() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative pt-[112px] pb-[80px] lg:pt-[144px] lg:pb-[112px] overflow-hidden"
        style={{ backgroundColor: '#F8F3EB' }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-12 lg:gap-10 items-center">

            {/* Left: editorial content */}
            <div>
              {/* Masthead label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-[#BA5B3E]/40" />
                <span className="text-[9px] tracking-[0.45em] uppercase text-[#BA5B3E] font-medium">
                  Vol. XIV · Autumn Edition
                </span>
                <div className="h-px w-8 bg-[#BA5B3E]/40" />
              </div>

              {/* Headline */}
              <h1
                className="text-[52px] lg:text-[66px] font-normal leading-[1.06] tracking-tight text-[#24180F] mb-6"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Living in,<br />
                working in,<br />
                and loving{' '}
                <em className="not-italic text-[#1B3B2B]" style={{ fontStyle: 'italic' }}>New York.</em>
              </h1>

              {/* Subheadline */}
              <p className="text-[17px] text-[#2C1E11]/60 leading-relaxed mb-8">
                Your master guide to the neighborhoods, culture, and homes of New York —
                curated, walked, and written by a local broker who has called this city
                home for fourteen years.
              </p>

              {/* Dual search widget */}
              <DualSearchWidget />

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-8 mt-10 pt-8 border-t border-[#1B3B2B]/10">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="text-[22px] font-bold text-[#24180F] leading-none"
                      style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-[#2C1E11]/40 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: editorial image */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1674328236131-04a5909d6a72?q=80&w=987&auto=format&fit=crop"
                  alt="New York brownstones"
                  fill
                  className="object-cover object-center"
                  priority
                />

                {/* Credential badge — top left */}
                <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm">
                  <p className="text-[8px] tracking-[0.3em] uppercase text-[#24180F]/40 mb-0.5">Licensed Broker</p>
                  <p className="text-[13px] font-normal text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                    NY DOS #{AGENT.license.replace('NY Lic# ', '')}
                  </p>
                </div>

                {/* Quote overlay — bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-gradient-to-t from-[#1F3A29]/90 via-[#1F3A29]/40 to-transparent">
                  <p
                    className="text-[15px] italic text-white/90 leading-snug mb-2"
                    style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                  >
                    &ldquo;Perry Street, just past Bleecker — the loveliest block I show all year.&rdquo;
                  </p>
                  <p className="text-[8px] tracking-[0.3em] uppercase text-white/40">Field Note · West Village</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ─── AS FEATURED IN ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F3EDE3' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-[24px] lg:py-[32px]">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-6 gap-y-2">
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#BA5B3E] whitespace-nowrap">
              As featured in —
            </span>
            {[
              'The New York Times',
              'Curbed NY',
              'Architectural Digest',
              'Dwell',
              'Brick Underground',
              'Time Out New York',
              'REBNY Member',
            ].map((pub) => (
              <span
                key={pub}
                className="text-[9px] tracking-[0.28em] uppercase font-medium text-[#24180F]/55 whitespace-nowrap"
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CHAPTER ONE: NEIGHBORHOOD GRID ──────────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F4F0EA' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          {/* Chapter label */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#BA5B3E]">Chapter One</span>
          </div>

          <div className="flex items-end justify-between gap-4 mb-3">
            <h2
              className="text-[32px] lg:text-[42px] font-normal text-[#24180F] leading-tight"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              The Neighborhood Grid
            </h2>
            <Link
              href="/local-expert/neighborhoods"
              className="hidden md:flex items-center gap-1.5 text-[12px] font-semibold text-[#2C1E11]/50 hover:text-[#2C1E11] transition-colors whitespace-nowrap"
            >
              All 38 neighborhoods <ArrowRight size={13} />
            </Link>
          </div>

          <p className="text-[15px] text-[#2C1E11]/50 max-w-xl mb-10">
            Have a block in mind or look at the map. Click it for the market, the schools, the corner
            bakery — the things Zillow won&apos;t tell you.
          </p>

          <NeighborhoodMap neighborhoods={NEIGHBORHOODS} />

          <Link
            href="/local-expert/neighborhoods"
            className="flex md:hidden items-center gap-1.5 text-[12px] font-semibold text-[#2C1E11]/50 hover:text-[#2C1E11] transition-colors mt-6"
          >
            All 38 neighborhoods <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ─── CHAPTER TWO: FIELD NOTES ────────────────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-20">

            {/* Sticky label column */}
            <div className="lg:pt-1">
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#BA5B3E]">Chapter Two</span>
              <h2
                className="text-[32px] lg:text-[42px] font-normal text-[#24180F] leading-tight mt-2"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Nadia&apos;s Field Notes
              </h2>
              <p className="text-[15px] text-[#2C1E11]/50 leading-relaxed mt-4">
                Forty-four notebooks. Fourteen years. The cafes, parks, bookstores, and quiet bars
                that make a New York address feel like home. None of this is sponsored. All of it
                is walked.
              </p>
              <Link
                href="/local-expert/field-notes"
                className="inline-flex items-center gap-1.5 mt-5 text-[12px] font-semibold text-[#2C1E11] hover:opacity-60 transition-opacity"
              >
                Browse all notes <ArrowRight size={13} />
              </Link>
            </div>

            {/* Field notes grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {FIELD_NOTES.map((note, i) => (
                <article
                  key={note.id}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer ${i === 0 || i === 3 ? 'md:col-span-1' : ''}`}
                  style={{ aspectRatio: i % 3 === 1 ? '3/4' : '4/3' }}
                >
                  <Image
                    src={note.image}
                    alt={note.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-[8px] tracking-[0.3em] uppercase text-white/50 mb-1">{note.category}</div>
                    <p className="text-[13px] font-bold text-white leading-snug" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                      {note.name}
                    </p>
                    <p className="text-[10px] text-white/60 mt-0.5">{note.location}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER THREE: CURATED LOCAL HOMES ──────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F4F0EA' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="flex items-end justify-between gap-4 mb-2">
            <div>
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#BA5B3E]">Chapter Three</span>
              <h2
                className="text-[32px] lg:text-[42px] font-normal text-[#24180F] leading-tight mt-2"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Curated Local Homes
              </h2>
            </div>
            <Link
              href="/local-expert/listings"
              className="hidden md:flex items-center gap-1.5 text-[12px] font-semibold text-[#2C1E11]/50 hover:text-[#2C1E11] transition-colors whitespace-nowrap"
            >
              View all 37 active listings <ArrowRight size={13} />
            </Link>
          </div>

          <p className="text-[14px] text-[#2C1E11]/40 mb-10 max-w-lg">
            Homes in neighborhoods I know block by block. Not just listed here — actually considered.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOMEPAGE_LISTINGS.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {/* Compliance footer */}
          <p className="text-[10px] text-[#2C1E11]/30 mt-8 leading-relaxed">
            All listing information is deemed reliable but not guaranteed and should be independently reviewed
            and verified. All properties are subject to prior sale or withdrawal. Equal Housing Opportunity.
            Compass is a licensed real estate broker. NY Lic# 109802832.
          </p>

          <Link
            href="/local-expert/listings"
            className="flex md:hidden items-center gap-1.5 text-[12px] font-semibold text-[#2C1E11]/50 hover:text-[#2C1E11] transition-colors mt-6"
          >
            View all 37 active listings <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ─── MARKET REPORT CTA ────────────────────────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#1B3B2B' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">

            {/* Left: copy */}
            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#8B9E8B] mb-4">The Insider Edition</p>
              <h2
                className="text-[32px] lg:text-[42px] font-normal text-[#F8F3EB] leading-tight mb-6"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Get the real local<br />market report.
              </h2>
              <p className="text-[15px] text-[#F8F3EB]/55 mb-6 leading-relaxed">
                Plug your block. We&apos;ll send you a beautifully designed, hand-annotated PDF on your exact
                neighborhood — median prices, days on market, recent comps, and what a specific unit is
                actually worth. Built monthly. Never generic.
              </p>
              <ul className="space-y-2.5">
                {[
                  'Median sale and ask price by building type',
                  'Off-market intel curated by building type',
                  'Days on market vs. borough average',
                  'School catchment & local score cards',
                  'Relocation & co-op board tips',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-[#F8F3EB]/55">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B9E8B] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form */}
            <MarketReportForm />
          </div>
        </div>
      </section>

      {/* ─── ABOUT NADIA ──────────────────────────────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-start">

            {/* Agent photo */}
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={AGENT.photo}
                  alt={AGENT.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Agent credential card */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl p-4" style={{ backgroundColor: '#F8F3EB/95', backdropFilter: 'blur(8px)', backgroundColor: 'rgba(249,246,240,0.95)' }}>
                <p className="text-[13px] font-bold text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                  {AGENT.name}
                </p>
                <p className="text-[10px] text-[#24180F]/50 mt-0.5">{AGENT.title}</p>
                <p className="text-[10px] text-[#2C1E11]/40 mt-0.5">{AGENT.brokerage}</p>
              </div>
            </div>

            {/* Bio content */}
            <div className="lg:pt-4">
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-4">A Note from the Agent</p>
              <h2
                className="text-[32px] lg:text-[42px] font-normal text-[#24180F] leading-tight mb-8"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                I don&apos;t sell apartments.<br />
                I introduce people to blocks.
              </h2>

              <div className="space-y-5">
                {AGENT.bio.map((para, i) => (
                  <p key={i} className="text-[15px] text-[#2C1E11]/65 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/local-expert/contact"
                  className="px-6 py-3 text-[13px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors"
                >
                  Book a 30-minute call
                </Link>
                <Link
                  href="/local-expert/about"
                  className="px-6 py-3 text-[13px] font-bold rounded-full border border-[#1B3B2B]/20 text-[#2C1E11] hover:bg-[#1B3B2B]/5 transition-colors"
                >
                  Read my story
                </Link>
              </div>

              {/* Testimonial pull quote */}
              <div className="mt-10 pt-8 border-t border-[#1B3B2B]/10">
                <blockquote>
                  <p
                    className="text-[17px] italic text-[#24180F]/70 leading-relaxed"
                    style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                  >
                    &ldquo;{TESTIMONIAL.quote}&rdquo;
                  </p>
                  <footer className="mt-4">
                    <p className="text-[12px] font-semibold text-[#2C1E11]">{TESTIMONIAL.author}</p>
                    <p className="text-[11px] text-[#2C1E11]/40">{TESTIMONIAL.location}</p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ─────────────────────────────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F4F0EA' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#BA5B3E]">From the Journal</span>
              <h2
                className="text-[32px] font-normal text-[#24180F] mt-1"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Recent Writing
              </h2>
            </div>
            <Link
              href="/local-expert/blog"
              className="text-[12px] font-semibold text-[#2C1E11]/40 hover:text-[#2C1E11] transition-colors"
            >
              All articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/local-expert/blog/${post.slug}`}>
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#BA5B3E] mb-1">{post.category}</p>
                  <h3
                    className="text-[18px] font-normal text-[#24180F] leading-snug group-hover:opacity-60 transition-opacity"
                    style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-[12px] text-[#2C1E11]/50 mt-2 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-[10px] text-[#2C1E11]/30 mt-3">{post.readMinutes} min read</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT TEASER ───────────────────────────────────────────── */}
      <section
        className="py-[96px] lg:py-[128px]"
        style={{ backgroundColor: '#F8F3EB', borderTop: '1px solid rgba(27,59,43,0.08)' }}
      >
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-4">A Note from Nadia</p>
          <h2
            className="text-[32px] lg:text-[42px] font-normal text-[#24180F] leading-tight mb-5"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            The right home in New York is a feeling.<br />Let&apos;s find yours.
          </h2>
          <p className="text-[15px] text-[#2C1E11]/50 mb-8 max-w-md mx-auto leading-relaxed">
            Not sure where to start? Tell me what you&apos;re looking for — or what you&apos;re running from.
            I know this city. I&apos;ll help.
          </p>
          <Link
            href="/local-expert/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors"
          >
            Start the conversation <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  )
}

// ── Listing Card ──────────────────────────────────────────────────────────────

function ListingCard({ listing }) {
  return (
    <Link href={`/local-expert/listings/${listing.id}`} className="group block">
      <article className="rounded-xl overflow-hidden border border-[#E5E0D8] bg-white/60">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={listing.images[0]}
            alt={listing.address}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-[#2C1E11]">
              {listing.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div
            className="text-[22px] font-normal text-[#24180F] leading-none mb-1"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            {formatPrice(listing.price)}
          </div>
          <p className="text-[13px] font-semibold text-[#2C1E11]">{listing.address}</p>
          <p className="text-[11px] text-[#2C1E11]/45 mt-0.5">{listing.neighborhood}, {listing.city}</p>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#E5E0D8]">
            <span className="flex items-center gap-1 text-[11px] text-[#2C1E11]/50">
              <Bed size={12} /> {listing.beds} bd
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[#2C1E11]/50">
              <Bath size={12} /> {listing.baths} ba
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[#2C1E11]/50">
              <Square size={12} /> {listing.sqft.toLocaleString()} sf
            </span>
          </div>

          {/* NY Compliance */}
          <p className="text-[9px] text-[#2C1E11]/25 mt-2.5 leading-snug">
            Listing Provided Courtesy of {listing.listingBrokerage} · {listing.mlsId}
          </p>
        </div>
      </article>
    </Link>
  )
}
