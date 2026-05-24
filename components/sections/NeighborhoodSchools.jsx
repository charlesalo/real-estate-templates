'use client'

import { useState } from 'react'
import { GraduationCap, Star, ExternalLink } from 'lucide-react'

const LEVELS = [
  { key: 'elementary', label: 'Elementary Schools' },
  { key: 'middle',     label: 'Middle Schools'     },
  { key: 'high',       label: 'High Schools'       },
  { key: 'mixed',      label: 'Mixed Schools'      },
]

function StarRating({ rating }) {
  const filled = Math.round(rating ?? 0)
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          className={
            i <= filled
              ? 'fill-[#1A2D5A] text-[#1A2D5A]'
              : 'fill-[#E5E7EB] text-[#E5E7EB]'
          }
        />
      ))}
    </div>
  )
}

function TypeBadge({ isPrivate, isCharter, isMagnet }) {
  const label = isPrivate ? 'Private' : isCharter ? 'Charter' : isMagnet ? 'Magnet' : 'Public'
  return (
    <span className="inline-flex px-2.5 py-1 rounded bg-[#EEF1F7] text-[#1A2D5A] text-[10px] font-semibold uppercase tracking-wide">
      {label}
    </span>
  )
}

const INITIAL_LIMIT = 10

export default function NeighborhoodSchools({ neighborhoodName, schools }) {
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

  const list     = grouped[activeTab] ?? []
  const displayed = showAll ? list : list.slice(0, INITIAL_LIMIT)
  const hasMore   = list.length > INITIAL_LIMIT && !showAll

  return (
    <section className="bg-[#EEF1F7] border-t border-[#D5DBE9] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-2 font-sans">Education</p>
        <h2
          className="text-2xl lg:text-3xl font-bold text-[#111827] mb-2"
          style={{ fontFamily: 'var(--font-inter, system-ui)' }}
        >
          Schools in {neighborhoodName}
        </h2>
        <p className="text-[#6B7280] text-sm font-sans mb-8 max-w-2xl">
          The following schools are within or nearby {neighborhoodName}. Ratings are provided by SchoolDigger and can serve as a starting point for comparing schools in this area.
        </p>

        {/* Level tabs + attribution */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setShowAll(false) }}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-200 font-sans ${
                  activeTab === tab.key
                    ? 'bg-[#1A2D5A] text-white'
                    : 'bg-[#EEF1F7] text-[#4B6090] hover:bg-[#D5DBE9]'
                }`}
              >
                {tab.label} ({grouped[tab.key].length})
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#C4C9D4] font-sans">Data provided by SchoolDigger</p>
        </div>

        {/* Table */}
        <div className="border border-[#D5DBE9] rounded-xl overflow-hidden bg-white">
          {/* Header — desktop only */}
          <div className="hidden md:grid grid-cols-[56px_1fr_140px_130px_160px] gap-4 px-6 py-3 bg-[#1A2D5A]">
            <div />
            {['Name', 'Category', 'Grades', 'School Rating'].map(h => (
              <p key={h} className="text-[10px] tracking-[0.2em] uppercase text-white/70 font-sans">{h}</p>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#EEF1F7]">
            {displayed.map(school => (
              <div
                key={school.id}
                className="grid grid-cols-1 md:grid-cols-[56px_1fr_140px_130px_160px] gap-3 md:gap-4 items-center px-6 py-4 hover:bg-[#FAFAF8] transition-colors"
              >
                {/* Icon */}
                <div className="hidden md:flex w-10 h-10 rounded-full bg-[#1A2D5A] items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} className="text-white" />
                </div>

                {/* Name + address */}
                <div>
                  {school.url ? (
                    <a
                      href={school.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-[#111827] text-sm hover:text-[#1A2D5A] transition-colors leading-tight group"
                    >
                      {school.name}
                      <ExternalLink size={11} className="text-[#9CA3AF] group-hover:text-[#1A2D5A] transition-colors flex-shrink-0" />
                    </a>
                  ) : (
                    <p className="font-semibold text-[#111827] text-sm leading-tight">{school.name}</p>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.name + ' ' + school.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9CA3AF] hover:text-[#1A2D5A] text-xs font-sans mt-0.5 leading-tight transition-colors block"
                  >
                    {school.address}
                  </a>
                </div>

                {/* Category */}
                <div>
                  <TypeBadge isPrivate={school.isPrivate} isCharter={school.isCharter} isMagnet={school.isMagnet} />
                </div>

                {/* Grades */}
                <p className="text-sm text-[#4B5563] font-sans">{school.gradeRange}</p>

                {/* Rating */}
                <div>
                  {school.rating != null ? (
                    <div className="flex items-center gap-2">
                      <StarRating rating={school.rating} />
                      <span className="text-xs font-semibold text-[#374151] font-sans">
                        {school.rating}/5
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#9CA3AF] font-sans">Not rated</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show More */}
        {hasMore && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A2D5A] text-white text-sm font-semibold rounded-lg hover:bg-[#243870] transition-colors duration-200"
            >
              Show More
            </button>
          </div>
        )}


      </div>
    </section>
  )
}
