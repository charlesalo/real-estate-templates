import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AGENT, AGENT_STATS, NEIGHBORHOODS, TESTIMONIAL } from '@/lib/local-expert-data'

export const metadata = {
  title: 'About Nadia Osei',
  description:
    'Fourteen years in New York. Three boroughs. One trusted advisor. Meet Nadia Osei — Licensed Associate RE Salesperson with Compass Real Estate.',
}

const TIMELINE = [
  { year: '2010', event: 'Moved to New York from Chicago with two suitcases and a subletter found on Craigslist.' },
  { year: '2013', event: 'Earned real estate license. First sale: a one-bedroom in Crown Heights for $385K.' },
  { year: '2016', event: 'Joined Compass Real Estate. Began focusing exclusively on Brooklyn and downtown Manhattan.' },
  { year: '2019', event: 'Reached $50M in total transaction volume. Opened the West Village office.' },
  { year: '2022', event: 'Named one of New York Magazine\'s "Top Real Estate Agents Under 40."' },
  { year: '2024', event: '$184M in sales volume. 240+ families placed. Still walking every block.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[112px] pb-[64px] lg:pt-[144px] lg:pb-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-4">About</p>
              <h1
                className="text-[40px] lg:text-[54px] font-normal text-[#24180F] leading-[1.05] mb-6"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Fourteen years<br />in New York.
              </h1>
              <p className="text-[17px] text-[#1B3B2B]/60 leading-relaxed max-w-lg">
                I moved here for a job that didn&apos;t pan out. I stayed because no city on earth
                has this particular pull. Now I help other people figure out their version of New York —
                which block, which building, which life.
              </p>
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={AGENT.photo}
                alt={AGENT.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-[24px] border-y border-[#E5E0D8]" style={{ backgroundColor: '#F4F0EA' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {AGENT_STATS.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-[32px] font-normal text-[#24180F] leading-none"
                  style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                >
                  {stat.prefix ?? ''}{stat.numericValue}{stat.suffix ?? ''}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#1B3B2B]/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full bio */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="space-y-6">
            {AGENT.bio.map((para, i) => (
              <p key={i} className="text-[15px] text-[#1B3B2B]/65 leading-relaxed">
                {para}
              </p>
            ))}
            <p className="text-[15px] text-[#1B3B2B]/65 leading-relaxed">
              The areas I focus on — West Village, Tribeca, Brooklyn Heights, DUMBO, Park Slope,
              and the Upper East Side — are neighborhoods I know the way you know a friend&apos;s face.
              I know which buildings have good boards and which ones stall on approvals. I know where the
              light is in the afternoon. I know which crosstown blocks actually feel different.
            </p>
          </div>

          {/* Credentials */}
          <div className="mt-12 p-6 rounded-2xl border border-[#E5E0D8]">
            <p className="text-[11px] uppercase tracking-wider text-[#1B3B2B]/30 mb-4">Credentials</p>
            <div className="space-y-2">
              <p className="text-[14px] text-[#1B3B2B]">{AGENT.title}</p>
              <p className="text-[13px] text-[#1B3B2B]/50">{AGENT.license}</p>
              <p className="text-[13px] text-[#1B3B2B]/50">{AGENT.brokerage} · {AGENT.brokerageLicense}</p>
              <p className="text-[13px] text-[#1B3B2B]/40">{AGENT.brokerageAddress}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F4F0EA' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <h2
            className="text-[32px] font-normal text-[#24180F] mb-12"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            The story so far.
          </h2>
          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="flex gap-8 pb-10 relative">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[#1B3B2B] mt-1.5 flex-shrink-0" />
                  {i < TIMELINE.length - 1 && (
                    <div className="w-px flex-1 bg-[#1B3B2B]/10 mt-2" />
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-[11px] font-bold tracking-wider text-[#8B9E8B] mb-1">{item.year}</p>
                  <p className="text-[15px] text-[#1B3B2B]/65 leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#1B3B2B' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <blockquote>
            <p
              className="text-[22px] lg:text-[28px] font-normal italic text-[#F8F3EB] leading-snug"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              &ldquo;{TESTIMONIAL.quote}&rdquo;
            </p>
            <footer className="mt-6">
              <p className="text-[13px] font-semibold text-[#8B9E8B]">{TESTIMONIAL.author}</p>
              <p className="text-[11px] text-[#F8F3EB]/30 mt-0.5">{TESTIMONIAL.location}</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[64px] lg:py-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h2
            className="text-[32px] font-normal text-[#24180F] mb-4"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            Let&apos;s talk about your next block.
          </h2>
          <p className="text-[15px] text-[#1B3B2B]/50 mb-8">
            No pressure. Just a conversation about what you&apos;re looking for.
          </p>
          <Link
            href="/local-expert/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors"
          >
            Get in touch <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  )
}
