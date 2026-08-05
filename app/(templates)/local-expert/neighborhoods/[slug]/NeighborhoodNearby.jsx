'use client'

import { useState } from 'react'
import { Star, Utensils, ShoppingBag, Dumbbell, Scissors, Wine, Plus, Minus } from 'lucide-react'

const PLACE_ICONS = {
  restaurants: Utensils,
  shopping: ShoppingBag,
  active: Dumbbell,
  beauty: Scissors,
  nightlife: Wine,
}

const INITIAL = 4

function StarRating({ value, size = 12 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= value ? 'fill-[#BA5B3E] text-[#BA5B3E]' : 'fill-[#BEB7A9]/30 text-[#BEB7A9]'} />
      ))}
    </div>
  )
}

export default function NeighborhoodNearby({ categories, places }) {
  const [expanded, setExpanded] = useState(false)
  const limit = expanded ? Infinity : INITIAL
  const hasMore = categories.some((cat) => (places[cat.key]?.length ?? 0) > INITIAL)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mt-12">
        {categories.map((cat) => {
          const list = places[cat.key] ?? []
          if (list.length === 0) return null
          const Icon = PLACE_ICONS[cat.key]
          return (
            <div key={cat.key}>
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#BEB7A9]/60">
                {Icon && <Icon size={15} style={{ color: cat.color }} />}
                <h3 className="text-[12px] tracking-[0.22em] uppercase text-[#24180F]/70 text-balance">{cat.label}</h3>
              </div>
              <ul className="space-y-4">
                {list.slice(0, limit).map((p) => (
                  <li key={p.id} className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[15px] text-[#24180F] leading-snug truncate">{p.name}</p>
                      {p.address && (
                        <a
                          href={p.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-[12px] text-[#2C1E11]/45 mt-0.5 truncate hover:text-[#BA5B3E] transition-colors"
                        >
                          {p.address}
                        </a>
                      )}
                      {p.rating != null && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <StarRating value={Math.round(p.rating)} size={12} />
                          <span className="text-[12px] text-[#2C1E11]/45">{p.rating}</span>
                          <span className="text-[12px] text-[#2C1E11]/30">({p.reviewCount.toLocaleString()})</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[12px] text-[#2C1E11]/40 whitespace-nowrap flex-shrink-0">{p.distance} mi</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[#24180F] border-b border-[#24180F]/30 pb-0.5 hover:border-[#BA5B3E] hover:text-[#BA5B3E] transition-colors"
          >
            {expanded ? <><Minus size={13} /> Show fewer places</> : <><Plus size={13} /> Show more places</>}
          </button>
        </div>
      )}
    </>
  )
}
