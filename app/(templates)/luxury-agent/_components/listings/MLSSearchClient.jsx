'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search, SlidersHorizontal, X, LayoutGrid, List,
  Map as MapIcon, ChevronLeft, ChevronRight, Bed, Bath, Maximize2,
} from 'lucide-react'
import MLSPropertyCard from './MLSPropertyCard'
import StatusBadge from './StatusBadge'
import { cn } from '@/lib/utils'

const MapView = dynamic(() => import('@/components/real-estate/MapView'), { ssr: false, loading: () => null })
import { MAP_THEME } from './mapTheme'

// ─── Constants ────────────────────────────────────────────────────────────────

const LIMIT = 12

const PRICE_MIN = [
  { label: 'No Min', value: '' },
  { label: '$250K',  value: '250000' },
  { label: '$500K',  value: '500000' },
  { label: '$750K',  value: '750000' },
  { label: '$1M',    value: '1000000' },
  { label: '$1.5M',  value: '1500000' },
  { label: '$2M',    value: '2000000' },
  { label: '$3M',    value: '3000000' },
  { label: '$5M',    value: '5000000' },
  { label: '$7.5M',  value: '7500000' },
  { label: '$10M',   value: '10000000' },
]

const PRICE_MAX = [
  { label: 'No Max', value: '' },
  { label: '$500K',  value: '500000' },
  { label: '$750K',  value: '750000' },
  { label: '$1M',    value: '1000000' },
  { label: '$1.5M',  value: '1500000' },
  { label: '$2M',    value: '2000000' },
  { label: '$3M',    value: '3000000' },
  { label: '$5M',    value: '5000000' },
  { label: '$7.5M',  value: '7500000' },
  { label: '$10M',   value: '10000000' },
  { label: '$15M+',  value: '15000000' },
]

const BEDS = [
  { label: 'Any',  value: '' },
  { label: '1+',   value: '1' },
  { label: '2+',   value: '2' },
  { label: '3+',   value: '3' },
  { label: '4+',   value: '4' },
  { label: '5+',   value: '5' },
]

const BATHS = [
  { label: 'Any',  value: '' },
  { label: '1+',   value: '1' },
  { label: '2+',   value: '2' },
  { label: '3+',   value: '3' },
  { label: '4+',   value: '4' },
]

const TYPES = [
  { label: 'All Types',      value: '' },
  { label: 'Single Family',  value: 'SingleFamily' },
  { label: 'Condo / Co-op',  value: 'Condominium' },
  { label: 'Multi-Family',   value: 'MultiFamily' },
  { label: 'Land',           value: 'Land' },
]

const STATUSES = [
  { label: 'Active',  value: 'Active' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Sold',    value: 'Closed' },
]

const SQFT = [
  { label: 'Any Size',       value: '' },
  { label: '1,000+ sqft',    value: '1000' },
  { label: '2,000+ sqft',    value: '2000' },
  { label: '3,000+ sqft',    value: '3000' },
  { label: '5,000+ sqft',    value: '5000' },
  { label: '7,500+ sqft',    value: '7500' },
  { label: '10,000+ sqft',   value: '10000' },
]

const SORTS = [
  { label: 'Newest',              value: '-listdate' },
  { label: 'Price: High → Low',   value: '-listprice' },
  { label: 'Price: Low → High',   value: 'listprice' },
  { label: 'Most Bedrooms',       value: '-beds' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalize(raw = []) {
  return raw.map(l => ({
    id: l.mlsId,
    mlsId: l.mlsId,
    price: l.listPrice,
    address: l.address?.full ?? [l.address?.streetNumber, l.address?.streetName].filter(Boolean).join(' '),
    city: l.address?.city,
    state: l.address?.state,
    zip: l.address?.postalCode,
    beds: l.property?.bedrooms,
    baths: l.property?.bathsFull,
    sqft: l.property?.area,
    status: l.mls?.status ?? 'Active',
    image: l.photos?.[0],
    geo: l.geo,
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
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

// ─── List row ─────────────────────────────────────────────────────────────────

function ListRow({ listing, template }) {
  return (
    <Link
      href={`/${template}/listings/${listing.mlsId}`}
      className="group flex gap-4 border transition-colors border-white/[0.07] hover:border-white/20 bg-[#0D0D0D] hover:bg-[#111]"
    >
      <div className="relative w-36 flex-shrink-0 aspect-[4/3] overflow-hidden">
        {listing.image ? (
          <Image src={listing.image} alt={listing.address ?? ''} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="144px" />
        ) : (
          <div className="absolute inset-0 bg-[#1A1A1A]" />
        )}
        <div className="absolute top-2 left-2"><StatusBadge status={listing.status} /></div>
      </div>
      <div className="flex-1 py-4 pr-4 min-w-0">
        <p className="font-heading text-xl font-normal text-white">
          ${listing.price?.toLocaleString()}
        </p>
        <p className="text-sm mt-0.5 truncate font-sans text-white/50">
          {listing.address}{listing.city ? `, ${listing.city}` : ''}
        </p>
        <div className="flex items-center gap-4 mt-3 text-xs font-sans text-white/35">
          {listing.beds  != null && <span className="flex items-center gap-1"><Bed  size={11} strokeWidth={1.5} />{listing.beds} Beds</span>}
          {listing.baths != null && <span className="flex items-center gap-1"><Bath size={11} strokeWidth={1.5} />{listing.baths} Baths</span>}
          {listing.sqft  != null && <span className="flex items-center gap-1"><Maximize2 size={11} strokeWidth={1.5} />{listing.sqft.toLocaleString()} sqft</span>}
        </div>
      </div>
      <div className="hidden md:flex items-center pr-5">
        <span className="text-[12px] tracking-[0.2em] uppercase transition-colors text-white/20 group-hover:text-[#C9A96E]">
          View →
        </span>
      </div>
    </Link>
  )
}

// ─── Filter drawer ────────────────────────────────────────────────────────────

function FilterDrawer({ filters, onApply, onClose }) {
  const [local, setLocal] = useState(filters)
  const set = (k, v) => setLocal(f => ({ ...f, [k]: v }))

  const labelCls = 'block text-[12px] tracking-[0.2em] uppercase mb-3 font-sans text-white/40'
  const pillCls = (active) => cn(
    'px-3 py-1.5 text-xs border transition-all cursor-pointer',
    active
      ? 'border-[#C9A96E] bg-[#C9A96E] text-[#0A0A0A]'
      : 'border-white/15 text-white/50 hover:border-white/40 hover:text-white',
  )
  const selectCls = 'w-full px-3 py-2.5 text-sm border outline-none bg-transparent transition-colors border-white/10 text-white [&>option]:bg-[#1A1A1A] focus:border-[#C9A96E]'

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-sm flex flex-col h-full overflow-y-auto bg-[#0D0D0D] border-l border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h3 className="font-heading text-lg font-normal text-white">Filters</h3>
          <button onClick={onClose} className={cn('text-white/40 hover:text-white')}>
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

          {/* Property Type */}
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
        <div className="px-6 py-5 border-t flex gap-3 border-white/10">
          <button
            onClick={() => { setLocal(Object.fromEntries(Object.keys(local).map(k => [k, k === 'sort' ? '-listdate' : '']))); }}
            className="flex-1 py-3 text-[12px] tracking-[0.15em] uppercase border transition-all border-white/20 text-white/50 hover:border-white/40 hover:text-white"
          >
            Reset
          </button>
          <button
            onClick={() => onApply(local)}
            className="flex-1 py-3 text-[12px] tracking-[0.15em] uppercase font-medium transition-all bg-[#C9A96E] text-[#0A0A0A] hover:opacity-90"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MLSSearchClient({
  initialListings = [],
  initialTotal = 0,
  initialFilters = {},
  template = 'luxury-agent',
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
  const [loading,    setLoading]    = useState(false)
  const [page,       setPage]       = useState(parseInt(initialFilters.page ?? '1'))
  const [view,       setView]       = useState('grid')
  const [showMap,    setShowMap]    = useState(true)
  const [showDrawer, setShowDrawer] = useState(false)

  const totalPages = Math.ceil(totalCount / LIMIT)

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
    } catch {
      setListings([])
      setTotalCount(0)
    } finally {
      setLoading(false)
    }
  }, [])

  const syncUrl = useCallback((f, p) => {
    const params = new URLSearchParams()
    Object.entries(f).forEach(([k, v]) => { if (v && !(k === 'sort' && v === '-listdate')) params.set(k, v) })
    if (p > 1) params.set('page', p)
    const qs = params.toString()
    router.replace(`/${template}/listings${qs ? `?${qs}` : ''}`, { scroll: false })
  }, [router, template])

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

  // Build active filter tags (exclude sort)
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

  const selCls = 'bg-transparent border-0 outline-none cursor-pointer text-sm text-white/60 [&>option]:bg-[#1A1A1A]'

  return (
    <div>
      {/* ── Sticky filter bar ──────────────────────────────────── */}
      <div className="sticky z-30 border-b top-20 bg-[#0A0A0A]/95 backdrop-blur-md border-white/10">
        <div className="px-4 lg:px-6">
          <div className="flex flex-wrap items-center gap-0 my-4 border border-white/10">

            {/* Search input */}
            <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-[180px] border-r border-white/10">
              <Search size={14} className="text-[#C9A96E] flex-shrink-0" />
              <input
                type="text"
                placeholder="City, ZIP, address…"
                value={filters.q}
                onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && apply(filters)}
                className="flex-1 bg-transparent text-sm outline-none min-w-0 text-white placeholder:text-white/30"
              />
              {filters.q && (
                <button onClick={() => apply({ ...filters, q: '' })} className="text-white/30 hover:text-white">
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Status dropdown */}
            <div className="px-4 py-3 border-r border-white/10">
              <select value={filters.status} onChange={e => apply({ ...filters, status: e.target.value })} className={selCls}>
                <option value="">All Status</option>
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            {/* Price — desktop */}
            <div className="hidden md:block px-4 py-3 border-r border-white/10">
              <select value={filters.minprice} onChange={e => apply({ ...filters, minprice: e.target.value })} className={selCls}>
                {PRICE_MIN.map(o => <option key={o.value} value={o.value}>{o.value ? `From ${o.label}` : 'Min Price'}</option>)}
              </select>
            </div>
            <div className="hidden md:block px-4 py-3 border-r border-white/10">
              <select value={filters.maxprice} onChange={e => apply({ ...filters, maxprice: e.target.value })} className={selCls}>
                {PRICE_MAX.map(o => <option key={o.value} value={o.value}>{o.value ? `To ${o.label}` : 'Max Price'}</option>)}
              </select>
            </div>

            {/* Beds / Baths — desktop */}
            <div className="hidden md:block px-4 py-3 border-r border-white/10">
              <select value={filters.minbeds} onChange={e => apply({ ...filters, minbeds: e.target.value })} className={selCls}>
                {BEDS.map(o => <option key={o.value} value={o.value}>{o.value ? `${o.label} Beds` : 'Beds'}</option>)}
              </select>
            </div>
            <div className="hidden md:block px-4 py-3 border-r border-white/10">
              <select value={filters.minbaths} onChange={e => apply({ ...filters, minbaths: e.target.value })} className={selCls}>
                {BATHS.map(o => <option key={o.value} value={o.value}>{o.value ? `${o.label} Baths` : 'Baths'}</option>)}
              </select>
            </div>

            {/* Type — desktop */}
            <div className="hidden lg:block px-4 py-3 border-r border-white/10">
              <select value={filters.type} onChange={e => apply({ ...filters, type: e.target.value })} className={selCls}>
                {TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Sort — desktop */}
            <div className="hidden lg:block px-4 py-3 border-r border-white/10">
              <select value={filters.sort} onChange={e => apply({ ...filters, sort: e.target.value })} className={selCls}>
                {SORTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* All Filters button */}
            <button
              onClick={() => setShowDrawer(true)}
              className="flex items-center gap-1.5 px-4 py-3 text-sm transition-colors border-r border-white/10 text-white/50 hover:text-white"
            >
              <SlidersHorizontal size={14} />
              <span className="text-[12px] tracking-[0.1em] uppercase font-sans">Filters</span>
              {activeTags.length > 0 && (
                <span className="w-4 h-4 text-[12px] flex items-center justify-center font-medium bg-[#C9A96E] text-[#0A0A0A]">
                  {activeTags.length}
                </span>
              )}
            </button>

            {/* Clear + Search */}
            <div className="flex items-center gap-1 px-3">
              {activeTags.length > 0 && (
                <button onClick={clearAll} className="p-2 transition-colors text-white/30 hover:text-white">
                  <X size={14} />
                </button>
              )}
              <button
                onClick={() => apply(filters)}
                className="px-5 py-2 text-[12px] tracking-[0.15em] uppercase font-medium transition-all bg-[#C9A96E] text-[#0A0A0A] hover:opacity-90"
              >
                Search
              </button>
            </div>
          </div>

          {/* Active filter tags */}
          {activeTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pb-3 -mt-1">
              {activeTags.map(t => (
                <button
                  key={t.key}
                  onClick={() => clearOne(t.key)}
                  className="flex items-center gap-1.5 px-3 py-1 text-[12px] border transition-colors font-sans border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E]/10"
                >
                  {t.label} <X size={10} />
                </button>
              ))}
              <button onClick={clearAll} className="text-[12px] font-sans transition-colors text-white/30 hover:text-white">
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Split-panel content ────────────────────────────────── */}
      <div className={cn('grid', showMap ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,48%)]' : 'grid-cols-1')}>

        {/* Left: listings panel */}
        <div className="min-h-screen bg-[#0A0A0A]">

          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
            <p className="text-xs font-sans text-white/40">
              {loading ? 'Loading…' : `${totalCount.toLocaleString()} ${totalCount === 1 ? 'property' : 'properties'}`}
            </p>
            <div className="flex items-center gap-2">
              {/* Grid / List toggle */}
              <div className="flex items-center border border-white/10">
                <button onClick={() => setView('grid')} className={cn('p-2 transition-colors cursor-pointer', view === 'grid' ? 'text-[#C9A96E] bg-white/5' : 'text-white/30 hover:text-white')}>
                  <LayoutGrid size={14} />
                </button>
                <button onClick={() => setView('list')} className={cn('p-2 transition-colors cursor-pointer', view === 'list' ? 'text-[#C9A96E] bg-white/5' : 'text-white/30 hover:text-white')}>
                  <List size={14} />
                </button>
              </div>
              {/* Map toggle */}
              <button
                onClick={() => setShowMap(v => !v)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-[12px] tracking-[0.1em] uppercase border transition-all font-sans cursor-pointer border-white/20 text-white/40 hover:border-white/40 hover:text-white"
              >
                <MapIcon size={13} />
                {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="p-6">
            {loading ? (
              <div className={cn('grid gap-4', view === 'grid' ? (showMap ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3') : 'grid-cols-1')}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={cn('animate-pulse', view === 'grid' ? 'aspect-[3/4]' : 'h-28', 'bg-white/5')} />
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-heading text-xl mb-2 text-white">No listings found</p>
                <p className="text-sm mb-8 text-white/40">Try adjusting your filters.</p>
                <button
                  onClick={clearAll}
                  className="px-8 py-3 text-[12px] tracking-[0.15em] uppercase border transition-all border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A]"
                >
                  Clear Filters
                </button>
              </div>
            ) : view === 'grid' ? (
              <div className={cn('grid gap-x-4 gap-y-6', showMap ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')}>
                {listings.map(l => <MLSPropertyCard key={l.id} {...l} template={template} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {listings.map(l => <ListRow key={l.id} listing={l} template={template} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !loading && (
              <div className="flex items-center justify-center gap-1 mt-12">
                <button onClick={() => handlePage(page - 1)} disabled={page <= 1} className="p-2 transition-colors disabled:opacity-25 text-white/50 hover:text-white">
                  <ChevronLeft size={16} />
                </button>
                {paginationRange(page, totalPages).map((p, i) =>
                  p === '...' ? (
                    <span key={`e${i}`} className="w-8 text-center text-sm text-white/20">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => handlePage(p)}
                      className={cn(
                        'w-8 h-8 text-sm transition-all',
                        p === page
                          ? 'bg-[#C9A96E] text-[#0A0A0A] font-medium'
                          : 'text-white/40 hover:text-white',
                      )}
                    >
                      {p}
                    </button>
                  )
                )}
                <button onClick={() => handlePage(page + 1)} disabled={page >= totalPages} className="p-2 transition-colors disabled:opacity-25 text-white/50 hover:text-white">
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: sticky map panel */}
        {showMap && (
          <div className="hidden lg:block">
            <div className="sticky top-[160px]" style={{ height: 'calc(100vh - 160px)' }}>
              <MapView listings={listings} template={template} theme={MAP_THEME} className="w-full h-full" />
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
