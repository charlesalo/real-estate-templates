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
    <>
      {/* ─── Header ─── */}
      <section className="pt-[112px] pb-[96px] lg:pt-[144px] lg:pb-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Eyebrow with rule */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] whitespace-nowrap">
              Neighborhood Guides
            </span>
            <div className="h-px flex-1 bg-[#BEB7A9]" />
          </div>

          <h1
            className="text-[43px] lg:text-[58px] font-normal text-[#24180F] leading-[1.05] mb-5"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            The blocks, walked<br />
            <em className="text-[#1B3B2B]">one street at a time.</em>
          </h1>
          <p className="text-[16px] text-[#2C1E11]/50 max-w-xl leading-relaxed">
            Neighborhood guides across Manhattan and Brooklyn — each one researched,
            photographed and written in the field. The kind of intel Zillow won&apos;t give you.
          </p>
        </div>
      </section>

      {/* ─── Grid ─── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
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
    </>
  )
}
