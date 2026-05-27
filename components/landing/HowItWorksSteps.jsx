'use client'

import { useEffect, useRef, useState } from 'react'

const STEPS = [
  { num: '01', title: 'Pick a template', body: 'Browse Modern Team or Luxury Agent. Preview the live demo and pick the one that fits your brand.' },
  { num: '02', title: 'We customize it', body: 'Your logo, colors, headshots, bios, and listings. We connect your MLS feed and configure lead routing.' },
  { num: '03', title: 'We launch it', body: 'Your site goes live on your domain — fast, SEO-ready, and built to convert from day one.' },
]

// Duration of each connector fill in ms — connector 1 starts at 0, connector 2 starts after this delay
const FILL_DURATION = 700
const FILL_GAP = 100

export default function HowItWorksSteps() {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect() } },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      {STEPS.map(({ num, title, body }, i) => (
        <div key={num} className="relative">
          {/* Circle */}
          <div
            className="relative z-10 w-14 h-14 rounded-full border border-[#2a2a2a] bg-[#1c1c1c] flex items-center justify-center mb-5 text-sm font-bold text-[#c4a882]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {num}
          </div>

          {/* Animated connector — extends from right of circle through gap to next column */}
          {i < STEPS.length - 1 && (
            <div
              className="hidden md:block absolute h-px bg-[#2a2a2a] overflow-hidden"
              style={{ top: '27px', left: '56px', right: '-32px' }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#c4a882]/70 to-[#c4a882]"
                style={{
                  transformOrigin: 'left',
                  transform: triggered ? 'scaleX(1)' : 'scaleX(0)',
                  transition: triggered
                    ? `transform ${FILL_DURATION}ms cubic-bezier(0.4,0,0.2,1) ${i * (FILL_DURATION + FILL_GAP)}ms`
                    : 'none',
                }}
              />
            </div>
          )}

          <h3 className="font-semibold text-[#e2e2e2] mb-2">{title}</h3>
          <p className="text-sm text-[#8a8a8a] leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  )
}
