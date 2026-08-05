import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HeroStats from '../_components/HeroStats'
import { HeroListingCard, SideListingCard } from '../_components/listings/ListingCards'
import ContactTeaser from '../_components/sections/ContactTeaser'
import PortableText from '@/components/sanity/PortableText'
import { resolveImageSrc } from '@/lib/sanity/image'
import { withFallback, isPortableText } from '@/lib/sanity/utils'
import { getAgent, getTestimonials } from '@/lib/sanity/queries'
import {
  AGENT as AGENT_FALLBACK,
  HERO_STATS,
  HOMEPAGE_LISTINGS,
  TESTIMONIAL as TESTIMONIAL_FALLBACK,
} from '@/lib/local-expert-data'

export async function generateMetadata() {
  const agentDoc = await getAgent()
  const name = agentDoc?.name ?? AGENT_FALLBACK.name
  return {
    alternates: { canonical: '/local-expert/about' },
    title: { absolute: `${name} | Real Estate Agent Serving Manhattan & Brooklyn` },
    description: `Meet ${name}, a licensed NYC real estate agent helping buyers and sellers navigate Manhattan and Brooklyn neighborhoods.`,
  }
}

const TIMELINE = [
  { year: '2010', event: 'Moved to New York from Chicago with two suitcases and a subletter found on Craigslist.' },
  { year: '2013', event: 'Earned real estate license. First sale: a one-bedroom in Crown Heights for $385K.' },
  { year: '2016', event: 'Joined Compass Real Estate. Began focusing exclusively on Brooklyn and downtown Manhattan.' },
  { year: '2019', event: 'Reached $50M in total transaction volume. Opened the West Village office.' },
  { year: '2022', event: 'Named one of New York Magazine\'s "Top Real Estate Agents Under 40."' },
  { year: '2024', event: '$184M in sales volume. 240+ families placed. Still walking every block.' },
]

export default async function AboutPage() {
  const [agentDoc, testimonials] = await Promise.all([getAgent(), getTestimonials()])
  const agent = agentDoc ? { ...AGENT_FALLBACK, ...agentDoc } : AGENT_FALLBACK
  const heroStats = withFallback(agent.heroStats, HERO_STATS)
  const TESTIMONIAL = withFallback(testimonials, [TESTIMONIAL_FALLBACK])[0]

  return (
    <>
      {/* ─── Header ─── */}
      <section className="pt-[112px] pb-[96px] lg:pt-[144px] lg:pb-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Eyebrow with rule */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] whitespace-nowrap">
              The Broker
            </span>
            <div className="h-px flex-1 bg-[#BEB7A9]" />
          </div>

          <h1
            className="text-[43px] lg:text-[58px] font-normal text-[#24180F] leading-[1.05] text-balance"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            I don&apos;t sell apartments.<br />
            <em className="text-[#1B3B2B]">I introduce people to blocks.</em>
          </h1>
        </div>
      </section>

      {/* ─── Portrait, bio and figures ─── */}
      {/* No top padding by design: this shares the header's background, so the
          header's bottom padding already supplies the gap between the two. */}
      <section className="pb-[96px] lg:pb-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-12 lg:gap-20 items-start">

            {/* Portrait + credentials caption */}
            <div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={resolveImageSrc(agent.photo)}
                  alt={agent.name}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <p className="text-[12px] tracking-[0.28em] uppercase text-[#2C1E11]/50 mt-4 leading-relaxed">
                {agent.name} · {agent.title} · NY DOS #{agent.license?.replace('NY Lic# ', '')}
              </p>
              <p className="text-[12px] text-[#2C1E11]/35 mt-2 leading-relaxed">
                {agent.brokerage} · {agent.brokerageLicense}
                <br />
                {agent.brokerageAddress}
              </p>
            </div>

            {/* Lead, bio, figures, CTA */}
            <div>
              <p
                className="text-[26px] lg:text-[30px] font-normal text-[#24180F] leading-snug mb-8"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                I moved here for a job that didn&apos;t pan out. I stayed because no city on earth
                has this particular pull. Now I help other people figure out their version of New York —
                which block, which building, which life.
              </p>

              <div className="space-y-5 [&_p]:text-[16px] [&_p]:text-[#2C1E11]/60 [&_p]:leading-relaxed">
                {isPortableText(agent.bio) ? (
                  <PortableText value={agent.bio} />
                ) : (
                  agent.bio.map((para, i) => <p key={i}>{para}</p>)
                )}
                <p>
                  The areas I focus on — {(agent.areas ?? []).join(', ')} — are neighborhoods I know the way
                  you know a friend&apos;s face. I know which buildings have good boards and which ones stall
                  on approvals. I know where the light is in the afternoon. I know which crosstown blocks
                  actually feel different.
                </p>
              </div>

              {/* Figures — same data and treatment as the homepage hero, so the
                  numbers a visitor meets on the front page carry over here. */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8 mt-10 pt-8 border-t border-[#1B3B2B]/10">
                <HeroStats stats={heroStats} />
              </div>

              <Link
                href="/local-expert/contact"
                className="inline-flex items-center mt-10 px-6 py-3 text-[14px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors"
              >
                Book a 20-minute call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      {/* Shares the bio section's background and takes no top padding — the two
          read as one continuous stretch of the broker's story. */}
      <section className="pb-[96px] lg:pb-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-3">The Long Version</p>
          <h2
            className="text-[34px] font-normal text-[#24180F] mb-10 text-balance"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            The story so far.
          </h2>
          <div>
            {TIMELINE.map((item, i) => {
              const isLast = i === TIMELINE.length - 1
              return (
                <div key={item.year} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-[7px] h-[7px] rounded-full bg-[#BA5B3E] mt-[7px] flex-shrink-0" />
                    {/* The spacing below lives on the text column, not the row, so
                        this connector stretches the full gap to the next marker
                        instead of stopping short of it. */}
                    {!isLast && <div className="w-px flex-1 bg-[#BEB7A9]/70 mt-2" />}
                  </div>
                  <div className={isLast ? undefined : 'pb-7'}>
                    <p
                      className="text-[19px] text-[#BA5B3E] leading-none mb-1.5"
                      style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                    >
                      {item.year}
                    </p>
                    <p className="text-[15px] text-[#2C1E11]/60 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#1B3B2B' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <blockquote>
            <p
              className="text-[24px] lg:text-[28px] font-normal italic text-[#F8F3EB] leading-snug"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              &ldquo;{TESTIMONIAL.quote}&rdquo;
            </p>
            <footer className="mt-6">
              <p className="text-[14px] font-semibold text-[#8B9E8B]">{TESTIMONIAL.author}</p>
              <p className="text-[12px] text-[#F8F3EB]/30 mt-0.5">{TESTIMONIAL.location}</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ─── Featured properties ─────────────────────────────────────── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E]">Currently Representing</span>
              <h2
                className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight mt-2 mb-3 text-balance"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Homes on my desk right now.
              </h2>
              {/* text-pretty keeps the last line from stranding a single word,
                  which this blurb did at the lg breakpoint. */}
              <p className="text-[15px] text-[#2C1E11]/40 max-w-lg text-pretty">
                Every one of these I have walked, measured against the block, and would show you myself.
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

      <ContactTeaser />
    </>
  )
}
