'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

const NAVY_SHADES = ['#1A2D5A', '#243870', '#2D4A7A', '#4B6090', '#354F80', '#1F3560']

const RING_SIZE   = 72
const RING_RADIUS = 28
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function ScoreRing({ score }) {
  const offset = CIRCUMFERENCE * (1 - score / 100)
  return (
    <div className="relative flex-shrink-0" style={{ width: RING_SIZE, height: RING_SIZE }}>
      <svg
        width={RING_SIZE}
        height={RING_SIZE}
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="#D5DBE9"
          strokeWidth="5"
        />
        {/* Progress */}
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="#1A2D5A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-base text-[#1A2D5A]">{score}</span>
      </div>
    </div>
  )
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={11}
          className={
            i <= Math.round(rating)
              ? 'fill-[#1A2D5A] text-[#1A2D5A]'
              : 'fill-[#E5E7EB] text-[#E5E7EB]'
          }
        />
      ))}
    </div>
  )
}

function PlaceAvatar({ name }) {
  const color = NAVY_SHADES[name.charCodeAt(0) % NAVY_SHADES.length]
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      {name[0]?.toUpperCase()}
    </div>
  )
}

function CategoryBadge({ catKey, categories }) {
  const cat = categories.find(c => c.key === catKey)
  if (!cat) return null
  return (
    <span className="inline-flex px-2.5 py-1 rounded bg-[#EEF1F7] text-[#1A2D5A] text-[12px] font-semibold uppercase tracking-wide">
      {cat.label}
    </span>
  )
}

const INITIAL_LIMIT = 10

export default function NeighborhoodAmenities({ neighborhoodName, walkData, placesData }) {
  const [activeTab, setActiveTab]   = useState('all')
  const [showAll, setShowAll]       = useState(false)

  const allPlaces = placesData
    ? Object.entries(placesData.places)
        .flatMap(([cat, list]) => list.map(p => ({ ...p, category: cat })))
        .sort((a, b) => a.distance - b.distance)
    : []

  const filtered =
    activeTab === 'all' ? allPlaces : allPlaces.filter(p => p.category === activeTab)

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT)
  const hasMore   = filtered.length > INITIAL_LIMIT && !showAll

  if (!walkData && (!placesData || allPlaces.length === 0)) return null

  const tabs = placesData
    ? [{ key: 'all', label: 'All' }, ...placesData.categories]
    : []

  return (
    <section className="bg-white border-t border-[#D5DBE9] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-2 font-sans">Lifestyle & Amenities</p>
        <h2
          className="text-2xl lg:text-3xl font-bold text-[#111827] mb-10"
          style={{ fontFamily: 'var(--font-inter, system-ui)' }}
        >
          Around {neighborhoodName}
        </h2>

        {/* Walk / Bike / Transit scores */}
        {walkData && (
          <div className="bg-[#EEF1F7] border border-[#D5DBE9] rounded-xl p-6 mb-10">
            <div className="flex flex-wrap gap-8">
              {[
                { ...walkData.walk,    label: 'Walking Score' },
                ...(walkData.bike    ? [{ ...walkData.bike,    label: 'Bike Score'    }] : []),
                ...(walkData.transit ? [{ ...walkData.transit, label: 'Transit Score' }] : []),
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-4 ${i > 0 ? 'pl-8 border-l border-[#D5DBE9]' : ''}`}
                >
                  <ScoreRing score={s.score} />
                  <div>
                    <p className="font-semibold text-[#111827] text-base">{s.description}</p>
                    <p className="text-[12px] tracking-[0.2em] uppercase text-[#9CA3AF] mt-1 font-sans">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Points of interest */}
        {placesData && allPlaces.length > 0 && (
          <div>
            <h3
              className="text-xl font-bold text-[#111827] mb-1"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              Points of Interest
            </h3>
            <p className="text-[#6B7280] text-sm font-sans mb-6">
              Popular destinations nearby, powered by Google Places.
            </p>

            {/* Category tabs + attribution */}
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
                    {tab.label}
                  </button>
                ))}
              </div>
              <p className="text-[12px] text-[#C4C9D4] font-sans">Data provided by Google Places</p>
            </div>

            {/* POI list */}
            <div className="border border-[#D5DBE9] rounded-xl overflow-hidden">
              {/* Table header — desktop only */}
              <div className="hidden md:grid grid-cols-[1fr_160px_90px_170px] gap-4 px-6 py-3 bg-[#1A2D5A]">
                {['Name', 'Category', 'Distance', 'Rating'].map(h => (
                  <p key={h} className="text-[12px] tracking-[0.2em] uppercase text-white/70 font-sans">{h}</p>
                ))}
              </div>

              {/* Rows */}
              <div className="bg-white divide-y divide-[#EEF1F7]">
                {displayed.length > 0 ? displayed.map(place => (
                  <div
                    key={place.id}
                    className="grid grid-cols-1 md:grid-cols-[1fr_160px_90px_170px] gap-3 md:gap-4 items-center px-6 py-4 hover:bg-[#FAFAF8] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <PlaceAvatar name={place.name} />
                      <div>
                        <p className="font-semibold text-[#111827] text-sm leading-tight">{place.name}</p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9CA3AF] hover:text-[#1A2D5A] text-xs font-sans mt-0.5 leading-tight transition-colors block"
                        >
                          {place.address}
                        </a>
                      </div>
                    </div>
                    <div>
                      <CategoryBadge catKey={place.category} categories={placesData.categories} />
                    </div>
                    <p className="text-sm text-[#4B5563] font-sans">{place.distance} mi</p>
                    <div>
                      {place.rating ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <StarRating rating={place.rating} />
                          <span className="text-xs font-semibold text-[#374151] font-sans">
                            {place.rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-[#9CA3AF] font-sans">
                            · {place.reviewCount.toLocaleString()} reviews
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-[#9CA3AF] font-sans">No reviews</span>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="px-6 py-10 text-center text-sm text-[#9CA3AF] font-sans">
                    No places found in this category.
                  </div>
                )}
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
        )}

      </div>
    </section>
  )
}
