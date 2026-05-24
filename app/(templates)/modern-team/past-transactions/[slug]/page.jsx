import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square, Calendar, Home, Phone, Mail, ChevronLeft, Check } from 'lucide-react'
import ModalTrigger from '@/components/ui/ModalTrigger'
import { SOLD_PROPERTIES } from '../data'

const NEIGHBORHOOD_PREVIEWS = {
  'The Heights': {
    slug: 'the-heights',
    tagline: 'Historic bungalows, walkable streets, and a vibrant local dining scene.',
    heroImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
    stats: [{ label: 'Median Price', value: '$585K' }, { label: 'Active Listings', value: '38' }, { label: 'Avg. DOM', value: '21' }],
  },
  'Montrose': {
    slug: 'montrose',
    tagline: "Eclectic architecture and Houston's most vibrant cultural scene.",
    heroImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80',
    stats: [{ label: 'Median Price', value: '$475K' }, { label: 'Active Listings', value: '45' }, { label: 'Avg. DOM', value: '18' }],
  },
  'Memorial': {
    slug: 'memorial',
    tagline: 'Established luxury, award-winning schools, and serene greenbelt living.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    stats: [{ label: 'Median Price', value: '$1.1M' }, { label: 'Active Listings', value: '31' }, { label: 'Avg. DOM', value: '28' }],
  },
  'River Oaks': {
    slug: 'river-oaks',
    tagline: "Houston's most prestigious residential address since 1923.",
    heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    stats: [{ label: 'Median Price', value: '$2.4M' }, { label: 'Active Listings', value: '22' }, { label: 'Avg. DOM', value: '38' }],
  },
  'Sugar Land': {
    slug: 'sugar-land',
    tagline: "Master-planned communities and Fort Bend County's finest schools.",
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    stats: [{ label: 'Median Price', value: '$395K' }, { label: 'Active Listings', value: '64' }, { label: 'Avg. DOM', value: '14' }],
  },
  'The Woodlands': {
    slug: 'the-woodlands',
    tagline: "220 miles of trails, top-ranked schools, and one of Texas's finest planned communities.",
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
    stats: [{ label: 'Median Price', value: '$465K' }, { label: 'Active Listings', value: '71' }, { label: 'Avg. DOM', value: '16' }],
  },
  'Upper Kirby': {
    slug: 'montrose',
    tagline: "Walkable, vibrant, and steps from Houston's best dining and green space.",
    heroImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80',
    stats: [{ label: 'Median Price', value: '$850K' }, { label: 'Active Listings', value: '27' }, { label: 'Avg. DOM', value: '20' }],
  },
  'Tanglewood': {
    slug: 'memorial',
    tagline: 'Classic Houston luxury on tree-lined streets near the Galleria.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    stats: [{ label: 'Median Price', value: '$1.8M' }, { label: 'Active Listings', value: '14' }, { label: 'Avg. DOM', value: '32' }],
  },
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const property = SOLD_PROPERTIES.find(p => p.slug === slug)
  if (!property) return {}
  return {
    title: `${property.address} — Sold ${property.soldDate}`,
    description: `${property.beds} bed · ${property.baths} bath · ${property.sqft} sf in ${property.neighborhood}. Sold ${property.soldDate}.`,
  }
}

export default async function PastTransactionDetailPage({ params }) {
  const { slug } = await params
  const property = SOLD_PROPERTIES.find(p => p.slug === slug)
  if (!property) notFound()

  const similar = SOLD_PROPERTIES.filter(p => p.slug !== slug).slice(0, 3)
  const hood    = NEIGHBORHOOD_PREVIEWS[property.neighborhood]

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* ── Photo hero ───────────────────────────────────────────── */}
      <div className="relative h-[60vh] min-h-[420px] pt-20">
        <Image
          src={property.photos[0]}
          alt={property.address}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-8 pb-10">
          <Link
            href="/modern-team/past-transactions"
            className="flex items-center gap-1.5 text-xs text-white/55 hover:text-white/90 transition-colors font-sans mb-4"
          >
            <ChevronLeft size={13} />
            Past Transactions
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-block px-2.5 py-1 bg-[#111827]/80 backdrop-blur-sm text-white text-[10px] font-semibold rounded-md tracking-wide uppercase font-sans mb-3">
                Sold · {property.soldDate}
              </span>
              <h1
                className="text-3xl lg:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: 'var(--font-inter, system-ui)' }}
              >
                {property.address}
              </h1>
              <div className="flex items-center gap-1.5 mt-2 text-white/65 text-sm font-sans">
                <MapPin size={13} />
                {property.neighborhood} · {property.city}
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-white/75 tracking-wide font-sans">
                Price Upon Request
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Photo strip ──────────────────────────────────────────── */}
      {property.photos.length > 1 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-4">
          <div className="grid grid-cols-3 gap-3">
            {property.photos.slice(1).map((src, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={src} alt={`${property.address} photo ${i + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">

          {/* ── Left column ──────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Property intro */}
            <section>
              <p className="text-xs tracking-[0.35em] uppercase text-[#4B6090] mb-3 font-sans">About This Property</p>
              <h2 className="text-2xl font-bold text-[#111827] mb-5" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                {property.address}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { icon: Bed,      label: 'Bedrooms',  value: property.beds },
                  { icon: Bath,     label: 'Bathrooms', value: property.baths },
                  { icon: Square,   label: 'Sq Ft',     value: property.sqft },
                  { icon: Home,     label: 'Type',      value: property.type },
                  { icon: Calendar, label: 'Year Built', value: property.yearBuilt },
                  { icon: MapPin,   label: 'Lot Size',  value: property.lotSize },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white border border-[#E5E7EB] rounded-xl p-4 text-center">
                    <Icon size={15} className="text-[#4B6090] mx-auto mb-2" />
                    <p className="text-base font-bold text-[#111827]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>{value}</p>
                    <p className="text-[10px] text-[#9CA3AF] font-sans uppercase tracking-wide mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {property.description.map((para, i) => (
                  <p key={i} className="text-[#4B5563] text-base leading-relaxed font-sans">{para}</p>
                ))}
              </div>
            </section>

            {/* Features & Amenities */}
            <section>
              <p className="text-xs tracking-[0.35em] uppercase text-[#4B6090] mb-3 font-sans">Details</p>
              <h2 className="text-2xl font-bold text-[#111827] mb-6" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                Features & Amenities
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9CA3AF] mb-4 font-sans">Features</h3>
                  <ul className="space-y-2.5">
                    {property.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#4B5563] font-sans">
                        <Check size={14} className="text-[#1A2D5A] flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9CA3AF] mb-4 font-sans">Amenities</h3>
                  <ul className="space-y-2.5">
                    {property.amenities.map((a, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#4B5563] font-sans">
                        <Check size={14} className="text-[#1A2D5A] flex-shrink-0 mt-0.5" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Location */}
            <section>
              <p className="text-xs tracking-[0.35em] uppercase text-[#4B6090] mb-3 font-sans">Location</p>
              <h2 className="text-2xl font-bold text-[#111827] mb-6" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                {property.neighborhood}, {property.city}
              </h2>
              <div className="rounded-xl overflow-hidden border border-[#E5E7EB] aspect-[16/7]">
                <iframe
                  title="Property location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address + ', ' + property.city)}&output=embed&z=15`}
                />
              </div>
            </section>

          </div>

          {/* ── Right column — agent card ─────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">

              {/* Transaction summary card */}
              <div className="bg-white border border-[#D5DBE9] rounded-xl p-6">
                <h3 className="text-xs tracking-[0.25em] uppercase text-[#4B6090] mb-5 font-sans">Transaction Summary</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Sale Price',      value: 'Price Upon Request' },
                    { label: 'Closed',          value: property.soldDate },
                    { label: 'Days on Market',  value: `${property.daysOnMarket} days` },
                    { label: 'Represented',     value: property.role.replace('Represented ', '') },
                  ].map((s, i) => (
                    <div key={i} className={i > 0 ? 'pt-4 border-t border-[#EEF1F7]' : ''}>
                      <div className="text-lg font-bold text-[#1A2D5A]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>{s.value}</div>
                      <div className="text-xs uppercase tracking-wide text-[#9CA3AF] mt-0.5 font-sans">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent card */}
              <div className="bg-[#1A2D5A] rounded-xl overflow-hidden">
                <div className="px-6 pt-8 pb-6 text-center border-b border-white/10">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-sans mb-4">Your Agent</p>
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-white/20">
                    <Image src={property.agent.photo} alt={property.agent.name} fill className="object-cover object-top" />
                  </div>
                  <p className="text-white font-bold text-base tracking-wide" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                    {property.agent.name}
                  </p>
                  <p className="text-white/50 text-xs font-sans mt-1">{property.agent.title}</p>
                </div>
                <div className="px-6 py-5 space-y-3">
                  <a
                    href={`tel:${property.agent.phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors font-sans"
                  >
                    <Phone size={13} className="text-white/40 flex-shrink-0" />
                    {property.agent.phone}
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors font-sans"
                  >
                    <Mail size={13} className="text-white/40 flex-shrink-0" />
                    {property.agent.email}
                  </a>
                  <p className="text-[10px] text-white/25 font-sans pt-2 border-t border-white/10">{property.agent.license}</p>
                </div>
                <div className="px-6 pb-6">
                  <ModalTrigger className="w-full py-3.5 bg-white text-[#1A2D5A] text-xs font-bold tracking-[0.2em] uppercase rounded-lg hover:bg-white/90 transition-colors cursor-pointer">
                    Contact Us
                  </ModalTrigger>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Neighborhood ─────────────────────────────────────────── */}
      {hood && (
        <section className="pb-16 lg:pb-24 bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-xs tracking-[0.35em] uppercase text-[#4B6090] mb-10 font-sans">Neighborhood</p>
            <Link
              href={`/modern-team/neighborhoods/${hood.slug}`}
              className="group grid lg:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-[#E5E7EB] hover:shadow-xl hover:shadow-[#1A2D5A]/8 transition-shadow duration-300"
            >
              <div className="relative min-h-[400px] lg:min-h-[500px] overflow-hidden">
                <Image
                  src={hood.heroImage}
                  alt={property.neighborhood}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="bg-white flex flex-col justify-between p-10 lg:p-14">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-[#4B6090] mb-4 font-sans">Houston, TX</p>
                  <h2
                    className="text-3xl lg:text-4xl font-light text-[#111827] tracking-[0.04em] uppercase mb-6 leading-tight"
                    style={{ fontFamily: 'var(--font-inter, system-ui)' }}
                  >
                    {property.neighborhood}
                  </h2>
                  <div className="w-10 h-0.5 bg-[#1A2D5A] mb-6" />
                  <p className="text-[#4B5563] text-base font-sans leading-relaxed mb-10">{hood.tagline}</p>
                  <div className="grid grid-cols-3 gap-4 mb-10">
                    {hood.stats.map(s => (
                      <div key={s.label}>
                        <p className="text-xl font-bold text-[#1A2D5A] mb-0.5" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>{s.value}</p>
                        <p className="text-[10px] text-[#9CA3AF] font-sans uppercase tracking-[0.15em]">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="block sm:inline-flex">
                  <span className="block w-full text-center px-8 py-3.5 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg group-hover:bg-[#243870] transition-colors duration-200">
                    Explore {property.neighborhood}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Similar Transactions ─────────────────────────────────── */}
      <section className="bg-[#EEF1F7] border-y border-[#D5DBE9] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs tracking-[0.35em] uppercase text-[#4B6090] mb-3 font-sans">More Closings</p>
          <h2 className="text-2xl font-bold text-[#111827] mb-10" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
            Recent Transactions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map(p => (
              <Link
                key={p.slug}
                href={`/modern-team/past-transactions/${p.slug}`}
                className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#1A2D5A]/6 transition-shadow duration-300 group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.photos[0]}
                    alt={p.address}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#111827]/80 backdrop-blur-sm text-white text-[10px] font-semibold rounded-md tracking-wide uppercase font-sans">
                    Sold
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#111827] mb-1" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>{p.address}</h3>
                  <div className="flex items-center gap-1 text-sm text-[#6B7280] font-sans mb-3">
                    <MapPin size={12} className="flex-shrink-0 text-[#4B6090]" />
                    {p.neighborhood}, Houston TX
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-sm font-semibold text-[#4B6090] tracking-wide font-sans">Price Upon Request</span>
                    <span className="text-xs text-[#9CA3AF] font-sans">sold {p.soldDate}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#4B5563] font-sans">
                    <span className="flex items-center gap-1.5"><Bed size={13} className="text-[#4B6090]" />{p.beds} bd</span>
                    <span className="flex items-center gap-1.5"><Bath size={13} className="text-[#4B6090]" />{p.baths} ba</span>
                    <span className="flex items-center gap-1.5"><Square size={13} className="text-[#4B6090]" />{p.sqft} sf</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/modern-team/past-transactions"
              className="inline-flex items-center justify-center px-10 py-3.5 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-[#243870] transition-colors duration-200"
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
