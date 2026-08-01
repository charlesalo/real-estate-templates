import ParallaxBanner from '../_components/sections/ParallaxBanner'
import CTASection from '../_components/sections/CTASection'

export const metadata = {
  title: 'Client Testimonials & Success Stories',
  description: 'What clients say about working with Victoria Sinclair — trusted luxury real estate advisor in Beverly Hills, Bel Air, and Holmby Hills.',
}

const TESTIMONIALS = [
  {
    quote: "Victoria didn't just sell our home — she orchestrated the entire process with a level of sophistication I'd never experienced before. We closed $400K over asking in under a week.",
    name: 'James & Catherine Whitfield',
    location: 'Bel Air, CA',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    result: '$400K over asking',
  },
  {
    quote: "From the first call to closing, Victoria was exceptional. She found us a property that wasn't even on the market yet. Absolutely remarkable.",
    name: 'Dr. Priya Nair',
    location: 'Beverly Hills, CA',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    result: 'Off-market acquisition',
  },
  {
    quote: "The most professional real estate experience we've ever had. Victoria's knowledge of the Beverly Hills market is unmatched. She will be our agent for life.",
    name: 'Marcus & Sofia Laurent',
    location: 'Holmby Hills, CA',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    result: 'Repeat clients',
  },
  {
    quote: "Victoria managed the sale of our estate with complete discretion and precision. The process was seamless from start to finish — exactly what we needed.",
    name: 'Robert & Diana Ashford',
    location: 'Bel Air, CA',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    result: 'Closed in 18 days',
  },
  {
    quote: "We'd searched for our dream home for over a year before finding Victoria. Within three weeks she presented us with a stunning off-market property that exceeded every expectation.",
    name: 'Thomas & Grace Ellison',
    location: 'Pacific Palisades, CA',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    result: 'Off-market, 3 weeks',
  },
  {
    quote: "Victoria's command of negotiation is extraordinary. She secured terms we didn't think were possible. We couldn't recommend her more highly.",
    name: 'Andrew Kim',
    location: 'Beverly Hills, CA',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    result: '12% below ask',
  },
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">

      {/* Header */}
      <ParallaxBanner src="/images/luxury-agent/xtra10.jpg" priority>
        <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] mb-4 font-sans">
          Success Stories
        </p>
        <h1 className="font-heading text-5xl lg:text-6xl font-normal text-white mb-5">
          Testimonials
        </h1>
        <div className="w-12 h-px bg-[#C9A96E] mb-5" />
        <p className="text-white/45 font-sans text-base max-w-xl leading-relaxed">
          The experiences of those who've trusted Victoria Sinclair with their most important real estate decisions.
        </p>
      </ParallaxBanner>

      {/* Testimonials grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.06]">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-[#0A0A0A] p-10 lg:p-12 flex flex-col gap-8">
              {/* Quote mark */}
              <div className="font-heading text-7xl leading-none text-[#C9A96E]/50 select-none" aria-hidden="true">
                &ldquo;
              </div>

              {/* Quote */}
              <blockquote className="font-heading text-xl lg:text-2xl font-normal text-white leading-snug flex-1">
                {t.quote}
              </blockquote>

              {/* Result tag */}
              {t.result && (
                <div className="inline-flex">
                  <span className="px-3 py-1 text-[12px] tracking-[0.3em] uppercase border border-[#C9A96E]/30 text-[#C9A96E] font-sans">
                    {t.result}
                  </span>
                </div>
              )}

              {/* Attribution */}
              <div className="flex items-center gap-4 pt-2 border-t border-white/[0.07]">
                {t.photo && (
                  <div className="w-10 h-10 overflow-hidden flex-shrink-0">
                    <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  {t.location && (
                    <p className="text-xs text-white/35 mt-0.5 font-sans">{t.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <CTASection
        template="luxury-agent"
        background={{ image: '/images/luxury-agent/work-with-me.jpg' }}
        headline="Your Success Story Starts Here"
        subheadline="Join Victoria's growing family of clients who've experienced the difference that dedication, discretion, and expertise make."
        cta={{ label: "Let's Connect", modal: true }}
      />
    </div>
  )
}
