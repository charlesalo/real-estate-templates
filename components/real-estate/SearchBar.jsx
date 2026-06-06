'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const PRICE_OPTIONS = [
  { label: 'Any Price', value: '' },
  { label: '$500K', value: '500000' },
  { label: '$1M', value: '1000000' },
  { label: '$2M', value: '2000000' },
  { label: '$3M', value: '3000000' },
  { label: '$5M', value: '5000000' },
  { label: '$10M', value: '10000000' },
]

const BED_OPTIONS = [
  { label: 'Any', value: '' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
]

const TYPE_OPTIONS = [
  { label: 'All Types', value: '' },
  { label: 'Single Family', value: 'SingleFamily' },
  { label: 'Condo / Co-op', value: 'Condominium' },
  { label: 'Multi-Family', value: 'MultiFamily' },
  { label: 'Land', value: 'Land' },
]

export default function SearchBar({
  onSearch,
  defaultValues = {},
  basePath = '/luxury-agent/listings',
  template = 'luxury-agent',
  variant = 'page', // page | hero
}) {
  const router = useRouter()
  const isLuxury = template === 'luxury-agent'

  const [values, setValues] = useState({
    q: defaultValues.q ?? '',
    minprice: defaultValues.minprice ?? '',
    maxprice: defaultValues.maxprice ?? '',
    minbeds: defaultValues.minbeds ?? '',
    type: defaultValues.type ?? '',
  })

  const set = (key, val) => setValues(v => ({ ...v, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    Object.entries(values).forEach(([k, v]) => { if (v) params.set(k, v) })
    if (onSearch) {
      onSearch(values)
    } else {
      router.push(`${basePath}?${params.toString()}`)
    }
  }

  const clear = () => {
    setValues({ q: '', minprice: '', maxprice: '', minbeds: '', type: '' })
    router.push(basePath)
  }

  const hasFilters = Object.values(values).some(Boolean)

  const selectClass = cn(
    'text-sm bg-transparent border-0 outline-none cursor-pointer',
    isLuxury
      ? 'text-white/70 hover:text-white [&>option]:bg-[#1A1A1A]'
      : 'text-template-fg/70 hover:text-template-fg',
  )

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-wrap items-center gap-0',
        isLuxury
          ? 'bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10'
          : 'bg-white border border-template-border rounded-lg shadow-sm',
      )}
    >
      {/* Location */}
      <div className={cn('flex items-center gap-2 px-4 py-3 flex-1 min-w-[160px]', isLuxury ? 'border-r border-white/10' : 'border-r border-template-border')}>
        <Search size={15} className={isLuxury ? 'text-template-accent flex-shrink-0' : 'text-template-accent flex-shrink-0'} />
        <input
          type="text"
          placeholder="City, neighborhood, ZIP…"
          value={values.q}
          onChange={e => set('q', e.target.value)}
          className={cn(
            'flex-1 bg-transparent text-sm outline-none placeholder:text-white/30 min-w-0',
            isLuxury ? 'text-white placeholder:text-white/30' : 'text-template-fg placeholder:text-template-fg/40',
          )}
        />
      </div>

      {/* Min price */}
      <div className={cn('px-4 py-3', isLuxury ? 'border-r border-white/10' : 'border-r border-template-border')}>
        <select value={values.minprice} onChange={e => set('minprice', e.target.value)} className={selectClass} aria-label="Minimum price">
          {PRICE_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.value ? `From ${o.label}` : 'Min Price'}</option>
          ))}
        </select>
      </div>

      {/* Max price */}
      <div className={cn('px-4 py-3', isLuxury ? 'border-r border-white/10' : 'border-r border-template-border')}>
        <select value={values.maxprice} onChange={e => set('maxprice', e.target.value)} className={selectClass} aria-label="Maximum price">
          {PRICE_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.value ? `To ${o.label}` : 'Max Price'}</option>
          ))}
        </select>
      </div>

      {/* Beds */}
      <div className={cn('px-4 py-3', isLuxury ? 'border-r border-white/10' : 'border-r border-template-border')}>
        <select value={values.minbeds} onChange={e => set('minbeds', e.target.value)} className={selectClass} aria-label="Minimum bedrooms">
          {BED_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.value ? `${o.label} Beds` : 'Beds'}</option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div className={cn('px-4 py-3', isLuxury ? 'border-r border-white/10' : 'border-r border-template-border')}>
        <select value={values.type} onChange={e => set('type', e.target.value)} className={selectClass} aria-label="Property type">
          {TYPE_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 px-3">
        {hasFilters && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear filters"
            className={cn('p-2 transition-colors', isLuxury ? 'text-white/30 hover:text-white' : 'text-template-fg/40 hover:text-template-fg')}
          >
            <X size={15} />
          </button>
        )}
        <button
          type="submit"
          className={cn(
            'px-5 py-2 text-[12px] tracking-[0.15em] uppercase font-medium transition-all',
            isLuxury
              ? 'bg-template-accent text-[#0A0A0A] hover:opacity-90'
              : 'bg-template-accent text-template-accent-fg rounded hover:opacity-90',
          )}
        >
          Search
        </button>
      </div>
    </form>
  )
}
