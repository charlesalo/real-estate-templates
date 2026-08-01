import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Maximize2, ArrowRight } from 'lucide-react'
import StatusBadge from './StatusBadge'
import PriceTag from '@/components/real-estate/PriceTag'
import { cn } from '@/lib/utils'

export default function MLSPropertyCard({
  id,
  image,
  price,
  address,
  city,
  state,
  zip,
  beds,
  baths,
  sqft,
  status = 'Active',
  mlsId,
  template = 'luxury-agent',
}) {
  const href = `/${template}/listings/${mlsId ?? id}`
  const isLuxury = template === 'luxury-agent'

  return (
    <Link href={href} className="group block">

      {/* Image — 16/9 landscape */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={address ?? 'Property listing'}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className={cn('absolute inset-0', isLuxury ? 'bg-[#1A1A1A]' : 'bg-template-surface')} />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={status} />
        </div>

        {/* Price overlay — bottom left */}
        <div className="absolute bottom-3 left-4">
          <PriceTag price={price} size="md" className="text-white" />
        </div>
      </div>

      {/* Info bar */}
      <div className={cn(
        'pt-3 pb-3 border-b space-y-2',
        isLuxury ? 'border-white/[0.07]' : 'border-template-border',
      )}>

        {/* Address */}
        <p className={cn(
          'text-sm font-sans transition-colors duration-200 leading-snug',
          isLuxury ? 'text-white/70 group-hover:text-white' : 'text-template-fg/70 group-hover:text-template-fg',
        )}>
          {address}{city ? `, ${city}` : ''}
        </p>

        {/* City/state/zip + MLS# */}
        <div className="flex items-center gap-3">
          {(state || zip) && (
            <p className={cn('text-xs font-sans', isLuxury ? 'text-white/30' : 'text-template-fg/35')}>
              {[city, state, zip].filter(Boolean).join(', ')}
            </p>
          )}
          {mlsId && (
            <p className={cn('text-[12px] tracking-[0.15em] font-sans', isLuxury ? 'text-white/20' : 'text-template-fg/25')}>
              MLS# {mlsId}
            </p>
          )}
        </div>

        {/* Stats row */}
        <div className={cn(
          'flex items-center justify-between text-xs font-sans',
          isLuxury ? 'text-white/35' : 'text-template-fg/45',
        )}>
          <div className="flex items-center gap-4">
            {beds != null && (
              <span className="flex items-center gap-1.5">
                <Bed size={11} strokeWidth={1.5} />
                {beds} {beds === 1 ? 'Bed' : 'Beds'}
              </span>
            )}
            {baths != null && (
              <span className="flex items-center gap-1.5">
                <Bath size={11} strokeWidth={1.5} />
                {baths} {baths === 1 ? 'Bath' : 'Baths'}
              </span>
            )}
            {sqft != null && (
              <span className="flex items-center gap-1.5">
                <Maximize2 size={11} strokeWidth={1.5} />
                {sqft.toLocaleString()} sqft
              </span>
            )}
          </div>
          <ArrowRight
            size={13}
            strokeWidth={1.5}
            className={cn(
              'transition-all duration-200 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
              isLuxury ? 'text-[#C9A96E]' : 'text-template-accent',
            )}
          />
        </div>
      </div>

    </Link>
  )
}
