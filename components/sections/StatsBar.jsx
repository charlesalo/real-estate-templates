'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

function CountUp({ target, prefix = '', suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
      else setCount(target)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsBar({ stats = [], template = 'luxury-agent' }) {
  const isLuxury = template === 'luxury-agent'

  return (
    <section
      className={cn(
        'py-20 lg:py-28 border-y',
        isLuxury
          ? 'bg-[#0D0D0D] border-white/[0.07]'
          : 'bg-template-surface border-template-border',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'text-center px-4 py-2',
                i > 0 && 'border-l',
                isLuxury ? 'border-white/[0.07]' : 'border-template-border',
              )}
            >
              <div
                className={cn(
                  'font-heading text-4xl lg:text-5xl font-normal mb-2 tabular-nums',
                  isLuxury ? 'text-white' : 'text-template-fg',
                )}
              >
                <CountUp
                  target={stat.numericValue ?? (parseInt(String(stat.value).replace(/\D/g, '')) || 0)}
                  prefix={stat.prefix ?? ''}
                  suffix={stat.suffix ?? ''}
                />
              </div>
              <div
                className={cn(
                  'text-[10px] tracking-[0.3em] uppercase font-sans',
                  isLuxury ? 'text-template-accent' : 'text-template-accent',
                )}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
