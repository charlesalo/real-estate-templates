import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Neighborhoods',
  description: 'Explore Beverly Hills, Bel Air, Holmby Hills, and the Pacific Palisades with Victoria Sinclair.',
}

const HOODS = [
  {
    slug: 'beverly-hills',
    name: 'Beverly Hills',
    tagline: 'The world\'s most storied address.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    stats: 'Median $4.2M · 47 active listings',
  },
  {
    slug: 'bel-air',
    name: 'Bel Air',
    tagline: 'Privacy, prestige, and panoramic views.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    stats: 'Median $5.8M · 31 active listings',
  },
  {
    slug: 'holmby-hills',
    name: 'Holmby Hills',
    tagline: 'The Platinum Triangle\'s most exclusive enclave.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    stats: 'Median $8.1M · 12 active listings',
  },
  {
    slug: 'pacific-palisades',
    name: 'Pacific Palisades',
    tagline: 'Coastal living at its most refined.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    stats: 'Median $3.9M · 54 active listings',
  },
]

export default function NeighborhoodsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="border-b border-white/10 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">Explore</p>
          <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white">Neighborhood Guides</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {HOODS.map(hood => (
            <Link key={hood.slug} href={`/luxury-agent/neighborhoods/${hood.slug}`} className="group block relative overflow-hidden aspect-[16/9]">
              <Image
                src={hood.image}
                alt={hood.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <h2 className="font-heading text-2xl lg:text-3xl font-normal text-white mb-1">{hood.name}</h2>
                <p className="text-white/50 text-sm mb-3">{hood.tagline}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E] font-sans">{hood.stats}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
