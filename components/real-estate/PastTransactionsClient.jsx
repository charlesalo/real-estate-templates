'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ModalTrigger from '@/components/ui/ModalTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, X, ChevronLeft, ChevronRight, Bed, Bath, Maximize2, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import CTASection from '@/components/sections/CTASection'
import ParallaxBanner from '@/components/sections/ParallaxBanner'

const LIMIT = 12

const TYPES = [
  { label: 'All Types',     value: '' },
  { label: 'Single Family', value: 'SingleFamily' },
  { label: 'Condo / Co-op', value: 'Condominium' },
  { label: 'Multi-Family',  value: 'MultiFamily' },
  { label: 'Land',          value: 'Land' },
]

const SORTS = [
  { label: 'Newest First',       value: '-listdate' },
  { label: 'Price: High → Low',  value: '-listprice' },
  { label: 'Price: Low → High',  value: 'listprice' },
]

const PRICE_RANGES = [
  { label: 'All Prices',       min: '', max: '' },
  { label: 'Under $500K',      min: '', max: '500000' },
  { label: '$500K – $1M',      min: '500000',  max: '1000000' },
  { label: '$1M – $2M',        min: '1000000', max: '2000000' },
  { label: '$2M – $5M',        min: '2000000', max: '5000000' },
  { label: '$5M+',             min: '5000000', max: '' },
]

function normalize(raw = []) {
  return raw.map(l => ({
    id:      l.mlsId,
    mlsId:   l.mlsId,
    price:   l.listPrice,
    address: l.address?.full ?? [l.address?.streetNumber, l.address?.streetName].filter(Boolean).join(' '),
    city:    l.address?.city,
    state:   l.address?.state,
    beds:    l.property?.bedrooms,
    baths:   l.property?.bathsFull,
    sqft:    l.property?.area,
    type:    l.property?.type,
    status:  l.mls?.status ?? 'Closed',
    dom:     l.mls?.daysOnMarket,
    image:   l.photos?.[0],
  }))
}

function paginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

function computeStats(listings) {
  if (!listings.length) return null
  const prices = listings.map(l => l.price).filter(Boolean)
  const doms   = listings.map(l => l.dom).filter(v => v != null)
  const total  = prices.reduce((s, p) => s + p, 0)
  const avg    = prices.length ? Math.round(total / prices.length) : 0
  const avgDom = doms.length  ? Math.round(doms.reduce((s, d) => s + d, 0) / doms.length) : null
  return { total, avg, avgDom }
}

// ─── Sold card ────────────────────────────────────────────────────────────────

function SoldCard({ listing, template, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/${template}/listings/${listing.mlsId}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {listing.image ? (
            <Image
              src={listing.image}
              alt={listing.address ?? 'Property'}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1A1A1A]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

          {/* Sold badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-2.5 py-1 text-[12px] tracking-[0.25em] uppercase font-semibold bg-[#C9A96E]/55 text-[#0A0A0A] backdrop-blur-sm">
              Sold
            </span>
          </div>

          {/* Price overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-heading text-2xl text-white font-normal">
              ${listing.price?.toLocaleString()}
            </p>
            <p className="text-white/60 text-sm mt-0.5 truncate font-sans">
              {listing.address}{listing.city ? `, ${listing.city}` : ''}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="pt-4 pb-1 flex items-center gap-4 text-xs text-white/40 font-sans">
          {listing.beds  != null && <span className="flex items-center gap-1.5"><Bed      size={11} strokeWidth={1.5} />{listing.beds} Beds</span>}
          {listing.baths != null && <span className="flex items-center gap-1.5"><Bath     size={11} strokeWidth={1.5} />{listing.baths} Baths</span>}
          {listing.sqft  != null && <span className="flex items-center gap-1.5"><Maximize2 size={11} strokeWidth={1.5} />{listing.sqft.toLocaleString()} sqft</span>}
          <span className="ml-auto text-[12px] tracking-[0.15em] uppercase text-[#C9A96E]/50 group-hover:text-[#C9A96E] transition-colors">
            View →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PastTransactionsClient({
  initialListings = [],
  initialTotal    = 0,
  initialFilters  = {},
  template        = 'luxury-agent',
}) {
  const router = useRouter()

  const [filters, setFilters] = useState({
    q:        initialFilters.q        ?? '',
    type:     initialFilters.type     ?? '',
    minprice: initialFilters.minprice ?? '',
    maxprice: initialFilters.maxprice ?? '',
    sort:     initialFilters.sort     ?? '-listdate',
  })

  const [listings,   setListings]   = useState(normalize(initialListings))
  const [totalCount, setTotalCount] = useState(initialTotal)
  const [loading,    setLoading]    = useState(false)
  const [page,       setPage]       = useState(parseInt(initialFilters.page ?? '1'))
  const [showFilters, setShowFilters] = useState(false)

  const totalPages = Math.ceil(totalCount / LIMIT)
  const stats      = computeStats(listings)

  const fetchListings = useCallback(async (f, p = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ status: 'Closed' })
      if (f.q)        params.set('q', f.q)
      if (f.type)     params.set('type', f.type)
      if (f.minprice) params.set('minprice', f.minprice)
      if (f.maxprice) params.set('maxprice', f.maxprice)
      if (f.sort)     params.set('sort', f.sort)
      params.set('limit',  LIMIT)
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
    if (f.q)        params.set('q', f.q)
    if (f.type)     params.set('type', f.type)
    if (f.minprice) params.set('minprice', f.minprice)
    if (f.maxprice) params.set('maxprice', f.maxprice)
    if (f.sort && f.sort !== '-listdate') params.set('sort', f.sort)
    if (p > 1)      params.set('page', p)
    const qs = params.toString()
    router.replace(`/${template}/past-transactions${qs ? `?${qs}` : ''}`, { scroll: false })
  }, [router, template])

  const apply = useCallback((f, p = 1) => {
    setFilters(f)
    setPage(p)
    fetchListings(f, p)
    syncUrl(f, p)
  }, [fetchListings, syncUrl])

  const handlePage = (p) => {
    setPage(p)
    fetchListings(filters, p)
    syncUrl(filters, p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activePriceRange = PRICE_RANGES.find(
    r => r.min === filters.minprice && r.max === filters.maxprice
  ) ?? PRICE_RANGES[0]

  const selCls = 'bg-transparent border-0 outline-none cursor-pointer text-sm text-white/60 [&>option]:bg-[#1A1A1A]'

  return (
    <div className="bg-[#0A0A0A]">

      {/* ── Page header ───────────────────────────────────────── */}
      <ParallaxBanner src="/images/luxury-agent/xtra9.jpg" priority>
        <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] mb-4 font-sans">
          Proven Track Record
        </p>
        <h1 className="font-heading text-5xl lg:text-6xl font-normal text-white mb-5">
          Past Transactions
        </h1>
        <div className="w-12 h-px bg-[#C9A96E] mb-5" />
        <p className="text-white/45 font-sans text-base max-w-xl leading-relaxed">
          {totalCount > 0
            ? `A curated record of ${totalCount.toLocaleString()} successful closings — representing an unrivaled command of the luxury market.`
            : "View Victoria Sinclair’s track record of successful home sales across Los Angeles."}
        </p>
      </ParallaxBanner>

      {/* ── Stats bar ─────────────────────────────────────────── */}
      <div className="border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '270+',   label: 'Homes Sold' },
              { value: '$500M+', label: 'Transaction Volume' },
              { value: '98%',    label: 'List-to-Sale Ratio' },
              { value: '19 Days', label: 'Avg. Days on Market' },
            ].map((s, i) => (
              <div key={i} className={cn('text-center', i > 0 && 'border-l border-white/[0.07]')}>
                <p className="font-heading text-3xl lg:text-5xl text-white mb-2">{s.value}</p>
                <p className="text-[12px] tracking-[0.25em] uppercase text-[#C9A96E] font-sans">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter bar ────────────────────────────────────────── */}
      <div className="sticky top-20 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-0 my-4 border border-white/10">

            {/* Search */}
            <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-[160px] border-r border-white/10">
              <Search size={13} className="text-[#C9A96E] flex-shrink-0" />
              <input
                type="text"
                placeholder="City, ZIP, address…"
                value={filters.q}
                onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && apply(filters)}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none min-w-0"
              />
              {filters.q && (
                <button onClick={() => apply({ ...filters, q: '' })} className="text-white/30 hover:text-white">
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Type — desktop */}
            <div className="hidden md:block px-4 py-3 border-r border-white/10">
              <select
                value={filters.type}
                onChange={e => apply({ ...filters, type: e.target.value })}
                className={selCls}
              >
                {TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Price range — desktop */}
            <div className="hidden md:block px-4 py-3 border-r border-white/10">
              <select
                value={`${filters.minprice}|${filters.maxprice}`}
                onChange={e => {
                  const [min, max] = e.target.value.split('|')
                  apply({ ...filters, minprice: min, maxprice: max })
                }}
                className={selCls}
              >
                {PRICE_RANGES.map(r => (
                  <option key={r.label} value={`${r.min}|${r.max}`}>{r.label}</option>
                ))}
              </select>
            </div>

            {/* Sort — desktop */}
            <div className="hidden md:block px-4 py-3 border-r border-white/10">
              <select
                value={filters.sort}
                onChange={e => apply({ ...filters, sort: e.target.value })}
                className={selCls}
              >
                {SORTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Mobile: all filters button */}
            <button
              onClick={() => setShowFilters(v => !v)}
              className="md:hidden flex items-center gap-1.5 px-4 py-3 text-white/50 hover:text-white border-r border-white/10 transition-colors"
            >
              <SlidersHorizontal size={14} />
              <span className="text-[12px] tracking-[0.1em] uppercase font-sans">Filters</span>
            </button>

            {/* Search button */}
            <button
              onClick={() => apply(filters)}
              className="px-5 py-3 text-[12px] tracking-[0.15em] uppercase font-medium bg-[#C9A96E] text-[#0A0A0A] hover:opacity-90 transition-opacity ml-auto"
            >
              Search
            </button>
          </div>

          {/* Mobile filter panel */}
          {showFilters && (
            <div className="md:hidden pb-4 flex flex-wrap gap-3">
              <select value={filters.type} onChange={e => apply({ ...filters, type: e.target.value })} className="flex-1 bg-[#111] border border-white/10 text-white/60 text-sm px-3 py-2 outline-none [&>option]:bg-[#1A1A1A]">
                {TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <select
                value={`${filters.minprice}|${filters.maxprice}`}
                onChange={e => { const [min, max] = e.target.value.split('|'); apply({ ...filters, minprice: min, maxprice: max }) }}
                className="flex-1 bg-[#111] border border-white/10 text-white/60 text-sm px-3 py-2 outline-none [&>option]:bg-[#1A1A1A]"
              >
                {PRICE_RANGES.map(r => <option key={r.label} value={`${r.min}|${r.max}`}>{r.label}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* ── Grid ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 lg:pt-14 pb-20 lg:pb-28">

        {/* Result count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs text-white/35 font-sans"></p>
          {(filters.q || filters.type || filters.minprice || filters.maxprice) && (
            <button
              onClick={() => apply({ q: '', type: '', minprice: '', maxprice: '', sort: filters.sort })}
              className="text-[12px] text-white/30 hover:text-white font-sans flex items-center gap-1 transition-colors"
            >
              <X size={11} /> Clear filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white/5 aspect-[4/3]" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-heading text-2xl text-white mb-3">No transactions found</p>
            <p className="text-white/40 text-sm mb-8 font-sans">Try adjusting your filters.</p>
            <button
              onClick={() => apply({ q: '', type: '', minprice: '', maxprice: '', sort: '-listdate' })}
              className="px-8 py-3 text-[12px] tracking-[0.2em] uppercase border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {listings.map((listing, i) => (
              <SoldCard key={listing.id} listing={listing} template={template} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-center gap-1 mt-16">
            <button
              onClick={() => handlePage(page - 1)}
              disabled={page <= 1}
              className="p-2 text-white/50 hover:text-white disabled:opacity-25 transition-colors"
            >
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
            <button
              onClick={() => handlePage(page + 1)}
              disabled={page >= totalPages}
              className="p-2 text-white/50 hover:text-white disabled:opacity-25 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ── CTA callout ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="border border-white/[0.07] bg-[#0D0D0D] px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[12px] tracking-[0.4em] uppercase text-[#C9A96E] mb-2 font-sans">
              Curious About Your Property?
            </p>
            <h2 className="font-heading text-2xl lg:text-3xl text-white font-normal">
              Know Your Home's Worth
            </h2>
            <p className="text-white/40 text-sm mt-1 font-sans">
              Get a free, no-obligation estimate of your home's current market value.
            </p>
          </div>
          <Link
            href={`/${template}/home-valuation`}
            className="flex-shrink-0 flex items-center gap-2 px-7 py-3.5 text-[12px] tracking-[0.2em] uppercase border border-white/25 text-white/70 hover:border-white hover:text-white transition-all font-sans"
          >
            Get a Free Valuation <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      <CTASection
        template={template}
        background={{ image: '/images/luxury-agent/work-with-me.jpg' }}
        headline="Ready to Work Together?"
        subheadline="Whether buying, selling, or simply exploring, Victoria is available to guide you."
        cta={{ label: "Let's Connect", modal: true }}
      />
    </div>
  )
}
