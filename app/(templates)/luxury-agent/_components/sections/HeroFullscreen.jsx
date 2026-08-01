'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function HeroFullscreen({
  backgroundVideo,
  backgroundImage,
  eyebrow,
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  overlayOpacity = 0.45,
  agentName,
  agentDre,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">

      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.15]">
        {backgroundVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type={backgroundVideo.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
          </video>
        ) : backgroundImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0A0A0A]" />
        )}
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative h-full flex flex-col"
      >
        {/* Headline — vertically centered; pt-20 on mobile clears the fixed navbar */}
        <div className="flex-1 flex items-center pt-20 md:pt-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="max-w-4xl"
            >
              {eyebrow && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="hidden min-[390px]:block text-[12px] tracking-[0.5em] uppercase text-template-accent mb-7 font-sans"
                >
                  {eyebrow}
                </motion.p>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'font-normal text-white leading-[1.04] tracking-tight mb-8',
                  'font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[86px]',
                )}
              >
                {headline}
              </motion.h1>

              {subheadline && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.65 }}
                  className="text-lg text-white/55 max-w-lg mb-12 leading-relaxed font-sans"
                >
                  {subheadline}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col min-[480px]:flex-row flex-wrap gap-4"
              >
                {ctaPrimary && (
                  ctaPrimary.modal ? (
                    <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
                      className="w-full min-[480px]:w-auto text-center px-9 py-4 text-[12px] tracking-[0.2em] uppercase font-medium transition-opacity duration-200 hover:opacity-85 bg-template-accent text-[#0A0A0A]">
                      {ctaPrimary.label}
                    </button>
                  ) : (
                    <Link href={ctaPrimary.href}
                      className="w-full min-[480px]:w-auto text-center px-9 py-4 text-[12px] tracking-[0.2em] uppercase font-medium transition-opacity duration-200 hover:opacity-85 bg-template-accent text-[#0A0A0A]">
                      {ctaPrimary.label}
                    </Link>
                  )
                )}
                {ctaSecondary && (
                  ctaSecondary.modal ? (
                    <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
                      className="w-full min-[480px]:w-auto text-center px-9 py-4 text-[12px] tracking-[0.2em] uppercase font-medium text-white border border-white/35 hover:border-white/70 hover:bg-white/5 transition-all duration-200">
                      {ctaSecondary.label}
                    </button>
                  ) : (
                    <Link href={ctaSecondary.href}
                      className="w-full min-[480px]:w-auto text-center px-9 py-4 text-[12px] tracking-[0.2em] uppercase font-medium text-white border border-white/35 hover:border-white/70 hover:bg-white/5 transition-all duration-200">
                      {ctaSecondary.label}
                    </Link>
                  )
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Agent DRE compliance — aligned to grid, bottom */}
        {(agentName || agentDre) && (
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pb-10">
            <p className="text-[12px] tracking-[0.35em] uppercase text-white/25 font-sans">
              {agentName}{agentName && agentDre ? '  ·  ' : ''}{agentDre}
            </p>
          </div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => ref.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' })}
        style={{ opacity: contentOpacity }}
        className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 cursor-pointer"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} className="text-white/35" strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  )
}
