import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PropertyCard from '@/components/real-estate/PropertyCard'
import CTASection from '@/components/sections/CTASection'
import ModalTrigger from '@/components/ui/ModalTrigger'
import LuxuryNeighborhoodAmenities from '@/components/sections/LuxuryNeighborhoodAmenities'
import LuxuryNeighborhoodDemographics from '@/components/sections/LuxuryNeighborhoodDemographics'
import LuxuryNeighborhoodSchools from '@/components/sections/LuxuryNeighborhoodSchools'
import { getListings } from '@/lib/simplyrets'
import { getWalkScore } from '@/lib/walkscore'
import { getNearbyPlaces } from '@/lib/places'
import { getCensusData } from '@/lib/census'
import { getSchools } from '@/lib/schooldigger'

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
    heroImage: 'https://plus.unsplash.com/premium_photo-1725408106567-a77bd9beff7c?w=1600&q=80&auto=format&fit=crop',
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
    zipCode: '90210',
    lat: 34.0736, lng: -118.4004,
  },
  'bel-air': {
    name: 'Bel Air',
    tagline: 'Privacy, prestige, and panoramic views.',
    description: [
      'Bel Air is one of Los Angeles\'s most exclusive residential enclaves, occupying a vast hillside territory between Beverly Hills and Brentwood. Its winding roads, mature oak canopies, and expansive gated estates have attracted generations of Hollywood royalty, tech titans, and global elites.',
      'Properties here range from mid-century modern landmarks to newly constructed contemporary compounds, many exceeding 15,000 square feet with sweeping views of the city lights, ocean, and canyon below.',
      'The neighborhood\'s defining characteristic is its extraordinary privacy — many estates sit on lots exceeding an acre, with private motor courts, guest houses, and resort-caliber amenities entirely screened from the street.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
    stats: [
      { label: 'Median Home Price', value: '$5.8M' },
      { label: 'Active Listings', value: '31' },
      { label: 'Avg. Days on Market', value: '34' },
      { label: 'Neighborhood Area', value: '5.8 sq mi' },
    ],
    highlights: [
      'Sprawling gated estates with exceptional privacy',
      'Panoramic views of city lights and the Pacific Ocean',
      'Walking distance to UCLA and Westwood Village',
      'Proximity to Stone Canyon Reservoir and hiking trails',
      'Minutes from Sunset Strip and Beverly Hills',
      'Home to some of LA\'s most storied architectural landmarks',
    ],
    filterCity: 'Los Angeles',
    zipCode: '90077',
    lat: 34.0956, lng: -118.4523,
  },
  'holmby-hills': {
    name: 'Holmby Hills',
    tagline: 'The Platinum Triangle\'s most exclusive enclave.',
    description: [
      'Holmby Hills — alongside Beverly Hills and Bel Air — forms the legendary Platinum Triangle, the most coveted residential address in Los Angeles. With fewer than 200 homes on streets that rarely see listings, Holmby Hills represents the true apex of the LA luxury market.',
      'The neighborhood is defined by its exceptional scale: lots routinely exceed two acres, and grand estates — many with deep historical provenance — command prices that regularly set records for the entire state of California.',
      'Notable landmarks include the Playboy Mansion estate and the former homes of Bing Crosby, Judy Garland, and Walt Disney. Every home here carries not just monetary value, but cultural weight.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80',
    stats: [
      { label: 'Median Home Price', value: '$8.1M' },
      { label: 'Active Listings', value: '12' },
      { label: 'Avg. Days on Market', value: '52' },
      { label: 'Total Homes', value: '~200' },
    ],
    highlights: [
      'One of the least-transacted luxury markets in the US',
      'Lots exceeding two acres with maximum privacy',
      'Trophy properties with deep historical significance',
      'Central Platinum Triangle location',
      'Adjacent to LA Country Club and Bel Air Country Club',
      'Quiet, tree-lined streets with exceptional security',
    ],
    filterCity: 'Los Angeles',
    zipCode: '90024',
    lat: 34.0730, lng: -118.4232,
  },
  'pacific-palisades': {
    name: 'Pacific Palisades',
    tagline: 'Coastal living at its most refined.',
    description: [
      'Perched above the Pacific Coast Highway between Malibu and Santa Monica, Pacific Palisades offers a rare combination of coastal proximity, canyon serenity, and elite residential character that few neighborhoods in the world can match.',
      'The Palisades attracts buyers seeking a more relaxed, village-like atmosphere without sacrificing luxury. Tree-lined streets, excellent public schools, and a charming downtown make it equally popular with young families and established executives.',
      'From contemporary cliff-top residences with unobstructed ocean views to traditional estates nestled in the canyon below Riviera Country Club, the architectural variety here is exceptional.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80',
    stats: [
      { label: 'Median Home Price', value: '$3.9M' },
      { label: 'Active Listings', value: '54' },
      { label: 'Avg. Days on Market', value: '24' },
      { label: 'Distance to Beach', value: '< 1 mile' },
    ],
    highlights: [
      'Ocean views and coastal canyon living',
      'Award-winning Palisades Charter High School',
      'Riviera Country Club and Will Rogers State Park',
      'Walkable village center with boutiques and dining',
      'Under 30 minutes to Beverly Hills and Century City',
      'Strong community character and low transient traffic',
    ],
    filterCity: 'Pacific Palisades',
    zipCode: '90272',
    lat: 34.0452, lng: -118.5269,
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

  const otherHoods = Object.entries(NEIGHBORHOODS)
    .filter(([s]) => s !== slug)
    .slice(0, 3)
    .map(([s, h]) => ({ slug: s, ...h }))

  const [walkResult, placesResult, censusResult, schoolsResult] = await Promise.allSettled([
    getWalkScore(hood.lat, hood.lng, `${hood.name}, Los Angeles, CA`),
    getNearbyPlaces(hood.lat, hood.lng),
    getCensusData(hood.zipCode),
    getSchools(hood.zipCode, 'CA'),
  ])
  const walkData   = walkResult.status    === 'fulfilled' ? walkResult.value    : null
  const placesData = placesResult.status  === 'fulfilled' ? placesResult.value  : null
  const demo       = censusResult.status  === 'fulfilled' ? censusResult.value  : null
  const schools    = schoolsResult.status === 'fulfilled' ? (schoolsResult.value ?? []) : []

  let listings = []
  try {
    const { listings: raw } = await getListings({ cities: [hood.filterCity], limit: 6 })
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
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-4 font-sans">Neighborhood Guide</p>
          <h1 className="font-heading text-4xl lg:text-6xl font-normal text-white mb-5">{hood.name}</h1>
          <div className="w-12 h-px bg-[#C9A96E] mb-5" />
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
            <ModalTrigger className="block w-full text-center py-4 border border-[#C9A96E] text-[#C9A96E] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all">
              Ask About This Area
            </ModalTrigger>
          </div>
        </div>
      </div>

      {/* Properties grid */}
      {listings.length > 0 && (
        <section className="bg-[#0A0A0A] border-t border-white/10 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-[9px] tracking-[0.45em] uppercase text-[#C9A96E] mb-3 font-sans">MLS Listings</p>
                <h2 className="font-heading text-2xl lg:text-3xl font-normal text-white mb-3">
                  Properties in {hood.name}
                </h2>
                <div className="w-8 h-px bg-[#C9A96E]" />
              </div>
              <Link
                href={`/luxury-agent/listings?q=${encodeURIComponent(hood.name)}`}
                className="shrink-0 px-8 py-3 border border-[#C9A96E] text-[#C9A96E] text-[10px] tracking-[0.25em] uppercase font-sans hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all"
              >
                View All Listings
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map(l => (
                <PropertyCard key={l.id} {...l} template="luxury-agent" variant="default" />
              ))}
            </div>

          </div>
        </section>
      )}

      <LuxuryNeighborhoodAmenities
        neighborhoodName={hood.name}
        walkData={walkData}
        placesData={placesData}
      />

      <LuxuryNeighborhoodDemographics
        neighborhoodName={hood.name}
        demo={demo}
      />

      {schools.length > 0 && (
        <LuxuryNeighborhoodSchools
          neighborhoodName={hood.name}
          schools={schools}
        />
      )}

      {/* Explore Other Neighborhoods */}
      <section className="bg-[#0D0D0D] border-t border-white/10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <p className="text-[9px] tracking-[0.45em] uppercase text-[#C9A96E] mb-3 font-sans">Keep Exploring</p>
          <h2 className="font-heading text-2xl lg:text-3xl font-normal text-white mb-3">
            Explore Other Neighborhoods
          </h2>
          <div className="w-8 h-px bg-[#C9A96E] mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherHoods.map(h => (
              <Link
                key={h.slug}
                href={`/luxury-agent/neighborhoods/${h.slug}`}
                className="group relative aspect-[3/4] overflow-hidden block"
              >
                <Image
                  src={h.heroImage}
                  alt={h.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/95 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-[9px] tracking-[0.4em] uppercase text-[#C9A96E] font-sans mb-3">Neighborhood</p>
                  <h3 className="font-heading text-2xl font-normal text-white leading-tight mb-3">{h.name}</h3>
                  <div className="w-6 h-px bg-[#C9A96E] mb-4" />
                  <p className="text-white/45 text-xs font-sans leading-relaxed line-clamp-2 mb-6">{h.tagline}</p>
                  <div className="flex items-end justify-between">
                    <div className="flex items-center gap-5">
                      <div>
                        <p className="text-[9px] text-white/30 uppercase tracking-widest font-sans mb-1">Median Price</p>
                        <p className="text-sm font-sans font-medium text-white">{h.stats[0].value}</p>
                      </div>
                      <div className="border-l border-white/10 pl-5">
                        <p className="text-[9px] text-white/30 uppercase tracking-widest font-sans mb-1">Listings</p>
                        <p className="text-sm font-sans font-medium text-white">{h.stats[1].value}</p>
                      </div>
                    </div>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 group-hover:text-[#C9A96E] transition-colors font-sans inline-flex items-center gap-1.5">
                      Explore <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/luxury-agent/neighborhoods"
              className="inline-flex items-center gap-3 px-10 py-4 border border-[#C9A96E] text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase font-sans hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-300"
            >
              View All Neighborhoods
            </Link>
          </div>

        </div>
      </section>

      <CTASection
        template="luxury-agent"
        background={{ image: '/images/luxury-agent/work-with-me.jpg' }}
        headline="Ready to Work Together?"
        subheadline="Whether buying, selling, or simply exploring, Victoria is available to guide you."
        cta={{ label: 'Schedule a Consultation', modal: true }}
      />
    </div>
  )
}
