'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'

const CATEGORY_COLORS = {
  Coffee: 'bg-[#C4A882]/20 text-[#7A6040]',
  Bookstore: 'bg-[#8B9E8B]/20 text-[#4A6741]',
  Park: 'bg-[#8B9E8B]/20 text-[#4A6741]',
  Food: 'bg-[#C4A882]/20 text-[#7A6040]',
  Culture: 'bg-[#1B3B2B]/8 text-[#2C1E11]',
  Market: 'bg-[#C4A882]/20 text-[#7A6040]',
}

const ALL = 'All'

export default function FieldNotesGrid({ notes }) {
  const [active, setActive] = useState(ALL)

  // Categories come from the notes themselves rather than a fixed list, so a
  // new category added in Sanity shows up as a filter without a code change.
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(notes.map((n) => n.category).filter(Boolean)))],
    [notes],
  )

  // Floor every pill at the width of the longest label so the row reads as one
  // uniform set. `ch` measures the "0" glyph rather than the actual label, so
  // the allowance is deliberately generous — overshooting keeps the pills
  // uniform, whereas undershooting would let the longest one break rank.
  const pillMinWidth = useMemo(
    () => `calc(${Math.max(...categories.map((c) => c.length))}ch + 2.75rem)`,
    [categories],
  )

  const visible = active === ALL ? notes : notes.filter((n) => n.category === active)

  // No top padding: this shares the header's background, so the header's bottom
  // padding already supplies the gap above the filters.
  return (
    <section className="pb-[96px] lg:pb-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* ─── Filters — part of the grid block, not a band above it ─── */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter field notes by category">
          {categories.map((category) => {
            const isActive = category === active
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={isActive}
                style={{ minWidth: pillMinWidth }}
                className={`px-4 py-2.5 text-[13px] font-medium rounded-full border transition-all duration-150 text-center whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1B3B2B] text-[#F8F3EB] border-[#1B3B2B]'
                    : 'bg-transparent text-[#1B3B2B]/70 border-[#1B3B2B]/30 hover:border-[#1B3B2B]/60 hover:text-[#1B3B2B]'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* ─── Notes grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((note) => (
            <article key={note.id} className="rounded-2xl overflow-hidden border border-[#E5E0D8] bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={note.image} alt={note.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <span className={`inline-block text-[12px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 ${CATEGORY_COLORS[note.category] ?? 'bg-[#E5E0D8] text-[#2C1E11]/50'}`}>
                  {note.category}
                </span>
                <h2
                  className="text-[19px] font-normal text-[#24180F] mb-1 text-balance"
                  style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                >
                  {note.name}
                </h2>
                <p className="text-[12px] text-[#2C1E11]/40 mb-3">{note.location} · {note.address}</p>
                <p className="text-[16px] text-[#2C1E11]/60 leading-relaxed">{note.blurb}</p>
                <p className="text-[12px] text-[#2C1E11]/30 mt-3">{note.walkMinutes} min walk from the West Village</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
