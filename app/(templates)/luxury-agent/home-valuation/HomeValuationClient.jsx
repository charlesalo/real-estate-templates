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

        <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] font-sans mb-6">
          Free Home Valuation
        </p>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-6 leading-tight whitespace-nowrap">
          How Much is Your Home Worth?
        </h1>

        <p className="text-white/50 font-sans text-base lg:text-lg mb-10 leading-relaxed whitespace-nowrap">
          Get a free, accurate home valuation based on current market data and local expertise.
        </p>

        <div className="w-full max-w-2xl">
          <HomeValuationWidget
            agentName="Victoria Sinclair"
            googleMapsKey={googleMapsKey}
          />
        </div>

        <p className="mt-6 text-[11px] text-white/25 font-sans max-w-sm leading-relaxed">
          No obligation. Your information is kept strictly confidential.
        </p>

      </div>
    </div>
  )
}
