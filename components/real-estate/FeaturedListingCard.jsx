import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Maximize2 } from 'lucide-react'

const BADGE_STYLES = {
  'Exclusive Listing': 'bg-[#C9A96E] text-[#0A0A0A]',
  'Off-Market':        'bg-[#C9A96E]/70 text-[#0A0A0A]',
  'Coming Soon':       'bg-[#C9A96E]/55 text-[#0A0A0A]',
  'Sold':              'bg-[#C9A96E]/55 text-[#0A0A0A]',
}

export default function FeaturedListingCard({ listing, href }) {
  return (
    <Link href={href ?? `/luxury-agent/featured-listings/${listing.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.address}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-block px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase font-semibold ${BADGE_STYLES[listing.badge] ?? 'bg-white/15 text-white backdrop-blur-sm'}`}>
            {listing.badge}
          </span>
        </div>

        {/* Price + address */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-heading text-2xl text-white font-normal">
            ${listing.price.toLocaleString()}
          </p>
          <p className="text-white/60 text-sm mt-0.5 truncate font-sans">
            {listing.address}, {listing.city}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="pt-4 pb-2 flex items-center gap-5 text-xs text-white/40 font-sans">
        {listing.beds  != null && <span className="flex items-center gap-1.5"><Bed      size={12} strokeWidth={1.5} />{listing.beds} Beds</span>}
        {listing.baths != null && <span className="flex items-center gap-1.5"><Bath     size={12} strokeWidth={1.5} />{listing.baths} Baths</span>}
        {listing.sqft  != null && <span className="flex items-center gap-1.5"><Maximize2 size={12} strokeWidth={1.5} />{listing.sqft.toLocaleString()} sqft</span>}
        <span className="ml-auto text-[10px] tracking-[0.15em] uppercase text-[#C9A96E]/50 group-hover:text-[#C9A96E] transition-colors">
          View Details →
        </span>
      </div>
    </Link>
  )
}
