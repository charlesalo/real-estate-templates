'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search, SlidersHorizontal, X, LayoutGrid, List,
  Map as MapIcon, ChevronLeft, ChevronRight,
  Bed, Bath, Maximize2,
} from 'lucide-react'
import ModernTeamPropertyCard from './ModernTeamPropertyCard'
import { formatPrice } from './PriceTag'

const MapView = dynamic(() => import('./MapView'), { ssr: false, loading: () => null })

// ─── Constants ────────────────────────────────────────────────────────────────

const LIMIT = 12

const PRICE_MIN = [
  { label: 'No Min',  value: '' },
  { label: '$250K',   value: '250000' },
  { label: '$500K',   value: '500000' },
  { label: '$750K',   value: '750000' },
  { label: '$1M',     value: '1000000' },
  { label: '$1.5M',   value: '1500000' },
  { label: '$2M',     value: '2000000' },
  { label: '$3M',     value: '3000000' },
  { label: '$5M',     value: '5000000' },
  { label: '$7.5M',   value: '7500000' },
  { label: '$10M',    value: '10000000' },
]

const PRICE_MAX = [
  { label: 'No Max',  value: '' },
  { label: '$500K',   value: '500000' },
  { label: '$750K',   value: '750000' },
  { label: '$1M',     value: '1000000' },
  { label: '$1.5M',   value: '1500000' },
  { label: '$2M',     value: '2000000' },
  { label: '$3M',     value: '3000000' },
  { label: '$5M',     value: '5000000' },
  { label: '$7.5M',   value: '7500000' },
  { label: '$10M',    value: '10000000' },
  { label: '$15M+',   value: '15000000' },
]

const BEDS = [
  { label: 'Any', value: '' },
  { label: '1+',  value: '1' },
  { label: '2+',  value: '2' },
  { label: '3+',  value: '3' },
  { label: '4+',  value: '4' },
  { label: '5+',  value: '5' },
]

const BATHS = [
  { label: 'Any', value: '' },
  { label: '1+',  value: '1' },
  { label: '2+',  value: '2' },
  { label: '3+',  value: '3' },
  { label: '4+',  value: '4' },
]

const TYPES = [
  { label: 'All Types',     value: '' },
  { label: 'Single Family', value: 'SingleFamily' },
  { label: 'Condo / Co-op', value: 'Condominium' },
  { label: 'Multi-Family',  value: 'MultiFamily' },
  { label: 'Land',          value: 'Land' },
]

const STATUSES = [
  { label: 'Active',  value: 'Active' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Sold',    value: 'Closed' },
]

const SQFT = [
  { label: 'Any Size',     value: '' },
  { label: '1,000+ sqft',  value: '1000' },
  { label: '2,000+ sqft',  value: '2000' },
  { label: '3,000+ sqft',  value: '3000' },
  { label: '5,000+ sqft',  value: '5000' },
  { label: '7,500+ sqft',  value: '7500' },
  { label: '10,000+ sqft', value: '10000' },
]

const SORTS = [
  { label: 'Newest',            value: '-listdate' },
  { label: 'Price: High → Low', value: '-listprice' },
  { label: 'Price: Low → High', value: 'listprice' },
  { label: 'Most Bedrooms',     value: '-beds' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalize(raw = []) {
  return raw.map(l => ({
    id:      l.mlsId,
    mlsId:   l.mlsId,
    price:   l.listPrice,
    address: l.address?.full ?? [l.address?.streetNumber, l.address?.streetName].filter(Boolean).join(' '),
    city:    l.address?.city,
    state:   l.address?.state,
    zip:     l.address?.postalCode,
    beds:    l.property?.bedrooms,
    baths:   l.property?.bathsFull,
    sqft:    l.property?.area,
    status:  l.mls?.status ?? 'Active',
    image:   l.photos?.[0],
    geo:     l.geo,
  }))
}

function paginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

function priceLabel(val) {
  const n = parseInt(val)
  if (n >= 1000000) return `$${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`
  if (n >= 1000)    return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

const STATUS_BADGE = {
  Active:  'bg-[#1A2D5A] text-white',
  Pending: 'bg-[#4B6090] text-white',
  Sold:    'bg-[#6B7280] text-white',
  Closed:  'bg-[#6B7280] text-white',
}

// ─── List row ─────────────────────────────────────────────────────────────────

function ListRow({ listing }) {
  return (
    <Link
      href={`/modern-team/listings/${listing.mlsId}`}
      className="group flex gap-0 bg-white border border-[#D5DBE9] rounded-xl overflow-hidden hover:shadow-md hover:border-[#1A2D5A]/30 transition-all duration-300"
    >
      <div className="relative w-40 flex-shrink-0 overflow-hidden bg-[#EEF1F7]">
        {listing.image ? (
          <Image
            src={listing.image}
            alt={listing.address ?? ''}
            fill
            sizes="160px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-[#EEF1F7]" />
        )}
        <span className={`absolute top-2 left-2 px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase font-semibold rounded ${STATUS_BADGE[listing.status] ?? STATUS_BADGE.Active}`}>
          {listing.status}
        </span>
      </div>
      <div className="flex-1 px-5 py-4 min-w-0">
        <p className="text-lg font-bold text-[#1A2D5A]">{formatPrice(listing.price)}</p>
        <p className="text-sm font-medium text-[#111827] mt-0.5 truncate">{listing.address}{listing.city ? `, ${listing.city}` : ''}</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-[#4B6090] font-sans">
          {listing.beds  != null && <span className="flex items-center gap-1.5"><Bed  size={12} strokeWidth={1.5} />{listing.beds} Beds</span>}
          {listing.baths != null && <span className="flex items-center gap-1.5"><Bath size={12} strokeWidth={1.5} />{listing.baths} Baths</span>}
          {listing.sqft  != null && <span className="flex items-center gap-1.5"><Maximize2 size={12} strokeWidth={1.5} />{listing.sqft.toLocaleString()} sqft</span>}
        </div>
      </div>
      <div className="hidden md:flex items-center pr-5">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#9CA3AF] group-hover:text-[#1A2D5A] transition-colors font-sans">View →</span>
      </div>
    </Link>
  )
}

// ─── Filter drawer ────────────────────────────────────────────────────────────

function FilterDrawer({ filters, onApply, onClose }) {
  const [local, setLocal] = useState(filters)
  const set = (k, v) => setLocal(f => ({ ...f, [k]: v }))

  const labelCls = 'block text-[10px] tracking-[0.2em] uppercase mb-3 text-[#4B6090] font-sans'
  const pillCls  = active =>
    `px-3 py-1.5 text-xs border rounded-full transition-all cursor-pointer font-sans ${
      active
        ? 'border-[#1A2D5A] bg-[#1A2D5A] text-white'
        : 'border-[#D5DBE9] text-[#4B6090] hover:border-[#1A2D5A]/40 hover:text-[#1A2D5A]'
    }`
  const selectCls = 'w-full px-3 py-2.5 text-sm border border-[#D5DBE9] rounded-lg outline-none bg-white text-[#111827] focus:border-[#1A2D5A] transition-colors'

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-sm flex flex-col h-full overflow-y-auto bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D5DBE9]">
          <h3 className="font-bold text-[#111827] text-lg">Filters</h3>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#111827] transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 px-6 py-6 space-y-8">
          {/* Status */}
          <div>
            <span className={labelCls}>Status</span>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map(s => (
                <button key={s.value} onClick={() => set('status', local.status === s.value ? '' : s.value)} className={pillCls(local.status === s.value)}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <span className={labelCls}>Price Range</span>
            <div className="grid grid-cols-2 gap-3">
              <select value={local.minprice} onChange={e => set('minprice', e.target.value)} className={selectCls}>
                {PRICE_MIN.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <select value={local.maxprice} onChange={e => set('maxprice', e.target.value)} className={selectCls}>
                {PRICE_MAX.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Beds */}
          <div>
            <span className={labelCls}>Bedrooms</span>
            <div className="flex flex-wrap gap-2">
              {BEDS.map(o => (
                <button key={o.value} onClick={() => set('minbeds', o.value)} className={pillCls(local.minbeds === o.value)}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Baths */}
          <div>
            <span className={labelCls}>Bathrooms</span>
            <div className="flex flex-wrap gap-2">
              {BATHS.map(o => (
                <button key={o.value} onClick={() => set('minbaths', o.value)} className={pillCls(local.minbaths === o.value)}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <span className={labelCls}>Property Type</span>
            <select value={local.type} onChange={e => set('type', e.target.value)} className={selectCls}>
              {TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Sq Ft */}
          <div>
            <span className={labelCls}>Min. Square Footage</span>
            <select value={local.minarea} onChange={e => set('minarea', e.target.value)} className={selectCls}>
              {SQFT.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Sort */}
          <div>
            <span className={labelCls}>Sort By</span>
            <select value={local.sort} onChange={e => set('sort', e.target.value)} className={selectCls}>
              {SORTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-[#D5DBE9] flex gap-3">
          <button
            onClick={() => setLocal(Object.fromEntries(Object.keys(local).map(k => [k, k === 'sort' ? '-listdate' : ''])))}
            className="flex-1 py-3 text-[11px] tracking-[0.15em] uppercase border border-[#D5DBE9] text-[#4B6090] rounded-lg hover:border-[#1A2D5A]/40 hover:text-[#1A2D5A] transition-all font-sans"
          >
            Reset
          </button>
          <button
            onClick={() => onApply(local)}
            className="flex-1 py-3 text-[11px] tracking-[0.15em] uppercase font-semibold bg-[#1A2D5A] text-white rounded-lg hover:bg-[#243870] transition-colors font-sans"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ModernTeamSearchClient({
  initialListings = [],
  initialTotal    = 0,
  initialHasMore  = false,
  initialFilters  = {},
}) {
  const router = useRouter()

  const [filters, setFilters] = useState({
    q:        initialFilters.q        ?? '',
    status:   initialFilters.status   ?? '',
    minprice: initialFilters.minprice ?? '',
    maxprice: initialFilters.maxprice ?? '',
    minbeds:  initialFilters.minbeds  ?? '',
    minbaths: initialFilters.minbaths ?? '',
    type:     initialFilters.type     ?? '',
    minarea:  initialFilters.minarea  ?? '',
    sort:     initialFilters.sort     ?? '-listdate',
  })

  const [listings,   setListings]   = useState(normalize(initialListings))
  const [totalCount, setTotalCount] = useState(initialTotal)
  const [hasMore,    setHasMore]    = useState(initialHasMore)
  const [loading,    setLoading]    = useState(false)
  const [page,       setPage]       = useState(parseInt(initialFilters.page ?? '1'))
  const [view,       setView]       = useState('grid')
  const [showMap,    setShowMap]    = useState(true)
  const [showDrawer, setShowDrawer] = useState(false)
  // tracks the q value that was last submitted, so the second row only
  // appears when the user has typed something new (not on page refresh)

  // When X-Total-Count is available use it for pagination.
  // For demo accounts that omit it, estimate from current page + hasMore.
  const knownTotal   = totalCount > listings.length || !hasMore
  const estimatedMin = hasMore ? page * LIMIT : (page - 1) * LIMIT + listings.length
  const totalPages   = knownTotal ? Math.ceil(totalCount / LIMIT) : page + (hasMore ? 1 : 0)

  const fetchListings = useCallback(async (f, p = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      Object.entries(f).forEach(([k, v]) => { if (v) params.set(k, v) })
      params.set('limit', LIMIT)
      params.set('offset', (p - 1) * LIMIT)
      const res  = await fetch(`/api/listings?${params}`)
      const data = await res.json()
      setListings(normalize(data.listings ?? []))
      setTotalCount(data.totalCount ?? 0)
      setHasMore(data.hasMore ?? false)
    } catch {
      setListings([])
      setTotalCount(0)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [])

  const syncUrl = useCallback((f, p) => {
    const params = new URLSearchParams()
    Object.entries(f).forEach(([k, v]) => { if (v && !(k === 'sort' && v === '-listdate')) params.set(k, v) })
    if (p > 1) params.set('page', p)
    const qs = params.toString()
    router.replace(`/modern-team/listings${qs ? `?${qs}` : ''}`, { scroll: false })
  }, [router])

  const apply = useCallback((f) => {
    setFilters(f)
    setPage(1)
    fetchListings(f, 1)
    syncUrl(f, 1)
  }, [fetchListings, syncUrl])

  const handlePage = (p) => {
    setPage(p)
    fetchListings(filters, p)
    syncUrl(filters, p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearOne = (key) => apply({ ...filters, [key]: '' })
  const clearAll = () => apply(Object.fromEntries(Object.keys(filters).map(k => [k, k === 'sort' ? '-listdate' : ''])))

  const activeTags = Object.entries(filters)
    .filter(([k, v]) => v && k !== 'sort')
    .map(([k, v]) => {
      const label = {
        q:        `"${v}"`,
        status:   v,
        minprice: `From ${priceLabel(v)}`,
        maxprice: `To ${priceLabel(v)}`,
        minbeds:  `${v}+ Beds`,
        minbaths: `${v}+ Baths`,
        type:     TYPES.find(o => o.value === v)?.label ?? v,
        minarea:  `${parseInt(v).toLocaleString()}+ sqft`,
      }[k] ?? v
      return { key: k, label }
    })

  const selCls = 'bg-transparent border-0 outline-none cursor-pointer text-sm text-[#374151] font-sans'

  return (
    <div>
      {/* ── Sticky filter bar ──────────────────────────────────── */}
      <div className="sticky top-20 z-30 bg-white border-b border-[#D5DBE9] shadow-sm">
        <div className="px-4 lg:px-6 py-3">

          {/* Main filter row */}
          <div className="flex items-stretch border border-[#D5DBE9] rounded-xl overflow-hidden">

            {/* Search */}
            <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-[160px] border-r border-[#D5DBE9]">
              <Search size={14} className="text-[#1A2D5A] flex-shrink-0" />
              <input
                type="text"
                placeholder="City, ZIP, address…"
                value={filters.q}
                onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && apply(filters)}
                className="flex-1 bg-transparent text-sm outline-none text-[#111827] placeholder:text-[#9CA3AF] min-w-0 font-sans"
              />
              {filters.q && (
                <button onClick={() => setFilters(f => ({ ...f, q: '' }))} className="text-[#9CA3AF] hover:text-[#111827] transition-colors flex-shrink-0">
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Status dropdown */}
            <div className="px-4 py-3 border-r border-[#D5DBE9]">
              <select value={filters.status} onChange={e => apply({ ...filters, status: e.target.value })} className={selCls}>
                <option value="">All Status</option>
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            {/* Min Price */}
            <div className="hidden md:block px-4 py-3 border-r border-[#D5DBE9]">
              <select value={filters.minprice} onChange={e => apply({ ...filters, minprice: e.target.value })} className={selCls}>
                {PRICE_MIN.map(o => <option key={o.value} value={o.value}>{o.value ? `From ${o.label}` : 'Min Price'}</option>)}
              </select>
            </div>

            {/* Max Price */}
            <div className="hidden md:block px-4 py-3 border-r border-[#D5DBE9]">
              <select value={filters.maxprice} onChange={e => apply({ ...filters, maxprice: e.target.value })} className={selCls}>
                {PRICE_MAX.map(o => <option key={o.value} value={o.value}>{o.value ? `To ${o.label}` : 'Max Price'}</option>)}
              </select>
            </div>

            {/* Beds */}
            <div className="hidden md:block px-4 py-3 border-r border-[#D5DBE9]">
              <select value={filters.minbeds} onChange={e => apply({ ...filters, minbeds: e.target.value })} className={selCls}>
                {BEDS.map(o => <option key={o.value} value={o.value}>{o.value ? `${o.label} Beds` : 'Beds'}</option>)}
              </select>
            </div>

            {/* Baths */}
            <div className="hidden md:block px-4 py-3 border-r border-[#D5DBE9]">
              <select value={filters.minbaths} onChange={e => apply({ ...filters, minbaths: e.target.value })} className={selCls}>
                {BATHS.map(o => <option key={o.value} value={o.value}>{o.value ? `${o.label} Baths` : 'Baths'}</option>)}
              </select>
            </div>

            {/* Type */}
            <div className="hidden lg:block px-4 py-3 border-r border-[#D5DBE9]">
              <select value={filters.type} onChange={e => apply({ ...filters, type: e.target.value })} className={selCls}>
                {TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Sort */}
            <div className="hidden lg:block px-4 py-3 border-r border-[#D5DBE9]">
              <select value={filters.sort} onChange={e => apply({ ...filters, sort: e.target.value })} className={selCls}>
                {SORTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* All Filters */}
            <button
              onClick={() => setShowDrawer(true)}
              className="flex items-center gap-1.5 px-4 py-3 text-sm text-[#4B6090] hover:text-[#1A2D5A] transition-colors font-sans border-r border-[#D5DBE9]"
            >
              <SlidersHorizontal size={14} />
              <span className="text-[11px] tracking-[0.1em] uppercase">Filters</span>
              {activeTags.length > 0 && (
                <span className="w-4 h-4 text-[10px] flex items-center justify-center font-semibold bg-[#1A2D5A] text-white rounded-full">
                  {activeTags.length}
                </span>
              )}
            </button>

            {/* SEARCH — always visible */}
            <button
              onClick={() => apply(filters)}
              className="px-6 py-3 text-[11px] tracking-[0.15em] uppercase font-semibold bg-[#1A2D5A] text-white hover:bg-[#243870] transition-colors font-sans flex-shrink-0"
            >
              Search
            </button>
          </div>

          {/* Active filter tags */}
          {activeTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2.5">
              {activeTags.map(t => (
                <button
                  key={t.key}
                  onClick={() => clearOne(t.key)}
                  className="flex items-center gap-1.5 px-3 py-1 text-[11px] border border-[#1A2D5A]/30 text-[#1A2D5A] rounded-full hover:bg-[#EEF1F7] transition-colors font-sans"
                >
                  {t.label} <X size={10} />
                </button>
              ))}
              <button onClick={clearAll} className="text-[11px] text-[#9CA3AF] hover:text-[#111827] transition-colors font-sans">
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Split-panel content ────────────────────────────────── */}
      <div className={`grid ${showMap ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,48%)]' : 'grid-cols-1'}`}>

        {/* Left: listings panel */}
        <div className="min-h-screen bg-[#FAFAF8]">

          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#D5DBE9] bg-white">
            <p className="text-xs text-[#6B7280] font-sans">
              {loading ? 'Loading…' : knownTotal
              ? `${totalCount.toLocaleString()} ${totalCount === 1 ? 'property' : 'properties'}`
              : hasMore
                ? `${estimatedMin.toLocaleString()}+ properties`
                : `${estimatedMin.toLocaleString()} properties`
            }
            </p>
            <div className="flex items-center gap-2">
              {/* Grid / List toggle */}
              <div className="flex items-center border border-[#D5DBE9] rounded-lg overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 transition-colors cursor-pointer ${view === 'grid' ? 'text-[#1A2D5A] bg-[#EEF1F7]' : 'text-[#9CA3AF] hover:text-[#1A2D5A]'}`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 transition-colors cursor-pointer ${view === 'list' ? 'text-[#1A2D5A] bg-[#EEF1F7]' : 'text-[#9CA3AF] hover:text-[#1A2D5A]'}`}
                >
                  <List size={14} />
                </button>
              </div>
              {/* Map toggle */}
              <button
                onClick={() => setShowMap(v => !v)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-[0.1em] uppercase border border-[#D5DBE9] text-[#6B7280] rounded-lg transition-all font-sans cursor-pointer hover:border-[#1A2D5A]/40 hover:text-[#1A2D5A]"
              >
                <MapIcon size={13} />
                {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="p-6">
            {loading ? (
              <div className={`grid gap-4 ${view === 'grid' ? (showMap ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3') : 'grid-cols-1'}`}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={`bg-white border border-[#D5DBE9] rounded-xl animate-pulse ${view === 'grid' ? 'aspect-[3/4]' : 'h-28'}`} />
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-xl font-bold text-[#111827] mb-2">No listings found</p>
                <p className="text-sm text-[#6B7280] mb-8 font-sans">Try adjusting your filters.</p>
                <button
                  onClick={clearAll}
                  className="px-8 py-3 text-[11px] tracking-[0.15em] uppercase font-semibold bg-[#1A2D5A] text-white rounded-lg hover:bg-[#243870] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : view === 'grid' ? (
              <div className={`grid gap-5 ${showMap ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                {listings.map(l => <ModernTeamPropertyCard key={l.id} {...l} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {listings.map(l => <ListRow key={l.id} listing={l} />)}
              </div>
            )}

            {/* Pagination */}
            {listings.length > 0 && totalPages > 1 && !loading && (
              <div className="flex items-center justify-center gap-1 mt-12">
                <button onClick={() => handlePage(page - 1)} disabled={page <= 1} className="p-2 text-[#4B6090] hover:text-[#1A2D5A] transition-colors disabled:opacity-25">
                  <ChevronLeft size={16} />
                </button>
                {paginationRange(page, totalPages).map((p, i) =>
                  p === '...' ? (
                    <span key={`e${i}`} className="w-8 text-center text-sm text-[#9CA3AF]">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => handlePage(p)}
                      className={`w-8 h-8 text-sm rounded-lg transition-all font-sans ${
                        p === page
                          ? 'bg-[#1A2D5A] text-white font-semibold'
                          : 'text-[#4B6090] hover:bg-[#EEF1F7] hover:text-[#1A2D5A]'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button onClick={() => handlePage(page + 1)} disabled={page >= totalPages} className="p-2 text-[#4B6090] hover:text-[#1A2D5A] transition-colors disabled:opacity-25">
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
            {/* MLS Disclaimer */}
            <div className="mt-10 px-1 pb-6 border-t border-[#EEF1F7] pt-6">
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed font-sans">
                <span className="font-semibold text-[#6B7280]">Listing data provided by SimplyRETS.</span>{' '}
                The data relating to real estate for sale on this website comes in part from the Internet Data Exchange (IDX) program.
                Real estate listings held by brokerage firms other than The Hargrove Group are marked with the IDX logo and detailed
                information about them includes the name of the listing broker. All information is deemed reliable but not guaranteed
                and should be independently verified. Properties shown may or may not be listed by the office/agent presenting the
                information. Copyright © {new Date().getFullYear()} Houston Realtors Information Service. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Right: sticky map */}
        {showMap && (
          <div className="hidden lg:block">
            <div className="sticky top-[160px]" style={{ height: 'calc(100vh - 160px)' }}>
              <MapView listings={listings} template="modern-team" className="w-full h-full" />
            </div>
          </div>
        )}
      </div>

      {/* Filter drawer */}
      {showDrawer && (
        <FilterDrawer
          filters={filters}
          onApply={(f) => { apply(f); setShowDrawer(false) }}
          onClose={() => setShowDrawer(false)}
        />
      )}
    </div>
  )
}
