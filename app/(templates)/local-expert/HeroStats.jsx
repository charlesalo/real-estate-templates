'use client'

import { useEffect, useRef, useState } from 'react'

function parseValue(str) {
  const match = str.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { prefix: '', number: 0, suffix: str }
  return { prefix: match[1], number: parseFloat(match[2]), suffix: match[3] }
}

function StatCounter({ value, label }) {
  const { prefix, number, suffix } = parseValue(value)
  const [display, setDisplay] = useState(number)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return
        animated.current = true

        // Years count up from 10 below; everything else from 0
        const isYear = number >= 1900 && number <= 2100
        const from = isYear ? number - 10 : 0
        const duration = 1400
        const start = performance.now()

        function tick(now) {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(Math.round(from + (number - from) * eased))
          if (t < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [number])

  return (
    <div ref={ref} className="text-center lg:text-left">
      <div
        className="text-[24px] font-bold text-[#24180F] leading-none tabular-nums"
        style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
      >
        {prefix}{display}{suffix}
      </div>
      <div className="text-[12px] text-[#2C1E11]/40 uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  )
}

export default function HeroStats({ stats }) {
  return (
    <>
      {stats.map((stat) => (
        <StatCounter key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </>
  )
}
