'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TESTIMONIALS as ALL_TESTIMONIALS } from './testimonials-data'

// x is a percentage of the motion.div's own width, which equals the shell width.
// Because the shell is responsive (min(560px,100%)), the offsets scale correctly
// on every viewport without any extra JS.
const VARIANTS = {
  center:     { x: '0%',    scale: 1,    opacity: 1   },
  left:       { x: '-56%',  scale: 0.82, opacity: 0.5 },
  right:      { x: '56%',   scale: 0.82, opacity: 0.5 },
  hiddenLeft: { x: '-140%', scale: 0.75, opacity: 0   },
  hidden:     { x: '140%',  scale: 0.75, opacity: 0   },
}

const Z = { center: 20, left: 10, right: 10, hiddenLeft: 1, hidden: 1 }

function getSlot(index, active, total) {
  const diff = ((index - active) % total + total) % total
  const n = diff > total / 2 ? diff - total : diff
  if (n === 0) return 'center'
  if (n === -1) return 'left'
  if (n === 1) return 'right'
  return n < 0 ? 'hiddenLeft' : 'hidden'
}

export default function TestimonialsSlider({ testimonials }) {
  const items = testimonials ?? ALL_TESTIMONIALS
  const [active, setActive] = useState(0)
  const total = items.length

  return (
    <div>
      {/* Track — no overflow-hidden; side cards are clipped by the section's overflow-hidden */}
      <div className="relative h-[400px] mb-2">
        {items.map((t, i) => {
          const slot = getSlot(i, active, total)
          const isCenter = slot === 'center'
          return (
            // Static centering shell — responsive width, instant zIndex update
            <div
              key={i}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'min(560px, 100%)',
                zIndex: Z[slot],
                pointerEvents: isCenter ? 'auto' : 'none',
              }}
            >
              {/* Animated layer — only x/scale/opacity move */}
              <motion.div
                variants={VARIANTS}
                animate={slot}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center gap-4">

                  {/* Author photo */}
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-[#1A2D5A]/10 flex-shrink-0">
                    <Image
                      src={t.photo}
                      alt={t.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <p
                    className="text-xs tracking-[0.35em] uppercase font-semibold text-[#111827]"
                    style={{ fontFamily: 'var(--font-inter, system-ui)' }}
                  >
                    {t.name}
                  </p>

                  {/* Location */}
                  <p className="text-xs text-[#4B6090] font-sans -mt-2">
                    {t.location} · Houston TX
                  </p>

                  {/* Rule */}
                  <div className="w-10 h-px bg-[#1A2D5A]/15 my-1" />

                  {/* Quote */}
                  <p className="text-[#6B7280] text-sm leading-relaxed font-sans line-clamp-4">
                    "{t.quote}"
                  </p>

                  {/* CTA */}
                  <Link
                    href="/modern-team/testimonials"
                    className="mt-2 px-8 py-3 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-[#243870] transition-colors duration-200 inline-block"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Arrow buttons — hidden when there's nothing to navigate */}
      {total > 1 && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActive((i) => (i - 1 + total) % total)}
            aria-label="Previous testimonial"
            className="w-12 h-12 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#1A2D5A] transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => setActive((i) => (i + 1) % total)}
            aria-label="Next testimonial"
            className="w-12 h-12 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#1A2D5A] transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
