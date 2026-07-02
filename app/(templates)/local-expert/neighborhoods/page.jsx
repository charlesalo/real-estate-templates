import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { resolveImageSrc } from '@/lib/sanity/image'
import { withFallback, formatCompactPrice } from '@/lib/sanity/utils'
import { getNeighborhoods, getSiteSettings } from '@/lib/sanity/queries'
import { NEIGHBORHOODS as NEIGHBORHOODS_FALLBACK } from '@/lib/local-expert-data'
import marquee from '../press-marquee.module.css'

export async function generateMetadata() {
  const settings = await getSiteSettings()
  const name = settings?.businessName ?? 'Nadia Osei'
  return {
    title: { absolute: `Comprehensive Guide to New York Neighborhoods | ${name}` },
    description: 'Explore Manhattan and Brooklyn neighborhoods: West Village, Tribeca, Upper East Side, Brooklyn Heights, DUMBO, Park Slope, SoHo, Chelsea, and beyond.',
  }
}

export default async function NeighborhoodsPage() {
  const neighborhoods = await getNeighborhoods()
  const NEIGHBORHOODS = withFallback(neighborhoods, NEIGHBORHOODS_FALLBACK).map((n) => ({
    ...n,
    slug: n.slug?.current ?? n.slug,
    borough: n.borough ?? n.region,
    image: resolveImageSrc(n.image),
    medianPrice: formatCompactPrice(n.medianPrice),
  }))
  const [lead, second, third, ...rest] = NEIGHBORHOODS
  const alsoInThisIssue = [second, third]

  return (
    <>
      {/* ─── Header ─── */}
      <section className="pt-[112px] pb-[96px] lg:pt-[144px] lg:pb-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Eyebrow with rule */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] whitespace-nowrap">
              Neighborhood Guides
            </span>
            <div className="h-px flex-1 bg-[#BEB7A9]" />
          </div>

          <h1
            className="text-[43px] lg:text-[58px] font-normal text-[#24180F] leading-[1.05] mb-5"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            The blocks, walked<br />
            <em className="text-[#1B3B2B]">one street at a time.</em>
          </h1>
          <p className="text-[16px] text-[#2C1E11]/50 max-w-xl leading-relaxed">
            Neighborhood guides across Manhattan and Brooklyn — each one researched,
            photographed and written in the field. The kind of intel Zillow won&apos;t give you.
          </p>
        </div>
      </section>

      {/* ─── IN THIS ISSUE — neighborhood marquee ─── */}
      <section style={{ backgroundColor: '#F3EDE3' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-[20px] lg:py-[26px]">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-7">
            <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] whitespace-nowrap text-center lg:text-left lg:shrink-0">
              In this issue —
            </span>
            {/* Seamless marquee — two copies of the list scroll as one loop.
                The duplicate copy is hidden from assistive tech and tabbing. */}
            <div className={marquee.viewport}>
              <div className={marquee.track}>
                {[...NEIGHBORHOODS, ...NEIGHBORHOODS].map((n, i) => {
                  const dup = i >= NEIGHBORHOODS.length
                  return (
                    <Link
                      key={`${n.slug}-${i}`}
                      href={`/local-expert/neighborhoods/${n.slug}`}
                      aria-hidden={dup || undefined}
                      tabIndex={dup ? -1 : undefined}
                      className={`${marquee.item} text-[12px] tracking-[0.28em] uppercase font-medium text-[#24180F] hover:text-[#BA5B3E] transition-colors whitespace-nowrap`}
                    >
                      {n.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── N° 01 · The lead story ─── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-10 lg:gap-20 items-center">
            <Link href={`/local-expert/neighborhoods/${lead.slug}`} className="group block">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={lead.image}
                  alt={lead.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </Link>

            <div>
              <p
                className="text-[14px] italic text-[#BA5B3E] mb-5"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                N&deg; 01 &middot; The lead story
              </p>

              <h2
                className="text-[40px] lg:text-[52px] font-normal text-[#24180F] leading-[1.05] mb-3"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                {lead.name}
              </h2>
              <p className="text-[12px] tracking-[0.22em] uppercase text-[#2C1E11]/65 mb-7">
                {[lead.borough, ...lead.vibes].join(' · ')}
              </p>

              <blockquote className="border-l-2 border-[#BA5B3E] pl-5 mb-6">
                <p
                  className="text-[20px] lg:text-[23px] italic text-[#24180F] leading-snug"
                  style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                >
                  &ldquo;{lead.quote}&rdquo;
                </p>
              </blockquote>

              <p className="text-[15px] text-[#2C1E11]/60 leading-relaxed max-w-md mb-8">{lead.tagline}</p>

              <div className="grid grid-cols-3 gap-6 max-w-md border-y border-[#BEB7A9]/60 py-5">
                <div>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#2C1E11]/45 mb-1">Median</p>
                  <p className="text-[22px] text-[#1B3B2B]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                    {lead.medianPrice}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#2C1E11]/45 mb-1">Walk Score</p>
                  <p className="text-[22px] text-[#1B3B2B]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                    {lead.walkScore}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#2C1E11]/45 mb-1">Guide</p>
                  <p className="text-[22px] text-[#1B3B2B]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                    {lead.guideMinutes} min
                  </p>
                </div>
              </div>

              <Link
                href={`/local-expert/neighborhoods/${lead.slug}`}
                className="inline-flex items-center gap-1.5 mt-7 text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors"
              >
                Read the {lead.name} guide <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Also in this issue — N° 02 & N° 03, staggered spread ─── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F2ECE1' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="mb-12 lg:mb-16">
            <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-3">Continued Coverage</p>
            <h2
              className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              Also in this issue
            </h2>
          </div>

          {alsoInThisIssue.map((n, i) => {
            const flip = i === 1
            return (
              <div key={n.slug}>
                {i > 0 && <div className="h-px bg-[#BEB7A9]/60 my-14 lg:my-20" />}
                <Link href={`/local-expert/neighborhoods/${n.slug}`} className="group block">
                  {/* Alternating rows: image left / text right, then mirrored.
                      Each pairing reads horizontally, so it stays unambiguous
                      mid-scroll. */}
                  <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className={cn('relative aspect-[3/2] rounded-2xl overflow-hidden', flip && 'lg:order-2')}>
                      <Image
                        src={n.image}
                        alt={n.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className={cn(flip && 'lg:order-1')}>
                      <p
                        className="text-[14px] italic text-[#BA5B3E] mb-4"
                        style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                      >
                        N&deg; 0{i + 2} &middot; {i === 0 ? 'The downtown dispatch' : 'The uptown dispatch'}
                      </p>
                      <h2
                        className="text-[26px] lg:text-[30px] font-normal text-[#24180F] mb-2"
                        style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                      >
                        {n.name}
                      </h2>
                      <p className="text-[11px] tracking-[0.22em] uppercase text-[#2C1E11]/65 mb-4">
                        {[n.borough, ...n.vibes].join(' · ')}
                      </p>
                      <p
                        className="text-[17px] lg:text-[18px] italic text-[#24180F] leading-snug"
                        style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                      >
                        &ldquo;{n.quote}&rdquo;
                      </p>
                      <div className="h-px bg-[#BEB7A9]/60 mt-5 mb-3" />
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] tracking-[0.18em] uppercase text-[#2C1E11]/65">
                          From {n.medianPrice} · {n.activeListings} listings
                        </p>
                        <ArrowRight size={14} className="text-[#2C1E11]/30 group-hover:text-[#BA5B3E] transition-colors" />
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── The Dossier — the rest of the issue, as an index list ─── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          {/* Section header */}
          <div>
            <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-3">The Dossier</p>
            <h2
              className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              The rest of the issue
            </h2>
          </div>
          <div className="h-px bg-[#BEB7A9]/60 mt-8" />

          {/* Index rows */}
          {rest.map((n, i) => (
            <Link
              key={n.slug}
              href={`/local-expert/neighborhoods/${n.slug}`}
              className="group block border-b border-[#BEB7A9]/40"
            >
              <article className="grid grid-cols-1 lg:grid-cols-[56px_340px_1fr_auto] items-center gap-5 lg:gap-10 py-8 lg:py-10">
                <span
                  className="hidden lg:block text-[26px] italic text-[#BA5B3E]"
                  style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                >
                  {String(i + 4).padStart(2, '0')}
                </span>
                <div className="relative aspect-[3/2] rounded-xl overflow-hidden">
                  <Image src={n.image} alt={n.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.22em] uppercase text-[#2C1E11]/55 mb-2">
                    {[n.borough, ...n.vibes].join(' · ')}
                  </p>
                  <h3
                    className="text-[26px] lg:text-[30px] font-normal text-[#24180F] mb-2 transition-colors group-hover:text-[#BA5B3E]"
                    style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                  >
                    {n.name}
                  </h3>
                  <p className="text-[14px] text-[#2C1E11]/60 leading-relaxed max-w-md">{n.tagline}</p>
                </div>
                <div className="lg:text-right">
                  <p className="text-[24px] text-[#1B3B2B]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                    {n.medianPrice}
                  </p>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-[#2C1E11]/55 mt-1">
                    Walk {n.walkScore} · {n.activeListings} listings
                  </p>
                </div>
              </article>
            </Link>
          ))}
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
