import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, Bed, Bath, Square } from 'lucide-react'
import TestimonialsSlider from '../home-valuation/TestimonialsSlider'
import { SOLD_PROPERTIES } from '../past-transactions/data'
import ModalTrigger from '@/components/ui/ModalTrigger'
import { TEAM_MEMBERS } from '../agents/data'

export const metadata = {
  title: { absolute: 'The Hargrove Group | Real Estate Agents Serving Houston' },
  description: "Meet the Hargrove Group — Houston's trusted real estate team helping buyers and sellers navigate Greater Houston with confidence and local expertise.",
}


export default function AboutPage() {
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
              Meet the Hargrove Group
            </h1>
            <div className="w-12 h-0.5 bg-white/30 mb-6" />
            <p className="text-white/60 text-lg font-sans leading-relaxed">
              Four dedicated professionals committed to making your Houston real estate experience exceptional — from first conversation to closing day.
            </p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM_MEMBERS.map((member) => {
            const slug = member.name.toLowerCase().replace(/\s+/g, '-')
            return (
              <div key={member.name} className="bg-white border border-[#D5DBE9] rounded-2xl overflow-hidden group">
                {/* Photo with hover overlay */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#EEF1F7]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0F1E3E]/0 group-hover:bg-[#0F1E3E]/55 transition-all duration-400 flex items-center justify-center">
                    <Link
                      href={`/modern-team/agents/${slug}`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-2.5 border border-white text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-lg hover:bg-white hover:text-[#1A2D5A] transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-[#111827] mb-0.5" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                    {member.name}
                  </h3>
                  <p className="text-[12px] tracking-[0.15em] uppercase text-[#4B6090] font-sans mb-3">{member.title}</p>

                  <div className="border-t border-[#EEF1F7] pt-3 space-y-1.5">
                    <p className="text-[12px] text-[#9CA3AF] font-sans uppercase tracking-wide">{member.license}</p>
                    <a href={`tel:${member.phone.replace(/\D/g, '')}`} className="flex items-center gap-1.5 text-xs text-[#374151] hover:text-[#1A2D5A] transition-colors font-sans">
                      <Phone size={11} className="text-[#1A2D5A] flex-shrink-0" />
                      {member.phone}
                    </a>
                    <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-xs text-[#374151] hover:text-[#1A2D5A] transition-colors font-sans truncate">
                      <Mail size={11} className="text-[#1A2D5A] flex-shrink-0" />
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials */}
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

      {/* Featured Sold Properties */}
      <section className="bg-[#EEF1F7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-3 font-sans">Proven Results</p>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
              Homes We've Closed
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
                  <h3 className="text-base font-bold text-[#111827] leading-snug mb-1" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                    {property.address}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-[#6B7280] font-sans mb-4">
                    <MapPin size={12} className="flex-shrink-0 text-[#4B6090]" />
                    {property.neighborhood}, Houston TX
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-[#1A2D5A]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                      {property.salePrice}
                    </span>
                    <span className="text-xs text-[#9CA3AF] font-sans">sold {property.soldDate}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#4B5563] font-sans">
                    <span className="flex items-center gap-1.5"><Bed size={13} className="text-[#4B6090]" />{property.beds} bd</span>
                    <span className="flex items-center gap-1.5"><Bath size={13} className="text-[#4B6090]" />{property.baths} ba</span>
                    <span className="flex items-center gap-1.5"><Square size={13} className="text-[#4B6090]" />{property.sqft} sf</span>
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
              View All Transactions
            </Link>
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

    </div>
  )
}
