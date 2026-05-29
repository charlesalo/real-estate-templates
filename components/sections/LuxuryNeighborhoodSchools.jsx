'use client'

import { useState } from 'react'
import { GraduationCap, Star, ExternalLink } from 'lucide-react'

const LEVELS = [
  { key: 'elementary', label: 'Elementary' },
  { key: 'middle',     label: 'Middle'     },
  { key: 'high',       label: 'High'       },
  { key: 'mixed',      label: 'Mixed'      },
]

function GoldStars({ rating }) {
  const filled = Math.round(rating ?? 0)
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={11}
          className={
            i <= filled
              ? 'fill-[#C9A96E] text-[#C9A96E]'
              : 'fill-white/10 text-white/10'
          }
        />
      ))}
    </div>
  )
}

function TypeBadge({ isPrivate, isCharter, isMagnet }) {
  const label = isPrivate ? 'Private' : isCharter ? 'Charter' : isMagnet ? 'Magnet' : 'Public'
  return (
    <span className="inline-flex px-2.5 py-1 border border-white/10 text-white/45 text-[9px] tracking-[0.15em] uppercase font-sans">
      {label}
    </span>
  )
}

const INITIAL_LIMIT = 10

export default function LuxuryNeighborhoodSchools({ neighborhoodName, schools }) {
  const grouped = {
    elementary: schools.filter(s => s.level === 'elementary'),
    middle:     schools.filter(s => s.level === 'middle'),
    high:       schools.filter(s => s.level === 'high'),
    mixed:      schools.filter(s => s.level === 'mixed'),
  }

  const tabs = LEVELS.filter(l => grouped[l.key].length > 0)
  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? 'elementary')
  const [showAll,   setShowAll]   = useState(false)

  if (!schools.length || !tabs.length) return null

  const list      = grouped[activeTab] ?? []
  const displayed = showAll ? list : list.slice(0, INITIAL_LIMIT)
  const hasMore   = list.length > INITIAL_LIMIT && !showAll

  return (
    <section className="bg-[#111111] border-t border-white/10 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <p className="text-[9px] tracking-[0.45em] uppercase text-[#C9A96E] mb-3 font-sans">Education</p>
        <h2 className="font-heading text-2xl lg:text-3xl font-normal text-white mb-3">
          Schools Near {neighborhoodName}
        </h2>
        <div className="w-8 h-px bg-[#C9A96E] mb-5" />
        <p className="text-white/35 text-xs font-sans mb-10 max-w-2xl leading-relaxed">
          The following schools are within or nearby {neighborhoodName}. Ratings are provided by SchoolDigger and serve as a starting point for comparison.
        </p>

        {/* Level tabs + attribution */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setShowAll(false) }}
                className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-sans font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-[#C9A96E] text-[#0A0A0A]'
                    : 'bg-white/5 text-white/45 border border-white/10 hover:border-white/20 hover:text-white/70'
                }`}
              >
                {tab.label} ({grouped[tab.key].length})
              </button>
            ))}
          </div>
          <p className="text-[10px] text-white/20 font-sans">Data provided by SchoolDigger</p>
        </div>

        {/* Table */}
        <div className="border border-white/10 overflow-hidden">
          {/* Header — desktop */}
          <div className="hidden md:grid grid-cols-[48px_1fr_130px_120px_160px] gap-4 px-6 py-3 bg-[#0D0D0D] border-b border-white/10">
            <div />
            {['Name', 'Category', 'Grades', 'School Rating'].map(h => (
              <p key={h} className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans">{h}</p>
            ))}
          </div>

          {/* Rows */}
          <div className="bg-[#0A0A0A] divide-y divide-white/[0.06]">
            {displayed.map(school => (
              <div
                key={school.id}
                className="grid grid-cols-1 md:grid-cols-[48px_1fr_130px_120px_160px] gap-3 md:gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Icon */}
                <div className="hidden md:flex w-9 h-9 items-center justify-center border border-white/10 flex-shrink-0">
                  <GraduationCap size={16} className="text-[#C9A96E]" strokeWidth={1.5} />
                </div>

                {/* Name + address */}
                <div>
                  {school.url ? (
                    <a
                      href={school.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-white text-sm font-sans font-medium hover:text-[#C9A96E] transition-colors leading-tight group"
                    >
                      {school.name}
                      <ExternalLink size={11} className="text-white/20 group-hover:text-[#C9A96E] transition-colors flex-shrink-0" />
                    </a>
                  ) : (
                    <p className="text-white text-sm font-sans font-medium leading-tight">{school.name}</p>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.name + ' ' + school.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/25 hover:text-[#C9A96E] text-[11px] font-sans mt-0.5 leading-tight transition-colors block"
                  >
                    {school.address}
                  </a>
                </div>

                {/* Type badge */}
                <div>
                  <TypeBadge isPrivate={school.isPrivate} isCharter={school.isCharter} isMagnet={school.isMagnet} />
                </div>

                {/* Grades */}
                <p className="text-sm text-white/45 font-sans">{school.gradeRange}</p>

                {/* Rating */}
                <div>
                  {school.rating != null ? (
                    <div className="flex items-center gap-2">
                      <GoldStars rating={school.rating} />
                      <span className="text-xs text-white/60 font-sans">{school.rating}/5</span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-white/25 font-sans">Not rated</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show more */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-10 py-3.5 border border-white/20 text-white/60 text-[10px] tracking-[0.25em] uppercase font-sans hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
            >
              Show More
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
