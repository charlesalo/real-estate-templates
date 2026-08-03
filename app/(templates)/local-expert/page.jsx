import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Bed, Bath, Square } from 'lucide-react'
import DualSearchWidget from './_components/DualSearchWidget'
import HeroStats from './_components/HeroStats'
import NeighborhoodMapClient from './_components/maps/NeighborhoodMapClient'
import MarketReportForm from './_components/MarketReportForm'
import PortableText from '@/components/sanity/PortableText'
import marquee from './press-marquee.module.css'
import { resolveImageSrc } from '@/lib/sanity/image'
import { withFallback, isPortableText, toExcerpt, formatCompactPrice } from '@/lib/sanity/utils'
import {
  getAgent,
  getNeighborhoods,
  getFieldNotes,
  getTestimonials,
  getPosts,
} from '@/lib/sanity/queries'
import {
  AGENT as AGENT_FALLBACK,
  HERO_STATS,
  NEIGHBORHOODS as NEIGHBORHOODS_FALLBACK,
  HOMEPAGE_LISTINGS,
  FIELD_NOTES as FIELD_NOTES_FALLBACK,
  TESTIMONIAL as TESTIMONIAL_FALLBACK,
  BLOG_POSTS as BLOG_POSTS_FALLBACK,
} from '@/lib/local-expert-data'

// Title and description come from the template layout; this page only needs to
// claim its own canonical so it isn't left without one.
export const metadata = {
  alternates: { canonical: '/local-expert' },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPrice(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`
  return `$${n.toLocaleString()}`
}

const PRESS = [
  'The New York Times',
  'Curbed NY',
  'Architectural Digest',
  'Dwell',
  'Brick Underground',
  'Time Out New York',
  'REBNY Member',
]

// ── Homepage ──────────────────────────────────────────────────────────────────

export default async function LocalExpertHome() {
  const [agentDoc, neighborhoods, fieldNotes, testimonials, posts] = await Promise.all([
    getAgent(),
    getNeighborhoods(),
    getFieldNotes(),
    getTestimonials(),
    getPosts(),
  ])

  const agent = agentDoc ? { ...AGENT_FALLBACK, ...agentDoc } : AGENT_FALLBACK
  const heroStats = withFallback(agent.heroStats, HERO_STATS)
  // NeighborhoodMap.jsx expects plain strings for image/slug/borough/description
  // (it slices description and uses slug as a lookup key), so normalize Sanity's
  // richer field shapes down to what that component already renders.
  const NEIGHBORHOODS = withFallback(neighborhoods, NEIGHBORHOODS_FALLBACK).map((n) => ({
    ...n,
    slug: n.slug?.current ?? n.slug,
    borough: n.borough ?? n.region,
    image: resolveImageSrc(n.image),
    medianPrice: formatCompactPrice(n.medianPrice),
    description: toExcerpt(n.description),
  }))
  const FIELD_NOTES = withFallback(fieldNotes, FIELD_NOTES_FALLBACK).map((n) => ({
    ...n,
    image: resolveImageSrc(n.image),
  }))
  const TESTIMONIAL = withFallback(testimonials, [TESTIMONIAL_FALLBACK])[0]
  const BLOG_POSTS = withFallback(posts, BLOG_POSTS_FALLBACK)
    .slice(0, 3)
    .map((p) => ({ ...p, slug: p.slug?.current ?? p.slug, image: resolveImageSrc(p.image) }))

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative pt-[112px] pb-[96px] lg:pt-[144px] lg:pb-[128px] overflow-hidden"
        style={{ backgroundColor: '#F8F3EB' }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-12 lg:gap-10 items-center">

            {/* Left: editorial content */}
            <div>
              {/* Masthead label */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[12px] tracking-[0.45em] uppercase text-[#BA5B3E] font-medium whitespace-nowrap">
                  Vol. XIV · Autumn Edition
                </span>
                <div className="h-px flex-1 bg-[#BEB7A9]" />
              </div>

              {/* Headline */}
              <h1
                className="text-[56px] lg:text-[70px] font-normal leading-[1.06] tracking-tight text-[#24180F] mb-6"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Living in,<br />
                working in,<br />
                and loving{' '}
                <em className="not-italic text-[#1B3B2B]" style={{ fontStyle: 'italic' }}>New York.</em>
              </h1>

              {/* Subheadline */}
              <p className="text-[18px] text-[#2C1E11]/60 leading-relaxed mb-8">
                Your master guide to the neighborhoods, culture, and homes of New York —
                curated, walked, and written by a local broker who has called this city
                home for fourteen years.
              </p>

              {/* Dual search widget */}
              <DualSearchWidget />

              {/* Fair Housing */}
              <p className="mt-6 text-[12px] text-[#2C1E11]/40">
                Every showing, every block, every borough — committed to all applicable{' '}
                <a
                  href="https://www.dos.ny.gov/licensing/docs/FairHousingNotice_new.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#2C1E11]/80 hover:text-[#BA5B3E] transition-colors"
                >
                  Fair Housing Laws.
                </a>
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:flex lg:flex-wrap lg:items-center lg:gap-8 mt-6 pt-8 border-t border-[#1B3B2B]/10">
                <HeroStats stats={heroStats} />
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


                {/* Quote overlay — bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-gradient-to-t from-[#1F3A29]/90 via-[#1F3A29]/40 to-transparent">
                  <p
                    className="text-[16px] italic text-white/90 leading-snug mb-2"
                    style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                  >
                    &ldquo;Perry Street, just past Bleecker — the loveliest block I show all year.&rdquo;
                  </p>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/40">Field Note · West Village</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ─── AS FEATURED IN ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F3EDE3' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-[20px] lg:py-[26px]">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-7">
            <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] whitespace-nowrap text-center lg:text-left lg:shrink-0">
              As featured in —
            </span>
            {/* Seamless logo marquee — two copies of PRESS scroll as one loop */}
            <div className={marquee.viewport}>
              <div className={marquee.track}>
                {[...PRESS, ...PRESS].map((pub, i) => (
                  <span
                    key={i}
                    aria-hidden={i >= PRESS.length || undefined}
                    className={`${marquee.item} text-[12px] tracking-[0.28em] uppercase font-medium text-[#24180F]/55 whitespace-nowrap`}
                  >
                    {pub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER ONE: NEIGHBORHOOD GRID ──────────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          {/* Chapter label */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E]">Chapter One</span>
          </div>

          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <h2
                className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight mb-3"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                The blocks, walked<br />
                <em className="text-[#1B3B2B]">one street at a time.</em>
              </h2>
              <p className="text-[16px] text-[#2C1E11]/50 max-w-2xl">
                Not just pins on a map — neighborhoods I&apos;ve walked and sold in for fourteen years.
                Tap any one to see the market, the culture, and the corners worth knowing.
              </p>
            </div>
            <Link
              href="/local-expert/neighborhoods"
              className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors whitespace-nowrap"
            >
              View All Neighborhoods <ArrowRight size={13} />
            </Link>
          </div>

          <NeighborhoodMapClient neighborhoods={NEIGHBORHOODS} />

          <Link
            href="/local-expert/neighborhoods"
            className="flex md:hidden items-center gap-1.5 text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors mt-6"
          >
            View All Neighborhoods <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ─── CHAPTER TWO: FIELD NOTES ────────────────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F2ECE1' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-20">

            {/* Sticky label column */}
            <div className="lg:pt-1">
              <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E]">Chapter Two</span>
              <h2
                className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight mt-2"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Nadia&apos;s Field Notes
              </h2>
              <p className="text-[16px] text-[#2C1E11]/50 leading-relaxed mt-4">
                Forty-four notebooks. Fourteen years. The cafes, parks, bookstores, and quiet bars
                that make a New York address feel like home. None of this is sponsored. All of it
                is walked.
              </p>
              <Link
                href="/local-expert/field-notes"
                className="inline-flex items-center gap-1.5 mt-5 text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors"
              >
                Browse all notes <ArrowRight size={13} />
              </Link>
            </div>

            {/* Field notes masonry grid — mobile: 2-col uniform, desktop: 3-col variable */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {FIELD_NOTES.map((note) => (
                <NoteCard key={note.id} note={note} aspectRatio="4/5" />
              ))}
            </div>
            <div className="hidden md:grid md:grid-cols-3 gap-4">
              {/* Left column: portrait top, bottom grows to align with middle */}
              <div className="flex flex-col gap-4">
                <NoteCard note={FIELD_NOTES[0]} aspectRatio="3/4" />
                <NoteCard note={FIELD_NOTES[3]} className="flex-1" />
              </div>
              {/* Middle column: square + tall portrait (sets the row height) */}
              <div className="flex flex-col gap-4">
                <NoteCard note={FIELD_NOTES[1]} aspectRatio="1/1" />
                <NoteCard note={FIELD_NOTES[4]} aspectRatio="2/3" />
              </div>
              {/* Right column: portrait top, bottom grows to align with middle */}
              <div className="flex flex-col gap-4">
                <NoteCard note={FIELD_NOTES[2]} aspectRatio="3/4" />
                <NoteCard note={FIELD_NOTES[5]} className="flex-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER THREE: CURATED LOCAL HOMES ──────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E]">Chapter Three</span>
              <h2
                className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight mt-2 mb-3"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Curated Local Homes
              </h2>
              <p className="text-[15px] text-[#2C1E11]/40 max-w-lg">
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
            <HeroListingCard listing={HOMEPAGE_LISTINGS[0]} />
            <div className="flex flex-col gap-3 h-full">
              <SideListingCard listing={HOMEPAGE_LISTINGS[1]} />
              <SideListingCard listing={HOMEPAGE_LISTINGS[2]} />
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

      {/* ─── MARKET REPORT CTA ────────────────────────────────────────── */}
      <MarketReportForm />

      {/* ─── ABOUT NADIA ──────────────────────────────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-24 items-start">

            {/* Agent photo + caption */}
            <div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={resolveImageSrc(agent.photo)}
                  alt={agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-[12px] tracking-[0.28em] uppercase text-[#2C1E11]/50 mt-4 leading-relaxed">
                {agent.name} · Licensed Associate Real Estate Broker · NY DOS #{agent.license?.replace('NY Lic# ', '')}
              </p>
            </div>

            {/* Bio content */}
            <div className="lg:pt-2">
              <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-5">A Note from the Broker</p>

              <h2
                className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight mb-8"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                I don&apos;t sell apartments.<br />
                <em className="text-[#1B3B2B] lg:whitespace-nowrap">I introduce people to blocks.</em>
              </h2>

              <div className="space-y-5 mb-8 [&_p]:text-[16px] [&_p]:text-[#2C1E11]/60 [&_p]:leading-relaxed">
                {isPortableText(agent.bio) ? (
                  <PortableText value={agent.bio} />
                ) : (
                  agent.bio.map((para, i) => <p key={i}>{para}</p>)
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/local-expert/contact"
                  className="px-6 py-3 text-[14px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors min-w-[170px] text-center"
                >
                  Book a 20-minute call
                </Link>
                <Link
                  href="/local-expert/field-notes"
                  className="px-6 py-3 text-[14px] font-bold rounded-full border border-[#1B3B2B]/30 text-[#1B3B2B]/70 bg-transparent hover:border-[#1B3B2B]/60 hover:text-[#1B3B2B] transition-all min-w-[170px] text-center"
                >
                  Read my story
                </Link>
              </div>

              {/* Testimonial — left-bordered blockquote */}
              <blockquote className="mt-12 pl-6 border-l-2 border-[#BA5B3E]">
                <p
                  className="text-[19px] italic text-[#24180F]/70 leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                >
                  &ldquo;{TESTIMONIAL.quote}&rdquo;
                </p>
                <footer>
                  <p className="text-[12px] tracking-[0.3em] uppercase text-[#2C1E11]/40">
                    — {TESTIMONIAL.author}, {TESTIMONIAL.location}
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ─────────────────────────────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F2ECE1' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E]">From the Journal</span>
              <h2
                className="text-[34px] lg:text-[45px] font-normal text-[#24180F] mt-1 mb-3"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Recent Writing
              </h2>
              <p className="text-[16px] text-[#2C1E11]/50 max-w-xl">
                No fluff, no sponsorships — market shifts, neighborhood deep-dives, and the honest
                takes I&apos;d give a friend buying or selling in New York.
              </p>
            </div>
            <Link
              href="/local-expert/blog"
              className="hidden md:block text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors whitespace-nowrap"
            >
              View all articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 md:mb-0">
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
                  <p className="text-[12px] tracking-[0.3em] uppercase text-[#BA5B3E] mb-1">{post.category}</p>
                  <h3
                    className="text-[19px] font-normal text-[#24180F] leading-snug group-hover:text-[#BA5B3E] transition-colors"
                    style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-[13px] text-[#2C1E11]/50 mt-2 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-[12px] text-[#2C1E11]/40 mt-3">{post.readMinutes} min read</p>
                </Link>
              </article>
            ))}
          <Link
            href="/local-expert/blog"
            className="flex md:hidden items-center gap-1.5 text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors"
          >
            View all articles <ArrowRight size={13} />
          </Link>
          </div>
        </div>
      </section>

      {/* ─── CONTACT TEASER ───────────────────────────────────────────── */}
      <section className="relative py-[120px] lg:py-[168px] overflow-hidden">
        {/* Full-bleed background */}
        <Image
          src="https://images.unsplash.com/photo-1440613905118-99b921706b5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Dumbo Manhattan Bridge"
          fill
          className="object-cover object-center"
        />
        {/* Dark green overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.38)' }} />

        {/* Content */}
        <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-[12px] tracking-[0.4em] uppercase text-white mb-4">Let&apos;s Work Together</p>
          <h2
            className="text-[34px] lg:text-[45px] font-normal text-[#F8F3EB] leading-tight mb-5"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            The right home<br className="sm:hidden" /> is a feeling.<br />I know how to find it.
          </h2>
          <p className="text-[16px] text-white/80 mb-8 max-w-md mx-auto leading-relaxed">
            Not sure where to start? Tell me what you&apos;re looking for — or what you&apos;re running from.
            I know this city. I&apos;ll help.
          </p>
          <Link
            href="/local-expert/contact"
            className="inline-flex items-center px-8 py-3.5 text-[14px] font-bold rounded-full bg-[#F8F3EB] text-[#1B3B2B] hover:bg-white transition-colors"
          >
            Start the conversation
          </Link>
        </div>
      </section>
    </>
  )
}

// ── Note Card ─────────────────────────────────────────────────────────────────

function NoteCard({ note, aspectRatio, className = '' }) {
  return (
    <article
      className={`group relative rounded-xl overflow-hidden cursor-pointer ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={note.image}
        alt={note.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-[9px] tracking-[0.3em] uppercase text-white/50 mb-1">{note.category}</div>
        <p className="text-[14px] font-bold text-white leading-snug" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
          {note.name}
        </p>
        <p className="text-[12px] text-white/60 mt-0.5">{note.location}</p>
      </div>
    </article>
  )
}

// ── Listing Card ──────────────────────────────────────────────────────────────

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
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
