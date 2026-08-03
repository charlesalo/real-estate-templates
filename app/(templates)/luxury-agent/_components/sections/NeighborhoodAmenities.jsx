'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

const RING_SIZE   = 76
const RING_RADIUS = 30
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
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="4"
        />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="#C9A96E"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-sans font-semibold text-base text-white">{score}</span>
      </div>
    </div>
  )
}

function GoldStars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={10}
          className={
            i <= Math.round(rating)
              ? 'fill-[#C9A96E] text-[#C9A96E]'
              : 'fill-white/10 text-white/10'
          }
        />
      ))}
    </div>
  )
}

function PlaceAvatar({ name }) {
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-[#C9A96E] text-sm font-semibold flex-shrink-0 font-sans">
      {name[0]?.toUpperCase()}
    </div>
  )
}

const INITIAL_LIMIT = 10

export default function NeighborhoodAmenities({ neighborhoodName, walkData, placesData }) {
  const [activeTab, setActiveTab] = useState('all')
  const [showAll, setShowAll]     = useState(false)

  const allPlaces = placesData
    ? Object.entries(placesData.places)
        .flatMap(([cat, list]) => list.map(p => ({ ...p, category: cat })))
        .sort((a, b) => a.distance - b.distance)
    : []

  const filtered  = activeTab === 'all' ? allPlaces : allPlaces.filter(p => p.category === activeTab)
  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT)
  const hasMore   = filtered.length > INITIAL_LIMIT && !showAll

  if (!walkData && (!placesData || allPlaces.length === 0)) return null

  const tabs = placesData ? [{ key: 'all', label: 'All' }, ...placesData.categories] : []

  return (
    <section className="bg-[#0D0D0D] border-t border-white/10 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <p className="text-[12px] tracking-[0.45em] uppercase text-[#C9A96E] mb-3 font-sans">
          Lifestyle &amp; Amenities
        </p>
        <h2 className="font-heading text-2xl lg:text-3xl font-normal text-white mb-3">
          Around {neighborhoodName}
        </h2>
        <div className="w-8 h-px bg-[#C9A96E] mb-10" />

        {/* Walk / Bike / Transit scores */}
        {walkData && (
          <div className="bg-[#111111] border border-white/10 p-6 mb-10">
            <div className="flex flex-wrap gap-8">
              {[
                { ...walkData.walk,    label: 'Walk Score'    },
                ...(walkData.bike    ? [{ ...walkData.bike,    label: 'Bike Score'    }] : []),
                ...(walkData.transit ? [{ ...walkData.transit, label: 'Transit Score' }] : []),
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-5 ${i > 0 ? 'pl-8 border-l border-white/10' : ''}`}
                >
                  <ScoreRing score={s.score} />
                  <div>
                    <p className="font-sans text-sm font-medium text-white leading-tight">{s.description}</p>
                    <p className="text-[12px] tracking-[0.25em] uppercase text-white/35 mt-1.5 font-sans">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Points of Interest */}
        {placesData && allPlaces.length > 0 && (
          <div>
            <h3 className="font-heading text-xl font-normal text-white mb-1">
              Points of Interest
            </h3>
            <p className="text-white/35 text-xs font-sans mb-8">
              Popular destinations nearby, powered by Google Places.
            </p>

            {/* Category tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
              <div className="flex flex-wrap gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => { setActiveTab(tab.key); setShowAll(false) }}
                    className={`px-4 py-2 text-[12px] tracking-[0.15em] uppercase font-sans font-medium transition-all duration-200 ${
                      activeTab === tab.key
                        ? 'bg-[#C9A96E] text-[#0A0A0A]'
                        : 'bg-white/5 text-white/45 border border-white/10 hover:border-white/20 hover:text-white/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <p className="text-[12px] text-white/20 font-sans">Data provided by Google Places</p>
            </div>

            {/* POI table */}
            <div className="border border-white/10 overflow-hidden">
              {/* Header — desktop */}
              <div className="hidden md:grid grid-cols-[1fr_160px_90px_180px] gap-4 px-6 py-3 bg-[#111111] border-b border-white/10">
                {['Name', 'Category', 'Distance', 'Rating'].map(h => (
                  <p key={h} className="text-[12px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans">{h}</p>
                ))}
              </div>

              {/* Rows */}
              <div className="bg-[#0A0A0A] divide-y divide-white/[0.06]">
                {displayed.length > 0 ? displayed.map(place => (
                  <div
                    key={place.id}
                    className="grid grid-cols-1 md:grid-cols-[1fr_160px_90px_180px] gap-3 md:gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Name + address */}
                    <div className="flex items-center gap-3">
                      <PlaceAvatar name={place.name} />
                      <div>
                        <p className="text-white text-sm font-sans font-medium leading-tight">{place.name}</p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/30 hover:text-[#C9A96E] text-[12px] font-sans mt-0.5 leading-tight transition-colors block"
                        >
                          {place.address}
                        </a>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div>
                      {(() => {
                        const cat = placesData.categories.find(c => c.key === place.category)
                        return cat ? (
                          <span className="inline-flex px-2.5 py-1 border border-white/10 text-white/50 text-[12px] tracking-[0.15em] uppercase font-sans">
                            {cat.label}
                          </span>
                        ) : null
                      })()}
                    </div>

                    {/* Distance */}
                    <p className="text-sm text-white/50 font-sans">{place.distance} mi</p>

                    {/* Rating */}
                    <div>
                      {place.rating ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <GoldStars rating={place.rating} />
                          <span className="text-xs font-semibold text-white/80 font-sans">
                            {place.rating.toFixed(1)}
                          </span>
                          <span className="text-[12px] text-white/25 font-sans">
                            · {place.reviewCount.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[12px] text-white/25 font-sans">No reviews</span>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="px-6 py-10 text-center text-sm text-white/25 font-sans">
                    No places found in this category.
                  </div>
                )}
              </div>
            </div>

            {/* Show more */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-10 py-3.5 border border-[#C9A96E] text-[#C9A96E] text-[12px] tracking-[0.25em] uppercase font-sans hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all"
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
