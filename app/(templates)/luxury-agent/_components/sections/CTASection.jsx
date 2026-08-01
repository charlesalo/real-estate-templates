'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function CTASection({
  headline,
  subheadline,
  cta,
  background,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [-150, 150])

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32">
      {background?.image ? (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <div style={{ position: 'absolute', inset: 0, transform: 'scale(1.55)', transformOrigin: 'center' }}>
              <motion.div style={{ y: bgY }} className="absolute inset-0">
                <Image src={background.image} alt="" fill className="object-cover" />
              </motion.div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/60" />
        </>
      ) : (
        <div
          className={cn(
            'absolute inset-0',
            background?.color ?? 'bg-[#0D0D0D]',
          )}
        />
      )}

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-14 h-px bg-template-accent mx-auto mb-8" />

          <h2
            className={cn(
              'font-normal leading-tight mb-6',
              'font-heading text-4xl lg:text-5xl text-white',
            )}
          >
            {headline}
          </h2>

          {subheadline && (
            <p className="text-white/55 text-lg max-w-xl mx-auto mb-10 leading-relaxed font-sans">
              {subheadline}
            </p>
          )}

          {cta && (
            cta.modal ? (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
                className={cn(
                  'block min-[480px]:inline-block w-full min-[480px]:w-auto text-center px-10 py-4 text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-200',
                  'bg-template-accent text-[#0A0A0A] hover:opacity-90',
                )}
              >
                {cta.label}
              </button>
            ) : (
              <Link
                href={cta.href}
                className={cn(
                  'block min-[480px]:inline-block w-full min-[480px]:w-auto text-center px-10 py-4 text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-200',
                  'bg-template-accent text-[#0A0A0A] hover:opacity-90',
                )}
              >
                {cta.label}
              </Link>
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}
