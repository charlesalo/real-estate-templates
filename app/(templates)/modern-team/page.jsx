import Image from 'next/image'
import Link from 'next/link'
import HeroSearchFocused from './_components/sections/HeroSearchFocused'
import ModernTeamNewsletterForm from './_components/layout/NewsletterForm'
import StatsCounter from './_components/StatsCounter'
import { MapPin, Bed, Bath, Square } from 'lucide-react'
import ModalTrigger from '@/components/ui/ModalTrigger'
import TestimonialsSlider from './home-valuation/TestimonialsSlider'
import ValuationHeroBar from './home-valuation/ValuationHeroBar'
import { FEATURED_LISTINGS } from './featured-listings/data'

const FEATURED_NEIGHBORHOODS = [
  { slug: 'the-heights',   name: 'The Heights',   tagline: 'Historic bungalows, walkable streets, and a vibrant local dining scene.',        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', medianPrice: '$585K', activeListings: 38 },
  { slug: 'river-oaks',    name: 'River Oaks',    tagline: "Houston's most prestigious address, framed by mature oaks and grand estates.",     image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80', medianPrice: '$2.4M', activeListings: 22 },
  { slug: 'the-woodlands', name: 'The Woodlands', tagline: "North Houston's premier planned community — miles of trails and greenery.",        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', medianPrice: '$465K', activeListings: 71 },
]

const STATS = [
  { value: '$320M+', label: 'Transaction Volume' },
  { value: 'Top 1%', label: 'Texas Agents by Volume' },
  { value: '850+',   label: 'Homes Sold' },
  { value: '97%',    label: 'Client Satisfaction' },
]

export default function ModernTeamHome() {
  return (
    <>
      <HeroSearchFocused
        eyebrow="Greater Houston, Texas · River Oaks · The Heights · The Woodlands"
        headline="Find Your Perfect Houston Home"
        subheadline="The Hargrove Group helps families buy and sell across Greater Houston — trusted, local, and relentlessly results-driven."
        backgroundImage="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1800&q=85"
        backgroundVideo="/images/modern-team/HOV.mp4"
        listingsHref="/modern-team/listings"
        popularAreas={[
          { name: 'The Heights',      href: '/modern-team/listings?q=The+Heights' },
          { name: 'River Oaks',       href: '/modern-team/listings?q=River+Oaks' },
          { name: 'Montrose',         href: '/modern-team/listings?q=Montrose' },
          { name: 'Memorial',         href: '/modern-team/listings?q=Memorial' },
          { name: 'Sugar Land',       href: '/modern-team/listings?q=Sugar+Land' },
          { name: 'The Woodlands',    href: '/modern-team/listings?q=The+Woodlands' },
          { name: 'Katy',             href: '/modern-team/listings?q=Katy' },
          { name: 'Midtown',          href: '/modern-team/listings?q=Midtown' },
          { name: 'Downtown Houston', href: '/modern-team/listings?q=Downtown+Houston' },
        ]}
      />

      {/* Trust / Stats */}
      <section className="bg-[#EEF1F7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">

          <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-5 font-sans">
            The Hargrove Group
          </p>
          <h2
            className="text-2xl lg:text-4xl font-bold text-[#111827] mb-5 leading-snug"
            style={{ fontFamily: 'var(--font-inter, system-ui)' }}
          >
            Born Here. Built Here. Proven Here.
          </h2>
          <p className="text-[#6B7280] text-base font-sans leading-relaxed max-w-2xl mx-auto">
            Over a decade of on-the-ground expertise across Greater Houston's most sought-after neighborhoods — delivering honest guidance and results that speak for themselves.
          </p>

          <div className="w-16 h-0.5 bg-[#1A2D5A] mx-auto my-12" />

          <StatsCounter stats={STATS} />

        </div>
      </section>

      {/* Gallery Style Menu */}
      <section className="bg-[#EEF1F7] pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">

            {/* Home Search */}
            <Link
              href="/modern-team/listings"
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden block"
            >
              <Image
                src="https://images.unsplash.com/photo-1744723852521-76fcb22e5d21?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Home Search"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E3E]/90 via-[#0F1E3E]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="w-8 h-px bg-white/40 mb-4" />
                <p className="text-[12px] tracking-[0.3em] uppercase text-white/55 font-sans mb-2">Houston Homes For Sale</p>
                <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight group-hover:text-white/85 transition-colors duration-300" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                  Home Search
                </h3>
              </div>
            </Link>

            {/* Home Valuation */}
            <Link
              href="/modern-team/home-valuation"
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden block"
            >
              <Image
                src="https://images.unsplash.com/photo-1587702068694-a909ef4aa346?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Home Valuation"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E3E]/90 via-[#0F1E3E]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="w-8 h-px bg-white/40 mb-4" />
                <p className="text-[12px] tracking-[0.3em] uppercase text-white/55 font-sans mb-2">What Is Your Home Worth?</p>
                <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight group-hover:text-white/85 transition-colors duration-300" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                  Home Valuation
                </h3>
              </div>
            </Link>

            {/* Contact Us */}
            <ModalTrigger className="group relative aspect-[3/4] rounded-2xl overflow-hidden block text-left w-full">
              <Image
                src="https://plus.unsplash.com/premium_photo-1680806490418-f0ca24d8f390?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D"
                alt="Contact Us"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E3E]/90 via-[#0F1E3E]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="w-8 h-px bg-white/40 mb-4" />
                <p className="text-[12px] tracking-[0.3em] uppercase text-white/55 font-sans mb-2">Reach Out to Our Team</p>
                <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight group-hover:text-white/85 transition-colors duration-300" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                  Contact Us
                </h3>
              </div>
            </ModalTrigger>

          </div>
        </div>
      </section>
      {/* Team Intro */}
      <section className="bg-[#FAFAF8] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Photo */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#EEF1F7]">
              <Image
                src="/images/modern-team/Team Photo Square.png"
                alt="The Hargrove Group"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>

            {/* Content */}
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-4 font-sans">Our Team</p>
              <h2
                className="text-2xl lg:text-4xl font-bold text-[#111827] mb-5 leading-snug"
                style={{ fontFamily: 'var(--font-inter, system-ui)' }}
              >
                Meet the Hargrove Group
              </h2>
              <div className="w-10 h-0.5 bg-[#1A2D5A] mb-7" />
              <p className="text-[#6B7280] text-base leading-relaxed font-sans mb-10">
                Sarah and Michael Hargrove, alongside their dedicated team, have spent over a decade helping Houston families buy and sell with confidence. With deep roots in the Inner Loop, Memorial, and Houston's premier suburbs, the Hargrove Group brings local knowledge, honest counsel, and a full-service approach to every transaction — from first conversation to closing day.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/modern-team/about"
                  className="px-8 py-4 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-[#243870] transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Featured Testimonials */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1764509063612-808d0c0aceaa?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0F1E3E]/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs tracking-[0.4em] uppercase text-white/50 mb-3 font-sans text-center">What Clients Say</p>
          <h2 className="text-2xl lg:text-4xl font-bold text-white text-center mb-10" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>Testimonials</h2>
          <TestimonialsSlider />
        </div>
      </section>
      {/* Featured Active Listings */}
      <section className="bg-[#EEF1F7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-3 font-sans">Featured Properties</p>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
              Homes For Sale in Houston
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {FEATURED_LISTINGS.filter(l => l.status === 'For Sale').slice(0, 3).map((listing) => (
              <Link
                key={listing.slug}
                href={`/modern-team/featured-listings/${listing.slug}`}
                className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#1A2D5A]/6 transition-shadow duration-300 group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={listing.photos[0]}
                    alt={listing.address}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A2D5A]/85 backdrop-blur-sm text-white text-[12px] font-semibold rounded-md tracking-wide uppercase font-sans">
                    {listing.status}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#111827] leading-snug mb-1" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                    {listing.address}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-[#6B7280] font-sans mb-4">
                    <MapPin size={12} className="flex-shrink-0 text-[#4B6090]" />
                    {listing.neighborhood}, Houston TX
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-[#1A2D5A]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                      {listing.listPrice}
                    </span>
                    <span className="text-xs text-[#9CA3AF] font-sans">list price</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#4B5563] font-sans mb-4">
                    <span className="flex items-center gap-1.5"><Bed size={13} className="text-[#4B6090]" />{listing.beds} bd</span>
                    <span className="flex items-center gap-1.5"><Bath size={13} className="text-[#4B6090]" />{listing.baths} ba</span>
                    <span className="flex items-center gap-1.5"><Square size={13} className="text-[#4B6090]" />{listing.sqft} sf</span>
                  </div>
                  <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
                    <span className="text-[12px] px-2.5 py-1 rounded-full border border-[#D5DBE9] text-[#4B6090] font-sans">{listing.type}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A2D5A] font-sans">View Details <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/modern-team/featured-listings"
              className="px-10 py-4 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-[#243870] transition-colors duration-200"
            >
              View All Listings
            </Link>
          </div>
        </div>
      </section>
      {/* Home Valuation CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1593354048859-edbb4165e765?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-28 flex flex-col items-start sm:items-center text-left sm:text-center">
          <div className="max-w-3xl w-full">
            <p className="text-xs tracking-[0.4em] uppercase text-white/45 mb-5 font-sans">
              Free · No Obligation · Houston, TX
            </p>
            <h2
              className="text-2xl lg:text-4xl font-bold text-white text-center mb-10"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              What Is Your Houston Home Worth?
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-center gap-x-6 gap-y-3 mb-10">
              {['Live Houston MLS Data', 'Expert Agent Analysis', 'No Obligation, Ever'].map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/60 flex-shrink-0">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-white/80 font-sans">{b}</span>
                </div>
              ))}
            </div>
            <ValuationHeroBar />
            <p className="text-xs text-white/30 font-sans mt-3">
              A Hargrove Group agent will follow up within 24 hours with your personalized report.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Neighborhoods */}
      <section className="bg-[#FAFAF8] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-3 font-sans">Explore Houston</p>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
              Neighborhood Guides
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {FEATURED_NEIGHBORHOODS.map(hood => (
              <Link
                key={hood.slug}
                href={`/modern-team/neighborhoods/${hood.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl block"
              >
                <Image
                  src={hood.image}
                  alt={hood.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E3E]/90 via-[#0F1E3E]/20 to-transparent group-hover:from-[#0F1E3E]/95 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-bold text-white text-xl leading-tight mb-1">{hood.name}</h3>
                  <div className="w-8 h-px bg-white/40 mb-3" />
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2 font-sans mb-4">{hood.tagline}</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[12px] text-white/40 uppercase tracking-wide font-sans">Median Price</p>
                      <p className="text-sm font-bold text-white">{hood.medianPrice}</p>
                    </div>
                    <div className="border-l border-white/20 pl-4">
                      <p className="text-[12px] text-white/40 uppercase tracking-wide font-sans">Listings</p>
                      <p className="text-sm font-bold text-white">{hood.activeListings}</p>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-white/50 group-hover:text-white transition-colors duration-300 font-sans">
                      Explore <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/modern-team/neighborhoods"
              className="px-10 py-4 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-[#243870] transition-colors duration-200"
            >
              View All Neighborhoods
            </Link>
          </div>
        </div>
      </section>
      {/* Featured Blog */}
      <section className="bg-[#EEF1F7] pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-3 font-sans">Insights & Guides</p>
              <h2 className="text-2xl lg:text-4xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                Houston Market Blog
              </h2>
            </div>
            <Link href="/modern-team/blog" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A2D5A] font-sans tracking-wide group">
              View All Articles <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>

          {/* Featured article — editorial split */}
          <Link
            href="/modern-team/blog/houston-real-estate-market-report-2024"
            className="group grid lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-[#E5E7EB] mb-8 block"
          >
            <div className="relative lg:col-span-3 aspect-[16/9] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
              <Image
                src="https://plus.unsplash.com/premium_photo-1734545294120-3aa935de792d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="2024 Houston Real Estate Market Report"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute top-5 left-5 px-3 py-1.5 bg-[#1A2D5A] text-white text-[12px] tracking-[0.2em] uppercase rounded font-sans">
                Market Report
              </span>
            </div>
            <div className="lg:col-span-2 bg-white px-8 py-10 lg:px-12 lg:py-14 flex flex-col justify-center">
              <p className="text-xs text-[#9CA3AF] font-sans mb-4">October 28, 2024 · 8 min read</p>
              <h3
                className="text-lg lg:text-xl font-bold text-[#111827] leading-tight mb-5 group-hover:text-[#1A2D5A] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-inter, system-ui)' }}
              >
                2024 Houston Real Estate Market Report
              </h3>
              <div className="w-10 h-0.5 bg-[#1A2D5A]/30 mb-5" />
              <p className="text-[#6B7280] text-sm leading-relaxed font-sans mb-8">
                A deep dive into Houston home prices, inventory, days on market, and what buyers and sellers can expect heading into 2025. Key takeaways: inventory is rising, prices are stabilizing, and it's the most balanced market in three years.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A2D5A] font-sans">
                Read Article <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
              </span>
            </div>
          </Link>

          {/* Secondary articles — editorial list */}
          <div className="divide-y divide-[#E5E7EB]">
            {[
              { slug: 'heights-vs-montrose-guide',      category: 'Neighborhood Guide', date: 'Sep 14, 2024', title: 'The Heights vs. Montrose: Which Neighborhood Fits Your Life?' },
              { slug: 'first-time-buyer-houston-guide', category: "Buyer's Guide",      date: 'Aug 5, 2024',  title: "A First-Time Buyer's Complete Guide to Houston" },
              { slug: 'houston-suburbs-compared-2024',  category: 'Neighborhood Guide', date: 'Jul 18, 2024', title: 'Sugar Land vs. The Woodlands vs. Katy: Which Suburb Is Right for You?' },
            ].map(post => (
              <Link
                key={post.slug}
                href={`/modern-team/blog/${post.slug}`}
                className="group flex items-center gap-5 py-5 hover:bg-[#EEF1F7]/50 -mx-4 px-4 rounded-lg transition-colors duration-200"
              >
                <span className="hidden sm:inline-block flex-shrink-0 text-[12px] px-2.5 py-1 rounded-full border border-[#D5DBE9] text-[#4B6090] font-sans whitespace-nowrap">
                  {post.category}
                </span>
                <h4 className="flex-1 text-sm font-semibold text-[#111827] group-hover:text-[#1A2D5A] transition-colors leading-snug">
                  {post.title}
                </h4>
                <span className="hidden md:block flex-shrink-0 text-xs text-[#9CA3AF] font-sans">{post.date}</span>
                <span className="flex-shrink-0 text-xs font-semibold text-[#1A2D5A] group-hover:translate-x-1 transition-transform duration-200 font-sans">→</span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#EEF1F7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 rounded-xl overflow-hidden shadow-lg">

            {/* Left — form */}
            <div className="bg-[#FAFAF8] px-8 py-16 lg:px-16 lg:py-24">
              <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-4 font-sans">Stay Informed</p>
              <h2
                className="text-2xl lg:text-4xl font-bold text-[#111827] mb-5 leading-snug"
                style={{ fontFamily: 'var(--font-inter, system-ui)' }}
              >
                Get Houston Real Estate Market Updates
              </h2>
              <div className="w-12 h-0.5 bg-[#1A2D5A]/30 mb-6" />
              <p className="text-[#6B7280] font-sans text-sm leading-relaxed mb-8">
                Join thousands of Houston buyers and sellers who rely on our monthly market reports, neighborhood price trends, and new listing alerts to make smarter real estate decisions.
              </p>

              <ModernTeamNewsletterForm consentId="newsletter-consent" />
            </div>

            {/* Right — image */}
            <div className="relative hidden lg:block min-h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1616486701797-0f33f61038ec?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Houston real estate market"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>
      {/* Work With Us */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=80"
          alt=""
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#0F1E3E]/60" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 text-center py-20">
          <h2
            className="text-2xl lg:text-4xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-inter, system-ui)' }}
          >
            Let's Get Started in Houston Real Estate
          </h2>
          <div className="w-16 h-px bg-white/40 mx-auto mb-8" />
          <p className="text-white/70 text-base lg:text-lg font-sans leading-relaxed mb-10 max-w-xl mx-auto">
            Buying, selling, or just exploring your options — the Hargrove Group is here to give you honest guidance, local expertise, and the attentive service you deserve.
          </p>
          <ModalTrigger className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-white hover:text-[#1A2D5A] transition-all duration-300 cursor-pointer">
            Contact Us
          </ModalTrigger>
        </div>
      </section>
    </>
  )
}
