import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square } from 'lucide-react'
import ValuationHeroBar from './ValuationHeroBar'
import TestimonialsSlider from './TestimonialsSlider'
import ModalTrigger from '@/components/ui/ModalTrigger'
import { SOLD_PROPERTIES } from '../past-transactions/data'

export const metadata = {
  alternates: { canonical: '/modern-team/home-valuation' },
  title: { absolute: 'Personalized Texas Home Valuation | The Hargrove Group' },
  description: "Find out what your Houston home is worth. Get a free, data-driven valuation from the Hargrove Group — no obligation, no pressure.",
}

const BENEFITS = [
  'Live Houston MLS Data',
  'Expert Agent Analysis',
  'No Obligation, Ever',
]

const WHY = [
  { title: 'Not an AVM Estimate', body: 'Our valuations are prepared by a licensed Houston agent — not a computer algorithm — using actual comparable sales and local market knowledge.' },
  { title: 'Recommended List Price', body: 'You receive a specific recommended price, not a wide range, so you can plan your move with confidence.' },
  { title: 'ROI Improvement Guide', body: 'We show you which updates and repairs deliver the highest return before you list, maximizing your net proceeds.' },
  { title: 'Completely Free', body: 'There is no cost and no obligation to sell. Our goal is to give you honest, useful information about your biggest asset.' },
]

export default function HomeValuationPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1593354048859-edbb4165e765?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-40 pb-20 flex flex-col items-start sm:items-center text-left sm:text-center">
          <div className="max-w-3xl w-full">
            <p className="text-xs tracking-[0.4em] uppercase text-white/45 mb-5 font-sans">
              Free · No Obligation · Houston, TX
            </p>
            <h1
              className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-8"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              What Is Your Houston Home Worth?
            </h1>

            {/* Benefit chips */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-center gap-x-6 gap-y-3 mb-12">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/60 flex-shrink-0">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-white/80 font-sans">{b}</span>
                </div>
              ))}
            </div>

            {/* Address bar */}
            <ValuationHeroBar />
            <p className="text-xs text-white/30 font-sans mt-3">
              A Hargrove Group agent will follow up within 24 hours with your personalized report.
            </p>
          </div>
        </div>
      </div>

      {/* ── Why Us ───────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 lg:mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-3 font-sans">Our Approach</p>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
              Why a Hargrove Group Valuation Is Different
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
            {WHY.map((item, i) => (
              <div key={i} className="px-0 sm:px-8 lg:px-10 first:pl-0 last:pr-0 py-8 sm:py-0">
                <span className="block text-6xl lg:text-7xl font-bold text-[#1A2D5A]/8 leading-none mb-6 select-none" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                  0{i + 1}
                </span>
                <h3 className="font-bold text-[#111827] text-base mb-3" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                  {item.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed font-sans">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof strip ───────────────────────────────────── */}
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
          <p className="text-xs tracking-[0.4em] uppercase text-white/50 mb-3 font-sans text-center">What Sellers Say</p>
          <h2 className="text-2xl lg:text-4xl font-bold text-white text-center mb-10" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>Testimonials</h2>
          <TestimonialsSlider />
        </div>
      </section>

      {/* ── Recent Transactions ──────────────────────────────────── */}
      <section className="bg-[#EEF1F7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-3 font-sans">More Closings</p>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
              Recent Transactions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {SOLD_PROPERTIES.slice(0, 3).map((property) => (
              <Link
                key={property.slug}
                href={`/modern-team/past-transactions/${property.slug}`}
                className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#1A2D5A]/6 transition-shadow duration-300 group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={property.photos[0]}
                    alt={property.address}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#111827]/80 backdrop-blur-sm text-white text-[12px] font-semibold rounded-md tracking-wide uppercase font-sans">
                    Sold
                  </div>
                </div>

                <div className="p-5">
                  <h3
                    className="text-base font-bold text-[#111827] leading-snug mb-1"
                    style={{ fontFamily: 'var(--font-inter, system-ui)' }}
                  >
                    {property.address}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-[#6B7280] font-sans mb-4">
                    <MapPin size={12} className="flex-shrink-0 text-[#4B6090]" />
                    {property.neighborhood}, Houston TX
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-sm font-semibold text-[#4B6090] tracking-wide font-sans">Price Upon Request</span>
                    <span className="text-xs text-[#9CA3AF] font-sans">sold {property.soldDate}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#4B5563] font-sans">
                    <span className="flex items-center gap-1.5">
                      <Bed size={13} className="text-[#4B6090]" />
                      {property.beds} bd
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath size={13} className="text-[#4B6090]" />
                      {property.baths} ba
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Square size={13} className="text-[#4B6090]" />
                      {property.sqft} sf
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/modern-team/past-transactions"
              className="px-10 py-4 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-[#243870] transition-colors duration-200"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* ── Work With Us ─────────────────────────────────────────── */}
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

    </div>
  )
}
