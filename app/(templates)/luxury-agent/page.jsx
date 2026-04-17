import HeroFullscreen from '@/components/sections/HeroFullscreen'
import PropertyCard from '@/components/real-estate/PropertyCard'
import AboutSection from '@/components/sections/AboutSection'
import StatsBar from '@/components/sections/StatsBar'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import { getFeaturedListings } from '@/lib/simplyrets'

// ─── Demo content ─────────────────────────────────────────────────────────────
// Replace with Sanity CMS data per client deployment

const DEMO_AGENT = {
  name: 'Victoria Sinclair',
  title: 'Luxury Real Estate Specialist · DRE# 01234567',
  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
  bio: [
    'With over two decades of experience in the Los Angeles luxury market, Victoria Sinclair has built a reputation as the trusted advisor to the city\'s most discerning buyers and sellers.',
    'Her portfolio spans Beverly Hills, Bel Air, Holmby Hills, and the Pacific Palisades — a curated selection of estates, contemporary masterworks, and architectural landmarks that define the upper echelon of California living.',
    'Victoria\'s approach is personal, discreet, and relentlessly focused on outcomes. She has closed over $1.2 billion in residential real estate and consistently ranks in the top 1% of agents nationwide.',
  ],
  stats: [
    { value: '$1.2B+', label: 'Total Sales Volume' },
    { value: '22', label: 'Years of Experience' },
    { value: '98%', label: 'List-to-Sale Ratio' },
  ],
}

const DEMO_STATS = [
  { numericValue: 312, suffix: '+', label: 'Homes Sold' },
  { numericValue: 1200, prefix: '$', suffix: 'M+', label: 'Transaction Volume' },
  { numericValue: 98, suffix: '%', label: 'List-to-Sale Ratio' },
  { numericValue: 22, suffix: ' Days', label: 'Avg. Days on Market' },
]

const DEMO_TESTIMONIALS = [
  {
    quote:
      'Victoria didn\'t just sell our home — she orchestrated the entire process with a level of sophistication I\'d never experienced before. We closed $400K over asking in under a week.',
    name: 'James & Catherine Whitfield',
    location: 'Bel Air, CA',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    quote:
      'From the first call to closing, Victoria was exceptional. She found us a property that wasn\'t even on the market yet. Absolutely remarkable.',
    name: 'Dr. Priya Nair',
    location: 'Beverly Hills, CA',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    quote:
      'The most professional real estate experience we\'ve ever had. Victoria\'s knowledge of the Beverly Hills market is unmatched. She will be our agent for life.',
    name: 'Marcus & Sofia Laurent',
    location: 'Holmby Hills, CA',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
]

// Fallback listing images from Unsplash (used if SimplyRETS returns no photos)
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
]

// ─── Data fetching ─────────────────────────────────────────────────────────────

async function getFeatured() {
  try {
    const listings = await getFeaturedListings(3)
    return listings.map((l, i) => ({
      id: l.mlsId,
      mlsId: l.mlsId,
      price: l.listPrice,
      address: l.address?.full ?? l.address?.streetNumber + ' ' + l.address?.streetName,
      city: l.address?.city,
      state: l.address?.state,
      zip: l.address?.postalCode,
      beds: l.property?.bedrooms,
      baths: l.property?.bathsFull,
      sqft: l.property?.area,
      status: l.mls?.status ?? 'Active',
      image: l.photos?.[0] ?? FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
    }))
  } catch {
    // Fallback demo listings if API is unavailable
    return [
      {
        id: 'demo-1', mlsId: 'demo-1',
        price: 8750000,
        address: '271 S Mapleton Dr', city: 'Los Angeles', state: 'CA', zip: '90024',
        beds: 6, baths: 7, sqft: 8200, status: 'Active',
        image: FALLBACK_IMAGES[0],
      },
      {
        id: 'demo-2', mlsId: 'demo-2',
        price: 5995000,
        address: '1120 Cabrillo Ave', city: 'Beverly Hills', state: 'CA', zip: '90210',
        beds: 5, baths: 5, sqft: 6100, status: 'Active',
        image: FALLBACK_IMAGES[1],
      },
      {
        id: 'demo-3', mlsId: 'demo-3',
        price: 12500000,
        address: '750 Bel Air Rd', city: 'Los Angeles', state: 'CA', zip: '90077',
        beds: 7, baths: 8, sqft: 10400, status: 'Active',
        image: FALLBACK_IMAGES[2],
      },
    ]
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function LuxuryAgentHome() {
  const featuredListings = await getFeatured()

  return (
    <>
      {/* 1 — Hero */}
      <HeroFullscreen
        template="luxury-agent"
        backgroundImage="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=85"
        eyebrow="Beverly Hills · Bel Air · Holmby Hills"
        headline="Extraordinary Homes for Extraordinary Lives"
        subheadline="Victoria Sinclair brings unparalleled expertise, discretion, and results to Los Angeles's most prestigious addresses."
        ctaPrimary={{ label: 'View Listings', href: '/luxury-agent/listings' }}
        ctaSecondary={{ label: 'Get in Touch', href: '/luxury-agent/contact' }}
      />

      {/* 2 — Featured Listings */}
      <section className="py-20 lg:py-28 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">
                Featured Properties
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl font-normal text-white leading-tight">
                Curated Listings
              </h2>
            </div>
            <a
              href="/luxury-agent/listings"
              className="hidden md:inline-block text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors border-b border-white/20 hover:border-white/50 pb-0.5 font-sans"
            >
              View All Listings →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredListings.map(listing => (
              <PropertyCard
                key={listing.id}
                {...listing}
                template="luxury-agent"
                variant="featured"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Agent Bio */}
      <AboutSection
        template="luxury-agent"
        photo={DEMO_AGENT.photo}
        name={DEMO_AGENT.name}
        title={DEMO_AGENT.title}
        bio={DEMO_AGENT.bio}
        stats={DEMO_AGENT.stats}
      />

      {/* 4 — Market Stats */}
      <StatsBar template="luxury-agent" stats={DEMO_STATS} />

      {/* 5 — Testimonials */}
      <TestimonialsSection
        template="luxury-agent"
        variant="single"
        testimonials={DEMO_TESTIMONIALS}
      />

      {/* 6 — Home Valuation CTA */}
      <CTASection
        template="luxury-agent"
        background={{ image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80' }}
        headline="What Is Your Home Worth?"
        subheadline="Receive a discreet, no-obligation market analysis from Victoria within 24 hours."
        cta={{ label: 'Get Your Valuation', href: '/luxury-agent/home-valuation' }}
      />

      {/* 7 — Contact CTA */}
      <CTASection
        template="luxury-agent"
        background={{ color: 'bg-[#0D0D0D]' }}
        headline="Let's Find Your Next Exceptional Home"
        subheadline="Whether buying, selling, or simply exploring, Victoria is available to guide you."
        cta={{ label: 'Schedule a Consultation', href: '/luxury-agent/contact' }}
      />
    </>
  )
}
