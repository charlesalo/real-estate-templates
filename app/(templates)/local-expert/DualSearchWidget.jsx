'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const NEIGHBORHOODS = [
  { name: 'West Village',     slug: 'west-village',     borough: 'Manhattan' },
  { name: 'Tribeca',          slug: 'tribeca',           borough: 'Manhattan' },
  { name: 'SoHo',             slug: 'soho',              borough: 'Manhattan' },
  { name: 'Chelsea',          slug: 'chelsea',           borough: 'Manhattan' },
  { name: 'Upper East Side',  slug: 'upper-east-side',  borough: 'Manhattan' },
  { name: 'Brooklyn Heights', slug: 'brooklyn-heights', borough: 'Brooklyn'  },
  { name: 'DUMBO',            slug: 'dumbo',             borough: 'Brooklyn'  },
  { name: 'Park Slope',       slug: 'park-slope',        borough: 'Brooklyn'  },
  { name: 'Cobble Hill',      slug: 'cobble-hill',       borough: 'Brooklyn'  },
]

// Featured listings used as the homes autocomplete source.
// In production this would be replaced by a live MLS / SimplyRETS query.
const LISTINGS = [
  { id: 'le-1', address: '147 Perry Street, Apt 3',       neighborhood: 'West Village',    price: '$4.25M', type: 'Co-op'     },
  { id: 'le-2', address: '15 Hubert Street, Loft 4A',     neighborhood: 'Tribeca',         price: '$3.895M', type: 'Condo'    },
  { id: 'le-3', address: '22 Pierrepont Street, Apt 6',   neighborhood: 'Brooklyn Heights', price: '$2.95M', type: 'Co-op'   },
  { id: 'le-4', address: '18 Jay Street, #401',           neighborhood: 'DUMBO',           price: '$1.85M', type: 'Condo'    },
  { id: 'le-5', address: '521 8th Avenue',                neighborhood: 'Park Slope',      price: '$3.195M', type: 'Townhouse'},
  { id: 'le-6', address: '120 East 87th Street, Apt 8D',  neighborhood: 'Upper East Side', price: '$1.625M', type: 'Co-op'   },
]

function formatPrice(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`
  return `$${n.toLocaleString()}`
}

export default function DualSearchWidget() {
  const [mode, setMode]   = useState('homes') // 'homes' | 'guides'
  const [query, setQuery] = useState('')
  const [open, setOpen]   = useState(false)
  const router            = useRouter()
  const containerRef      = useRef(null)

  // ── Filtered results per mode ──────────────────────────────────────────────
  const filteredListings = query.trim()
    ? LISTINGS.filter((l) =>
        l.address.toLowerCase().includes(query.toLowerCase()) ||
        l.neighborhood.toLowerCase().includes(query.toLowerCase()) ||
        l.type.toLowerCase().includes(query.toLowerCase())
      )
    : LISTINGS

  const filteredNeighborhoods = query.trim()
    ? NEIGHBORHOODS.filter((n) =>
        n.name.toLowerCase().includes(query.toLowerCase()) ||
        n.borough.toLowerCase().includes(query.toLowerCase())
      )
    : NEIGHBORHOODS

  const boroughs = ['Manhattan', 'Brooklyn'].filter((b) =>
    filteredNeighborhoods.some((n) => n.borough === b)
  )

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleSearch(e) {
    e.preventDefault()
    if (mode === 'homes') {
      router.push(`/local-expert/listings${query ? `?q=${encodeURIComponent(query)}` : ''}`)
    } else {
      router.push(`/local-expert/neighborhoods${query ? `?q=${encodeURIComponent(query)}` : ''}`)
    }
    setOpen(false)
  }

  function handleListingClick(id) {
    router.push(`/local-expert/listings/${id}`)
    setOpen(false)
    setQuery('')
  }

  function handleNeighborhoodClick(slug) {
    router.push(`/local-expert/neighborhoods/${slug}`)
    setOpen(false)
    setQuery('')
  }

  function handleBlur(e) {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setOpen(false)
    }
  }

  const showHomesDropdown  = mode === 'homes'  && open && filteredListings.length > 0
  const showGuidesDropdown = mode === 'guides' && open && filteredNeighborhoods.length > 0
  const dropdownOpen       = showHomesDropdown || showGuidesDropdown

  const cardShadow = '0 20px 55px -24px rgba(27,59,43,0.32)'

  return (
    <div ref={containerRef} className="w-full max-w-xl relative" onBlur={handleBlur}>
      {/* White card containing the toggle + search row */}
      <div
        className={`bg-white rounded-[22px] p-2 transition-[border-radius] duration-150 ${dropdownOpen ? 'rounded-b-none' : ''}`}
        style={{ boxShadow: cardShadow }}
      >

        {/* Segmented tab toggle */}
        <div className="flex p-1 rounded-full bg-[#EBE4D7]">
          <button
            onClick={() => { setMode('homes'); setOpen(false) }}
            className={`flex-1 py-2 sm:py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] leading-tight font-semibold rounded-full transition-all duration-200 ${
              mode === 'homes'
                ? 'bg-[#1B3B2B] text-[#F8F3EB] shadow-sm'
                : 'text-[#2C1E11]/65 hover:text-[#2C1E11]'
            }`}
          >
            Homes for Sale
          </button>
          <button
            onClick={() => setMode('guides')}
            className={`flex-1 py-2 sm:py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] leading-tight font-semibold rounded-full transition-all duration-200 ${
              mode === 'guides'
                ? 'bg-[#1B3B2B] text-[#F8F3EB] shadow-sm'
                : 'text-[#2C1E11]/65 hover:text-[#2C1E11]'
            }`}
          >
            <span className="sm:hidden">Explore Neighborhoods</span>
            <span className="hidden sm:inline">Explore Neighborhood Guides</span>
          </button>
        </div>

        {/* Search row */}
        <form onSubmit={handleSearch} className="flex items-center gap-3 mt-1.5 pl-4 pr-1.5">
          <Search size={16} className="text-[#2C1E11]/45 flex-shrink-0" strokeWidth={2} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder={
              mode === 'homes'
                ? 'Try "West Village townhouse under $4M"'
                : 'Try "Quietest streets in Brooklyn Heights"'
            }
            className="flex-1 py-2 text-[14px] text-[#2C1E11] placeholder-[#2C1E11]/35 bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2 text-[14px] font-semibold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors flex-shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {/* Homes autocomplete dropdown */}
      {showHomesDropdown && (
        <div
          className="absolute left-0 right-0 top-full z-50 bg-white rounded-b-[22px] border-t border-[#1B3B2B]/8 overflow-hidden max-h-[210px] overflow-y-auto"
          style={{ boxShadow: cardShadow }}
        >
          <p className="px-4 pt-3 pb-1 text-[10px] tracking-[0.4em] uppercase text-[#2C1E11]/35 font-medium">
            Featured Listings
          </p>
          {filteredListings.map((l) => (
            <button
              key={l.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleListingClick(l.id)}
              className="w-full text-left px-4 py-2.5 hover:bg-[#1B3B2B]/5 transition-colors flex items-baseline justify-between gap-4"
            >
              <span className="text-[14px] text-[#2C1E11]/80 truncate">{l.address}</span>
              <span className="text-[12px] text-[#2C1E11]/40 whitespace-nowrap shrink-0">
                {l.neighborhood} · {l.type}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Neighborhood guides dropdown */}
      {showGuidesDropdown && (
        <div
          className="absolute left-0 right-0 top-full z-50 bg-white rounded-b-[22px] border-t border-[#1B3B2B]/8 overflow-hidden max-h-[210px] overflow-y-auto"
          style={{ boxShadow: cardShadow }}
        >
          {boroughs.map((borough, bi) => (
            <div key={borough}>
              {boroughs.length > 1 && (
                <p className={`px-4 text-[10px] tracking-[0.4em] uppercase text-[#2C1E11]/35 font-medium ${bi === 0 ? 'pt-3 pb-1' : 'pt-3 pb-1 border-t border-[#1B3B2B]/8'}`}>
                  {borough}
                </p>
              )}
              {filteredNeighborhoods.filter((n) => n.borough === borough).map((n) => (
                <button
                  key={n.slug}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleNeighborhoodClick(n.slug)}
                  className="w-full text-left px-4 py-2.5 text-[14px] text-[#2C1E11]/70 hover:bg-[#1B3B2B]/5 hover:text-[#2C1E11] transition-colors"
                >
                  {n.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
