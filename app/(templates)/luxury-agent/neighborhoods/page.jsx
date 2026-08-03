import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ParallaxBanner from '../_components/sections/ParallaxBanner'
import CTASection from '../_components/sections/CTASection'

export const metadata = {
  alternates: { canonical: '/luxury-agent/neighborhoods' },
  title: 'Explore California Neighborhoods',
  description: "Explore Beverly Hills, Bel Air, Holmby Hills, and the Pacific Palisades with Victoria Sinclair — your insider's guide to LA's most coveted neighborhoods.",
}

const HOODS = [
  {
    slug: 'beverly-hills',
    name: 'Beverly Hills',
    tagline: 'The world\'s most storied address.',
    image: 'https://plus.unsplash.com/premium_photo-1725408106567-a77bd9beff7c?w=800&q=80&auto=format&fit=crop',
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
      <ParallaxBanner src="https://images.unsplash.com/photo-1456693906521-44e96e49e85f?q=80&w=2070&auto=format&fit=crop" objectPosition="object-bottom" priority>
        <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] mb-4 font-sans">Explore Los Angeles</p>
        <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white mb-5">Neighborhoods</h1>
        <div className="w-12 h-px bg-[#C9A96E] mb-5" />
        <p className="text-white/45 font-sans text-base max-w-xl leading-relaxed">
          From iconic estates to hidden gems—discover communities that define elevated living.
        </p>
      </ParallaxBanner>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
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
                <p className="text-[12px] tracking-[0.2em] uppercase text-[#C9A96E] font-sans">{hood.stats}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Neighborhood callout ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="border border-white/[0.07] bg-[#0D0D0D] px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[12px] tracking-[0.4em] uppercase text-[#C9A96E] mb-2 font-sans">
              Start Your Search
            </p>
            <h2 className="font-heading text-2xl lg:text-3xl text-white font-normal">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-white/40 text-sm mt-1 font-sans">
              Browse every available listing across LA's most coveted neighborhoods and discover the home you've been waiting for.
            </p>
          </div>
          <Link href="/luxury-agent/listings" className="flex-shrink-0 flex items-center gap-2 px-7 py-3.5 text-[12px] tracking-[0.2em] uppercase border border-white/25 text-white/70 hover:border-white hover:text-white transition-all font-sans whitespace-nowrap">
            Search All Homes <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      <CTASection
        background={{ image: '/images/luxury-agent/work-with-me.jpg' }}
        headline="Ready to Work Together?"
        subheadline="Whether buying, selling, or simply exploring, Victoria is available to guide you."
        cta={{ label: "Let's Connect", modal: true }}
      />
    </div>
  )
}
