import Link from 'next/link'
import HomeValuationClient from './HomeValuationClient'
import TestimonialsSection from '../_components/sections/TestimonialsSection'
import FeaturedListingCard from '../_components/listings/FeaturedListingCard'
import CTASection from '../_components/sections/CTASection'
import { PAST_TRANSACTIONS } from '@/lib/featured-listings'

export const metadata = {
  alternates: { canonical: '/luxury-agent/home-valuation' },
  title: 'Personalized California Home Valuation',
  description: 'Find out what your home is worth. Get a free, no-obligation home valuation from Victoria Sinclair — Beverly Hills luxury real estate specialist.',
}

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

export default function HomeValuationPage() {
  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? ''
  return (
    <>
      <HomeValuationClient googleMapsKey={googleMapsKey} />
      <TestimonialsSection
        testimonials={TESTIMONIALS}
        backgroundImage="/images/luxury-agent/testimonials.jpg"
      />

      {/* Recent Closed Sales */}
      <section className="bg-[#0A0A0A] py-14 lg:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">Track Record</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-normal text-white">Recent Closed Sales</h2>
            </div>
            <Link
              href="/luxury-agent/past-transactions"
              className="hidden sm:inline-block text-[12px] tracking-[0.3em] uppercase text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors font-sans"
            >
              View All Past Sales →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAST_TRANSACTIONS.map(listing => (
              <FeaturedListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <Link
              href="/luxury-agent/past-transactions"
              className="text-[12px] tracking-[0.3em] uppercase text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors font-sans"
            >
              View All Past Sales →
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        background={{ image: '/images/luxury-agent/work-with-me.jpg' }}
        headline="Ready to Work Together?"
        subheadline="Whether buying, selling, or simply exploring, Victoria is available to guide you."
        cta={{ label: "Let's Connect", modal: true }}
      />
    </>
  )
}
