'use client'

import { useEffect, useRef, useState } from 'react'

function parseValue(value) {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { prefix: '', number: 0, suffix: value }
  return { prefix: match[1], number: parseFloat(match[2]), suffix: match[3] }
}

function StatItem({ stat }) {
  const { prefix, number, suffix } = parseValue(stat.value)
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [count, setCount] = useState(0)
  const startTime = useRef(null)
  const raf = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * number))
      if (progress < 1) raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [inView, number])

  return (
    <div ref={ref}>
      <div
        className="text-2xl lg:text-4xl font-bold text-[#1A2D5A] mb-3 tracking-tight"
        style={{ fontFamily: 'var(--font-inter, system-ui)' }}
      >
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs text-[#6B7280] font-sans uppercase tracking-[0.2em]">
        {stat.label}
      </div>
    </div>
  )
}

export default function StatsCounter({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} />
      ))}
    </div>
  )
}
