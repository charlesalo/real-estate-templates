import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Bed, Bath, Square } from 'lucide-react'
import { TEAM_MEMBERS } from '../data'
import ModalTrigger from '@/components/ui/ModalTrigger'
import { FEATURED_LISTINGS } from '../../featured-listings/data'
import TestimonialsSlider from '../../home-valuation/TestimonialsSlider'
import { TESTIMONIALS } from '../../home-valuation/testimonials-data'

export function generateStaticParams() {
  return TEAM_MEMBERS.map((m) => ({
    slug: m.name.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const member = TEAM_MEMBERS.find(
    (m) => m.name.toLowerCase().replace(/\s+/g, '-') === slug
  )
  if (!member) return {}
  return {
    alternates: { canonical: `/modern-team/agents/${slug}` },
    title: `About ${member.name}`,
    description: member.bio[0],
  }
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-[#1A2D5A] flex items-center justify-center text-white hover:bg-[#243870] transition-colors duration-200"
    >
      {children}
    </a>
  )
}

export default async function AgentPage({ params }) {
  const { slug } = await params
  const member = TEAM_MEMBERS.find(
    (m) => m.name.toLowerCase().replace(/\s+/g, '-') === slug
  )
  if (!member) notFound()

  const firstName = member.name.split(' ')[0]

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* Page Header */}
      <div className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1582417746335-b781b445c610?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-4 font-sans">Our Team</p>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              About {member.name}
            </h1>
            <div className="w-12 h-0.5 bg-white/30 mb-6" />
            <p className="text-white/60 text-lg font-sans leading-relaxed">
              {member.title} · Hargrove Group
            </p>
          </div>
        </div>
      </div>

      {/* Agent Bio */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Photo */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#EEF1F7]">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-2 font-sans">Agent Details</p>
            <div className="w-8 h-0.5 bg-[#1A2D5A] mb-8" />

            <dl className="space-y-5 mb-8">
              <div>
                <dt className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#111827] font-sans mb-0.5">Email</dt>
                <dd>
                  <a href={`mailto:${member.email}`} className="text-[#1A2D5A] text-sm font-sans hover:underline">
                    {member.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#111827] font-sans mb-0.5">Mobile</dt>
                <dd>
                  <a href={`tel:${member.phone.replace(/\D/g, '')}`} className="text-[#1A2D5A] text-sm font-sans hover:underline">
                    {member.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#111827] font-sans mb-0.5">Address</dt>
                <dd className="text-sm text-[#4B5563] font-sans">{member.address}</dd>
              </div>
              <div>
                <dt className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#111827] font-sans mb-0.5">License #</dt>
                <dd className="text-sm text-[#4B5563] font-sans">{member.license}</dd>
              </div>
            </dl>

            {/* Social icons */}
            <div className="flex items-center gap-3 mb-10">
              {member.social.instagram && (
                <SocialIcon href={member.social.instagram} label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </SocialIcon>
              )}
              {member.social.facebook && (
                <SocialIcon href={member.social.facebook} label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </SocialIcon>
              )}
              {member.social.linkedin && (
                <SocialIcon href={member.social.linkedin} label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </SocialIcon>
              )}
              {member.social.youtube && (
                <SocialIcon href={member.social.youtube} label="YouTube">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                  </svg>
                </SocialIcon>
              )}
            </div>

            {/* Meet section */}
            <h2
              className="text-2xl lg:text-4xl font-bold text-[#111827] mb-6 uppercase tracking-wide"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              Meet {firstName}
            </h2>
            <div className="space-y-4">
              {member.bio.map((para, i) => (
                <p key={i} className="text-[#4B5563] text-base leading-relaxed font-sans">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {(() => {
        const agentTestimonials = TESTIMONIALS.filter((t) => t.agent === member.name)
        const items = agentTestimonials.length >= 3 ? agentTestimonials : TESTIMONIALS
        return (
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
              <h2 className="text-2xl lg:text-4xl font-bold text-white text-center mb-10" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                Testimonials
              </h2>
              <TestimonialsSlider testimonials={items} />
            </div>
          </section>
        )
      })()}

      {/* Agent Listings */}
      {(() => {
        const agentListings = FEATURED_LISTINGS.filter((l) => l.agent.name === member.name)
        if (agentListings.length === 0) return null
        return (
          <section className="bg-[#FAFAF8] py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="mb-10">
                <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-3 font-sans">Active Listings</p>
                <h2 className="text-2xl lg:text-4xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                  {firstName}'s Listings
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {agentListings.map((listing) => (
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
        )
      })()}

      {/* Property Search CTA */}
      <section className="bg-[#EEF1F7] border-y border-[#D5DBE9] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-2xl lg:text-4xl font-bold text-[#111827]"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              Start Your Property Search
            </h2>
            <p className="text-[#6B7280] text-sm font-sans mt-2">Search live Houston MLS listings by neighborhood, price, or ZIP code.</p>
          </div>
          <Link
            href="/modern-team/listings"
            className="flex-shrink-0 px-10 py-4 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-[#243870] transition-colors duration-200"
          >
            Search Properties
          </Link>
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

    </div>
  )
}
