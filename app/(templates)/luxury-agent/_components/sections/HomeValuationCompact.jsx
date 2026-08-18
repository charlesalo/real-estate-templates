'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HomeValuationWidget from '../lead-tools/HomeValuationWidget'

export default function HomeValuationCompact({ googleMapsKey = '' }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const videoY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={containerRef} className="relative h-[75vh] flex flex-col overflow-hidden">

      {/* Parallax video background */}
      <div className="absolute inset-0">
        <motion.div className="absolute inset-[-15%]" style={{ y: videoY }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/images/luxury-agent/home-val-poster.jpg"
          >
            <source src="/images/luxury-agent/home-val-video.webm" type="video/webm" />
            <source src="/images/luxury-agent/home-val-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-[#0A0A0A]/72" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-8 text-center">
        <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] font-sans mb-4">
          Free Home Valuation
        </p>

        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-4 leading-tight text-balance">
          How Much is Your Home Worth?
        </h2>

        <p className="text-white/50 font-sans text-sm lg:text-base mb-8 leading-relaxed max-w-md">
          Get a free, accurate valuation based on current market data and local expertise.
        </p>

        <div className="w-full max-w-2xl">
          <HomeValuationWidget agentName="Victoria Sinclair" googleMapsKey={googleMapsKey} />
        </div>

        <p className="mt-4 text-[12px] text-white/25 font-sans max-w-sm leading-relaxed">
          No obligation. Your information is kept strictly confidential.
        </p>
      </div>
    </section>
  )
}
