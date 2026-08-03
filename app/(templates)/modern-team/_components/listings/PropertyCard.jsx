import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Maximize2 } from 'lucide-react'
import { formatPrice } from '@/components/real-estate/PriceTag'

const STATUS_STYLES = {
  Active:  'bg-[#1A2D5A] text-white',
  Pending: 'bg-[#4B6090] text-white',
  Sold:    'bg-[#6B7280] text-white',
  Closed:  'bg-[#6B7280] text-white',
}

export default function PropertyCard({
  id,
  mlsId,
  image,
  price,
  address,
  city,
  state,
  beds,
  baths,
  sqft,
  status = 'Active',
}) {
  const href = `/modern-team/listings/${mlsId ?? id}`

  return (
    <Link
      href={href}
      className="group bg-white border border-[#D5DBE9] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#1A2D5A]/30 transition-all duration-300 block"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#EEF1F7]">
        {image && (
          <Image
            src={image}
            alt={address ?? 'Property listing'}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 text-[12px] tracking-[0.15em] uppercase font-semibold rounded ${STATUS_STYLES[status] ?? STATUS_STYLES.Active}`}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <p className="text-xl font-bold text-[#1A2D5A] mb-1">
          {formatPrice(price)}
        </p>

        {/* Address */}
        <p className="text-sm font-medium text-[#111827] leading-snug">
          {address}
        </p>
        {city && (
          <p className="text-xs text-[#6B7280] font-sans mt-0.5">
            {[city, state].filter(Boolean).join(', ')}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#EEF1F7]">
          {beds != null && (
            <span className="flex items-center gap-1.5 text-xs text-[#4B6090] font-sans">
              <Bed size={13} strokeWidth={1.5} />
              {beds} {beds === 1 ? 'Bed' : 'Beds'}
            </span>
          )}
          {baths != null && (
            <span className="flex items-center gap-1.5 text-xs text-[#4B6090] font-sans">
              <Bath size={13} strokeWidth={1.5} />
              {baths} {baths === 1 ? 'Bath' : 'Baths'}
            </span>
          )}
          {sqft != null && (
            <span className="flex items-center gap-1.5 text-xs text-[#4B6090] font-sans">
              <Maximize2 size={13} strokeWidth={1.5} />
              {sqft.toLocaleString()} sqft
            </span>
          )}
          <span className="ml-auto text-xs font-medium text-[#4B6090] group-hover:text-[#1A2D5A] transition-colors font-sans">
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}
