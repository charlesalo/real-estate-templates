import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ParallaxBanner from '@/components/sections/ParallaxBanner'
import AboutSection from '@/components/sections/AboutSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import FeaturedListingCard from '@/components/real-estate/FeaturedListingCard'
import { PAST_TRANSACTIONS } from '@/lib/featured-listings'
import { Phone, Mail, MapPin } from 'lucide-react'

export const metadata = {
  title: 'About',
  description: 'Meet Victoria Sinclair — Beverly Hills luxury real estate specialist with over 22 years of experience.',
}

const AGENT = {
  name: 'Victoria Sinclair',
  title: 'Luxury Real Estate Specialist',
  dre: 'DRE# 01234567',
  phone: '(310) 555-0194',
  email: 'victoria@victoriasinclair.com',
  address: '9454 Wilshire Blvd, Suite 600\nBeverly Hills, CA 90212',
  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
  bio: [
    'With over two decades of experience in the Los Angeles luxury market, Victoria Sinclair has built a reputation as the trusted advisor to the city\'s most discerning buyers and sellers.',
    'Her portfolio spans Beverly Hills, Bel Air, Holmby Hills, and the Pacific Palisades — a curated selection of estates, contemporary masterworks, and architectural landmarks that define the upper echelon of California living.',
    'Victoria\'s approach is personal, discreet, and relentlessly focused on outcomes. She has closed over $1.2 billion in residential real estate and consistently ranks in the top 1% of agents nationwide.',
    'A native Angeleno, Victoria brings unparalleled local expertise, an extensive network of off-market relationships, and a commitment to service that extends well beyond the closing table.',
  ],
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
  },
}

const CREDENTIALS = [
  'Certified Luxury Home Marketing Specialist (CLHMS)',
  'Accredited Buyer\'s Representative (ABR)',
  'Certified Residential Specialist (CRS)',
  'National Association of REALTORS® Member',
  'California Association of REALTORS® Member',
  'Beverly Hills / Greater Los Angeles Association of REALTORS® Member',
]

const TESTIMONIALS = [
  {
    quote: 'Victoria didn\'t just sell our home — she orchestrated the entire process with a level of sophistication I\'d never experienced before. We closed $400K over asking in under a week.',
    name: 'James & Catherine Whitfield',
    location: 'Bel Air, CA',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    quote: 'From the first call to closing, Victoria was exceptional. She found us a property that wasn\'t even on the market yet. Absolutely remarkable.',
    name: 'Dr. Priya Nair',
    location: 'Beverly Hills, CA',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    quote: 'The most professional real estate experience we\'ve ever had. Victoria\'s knowledge of the Beverly Hills market is unmatched. She will be our agent for life.',
    name: 'Marcus & Sofia Laurent',
    location: 'Holmby Hills, CA',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
]

function IconInstagram() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
}
function IconFacebook() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function IconLinkedIn() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}

export default function AboutPage() {
  return (
    <div className="pt-20">

      {/* Page heading */}
      <ParallaxBanner src="/images/luxury-agent/xtra13.jpg" priority>
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-4 font-sans">Your Trusted Advisor</p>
        <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white mb-5">About Victoria</h1>
        <div className="w-12 h-px bg-[#C9A96E] mb-5" />
        <p className="text-white/45 font-sans text-base max-w-xl leading-relaxed">
          Learn how Victoria Sinclair helps buyers and sellers succeed in the Los Angeles luxury real estate market.
        </p>
      </ParallaxBanner>

      {/* Bio + credentials */}
      <div className="pt-20 lg:pt-28 bg-[#0A0A0A]" />
      <AboutSection
        template="luxury-agent"
        photo={AGENT.photo}
        name={AGENT.name}
        title={`${AGENT.title} · ${AGENT.dre}`}
        bio={AGENT.bio}
        credentials={CREDENTIALS}
      />

      {/* ── Contact Info ────────────────────────────────────────────── */}
      <section className="bg-[#0D0D0D] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">

          {/* Left: label + social */}
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-6 font-sans">Contact</p>
            <p className="text-white/50 text-sm font-sans leading-relaxed mb-10 max-w-xs">
              Available for private consultations, buyer inquiries, and dedicated seller representation throughout the Greater Los Angeles area, offering personalized guidance, local market expertise, and a seamless experience from initial conversation to closing.
            </p>

            {/* Social icons */}
            {(AGENT.social.instagram || AGENT.social.facebook || AGENT.social.linkedin) && (
              <div className="flex items-center gap-2">
                {[
                  { key: 'instagram', href: AGENT.social.instagram, Icon: IconInstagram },
                  { key: 'facebook',  href: AGENT.social.facebook,  Icon: IconFacebook },
                  { key: 'linkedin',  href: AGENT.social.linkedin,  Icon: IconLinkedIn },
                ].filter(s => s.href).map(({ key, href, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/35 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right: contact rows */}
          <div className="divide-y divide-white/[0.06]">
            {[
              {
                label: 'Phone',
                icon: <Phone size={13} strokeWidth={1.5} className="text-[#C9A96E]" />,
                content: (
                  <a href={`tel:${AGENT.phone.replace(/\D/g, '')}`} className="text-white/70 hover:text-white transition-colors font-sans text-sm">
                    {AGENT.phone}
                  </a>
                ),
              },
              {
                label: 'Email',
                icon: <Mail size={13} strokeWidth={1.5} className="text-[#C9A96E]" />,
                content: (
                  <a href={`mailto:${AGENT.email}`} className="text-white/70 hover:text-white transition-colors font-sans text-sm break-all">
                    {AGENT.email}
                  </a>
                ),
              },
              {
                label: 'Address',
                icon: <MapPin size={13} strokeWidth={1.5} className="text-[#C9A96E]" />,
                content: (
                  <p className="text-white/70 font-sans text-sm whitespace-pre-line">{AGENT.address}</p>
                ),
              },
              {
                label: 'License',
                icon: null,
                content: (
                  <p className="text-white/70 font-sans text-sm">{AGENT.dre}</p>
                ),
              },
            ].map(({ label, icon, content }, i, arr) => (
              <div key={label} className={`flex items-start justify-between gap-8 pt-6 ${i < arr.length - 1 ? 'pb-6' : ''}`}>
                <div className="flex items-center gap-2.5 min-w-[100px]">
                  {icon}
                  <span className="text-[9px] tracking-[0.35em] uppercase text-white/30 font-sans">{label}</span>
                </div>
                <div className="text-right">{content}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection
        template="luxury-agent"
        variant="single"
        testimonials={TESTIMONIALS}
        backgroundImage="/images/luxury-agent/testimonials.jpg"
      />

      {/* Past Transactions */}
      <section className="bg-[#0A0A0A] py-14 lg:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">Track Record</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-normal text-white">Recent Closed Sales</h2>
            </div>
            <Link
              href="/luxury-agent/past-transactions"
              className="hidden sm:inline-block text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors font-sans"
            >
              View All Past Sales →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAST_TRANSACTIONS.map(listing => (
              <FeaturedListingCard
                key={listing.id}
                listing={listing}
              />
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <Link
              href="/luxury-agent/past-transactions"
              className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors font-sans"
            >
              View All Past Sales →
            </Link>
          </div>
        </div>
      </section>

      {/* MLS Search callout */}
      <div className="bg-[#0D0D0D] px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/[0.07] px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] mb-2 font-sans">
                Start Your Property Search
              </p>
              <h2 className="font-heading text-2xl lg:text-3xl text-white font-normal">
                Find Your Dream Home in Los Angeles
              </h2>
              <p className="text-white/40 text-sm mt-1 font-sans">
                Explore all active MLS listings across Los Angeles and discover homes that match your lifestyle, budget, and goals.
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
      </div>

      {/* Contact CTA */}
      <CTASection
        template="luxury-agent"
        background={{ image: '/images/luxury-agent/work-with-me.jpg' }}
        headline="Ready to Work Together?"
        subheadline="Whether buying, selling, or simply exploring, Victoria is available to guide you."
        cta={{ label: 'Schedule a Consultation', modal: true }}
      />

    </div>
  )
}
