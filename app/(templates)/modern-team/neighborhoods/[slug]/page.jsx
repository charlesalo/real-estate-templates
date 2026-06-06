import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getListings } from '@/lib/simplyrets'
import { getCensusData } from '@/lib/census'
import { getWalkScore } from '@/lib/walkscore'
import { getNearbyPlaces } from '@/lib/places'
import NeighborhoodAmenities from '@/components/sections/NeighborhoodAmenities'
import NeighborhoodSchools from '@/components/sections/NeighborhoodSchools'
import { getSchools } from '@/lib/schooldigger'
import ModernTeamPropertyCard from '@/components/real-estate/ModernTeamPropertyCard'
import ModalTrigger from '@/components/ui/ModalTrigger'

const NEIGHBORHOODS = {
  'the-heights': {
    name: 'The Heights',
    tagline: 'Historic bungalows, walkable streets, and a vibrant local dining scene.',
    description: [
      'Houston Heights — simply "the Heights" to Houstonians — is one of the city\'s most beloved urban neighborhoods. Founded in 1891 as a streetcar suburb, the Heights has retained its historic character while evolving into a premier destination for buyers who want Inner Loop living with a genuine community feel.',
      'The neighborhood is anchored by 19th Street, a walkable commercial corridor lined with local restaurants, coffee shops, antique dealers, and boutiques. The surrounding residential blocks feature an exceptional collection of late Victorian and craftsman bungalows, many on elevated lots that give the neighborhood its name.',
      'New construction townhomes have joined the historic fabric in recent years, bringing modern floor plans and price points that attract first-time buyers and downsizers alike. Heights living means being minutes from downtown, Montrose, and the Medical Center — without the high-rise tradeoffs.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80',
    stats: [
      { label: 'Median Home Price',  value: '$585K' },
      { label: 'Active Listings',    value: '38' },
      { label: 'Avg. Days on Market', value: '21' },
      { label: 'Price Range',         value: '$350K–$1.2M' },
    ],
    highlights: [
      'Walkable 19th Street corridor with local shops and restaurants',
      'Historic Victorian and craftsman architecture',
      'Strong community identity and active neighborhood associations',
      'Minutes from downtown Houston and Midtown',
      'White Oak Bayou trail and greenway system',
      'Heights Mercantile and Heights Theater',
    ],
    filterCity: 'Houston',
    zipCode: '77008',
    lat: 29.7933, lng: -95.4061,
  },
  'river-oaks': {
    name: 'River Oaks',
    tagline: "Houston's most prestigious residential address since 1923.",
    description: [
      'River Oaks is Houston\'s most prestigious neighborhood — a masterplan of tree-lined boulevards, grand estates, and manicured grounds that has defined Houston luxury living for over a century. Developed in the 1920s by the Hogg family, River Oaks was designed from the outset as Houston\'s premier residential enclave.',
      'Properties range from stately Georgian and Colonial Revival estates on River Oaks Boulevard to contemporary masterworks on interior streets. Lot sizes are generous by Houston standards, and the neighborhood\'s strict deed restrictions and active civic club have preserved its character through decades of growth.',
      'The River Oaks District — a premier outdoor shopping and dining destination — anchors the neighborhood\'s commercial edge. Nearby Lamar High School is among Houston ISD\'s most sought-after campuses, and the Houston Country Club sits at the neighborhood\'s heart.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80',
    stats: [
      { label: 'Median Home Price',  value: '$2.4M' },
      { label: 'Active Listings',    value: '22' },
      { label: 'Avg. Days on Market', value: '38' },
      { label: 'Price Range',         value: '$800K–$15M+' },
    ],
    highlights: [
      'River Oaks District — luxury retail and fine dining',
      'Houston Country Club within neighborhood boundaries',
      'Deed restrictions preserved since 1923',
      'Zoned to Lamar High School (HISD)',
      'Central location minutes from Galleria and downtown',
      'Exceptional lot sizes and mature landscaping',
    ],
    filterCity: 'Houston',
    zipCode: '77019',
    lat: 29.7522, lng: -95.4231,
  },
  'montrose': {
    name: 'Montrose',
    tagline: "Eclectic architecture and Houston's most vibrant cultural scene.",
    description: [
      'Montrose is where Houston\'s creative class lives. A dense, walkable neighborhood west of downtown, Montrose has long been the city\'s most culturally diverse and architecturally eclectic community — mixing early 20th-century bungalows, mid-century apartments, and contemporary townhomes on streets shaded by mature live oaks.',
      'The neighborhood is a culinary destination, home to some of Houston\'s most acclaimed restaurants, as well as a thriving gallery scene anchored by the Menil Collection and the Rothko Chapel. Richmond Avenue and Westheimer are lined with independent shops, bars, and coffee houses that give Montrose its distinct energy.',
      'Real estate in Montrose reflects this diversity: buyers find everything from modest 1920s cottages to newly built luxury townhomes. It\'s an ideal location for buyers who prioritize walkability, cultural access, and a genuine neighborhood identity over manicured suburbia.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&q=80',
    stats: [
      { label: 'Median Home Price',  value: '$475K' },
      { label: 'Active Listings',    value: '45' },
      { label: 'Avg. Days on Market', value: '18' },
      { label: 'Price Range',         value: '$280K–$1.8M' },
    ],
    highlights: [
      'Menil Collection and Rothko Chapel — world-class art institutions',
      'Walkable dining and nightlife on Westheimer',
      'Mix of historic bungalows and modern townhomes',
      'Minutes from the Medical Center and Museum District',
      'Active community calendar and farmers markets',
      'Buffalo Bayou Park trail access',
    ],
    filterCity: 'Houston',
    zipCode: '77006',
    lat: 29.7430, lng: -95.3998,
  },
  'memorial': {
    name: 'Memorial',
    tagline: 'Established luxury, award-winning schools, and serene greenbelt living.',
    description: [
      'Memorial is Houston\'s established luxury corridor — a collection of prestigious residential enclaves west of the Loop, anchored by Memorial Park and defined by mature trees, bayou greenbelts, and excellent schools. The neighborhood\'s feel is distinctly different from the Inner Loop: larger lots, quieter streets, and a more suburban pace.',
      'Spring Branch ISD is the primary draw for families — its elementary, middle, and high schools consistently rank among the top in Harris County. The neighborhood\'s proximity to the Energy Corridor also makes it a natural choice for energy sector professionals seeking a short commute.',
      'Memorial real estate spans the full price spectrum, from established ranch-style homes on large lots to newly constructed custom estates. Neighborhoods like Hunters Creek Village, Hedwig Village, and Spring Valley Village each have their own civic governments and distinct character within the broader Memorial area.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
    stats: [
      { label: 'Median Home Price',  value: '$1.1M' },
      { label: 'Active Listings',    value: '31' },
      { label: 'Avg. Days on Market', value: '29' },
      { label: 'Price Range',         value: '$500K–$5M' },
    ],
    highlights: [
      'Spring Branch ISD — top-ranked Harris County schools',
      'Memorial Park — 1,500 acres of urban green space',
      'Bayou Bend and Buffalo Bayou trail systems',
      'Energy Corridor proximity for easy commutes',
      'Hunters Creek, Hedwig, and Spring Valley — incorporated villages',
      'Strong deed restrictions maintaining neighborhood character',
    ],
    filterCity: 'Houston',
    zipCode: '77024',
    lat: 29.7638, lng: -95.4962,
  },
  'sugar-land': {
    name: 'Sugar Land',
    tagline: 'Master-planned communities and Fort Bend County\'s finest schools.',
    description: [
      'Sugar Land is consistently ranked among Texas\'s safest and most desirable cities — a fact reflected in its real estate market, which draws buyers from across Greater Houston seeking exceptional schools, master-planned amenities, and suburban quality of life at accessible price points.',
      'Fort Bend ISD is the primary magnet: it is one of the fastest-growing and highest-performing school districts in Texas, with multiple nationally recognized high schools. Communities like New Territory, First Colony, Riverstone, and Telfair offer resort-style amenities, trails, and community pools that few urban neighborhoods can match.',
      'Sugar Land\'s location southwest of Houston along US-59 (I-69) provides direct access to downtown, the Texas Medical Center, and the Energy Corridor. The Sugar Land Town Square provides a pedestrian-friendly downtown experience with retail, restaurants, and a performance venue.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80',
    stats: [
      { label: 'Median Home Price',  value: '$395K' },
      { label: 'Active Listings',    value: '64' },
      { label: 'Avg. Days on Market', value: '24' },
      { label: 'Price Range',         value: '$250K–$900K' },
    ],
    highlights: [
      'Fort Bend ISD — one of Texas\'s top-ranked districts',
      'Master-planned communities with HOA amenities',
      'Sugar Land Town Square — walkable retail and dining',
      'Smart Financial Centre — premier concert venue',
      'Low crime rates and high quality of life rankings',
      'Strong resale values and consistent appreciation',
    ],
    filterCity: 'Sugar Land',
    zipCode: '77479',
    lat: 29.5986, lng: -95.6370,
  },
  'the-woodlands': {
    name: 'The Woodlands',
    tagline: "220 miles of trails, top-ranked schools, and one of Texas's finest planned communities.",
    description: [
      'The Woodlands is one of the most celebrated master-planned communities in the United States — a 28,000-acre development north of Houston that has successfully combined urban amenities with a forested, nature-immersive residential environment.',
      'Developed by George Mitchell starting in 1974, The Woodlands was designed around the preservation of its dense pine and oak forest. The result is a community where homes sit among mature trees, neighborhoods connect via 220 miles of hike-and-bike trails, and commercial development is concentrated in carefully planned village centers.',
      'Conroe ISD and Tomball ISD serve The Woodlands with highly ranked schools, and the community\'s Town Center — anchored by Market Street and The Woodlands Mall — provides a full urban retail and dining experience. The ExxonMobil campus and Houston Methodist Hospital are major employers within the community.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80',
    stats: [
      { label: 'Median Home Price',  value: '$465K' },
      { label: 'Active Listings',    value: '71' },
      { label: 'Avg. Days on Market', value: '27' },
      { label: 'Price Range',         value: '$280K–$2.5M' },
    ],
    highlights: [
      '220 miles of hike-and-bike trails throughout the community',
      'Conroe ISD and Tomball ISD — consistently high-performing schools',
      'Market Street and Town Center — walkable retail and dining',
      'The Cynthia Woods Mitchell Pavilion — premier outdoor amphitheater',
      'Woodlands Waterway — commercial and residential waterway',
      'Major employers including ExxonMobil and Houston Methodist',
    ],
    filterCity: 'The Woodlands',
    zipCode: '77380',
    lat: 30.1588, lng: -95.4613,
  },
  'katy': {
    name: 'Katy',
    tagline: 'Katy ISD, master-planned living, and outstanding value west of Houston.',
    description: [
      'Katy has emerged as one of Greater Houston\'s most desirable suburban destinations, driven by the exceptional reputation of Katy Independent School District — consistently ranked among the top 10 school districts in Texas.',
      'Located along I-10 west of Houston, Katy\'s master-planned communities offer newer construction, excellent amenities, and significantly more space per dollar than Inner Loop alternatives. Communities like Cinco Ranch, Grand Lakes, and Falcon Ranch are perennial favorites for young families.',
      'Katy\'s Energy Corridor adjacency makes it popular with industry professionals, and the area\'s continued commercial growth — anchored by LaCenterra at Cinco Ranch — has created a full-service suburban center that reduces dependence on Houston proper.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80',
    stats: [
      { label: 'Median Home Price',  value: '$340K' },
      { label: 'Active Listings',    value: '89' },
      { label: 'Avg. Days on Market', value: '22' },
      { label: 'Price Range',         value: '$220K–$750K' },
    ],
    highlights: [
      'Katy ISD — top 10 school district in Texas',
      'Master-planned communities with resort amenities',
      'Cinco Ranch and LaCenterra — retail and dining hub',
      'Strong new construction market',
      'I-10 access to Energy Corridor and downtown Houston',
      'Exceptional value relative to Inner Loop alternatives',
    ],
    filterCity: 'Katy',
    zipCode: '77494',
    lat: 29.7856, lng: -95.8245,
  },
  'downtown-houston': {
    name: 'Downtown Houston',
    tagline: "Houston's skyline address — high-rise living steps from the city's best.",
    description: [
      "Downtown Houston has undergone a remarkable transformation over the past two decades, evolving from a strictly nine-to-five business district into one of Texas's most compelling urban live-work-play destinations. Luxury high-rises, converted loft buildings, and boutique residences now share blocks with the city's most iconic towers.",
      'The neighborhood is anchored by Discovery Green — a 12-acre urban park that hosts concerts, festivals, and community events year-round — along with the Theater District, which is second only to New York City in the number of theater seats concentrated in a single district. Minute Maid Park and Toyota Center put major league sports within walking distance.',
      'Real estate ranges from entry-level condos in renovated historic buildings to penthouse residences with panoramic views of the Houston skyline and Buffalo Bayou. Downtown living puts residents minutes from the Texas Medical Center, Midtown, and Montrose — and directly on the METRORail network for commute-free access across the city.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80',
    stats: [
      { label: 'Median Home Price',   value: '$420K' },
      { label: 'Active Listings',     value: '34' },
      { label: 'Avg. Days on Market', value: '19' },
      { label: 'Price Range',         value: '$200K–$2.2M' },
    ],
    highlights: [
      'Discovery Green — 12-acre urban park with year-round programming',
      'Theater District — second-largest in the U.S. by theater seats',
      'Minute Maid Park and Toyota Center within walking distance',
      'METRORail Red, Green, and Purple Lines — citywide transit access',
      'Buffalo Bayou Park and hike-and-bike trails',
      'World-class dining, rooftop bars, and the Houston Farmers Market',
    ],
    filterCity: 'Houston',
    zipCode: '77002',
    lat: 29.7560, lng: -95.3677,
  },
  'midtown': {
    name: 'Midtown',
    tagline: 'Urban energy, new construction townhomes, and unbeatable city access.',
    description: [
      'Midtown is Houston\'s most dynamic urban neighborhood — a transit-connected, walkable district between downtown and Montrose that has seen extraordinary new construction activity over the past decade. The neighborhood\'s grid of new townhomes has attracted young professionals who want urban living without Inner Loop premium pricing.',
      'The Midtown dining and bar scene along Main Street and around the Midtown Arts & Theater Center district is one of Houston\'s best, and the neighborhood\'s proximity to the Texas Medical Center, Rice University, and downtown makes commutes effortless.',
      'Real estate in Midtown skews heavily toward new construction townhomes — three-story units with rooftop decks that offer city views and modern finishes at accessible price points. It\'s one of Houston\'s strongest appreciation markets for urban buyers.',
    ],
    heroImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',
    stats: [
      { label: 'Median Home Price',  value: '$380K' },
      { label: 'Active Listings',    value: '52' },
      { label: 'Avg. Days on Market', value: '16' },
      { label: 'Price Range',         value: '$250K–$750K' },
    ],
    highlights: [
      'METRORail Red Line — direct downtown and Med Center access',
      'Walkable restaurant and bar corridor on Main Street',
      'Strong new construction townhome market',
      'Minutes from Texas Medical Center and Rice University',
      'Midtown Arts & Theater Center',
      'Buffalo Bayou Park proximity',
    ],
    filterCity: 'Houston',
    zipCode: '77004',
    lat: 29.7396, lng: -95.3739,
  },
}


export async function generateMetadata({ params }) {
  const { slug } = await params
  const hood = NEIGHBORHOODS[slug]
  if (!hood) return {}
  return {
    title: `${hood.name} Real Estate`,
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

  const [census, walk, places, schoolsResult] = await Promise.allSettled([
    getCensusData(hood.zipCode),
    getWalkScore(hood.lat, hood.lng, `${hood.name}, Houston, TX`),
    getNearbyPlaces(hood.lat, hood.lng),
    getSchools(hood.zipCode),
  ])
  const demo       = census.status === 'fulfilled' ? census.value        : null
  const walkData   = walk.status   === 'fulfilled' ? walk.value          : null
  const placesData = places.status === 'fulfilled' ? places.value        : null
  const schools    = schoolsResult.status === 'fulfilled' ? (schoolsResult.value ?? []) : []

  let listings = []
  try {
    const { listings: raw } = await getListings({ cities: [hood.filterCity], limit: 6 })
    listings = raw.map(l => ({
      id:      l.mlsId,
      mlsId:   l.mlsId,
      price:   l.listPrice,
      address: l.address?.full,
      city:    l.address?.city,
      state:   l.address?.state,
      beds:    l.property?.bedrooms,
      baths:   l.property?.bathsFull,
      sqft:    l.property?.area,
      status:  l.mls?.status ?? 'Active',
      image:   l.photos?.[0],
    }))
  } catch {}

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] pt-20">
        <Image src={hood.heroImage} alt={hood.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 max-w-7xl mx-auto">
          <Link
            href="/modern-team/neighborhoods"
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors font-sans mb-4 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            All Neighborhoods
          </Link>
          <p className="text-xs tracking-[0.4em] uppercase text-white/50 mb-3 font-sans">Neighborhood Guide</p>
          <h1
            className="text-4xl lg:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'var(--font-inter, system-ui)' }}
          >
            {hood.name}
          </h1>
          <div className="w-10 h-0.5 bg-white/40 mb-4" />
          <p className="text-white/65 text-lg font-sans">{hood.tagline}</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Description */}
            <div className="space-y-5">
              {hood.description.map((para, i) => (
                <p key={i} className="text-[#4B5563] text-base leading-relaxed font-sans">{para}</p>
              ))}
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-bold text-[#111827] mb-5" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                Neighborhood Highlights
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hood.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#4B5563] font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A2D5A] mt-2 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Listings */}
            {listings.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#111827] mb-7" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                  Homes in {hood.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {listings.map(l => (
                    <ModernTeamPropertyCard key={l.id} {...l} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {/* Market stats */}
            <div className="bg-white border border-[#D5DBE9] rounded-xl p-6">
              <h3 className="text-xs tracking-[0.25em] uppercase text-[#4B6090] mb-5 font-sans">Market Snapshot</h3>
              <div className="space-y-4">
                {hood.stats.map((s, i) => (
                  <div key={i} className={i > 0 ? 'pt-4 border-t border-[#EEF1F7]' : ''}>
                    <div className="text-2xl font-bold text-[#1A2D5A]">{s.value}</div>
                    <div className="text-xs uppercase tracking-wide text-[#9CA3AF] mt-0.5 font-sans">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <ModalTrigger className="block w-full text-center py-4 bg-[#1A2D5A] text-white text-sm font-semibold rounded-xl hover:bg-[#243870] transition-colors">
              Ask About This Area
            </ModalTrigger>

            <Link
              href={`/modern-team/listings?q=${encodeURIComponent(hood.name)}`}
              className="block w-full text-center py-4 border-2 border-[#1A2D5A] text-[#1A2D5A] text-sm font-semibold rounded-xl hover:bg-[#1A2D5A] hover:text-white transition-all duration-200"
            >
              Search All {hood.name} Listings
            </Link>
          </div>
        </div>
      </div>

      {/* Amenities — Walk Score + Points of Interest */}
      <NeighborhoodAmenities
        neighborhoodName={hood.name}
        walkData={walkData}
        placesData={placesData}
      />

      {/* Demographics */}
      {demo && (
        <section className="bg-[#FAFAF8] border-t border-[#D5DBE9] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
              <div>
                <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-2 font-sans">By the Numbers</p>
                <h2 className="text-2xl lg:text-4xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                  Community Demographics
                </h2>
              </div>
              <p className="text-[12px] text-[#9CA3AF] font-sans">
                U.S. Census Bureau · ACS 5-Year Estimates · ZIP {demo.zip}
              </p>
            </div>

            {/* Top stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Total Population',       value: demo.population.total },
                { label: 'Median Age',             value: demo.population.medianAge },
                { label: 'Median HH Income',       value: demo.income.medianHousehold },
              ].map(s => (
                <div key={s.label} className="bg-white border border-[#D5DBE9] rounded-xl p-5">
                  <p className="text-[12px] tracking-[0.2em] uppercase text-[#9CA3AF] mb-1 font-sans">{s.label}</p>
                  <p className="text-2xl font-bold text-[#1A2D5A]">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Charts row 1: Age + Race */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* Age Distribution */}
              <div className="bg-white border border-[#D5DBE9] rounded-xl p-6">
                <h3 className="text-xs tracking-[0.25em] uppercase text-[#4B6090] mb-5 font-sans">Age Distribution</h3>
                <div className="space-y-3.5">
                  {demo.age.map(a => (
                    <div key={a.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-[#374151] font-sans">{a.label}</span>
                        <span className="font-semibold text-[#1A2D5A]">{a.pct}%</span>
                      </div>
                      <div className="h-2 bg-[#EEF1F7] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1A2D5A] rounded-full" style={{ width: `${a.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Race / Ethnicity */}
              <div className="bg-white border border-[#D5DBE9] rounded-xl p-6">
                <h3 className="text-xs tracking-[0.25em] uppercase text-[#4B6090] mb-5 font-sans">Race & Ethnicity</h3>
                <div className="space-y-3.5">
                  {demo.race.map(r => (
                    <div key={r.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-[#374151] font-sans">{r.label}</span>
                        <span className="font-semibold text-[#1A2D5A]">{r.pct}%</span>
                      </div>
                      <div className="h-2 bg-[#EEF1F7] rounded-full overflow-hidden">
                        <div className="h-full bg-[#4B6090] rounded-full" style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts row 2: Education + Employment + Housing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Education */}
              {demo.education && (
                <div className="bg-white border border-[#D5DBE9] rounded-xl p-6">
                  <h3 className="text-xs tracking-[0.25em] uppercase text-[#4B6090] mb-5 font-sans">Education (Age 25+)</h3>
                  <div className="space-y-3.5">
                    {demo.education.map(e => (
                      <div key={e.label}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-[#374151] font-sans">{e.label}</span>
                          <span className="font-semibold text-[#1A2D5A]">{e.pct}%</span>
                        </div>
                        <div className="h-2 bg-[#EEF1F7] rounded-full overflow-hidden">
                          <div className="h-full bg-[#1A2D5A] rounded-full" style={{ width: `${e.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Employment */}
              <div className="bg-white border border-[#D5DBE9] rounded-xl p-6">
                <h3 className="text-xs tracking-[0.25em] uppercase text-[#4B6090] mb-5 font-sans">Employment</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Employment Rate',         value: demo.employment.employmentRate },
                    { label: 'Unemployment Rate',       value: demo.employment.unemploymentRate },
                    { label: 'Labor Force Part.',       value: demo.employment.laborParticipation },
                    { label: 'Not in Labor Force',      value: demo.employment.notInLaborForce },
                  ].map((s, i) => (
                    <div key={s.label} className={i > 0 ? 'pt-4 border-t border-[#EEF1F7]' : ''}>
                      <p className="text-[12px] uppercase tracking-wide text-[#9CA3AF] font-sans">{s.label}</p>
                      <p className="text-xl font-bold text-[#1A2D5A] mt-0.5">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Housing */}
              <div className="bg-white border border-[#D5DBE9] rounded-xl p-6">
                <h3 className="text-xs tracking-[0.25em] uppercase text-[#4B6090] mb-5 font-sans">Housing</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Total Housing Units',  value: demo.housing.total },
                    { label: 'Median Home Value',    value: demo.housing.medianValue },
                    { label: 'Median Gross Rent',    value: demo.housing.medianRent },
                  ].map((s, i) => (
                    <div key={s.label} className={i > 0 ? 'pt-4 border-t border-[#EEF1F7]' : ''}>
                      <p className="text-[12px] uppercase tracking-wide text-[#9CA3AF] font-sans">{s.label}</p>
                      <p className="text-xl font-bold text-[#1A2D5A] mt-0.5">{s.value}</p>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-[#EEF1F7]">
                    <p className="text-[12px] uppercase tracking-wide text-[#9CA3AF] font-sans mb-2">Owner vs. Renter</p>
                    <div className="h-2.5 bg-[#EEF1F7] rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#1A2D5A] rounded-l-full" style={{ width: `${demo.housing.ownerPct}%` }} />
                      <div className="h-full bg-[#4B6090]" style={{ width: `${demo.housing.renterPct}%` }} />
                    </div>
                    <div className="flex justify-between text-[12px] text-[#6B7280] mt-1.5 font-sans">
                      <span>Owner {demo.housing.ownerPct}%</span>
                      <span>Renter {demo.housing.renterPct}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Schools */}
      {schools.length > 0 && (
        <NeighborhoodSchools neighborhoodName={hood.name} schools={schools} />
      )}

      {/* Explore Other Neighborhoods */}
      <section className="bg-[#FAFAF8] border-t border-[#D5DBE9] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-3 font-sans">Keep Exploring</p>
          <h2 className="text-2xl lg:text-4xl font-bold text-[#111827] mb-10" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
            Explore Other Neighborhoods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherHoods.map(h => (
              <Link
                key={h.slug}
                href={`/modern-team/neighborhoods/${h.slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl block"
              >
                <Image
                  src={h.heroImage}
                  alt={h.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E3E]/90 via-[#0F1E3E]/20 to-transparent group-hover:from-[#0F1E3E]/95 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-bold text-white text-xl leading-tight mb-1">{h.name}</h3>
                  <div className="w-8 h-px bg-white/40 mb-3" />
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2 font-sans mb-4">{h.tagline}</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[12px] text-white/40 uppercase tracking-wide font-sans">Median Price</p>
                      <p className="text-sm font-bold text-white">{h.stats[0].value}</p>
                    </div>
                    <div className="border-l border-white/20 pl-4">
                      <p className="text-[12px] text-white/40 uppercase tracking-wide font-sans">Listings</p>
                      <p className="text-sm font-bold text-white">{h.stats[1].value}</p>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-white/50 group-hover:text-white transition-colors duration-300 font-sans">
                      Explore <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/modern-team/neighborhoods"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A2D5A] text-white text-sm font-semibold rounded-lg hover:bg-[#243870] transition-colors duration-200"
            >
              View All Neighborhoods
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
