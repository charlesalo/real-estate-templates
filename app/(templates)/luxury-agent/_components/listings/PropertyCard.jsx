import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Maximize2 } from 'lucide-react'
import StatusBadge from './StatusBadge'
import PriceTag from '@/components/real-estate/PriceTag'
import { cn } from '@/lib/utils'

export default function PropertyCard({
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
  variant = 'default', // default | featured
}) {
  const href = `/${template}/listings/${mlsId ?? id}`
  const isFeatured = variant === 'featured'

  return (
    <Link href={href} className="group block">
      {/* Image container */}
      <div
        className={cn(
          'relative overflow-hidden',
          isFeatured ? 'aspect-[3/4]' : 'aspect-[4/3]',
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={address ?? 'Property listing'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className={cn('absolute inset-0', 'bg-[#1A1A1A]')} />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <StatusBadge status={status} />
        </div>

        {/* Price + address over image */}
        <div className="absolute bottom-4 left-4 right-4">
          <PriceTag price={price} size="lg" className="text-white block" />
          <p className="text-white/65 text-sm mt-1 truncate font-sans">
            {address}{city ? `, ${city}` : ''}
          </p>
        </div>
      </div>

      {/* Details bar */}
      <div
        className={cn(
          'pt-4 pb-2 flex items-center gap-5 text-xs font-sans',
          'text-white/45',
        )}
      >
        {beds != null && (
          <span className="flex items-center gap-1.5">
            <Bed size={12} strokeWidth={1.5} />
            {beds} {beds === 1 ? 'Bed' : 'Beds'}
          </span>
        )}
        {baths != null && (
          <span className="flex items-center gap-1.5">
            <Bath size={12} strokeWidth={1.5} />
            {baths} {baths === 1 ? 'Bath' : 'Baths'}
          </span>
        )}
        {sqft != null && (
          <span className="flex items-center gap-1.5">
            <Maximize2 size={12} strokeWidth={1.5} />
            {sqft.toLocaleString()} sqft
          </span>
        )}
        <span
          className={cn(
            'ml-auto text-[12px] tracking-[0.15em] uppercase transition-colors duration-200',
            'text-template-accent/50 group-hover:text-template-accent',
          )}
        >
          View →
        </span>
      </div>
    </Link>
  )
}
