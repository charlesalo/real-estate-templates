'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HomeValuationWidget from '@/components/lead-tools/HomeValuationWidget'


export default function HomeValuationClient({ googleMapsKey }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <>
      {/* ── Hero ── */}
      <div ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Parallax video background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-[-15%]"
            style={{ y: videoY }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="/images/luxury-agent/xtra1.jpg"
            >
              <source src="/images/luxury-agent/home-val-video.mov" type="video/quicktime" />
              <source src="/images/luxury-agent/home-val-video.mov" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-[#0A0A0A]/72" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-8 pt-32 pb-20 text-center">

          <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] font-sans mb-6">
            Free Home Valuation
          </p>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-6 leading-tight">
            How Much is Your Home Worth?
          </h1>

          <p className="text-white/50 font-sans text-sm sm:text-base lg:text-lg mb-10 leading-relaxed max-w-xs sm:max-w-none">
            Get a free, accurate home valuation based on current market data and local expertise.
          </p>

          <div className="w-full max-w-2xl">
            <HomeValuationWidget
              agentName="Victoria Sinclair"
              googleMapsKey={googleMapsKey}
            />
          </div>

          <p className="mt-6 text-[12px] text-white/25 font-sans max-w-sm leading-relaxed">
            No obligation. Your information is kept strictly confidential.
          </p>

        </div>
      </div>

      {/* ── About the Valuation ── */}
      <section className="bg-[#0D0D0D] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24">

          {/* Left: intro + CTA */}
          <div>
            <div>
              <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] font-sans mb-6">
                Your Property&apos;s True Value
              </p>
              <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-normal text-white mb-8 leading-tight">
                What Is Your Beverly Hills Home Worth?
              </h2>
              <div className="space-y-5 text-white/50 font-sans text-sm lg:text-base leading-relaxed">
                <p>
                  In the ultra-luxury markets of Beverly Hills, Bel Air, and Holmby Hills, a home&apos;s value is shaped by far more than square footage. Architectural provenance, view corridors, privacy, land position, and the subtle prestige of a specific address all weigh meaningfully on price — nuances that automated tools consistently miss.
                </p>
                <p>
                  Victoria&apos;s assessments draw on $1.2B+ in closed sales, an active off-market network, and a Comparative Market Analysis built from real transaction data — not algorithmic estimates. Whether you&apos;re preparing to sell, refinance, or simply take stock of your wealth, her analysis gives you the clarity to act with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Right: why it matters */}
          <div className="divide-y divide-white/[0.06]">
            {[
              {
                label: 'Selling',
                title: 'Price With Precision',
                body: 'Overpricing — even modestly — stigmatizes a listing in this market. Victoria\'s valuation gives you a defensible number that attracts serious buyers from day one and protects against concessions at the table.',
              },
              {
                label: 'Refinancing',
                title: 'Leverage Your Equity',
                body: 'Lenders base loan amounts on your home\'s appraised value. Knowing where you stand unlocks better refinance terms and determines whether a HELOC makes sense right now.',
              },
              {
                label: 'Estate Planning',
                title: "Protect What You've Built",
                body: 'For high-net-worth individuals, a primary residence is often the largest asset in an estate. Victoria coordinates with attorneys and wealth advisors to provide the documented figures needed for trusts, gifting strategies, and succession planning.',
              },
              {
                label: 'Market Timing',
                title: 'Know When to Move',
                body: 'The Los Angeles luxury market moves in cycles. Understanding your home\'s current value relative to market conditions lets you time a sale or purchase with clarity — not guesswork.',
              },
            ].map((item, i, arr) => (
              <div key={item.label} className={`flex gap-6 ${i === 0 ? 'pb-8' : i === arr.length - 1 ? 'pt-8' : 'py-8'}`}>
                <div className="pt-1 flex-shrink-0 w-36">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E]/60 font-sans">{item.label}</span>
                </div>
                <div>
                  <h3 className="font-heading text-lg lg:text-xl font-normal text-white mb-2">{item.title}</h3>
                  <p className="text-white/45 font-sans text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
