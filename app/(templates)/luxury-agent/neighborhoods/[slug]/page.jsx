import { notFound } from 'next/navigation'
import Image from 'next/image'
import PropertyCard from '@/components/real-estate/PropertyCard'
import CTASection from '@/components/sections/CTASection'
import { getListings } from '@/lib/simplyrets'

// Demo neighborhood data — Phase 2 hardcoded per brief
// Phase 3 upgrade: pull from Sanity CMS
const NEIGHBORHOODS = {
  'beverly-hills': {
    name: 'Beverly Hills',
    tagline: 'The pinnacle of Los Angeles luxury living.',
    description: [
      'Beverly Hills is synonymous with prestige. Nestled between the Santa Monica Mountains and the Los Angeles basin, this storied city has been home to Hollywood\'s elite, global business leaders, and discerning collectors for over a century.',
      'The residential neighborhoods span from grand colonial estates along Sunset Boulevard to sleek modernist compounds perched above the city. The iconic streets — Rodeo Drive, Camden, Roxbury, and Carmelina — remain among the most sought-after addresses in the world.',
      'With top-ranked schools, world-class dining, and a walkable commercial district, Beverly Hills offers a lifestyle that is difficult to replicate anywhere else in the country.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    stats: [
      { label: 'Median Home Price', value: '$4.2M' },
      { label: 'Active Listings', value: '47' },
      { label: 'Avg. Days on Market', value: '28' },
      { label: 'City Population', value: '35,000' },
    ],
    highlights: [
      'Rodeo Drive and the Golden Triangle shopping district',
      'Top-ranked Beverly Hills Unified School District',
      'Award-winning restaurants and Michelin-starred dining',
      'Proximity to the Westside, Hollywood, and LAX',
      'Strict building codes preserving neighborhood character',
      'Dedicated Beverly Hills Police Department',
    ],
    filterCity: 'Beverly Hills',
  },
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const hood = NEIGHBORHOODS[slug]
  if (!hood) return {}
  return {
    title: hood.name,
    description: hood.tagline,
  }
}

export default async function NeighborhoodPage({ params }) {
  const { slug } = await params
  const hood = NEIGHBORHOODS[slug]
  if (!hood) notFound()

  let listings = []
  try {
    const raw = await getListings({ cities: [hood.filterCity], limit: 6 })
    listings = raw.map(l => ({
      id: l.mlsId,
      mlsId: l.mlsId,
      price: l.listPrice,
      address: l.address?.full,
      city: l.address?.city,
      beds: l.property?.bedrooms,
      baths: l.property?.bathsFull,
      sqft: l.property?.area,
      status: l.mls?.status ?? 'Active',
      image: l.photos?.[0],
    }))
  } catch { /* non-fatal */ }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] pt-20">
        <Image src={hood.heroImage} alt={hood.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">Neighborhood Guide</p>
          <h1 className="font-heading text-4xl lg:text-6xl font-normal text-white mb-3">{hood.name}</h1>
          <p className="text-white/60 text-lg">{hood.tagline}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-16">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              {hood.description.map((p, i) => (
                <p key={i} className="text-white/60 text-base leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Highlights */}
            <div>
              <h2 className="font-heading text-2xl font-normal text-white mb-6">Neighborhood Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hood.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="w-1 h-1 rounded-full bg-[#C9A96E] mt-2 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Listings */}
            {listings.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-normal text-white mb-8">
                  Properties in {hood.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {listings.map(l => (
                    <PropertyCard key={l.id} {...l} template="luxury-agent" variant="featured" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stats sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0D0D0D] border border-white/10 p-6">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] mb-6 font-sans">
                Market Snapshot
              </h3>
              <div className="space-y-5">
                {hood.stats.map((s, i) => (
                  <div key={i} className={i > 0 ? 'pt-5 border-t border-white/10' : ''}>
                    <div className="font-heading text-2xl font-normal text-white">{s.value}</div>
                    <div className="text-[10px] tracking-widest uppercase text-white/35 mt-1 font-sans">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="/luxury-agent/contact"
              className="block text-center py-4 border border-[#C9A96E] text-[#C9A96E] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all"
            >
              Ask About This Area
            </a>
          </div>
        </div>
      </div>

      <CTASection
        template="luxury-agent"
        background={{ image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80' }}
        headline="Explore More Neighborhoods"
        subheadline="Victoria specializes in Beverly Hills, Bel Air, Holmby Hills, and the Pacific Palisades."
        cta={{ label: 'View All Listings', href: '/luxury-agent/listings' }}
      />
    </div>
  )
}
