import AboutSection from '@/components/sections/AboutSection'
import StatsBar from '@/components/sections/StatsBar'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'

export const metadata = {
  title: 'About',
  description: 'Meet Victoria Sinclair — Beverly Hills luxury real estate specialist with over 22 years of experience.',
}

const AGENT = {
  name: 'Victoria Sinclair',
  title: 'Luxury Real Estate Specialist · DRE# 01234567',
  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
  bio: [
    'With over two decades of experience in the Los Angeles luxury market, Victoria Sinclair has built a reputation as the trusted advisor to the city\'s most discerning buyers and sellers.',
    'Her portfolio spans Beverly Hills, Bel Air, Holmby Hills, and the Pacific Palisades — a curated selection of estates, contemporary masterworks, and architectural landmarks that define the upper echelon of California living.',
    'Victoria\'s approach is personal, discreet, and relentlessly focused on outcomes. She has closed over $1.2 billion in residential real estate and consistently ranks in the top 1% of agents nationwide.',
    'A native Angeleno, Victoria brings unparalleled local expertise, an extensive network of off-market relationships, and a commitment to service that extends well beyond the closing table.',
  ],
  stats: [
    { value: '$1.2B+', label: 'Total Sales Volume' },
    { value: '22', label: 'Years of Experience' },
    { value: '98%', label: 'List-to-Sale Ratio' },
  ],
}

const STATS = [
  { numericValue: 312, suffix: '+', label: 'Homes Sold' },
  { numericValue: 1200, prefix: '$', suffix: 'M+', label: 'Transaction Volume' },
  { numericValue: 98, suffix: '%', label: 'List-to-Sale Ratio' },
  { numericValue: 22, suffix: ' Days', label: 'Avg. Days on Market' },
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

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Page heading */}
      <div className="bg-[#0A0A0A] border-b border-white/10 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">About</p>
          <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white">Meet Victoria</h1>
        </div>
      </div>

      <AboutSection
        template="luxury-agent"
        photo={AGENT.photo}
        name={AGENT.name}
        title={AGENT.title}
        bio={AGENT.bio}
        stats={AGENT.stats}
      />

      <StatsBar template="luxury-agent" stats={STATS} />

      <TestimonialsSection template="luxury-agent" variant="single" testimonials={TESTIMONIALS} />

      <CTASection
        template="luxury-agent"
        background={{ color: 'bg-[#0D0D0D]' }}
        headline="Ready to Work Together?"
        subheadline="Contact Victoria for a confidential consultation about buying or selling in the Los Angeles luxury market."
        cta={{ label: 'Schedule a Consultation', href: '/luxury-agent/contact' }}
      />
    </div>
  )
}
