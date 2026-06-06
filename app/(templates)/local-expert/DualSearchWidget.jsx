'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const POPULAR = [
  { label: 'West Village', href: '/local-expert/listings?q=West+Village' },
  { label: 'Tribeca', href: '/local-expert/listings?q=Tribeca' },
  { label: 'Brooklyn Heights', href: '/local-expert/neighborhoods/brooklyn-heights' },
  { label: 'DUMBO', href: '/local-expert/neighborhoods/dumbo' },
  { label: 'Park Slope', href: '/local-expert/neighborhoods/park-slope' },
]

export default function DualSearchWidget() {
  const [mode, setMode] = useState('homes') // 'homes' | 'guides'
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e) {
    e.preventDefault()
    if (mode === 'homes') {
      router.push(`/local-expert/listings${query ? `?q=${encodeURIComponent(query)}` : ''}`)
    } else {
      router.push(`/local-expert/neighborhoods${query ? `?q=${encodeURIComponent(query)}` : ''}`)
    }
  }

  return (
    <div className="w-full max-w-lg">
      {/* Mode toggle */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode('homes')}
          className={`px-4 py-2 text-[14px] font-semibold rounded-full border transition-all duration-200 ${
            mode === 'homes'
              ? 'bg-[#1B3B2B] text-[#F8F3EB] border-[#1B3B2B]'
              : 'bg-transparent text-[#1B3B2B]/70 border-[#1B3B2B]/30 hover:border-[#1B3B2B]/60 hover:text-[#1B3B2B]'
          }`}
        >
          Homes for Sale
        </button>
        <button
          onClick={() => setMode('guides')}
          className={`px-4 py-2 text-[14px] font-semibold rounded-full border transition-all duration-200 ${
            mode === 'guides'
              ? 'bg-[#1B3B2B] text-[#F8F3EB] border-[#1B3B2B]'
              : 'bg-transparent text-[#1B3B2B]/70 border-[#1B3B2B]/30 hover:border-[#1B3B2B]/60 hover:text-[#1B3B2B]'
          }`}
        >
          Explore Neighborhood Guides
        </button>
      </div>

      {/* Search input */}
      <form onSubmit={handleSearch} className="flex items-center gap-0 rounded-xl overflow-hidden border border-[#1B3B2B]/20 bg-white/80 shadow-sm">
        <div className="flex items-center gap-2 flex-1 px-4">
          <Search size={14} className="text-[#2C1E11]/40 flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === 'homes'
                ? 'Try "West Village 2BR" or "$2M condo"'
                : 'Try "West Village" or "Brooklyn"'
            }
            className="flex-1 py-3 text-[14px] text-[#2C1E11] placeholder-[#2C1E11]/30 bg-transparent focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 text-[14px] font-bold text-[#F8F3EB] bg-[#1B3B2B] hover:bg-[#2a5540] transition-colors"
        >
          Search
        </button>
      </form>

      {/* Popular areas */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-[12px] text-[#2C1E11]/35 uppercase tracking-wider">Popular:</span>
        {POPULAR.map((area) => (
          <a
            key={area.label}
            href={mode === 'homes' ? `/local-expert/listings?q=${encodeURIComponent(area.label)}` : `/local-expert/neighborhoods/${area.label.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-[12px] text-[#2C1E11]/55 hover:text-[#2C1E11] underline underline-offset-2 transition-colors"
          >
            {area.label}
          </a>
        ))}
      </div>
    </div>
  )
}
