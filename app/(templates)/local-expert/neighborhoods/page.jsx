import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NEIGHBORHOODS } from '@/lib/local-expert-data'

export const metadata = {
  title: 'Neighborhoods',
  description: 'Explore NYC neighborhoods — West Village, Tribeca, Brooklyn Heights, DUMBO, Park Slope, and the Upper East Side.',
}

export default function NeighborhoodsPage() {
  return (
    <section className="pt-[112px] pb-[64px] lg:pt-[144px] lg:pb-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-3">Chapter One</p>
        <h1
          className="text-[43px] lg:text-[58px] font-normal text-[#24180F] leading-[1.05] mb-4"
          style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
        >
          The Neighborhood Grid
        </h1>
        <p className="text-[16px] text-[#2C1E11]/50 max-w-xl mb-12">
          Every neighborhood has a personality. These are the six I know well enough to tell you which block to live on.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEIGHBORHOODS.map((n) => (
            <Link key={n.slug} href={`/local-expert/neighborhoods/${n.slug}`} className="group block">
              <article className="rounded-2xl overflow-hidden border border-[#E5E0D8] hover:shadow-md transition-shadow">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={n.image} alt={n.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[12px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-[#2C1E11]">{n.borough}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-[19px] font-normal text-[#24180F] mb-1" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{n.name}</h2>
                  <p className="text-[13px] text-[#24180F]/50 leading-snug mb-4">{n.tagline}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-[12px] text-[#2C1E11]/40">From {n.medianPrice}</span>
                      <span className="text-[12px] text-[#2C1E11]/40">{n.activeListings} listings</span>
                    </div>
                    <ArrowRight size={14} className="text-[#2C1E11]/30 group-hover:text-[#2C1E11] transition-colors" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
