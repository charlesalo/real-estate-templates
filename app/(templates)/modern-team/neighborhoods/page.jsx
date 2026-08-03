import Image from 'next/image'
import Link from 'next/link'
import ModalTrigger from '@/components/ui/ModalTrigger'

export const metadata = {
  alternates: { canonical: '/modern-team/neighborhoods' },
  title: { absolute: 'Find Your Texas Dream Neighborhood | The Hargrove Group' },
  description: 'Explore Houston\'s best neighborhoods — The Heights, River Oaks, Montrose, Memorial, Sugar Land & The Woodlands — with local market insights.',
}

const NEIGHBORHOODS = [
  {
    slug: 'the-heights',
    name: 'The Heights',
    tagline: 'Historic bungalows, walkable streets, and a vibrant local dining scene.',
    description: 'One of Houston\'s oldest neighborhoods, the Heights is beloved for its tree-lined streets, 1920s craftsman homes, and a thriving walkable corridor along 19th Street.',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    medianPrice: '$585K',
    activeListings: 38,
    priceRange: '$350K – $1.2M',
    highlight: 'Inner Loop · Walkable',
  },
  {
    slug: 'river-oaks',
    name: 'River Oaks',
    tagline: "Houston's most prestigious address, framed by mature oaks and grand estates.",
    description: 'River Oaks is synonymous with Houston prestige. Grand estates, meticulously maintained grounds, and proximity to the River Oaks District make it the city\'s most sought-after zip code.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    medianPrice: '$2.4M',
    activeListings: 22,
    priceRange: '$800K – $15M+',
    highlight: 'Ultra-Luxury · Private',
  },
  {
    slug: 'montrose',
    name: 'Montrose',
    tagline: 'Eclectic architecture, world-class dining, and Houston\'s creative heart.',
    description: 'Montrose is Houston\'s most culturally rich neighborhood — a walkable mix of bungalows, townhomes, galleries, restaurants, and nightlife that draws buyers who want city living at its best.',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
    medianPrice: '$475K',
    activeListings: 45,
    priceRange: '$280K – $1.8M',
    highlight: 'Arts District · Nightlife',
  },
  {
    slug: 'memorial',
    name: 'Memorial',
    tagline: 'Established luxury, award-winning schools, and serene bayou greenbelts.',
    description: 'Memorial blends old-money Houston charm with modern luxury. Top-rated Spring Branch ISD schools, Memorial Park, and easy Energy Corridor access make this a perennial favorite.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    medianPrice: '$1.1M',
    activeListings: 31,
    priceRange: '$500K – $5M',
    highlight: 'Top Schools · Memorial Park',
  },
  {
    slug: 'sugar-land',
    name: 'Sugar Land',
    tagline: 'Master-planned communities and outstanding schools southwest of Houston.',
    description: 'Sugar Land is Fort Bend County\'s gem — master-planned communities, excellent schools, low crime, and a growing town center make it the top choice for Houston-area families.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    medianPrice: '$395K',
    activeListings: 64,
    priceRange: '$250K – $900K',
    highlight: 'Fort Bend County · Family-Friendly',
  },
  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    tagline: "North Houston's premier planned community — miles of trails and greenery.",
    description: 'The Woodlands is one of Texas\'s most celebrated planned communities. With 220 miles of trails, exceptional schools, a vibrant Town Center, and dense tree canopy, it offers suburban living at its finest.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    medianPrice: '$465K',
    activeListings: 71,
    priceRange: '$280K – $2.5M',
    highlight: 'Montgomery County · Master-Planned',
  },
  {
    slug: 'katy',
    name: 'Katy',
    tagline: 'Championship schools and affordable master-planned living west of Houston.',
    description: 'Katy ISD is among the best school districts in Texas, and Katy\'s master-planned communities offer outstanding value for families. Energy Corridor commuters especially love its proximity and newer construction.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    medianPrice: '$340K',
    activeListings: 89,
    priceRange: '$220K – $750K',
    highlight: 'Katy ISD · New Construction',
  },
  {
    slug: 'midtown',
    name: 'Midtown',
    tagline: 'Urban energy, new construction townhomes, and unbeatable city access.',
    description: 'Midtown is Houston\'s most dynamic urban neighborhood. New construction townhomes, proximity to the Medical Center, and a walkable restaurant and bar scene attract young professionals and downsizers alike.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    medianPrice: '$380K',
    activeListings: 52,
    priceRange: '$250K – $750K',
    highlight: 'Urban · New Construction',
  },
  {
    slug: 'downtown-houston',
    name: 'Downtown Houston',
    tagline: "Houston's skyline address — high-rise living steps from the city's best.",
    description: "Downtown Houston has evolved into a true live-work-play destination. Luxury high-rises, converted lofts, the Theater District, Discovery Green, and world-class dining make it the most exciting urban address in Texas.",
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    medianPrice: '$420K',
    activeListings: 34,
    priceRange: '$200K – $2.2M',
    highlight: 'High-Rise · City Center',
  },
]

export default function NeighborhoodsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* Header */}
      <div className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=60"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
          <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-4 font-sans">Explore Greater Houston</p>
          <h1
            className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-inter, system-ui)' }}
          >
            Neighborhoods
          </h1>
          <div className="w-12 h-0.5 bg-white/30 mb-6" />
          <p className="text-white/60 text-lg font-sans leading-relaxed">
            Explore the areas we know best — with local market data, school information, and lifestyle insights to help you find your perfect fit.
          </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEIGHBORHOODS.map(hood => (
            <Link
              key={hood.slug}
              href={`/modern-team/neighborhoods/${hood.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl block"
            >
              {/* Image */}
              <Image
                src={hood.image}
                alt={hood.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E3E]/90 via-[#0F1E3E]/20 to-transparent group-hover:from-[#0F1E3E]/95 transition-all duration-500" />

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="font-bold text-white text-xl leading-tight mb-1">{hood.name}</h2>
                <div className="w-8 h-px bg-white/40 mb-3" />
                <p className="text-white/60 text-sm leading-relaxed line-clamp-2 font-sans mb-4">{hood.tagline}</p>

                {/* Stats row */}
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
      </div>

      {/* ── CTA — Search All MLS Listings ────────────────────────── */}
      <section className="bg-[#EEF1F7] border-y border-[#D5DBE9] py-16 lg:py-24">
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
