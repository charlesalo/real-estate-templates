'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PER_PAGE = 10

function paginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

const TESTIMONIALS = [
  {
    name: 'Marcus & Talia Johnson',
    role: 'Buyers',
    neighborhood: 'The Heights',
    date: 'March 2025',
    source: 'Google',
    agent: 'Sarah Hargrove',
    rating: 5,
    text: "We relocated from Atlanta with a tight timeline and had no idea where to start in Houston. Sarah made the entire process feel effortless. She previewed homes for us virtually, negotiated a price $22K below ask, and coordinated the inspection and closing while we were still out of state. We were handed keys on day 45. Truly exceptional service.",
  },
  {
    name: 'Diane Okafor',
    role: 'Seller',
    neighborhood: 'River Oaks',
    date: 'February 2025',
    source: 'Zillow',
    agent: 'Sarah Hargrove',
    rating: 5,
    text: "Sarah sold my River Oaks home in 11 days for $48,000 over asking. Her staging advice was spot-on — she told me exactly what to update and what to leave alone. The photography was stunning, and the pre-market buyer list she maintains meant we had serious interest before the sign ever went in the yard. I wouldn't use anyone else.",
  },
  {
    name: 'Kevin & Priya Nair',
    role: 'Buyers',
    neighborhood: 'Memorial',
    date: 'January 2025',
    source: 'Google',
    agent: 'Michael Hargrove',
    rating: 5,
    text: "Michael is the most patient, knowledgeable buyer's agent we've ever worked with. We looked at homes for four months before finding the right fit in Memorial, and he never once made us feel rushed. When we finally found our home, he negotiated a home warranty and $8,000 in closing cost concessions. We couldn't be happier.",
  },
  {
    name: 'Lena Schwartz',
    role: 'Seller',
    neighborhood: 'Montrose',
    date: 'December 2024',
    source: 'Realtor.com',
    agent: 'Sarah Hargrove',
    rating: 5,
    text: "I was nervous about selling my Montrose townhome — it had some quirks that I thought would turn buyers off. Sarah helped me lean into what made it special, priced it boldly, and delivered three offers in the first weekend. We closed at list price with a leaseback that gave me the time I needed to find my next place. She's a magician.",
  },
  {
    name: 'James & Cora Whitfield',
    role: 'Buyers',
    neighborhood: 'Sugar Land',
    date: 'December 2024',
    source: 'Google',
    agent: 'Jessica Chen',
    rating: 5,
    text: "Jessica went above and beyond for us. We were first-time homebuyers and had a million questions — she answered every single one with patience and clarity. She helped us understand the Fort Bend ISD boundaries, walked us through every cost at closing, and made sure we never felt lost. Our home in Sugar Land is perfect. We are so grateful.",
  },
  {
    name: 'Robert Nguyen',
    role: 'Seller',
    neighborhood: 'Tanglewood',
    date: 'November 2024',
    source: 'Zillow',
    agent: 'Sarah Hargrove',
    rating: 5,
    text: "The Hargrove Group handled my Tanglewood estate sale with the discretion and professionalism that a home of this caliber demands. Sarah personally managed every showing, screened every buyer, and kept me informed without overwhelming me. We closed at $2.1M — a neighborhood comp that will hold for years. Extraordinary work.",
  },
  {
    name: 'Amara & Dayo Adeyemi',
    role: 'Buyers',
    neighborhood: 'Katy',
    date: 'November 2024',
    source: 'Google',
    agent: 'Michael Hargrove',
    rating: 5,
    text: "We moved from Nigeria with school-age children and Katy ISD was the top priority. Michael knew every community, every school attendance zone, and every builder reputation. He helped us avoid two communities with HOA issues and guided us to a home in Cinco Ranch that checked every box. The whole team was warm, professional, and thorough.",
  },
  {
    name: 'Christine Park',
    role: 'Buyer',
    neighborhood: 'Upper Kirby',
    date: 'October 2024',
    source: 'Realtor.com',
    agent: 'Jessica Chen',
    rating: 5,
    text: "Jessica found my Upper Kirby townhome before it hit the market. She knew I wanted walkability and a rooftop, set up alerts, and called me the moment a match came in. We were under contract within 48 hours of listing — no competition. I never thought buying in this market could feel so smooth. Jessica is the real deal.",
  },
  {
    name: 'Paul & Sandra Brennan',
    role: 'Sellers',
    neighborhood: 'The Woodlands',
    date: 'October 2024',
    source: 'Google',
    agent: 'Sarah Hargrove',
    rating: 5,
    text: "We interviewed three teams before choosing the Hargrove Group. Their marketing presentation was on another level — professional video, drone footage, a custom property website. The results matched the presentation: sold in 18 days in a slower market, with terms that let us stay in the home for 45 days post-close. Exactly what we needed.",
  },
  {
    name: 'Monique Delacroix',
    role: 'Buyer',
    neighborhood: 'Midtown',
    date: 'September 2024',
    source: 'Zillow',
    agent: 'Michael Hargrove',
    rating: 5,
    text: "As a single woman buying her first home, I wanted an agent I could trust completely. Michael was that agent. He was honest about every property we toured — the good and the bad — and steered me away from two homes that had red flags. The townhome I bought in Midtown is everything I wanted and more. I refer him to everyone.",
  },
  {
    name: 'Thomas & Grace Obi',
    role: 'Buyers',
    neighborhood: 'Downtown Houston',
    date: 'August 2024',
    source: 'Google',
    agent: 'Jessica Chen',
    rating: 5,
    text: "We specifically wanted a high-rise in Downtown Houston and Jessica knew the buildings inside and out — HOA fees, reserve funds, building management quality, parking situations. She helped us avoid one building with a troubled HOA and found us a 14th-floor unit at 1827 Kirby that is absolutely stunning. We wake up to the skyline every morning.",
  },
  {
    name: 'Bridget & Carlos Reyes',
    role: 'Sellers',
    neighborhood: 'The Heights',
    date: 'July 2024',
    source: 'Realtor.com',
    agent: 'Sarah Hargrove',
    rating: 5,
    text: "Our Heights bungalow had been in the family for 30 years, so selling it was emotional. Sarah treated it — and us — with the utmost respect. She took the time to understand the home's history, communicated its character in the marketing, and found a buyer who truly appreciated what they were getting. We closed above ask and felt great about it.",
  },
]

function StarRating({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#1A2D5A" className="flex-shrink-0">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

const SOURCE_BADGE = {
  Google:       { bg: 'bg-[#EEF1F7]', text: 'text-[#1A2D5A]' },
  Zillow:       { bg: 'bg-[#EEF1F7]', text: 'text-[#1A2D5A]' },
  'Realtor.com':{ bg: 'bg-[#EEF1F7]', text: 'text-[#1A2D5A]' },
}

function TestimonialCard({ item }) {
  const badge = SOURCE_BADGE[item.source] ?? SOURCE_BADGE.Google
  return (
    <article className="bg-white border border-[#D5DBE9] rounded-xl p-8 flex flex-col gap-5 hover:shadow-md hover:shadow-[#1A2D5A]/6 transition-shadow duration-300">

      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <StarRating count={item.rating} />
        <span className={`text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full font-sans ${badge.bg} ${badge.text}`}>
          {item.source}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="text-[#4B5563] text-sm leading-relaxed font-sans flex-1">
        "{item.text}"
      </blockquote>

      {/* Footer */}
      <div className="pt-5 border-t border-[#EEF1F7] flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[#111827]" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
            {item.name}
          </p>
          <p className="text-xs text-[#6B7280] font-sans mt-0.5">
            {item.role} · {item.neighborhood}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wide font-sans">{item.date}</p>
          <p className="text-[10px] text-[#4B6090] font-sans mt-0.5">via {item.agent}</p>
        </div>
      </div>
    </article>
  )
}

export default function TestimonialsGrid() {
  const [page, setPage] = useState(1)
  const gridRef = useRef(null)

  const totalPages = Math.ceil(TESTIMONIALS.length / PER_PAGE)
  const items = TESTIMONIALS.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const goTo = (p) => {
    setPage(p)
    setTimeout(() => {
      if (!gridRef.current) return
      const top = gridRef.current.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top, behavior: 'smooth' })
    }, 0)
  }

  return (
    <div className="py-16 lg:py-24">
      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-14">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            className="p-3 text-[#4B6090] hover:text-[#1A2D5A] transition-colors disabled:opacity-25"
          >
            <ChevronLeft size={20} />
          </button>

          {paginationRange(page, totalPages).map((p, i) =>
            p === '...' ? (
              <span key={`e${i}`} className="w-11 text-center text-base text-[#9CA3AF]">…</span>
            ) : (
              <button
                key={p}
                onClick={() => goTo(p)}
                className={`w-11 h-11 text-base rounded-lg transition-all font-sans ${
                  p === page
                    ? 'bg-[#1A2D5A] text-white font-semibold'
                    : 'text-[#4B6090] hover:bg-[#EEF1F7] hover:text-[#1A2D5A]'
                }`}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            className="p-3 text-[#4B6090] hover:text-[#1A2D5A] transition-colors disabled:opacity-25"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
