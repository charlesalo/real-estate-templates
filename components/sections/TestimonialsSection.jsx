'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TestimonialsSection({
  variant = 'single',
  testimonials = [],
  template = 'luxury-agent',
}) {
  const [active, setActive] = useState(0)
  const isLuxury = template === 'luxury-agent'
  const current = testimonials[active]

  if (!current) return null

  const prev = () => setActive(v => (v - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive(v => (v + 1) % testimonials.length)

  if (variant === 'single' || isLuxury) {
    return (
      <section className={cn('py-24 lg:py-32', isLuxury ? 'bg-[#0A0A0A]' : 'bg-template-bg')}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Quote
              size={44}
              strokeWidth={1}
              className={cn('mx-auto mb-10', isLuxury ? 'text-template-accent/25' : 'text-template-accent/20')}
            />

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'font-heading font-normal leading-snug mb-10',
                  isLuxury
                    ? 'text-2xl md:text-3xl lg:text-4xl text-white'
                    : 'text-xl md:text-2xl lg:text-3xl text-template-fg',
                )}
              >
                &ldquo;{current.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4">
              {current.photo && (
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={current.photo}
                    alt={current.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-left">
                <div className={cn('font-medium text-sm', isLuxury ? 'text-white' : 'text-template-fg')}>
                  {current.name}
                </div>
                {current.location && (
                  <div className={cn('text-xs mt-0.5', isLuxury ? 'text-white/35' : 'text-template-fg/45')}>
                    {current.location}
                  </div>
                )}
              </div>
            </div>

            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-10">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className={cn('p-2 transition-colors', isLuxury ? 'text-white/25 hover:text-white' : 'text-template-fg/30 hover:text-template-fg')}
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-300',
                        i === active
                          ? 'bg-template-accent w-6'
                          : cn('w-1.5', isLuxury ? 'bg-white/20' : 'bg-template-fg/20'),
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className={cn('p-2 transition-colors', isLuxury ? 'text-white/25 hover:text-white' : 'text-template-fg/30 hover:text-template-fg')}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    )
  }

  // Grid variant for modern-team / local-expert
  return (
    <section className="py-24 bg-template-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 border border-template-border bg-template-surface rounded-xl"
            >
              <p className="text-template-fg/70 text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {t.photo && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={t.photo} alt={t.name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <div className="font-medium text-sm text-template-fg">{t.name}</div>
                  {t.location && (
                    <div className="text-xs text-template-fg/40 mt-0.5">{t.location}</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
