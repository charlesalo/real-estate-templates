'use client'

import { useState } from 'react'
import { LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react'
import PropertyCard from './PropertyCard'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 12

export default function ListingGrid({
  listings = [],
  loading = false,
  totalCount,
  template = 'luxury-agent',
  currentPage = 1,
  onPageChange,
}) {
  const [view, setView] = useState('grid')
  const isLuxury = template === 'luxury-agent'
  const total = totalCount ?? listings.length
  const totalPages = Math.ceil(total / PAGE_SIZE)

  const labelClass = cn(
    'text-xs font-sans',
    isLuxury ? 'text-white/40' : 'text-template-fg/50',
  )

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8">
        <p className={labelClass}>
          {loading ? 'Loading…' : `${total.toLocaleString()} ${total === 1 ? 'property' : 'properties'} found`}
        </p>
        <div className={cn('flex items-center gap-1 border', isLuxury ? 'border-white/10' : 'border-template-border rounded')}>
          <button
            onClick={() => setView('grid')}
            aria-label="Grid view"
            className={cn(
              'p-2 transition-colors',
              view === 'grid'
                ? isLuxury ? 'text-template-accent bg-white/5' : 'text-template-accent bg-template-surface'
                : isLuxury ? 'text-white/30 hover:text-white' : 'text-template-fg/40 hover:text-template-fg',
            )}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView('list')}
            aria-label="List view"
            className={cn(
              'p-2 transition-colors',
              view === 'list'
                ? isLuxury ? 'text-template-accent bg-white/5' : 'text-template-accent bg-template-surface'
                : isLuxury ? 'text-white/30 hover:text-white' : 'text-template-fg/40 hover:text-template-fg',
            )}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Grid / List */}
      {loading ? (
        <div className={cn(
          'grid gap-6',
          view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1',
        )}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'animate-pulse rounded',
                view === 'grid' ? 'aspect-[3/4]' : 'h-32',
                isLuxury ? 'bg-white/5' : 'bg-template-surface',
              )}
            />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="py-24 text-center">
          <p className={cn('text-lg font-heading mb-3', isLuxury ? 'text-white' : 'text-template-fg')}>
            No listings found
          </p>
          <p className={labelClass}>Try adjusting your search filters.</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {listings.map(l => (
            <PropertyCard key={l.id ?? l.mlsId} {...l} template={template} variant="featured" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {listings.map(l => (
            <PropertyCard key={l.id ?? l.mlsId} {...l} template={template} variant="list" />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-14">
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
            className={cn(
              'p-2 transition-colors disabled:opacity-30',
              isLuxury ? 'text-white/50 hover:text-white' : 'text-template-fg/50 hover:text-template-fg',
            )}
          >
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => onPageChange?.(p)}
              className={cn(
                'w-9 h-9 text-sm transition-all',
                p === currentPage
                  ? isLuxury ? 'bg-template-accent text-[#0A0A0A] font-medium' : 'bg-template-accent text-template-accent-fg font-medium rounded'
                  : isLuxury ? 'text-white/40 hover:text-white' : 'text-template-fg/50 hover:text-template-fg',
              )}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={cn(
              'p-2 transition-colors disabled:opacity-30',
              isLuxury ? 'text-white/50 hover:text-white' : 'text-template-fg/50 hover:text-template-fg',
            )}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
