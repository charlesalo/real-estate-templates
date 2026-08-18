import Image from 'next/image'
import HeroFullscreen from './_components/sections/HeroFullscreen'
import AboutSection from './_components/sections/AboutSection'
import StatsBar from './_components/sections/StatsBar'
import TestimonialsSection from './_components/sections/TestimonialsSection'
import CTASection from './_components/sections/CTASection'
import HomeValuationCompact from './_components/sections/HomeValuationCompact'
import LeadCaptureSection from './_components/sections/LeadCaptureSection'
import FeaturedListingCard from './_components/listings/FeaturedListingCard'
import { HOMEPAGE_FEATURED } from '@/lib/featured-listings'

// Title and description come from the template layout; this page only needs to
// claim its own canonical so it isn't left without one.
export const metadata = {
  alternates: { canonical: '/luxury-agent' },
}

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
  { numericValue: 270, suffix: '+', label: 'Homes Sold' },
  { numericValue: 500, prefix: '$', suffix: 'M+', label: 'Transaction Volume' },
  { numericValue: 98, suffix: '%', label: 'List-to-Sale Ratio' },
  { numericValue: 19, label: 'Avg. Days on Market' },
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

const FEATURED_POSTS = [
  {
    slug: 'beverly-hills-market-report-2024',
    title: '2024 Beverly Hills Luxury Market Report',
    category: 'Market Report',
    date: 'November 12, 2024',
    excerpt: 'A comprehensive look at the Beverly Hills luxury market: what sold, what didn\'t, and what\'s coming in 2025.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
  },
  {
    slug: 'buying-luxury-home-los-angeles',
    title: 'The Insider\'s Guide to Buying a Luxury Home in Los Angeles',
    category: 'Buyer\'s Guide',
    date: 'October 3, 2024',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  },
  {
    slug: 'bel-air-vs-holmby-hills',
    title: 'Bel Air vs. Holmby Hills: Which Neighborhood Is Right for You?',
    category: 'Neighborhood Guide',
    date: 'September 18, 2024',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  },
]

const FEATURED_HOODS = [
  {
    slug: 'beverly-hills',
    name: 'Beverly Hills',
    tagline: 'The world\'s most storied address.',
    image: 'https://plus.unsplash.com/premium_photo-1725408106567-a77bd9beff7c?w=1200&q=80&auto=format&fit=crop',
    stats: 'Median $4.2M · 47 active listings',
  },
  {
    slug: 'bel-air',
    name: 'Bel Air',
    tagline: 'Privacy, prestige, and panoramic views.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    stats: 'Median $5.8M · 31 active listings',
  },
  {
    slug: 'holmby-hills',
    name: 'Holmby Hills',
    tagline: 'The Platinum Triangle\'s most exclusive enclave.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    stats: 'Median $8.1M · 12 active listings',
  },
]


// ─── Page ──────────────────────────────────────────────────────────────────────

export default function LuxuryAgentHome() {
  return (
    <>
      {/* 1 — Hero */}
      <HeroFullscreen
        backgroundVideo="/images/luxury-agent/HOV.mp4"
        backgroundVideoWebm="/images/luxury-agent/HOV.webm"
        backgroundPoster="/images/luxury-agent/HOV-poster.jpg"
        backgroundImage="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=85"
        eyebrow="Beverly Hills · Bel Air · Holmby Hills · Pacific Palisades"
        headline="Extraordinary Homes for Extraordinary Lives"
        subheadline="Victoria Sinclair brings unparalleled expertise, discretion, and results to Los Angeles's most prestigious addresses."
        ctaPrimary={{ label: 'View Listings', href: '/luxury-agent/listings' }}
        ctaSecondary={{ label: 'Get in Touch', modal: true }}
        agentName="Victoria Sinclair"
        agentDre="CA DRE# 01234567"
      />

      {/* 2 — Featured Listings */}
      <section className="py-20 lg:py-28 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">
                Exclusively Represented
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl font-normal text-white leading-tight">
                Featured Listings
              </h2>
            </div>
            <a
              href="/luxury-agent/featured-listings"
              className="hidden md:inline-block text-[12px] tracking-[0.3em] uppercase text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors font-sans"
            >
              View All Featured →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {HOMEPAGE_FEATURED.map(listing => (
              <FeaturedListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Agent Bio */}
      <AboutSection
        photo={DEMO_AGENT.photo}
        name={DEMO_AGENT.name}
        title={DEMO_AGENT.title}
        bio={DEMO_AGENT.bio}
        learnMoreHref="/luxury-agent/about"
      />

      {/* 4 — Market Stats */}
      <StatsBar stats={DEMO_STATS} />

      {/* 5 — Testimonials */}
      <TestimonialsSection
        testimonials={DEMO_TESTIMONIALS}
        backgroundImage="/images/luxury-agent/testimonials.jpg"
      />

      {/* 6 — Featured Neighborhoods */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="mb-10">
            <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">
              Explore
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl font-normal text-white">
              Neighborhoods
            </h2>
          </div>

          {/* Asymmetric editorial grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 lg:h-[580px]">

            {/* Hero card — spans 2 columns */}
            <a
              href={`/luxury-agent/neighborhoods/${FEATURED_HOODS[0].slug}`}
              className="group relative overflow-hidden lg:col-span-2 aspect-[4/3] lg:aspect-auto lg:min-h-[580px]"
            >
              <Image
                src={FEATURED_HOODS[0].image}
                alt={FEATURED_HOODS[0].name}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <p className="text-[12px] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 font-sans">
                  {FEATURED_HOODS[0].stats}
                </p>
                <h3 className="font-heading text-3xl lg:text-5xl font-normal text-white leading-tight">
                  {FEATURED_HOODS[0].name}
                </h3>
                <p className="text-white/50 text-sm mt-2 max-w-xs">{FEATURED_HOODS[0].tagline}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-white/40 group-hover:text-[#C9A96E] transition-colors font-sans">
                  Explore <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
                </div>
              </div>
            </a>

            {/* Two stacked cards — 1 column */}
            <div className="flex flex-col gap-1 lg:h-full">
              {FEATURED_HOODS.slice(1).map(hood => (
                <a
                  key={hood.slug}
                  href={`/luxury-agent/neighborhoods/${hood.slug}`}
                  className="group relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:flex-1"
                >
                  <Image
                    src={hood.image}
                    alt={hood.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                    <p className="text-[12px] tracking-[0.4em] uppercase text-[#C9A96E] mb-2 font-sans">
                      {hood.stats}
                    </p>
                    <h3 className="font-heading text-xl lg:text-2xl font-normal text-white">
                      {hood.name}
                    </h3>
                    <p className="text-white/45 text-xs mt-1">{hood.tagline}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* View All button */}
          <div className="flex justify-center mt-10">
            <a
              href="/luxury-agent/neighborhoods"
              className="block min-[480px]:inline-block w-full min-[480px]:w-auto text-center px-10 py-4 text-[12px] tracking-[0.2em] uppercase font-medium border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-300 font-sans"
            >
              View All Neighborhoods
            </a>
          </div>

        </div>
      </section>

      {/* 7 — Home Valuation */}
      <HomeValuationCompact googleMapsKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? ''} />

      {/* 8 — From the Journal */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">
                From the Luxury Real Estate Journal
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl font-normal text-white">
                Latest Insights
              </h2>
            </div>
            <a
              href="/luxury-agent/blog"
              className="hidden md:inline-block text-[12px] tracking-[0.3em] uppercase text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors font-sans"
            >
              View All Articles →
            </a>
          </div>

          {/* Asymmetric editorial grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 lg:h-[580px]">

            {/* Hero post — spans 2 columns */}
            <a
              href={`/luxury-agent/blog/${FEATURED_POSTS[0].slug}`}
              className="group relative overflow-hidden lg:col-span-2 aspect-[4/3] lg:aspect-auto"
            >
              <Image
                src={FEATURED_POSTS[0].image}
                alt={FEATURED_POSTS[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />

              {/* Category + date — top */}
              <div className="absolute top-0 left-0 right-0 p-8 lg:p-10 flex items-center justify-between">
                <span className="text-[12px] tracking-[0.35em] uppercase text-[#C9A96E] font-sans">
                  {FEATURED_POSTS[0].category}
                </span>
                <span className="text-[12px] tracking-[0.2em] text-white/30 font-sans">
                  {FEATURED_POSTS[0].date}
                </span>
              </div>

              {/* Title + excerpt — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <h3 className="font-heading text-2xl lg:text-4xl font-normal text-white leading-tight mb-3 max-w-xl">
                  {FEATURED_POSTS[0].title}
                </h3>
                {FEATURED_POSTS[0].excerpt && (
                  <p className="text-white/50 text-sm font-sans leading-relaxed max-w-lg mb-5 hidden lg:block">
                    {FEATURED_POSTS[0].excerpt}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-white/40 group-hover:text-[#C9A96E] transition-colors font-sans">
                  Read Article <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
                </span>
              </div>
            </a>

            {/* Two stacked posts — 1 column */}
            <div className="flex flex-col gap-1 lg:h-full">
              {FEATURED_POSTS.slice(1).map(post => (
                <a
                  key={post.slug}
                  href={`/luxury-agent/blog/${post.slug}`}
                  className="group relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:flex-1"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                    <p className="text-[12px] tracking-[0.35em] uppercase text-[#C9A96E] mb-2 font-sans">
                      {post.category}
                    </p>
                    <h3 className="font-heading text-lg lg:text-xl font-normal text-white leading-snug">
                      {post.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] tracking-[0.25em] uppercase text-white/30 group-hover:text-[#C9A96E] transition-colors font-sans">
                      Read <span className="transition-transform group-hover:translate-x-0.5 inline-block">→</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile view-all */}
          <div className="flex justify-center mt-8 md:hidden">
            <a
              href="/luxury-agent/blog"
              className="text-[12px] tracking-[0.3em] uppercase text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors font-sans"
            >
              View All Articles →
            </a>
          </div>

        </div>
      </section>

      {/* 9 — Lead Capture */}
      <LeadCaptureSection agentName="Victoria Sinclair" />

      {/* 10 — How I Work */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="mb-14">
            <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">
              The Process
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl font-normal text-white">
              How I Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
            {[
              {
                number: '01',
                title: 'Consultation',
                body: 'We begin with a private conversation — no pressure, no obligations. I take time to understand your goals, timeline, and vision before anything else.',
              },
              {
                number: '02',
                title: 'Strategy',
                body: 'Every client receives a bespoke market analysis and a curated plan. Whether buying or selling, I structure each engagement around your specific objectives.',
              },
              {
                number: '03',
                title: 'Results',
                body: 'From first showing to final signature, I manage every detail with discretion and precision — so you can focus on what comes next.',
              },
            ].map((step, i) => (
              <div key={i} className="md:px-10 py-10 md:py-0 first:md:pl-0 last:md:pr-0">
                <div className="w-8 h-px bg-[#C9A96E] mb-6" />
                <span className="font-heading text-5xl font-normal text-white/30 block mb-6 tabular-nums">
                  {step.number}
                </span>
                <h3 className="font-heading text-2xl font-normal text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50 font-sans">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11 — Contact CTA */}
      <CTASection
        background={{ image: '/images/luxury-agent/work-with-me.jpg' }}
        headline="Ready to Work Together?"
        subheadline="Whether buying, selling, or simply exploring, Victoria is available to guide you."
        cta={{ label: 'Let\'s Connect', modal: true }}
      />
    </>
  )
}
