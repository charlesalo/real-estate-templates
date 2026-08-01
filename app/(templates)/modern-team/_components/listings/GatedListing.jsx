'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Bath, Bed, Camera, FileText, Lock, Maximize2, TrendingUp } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { formatPrice } from '@/components/real-estate/PriceTag'

const WITHHELD = [
  { Icon: Camera,     label: 'Every photo in the gallery' },
  { Icon: FileText,   label: 'Full property description & features' },
  { Icon: TrendingUp, label: 'Price history and days on market' },
]

/**
 * What a signed-out visitor sees instead of the full listing.
 *
 * Only the teaser fields from previewListing() are passed in — the rest of the
 * SimplyRETS payload stays on the server, so "view source" gets nothing extra.
 */
export default function ModernTeamGatedListing({ listing, teamName = 'The Hargrove Group' }) {
  const { openAuth } = useAuth()

  const address = listing.address?.full ?? 'This property'
  const cityLine = [listing.address?.city, listing.address?.state, listing.address?.postalCode]
    .filter(Boolean)
    .join(', ')

  const stats = [
    { Icon: Bed,       value: listing.property?.bedrooms,  label: 'Beds' },
    { Icon: Bath,      value: listing.property?.bathsFull, label: 'Baths' },
    { Icon: Maximize2, value: listing.property?.area?.toLocaleString(), label: 'Sq Ft' },
  ].filter(s => s.value != null && s.value !== '')

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">

        <Link
          href="/modern-team/listings"
          className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-[#6B7280] hover:text-[#1A2D5A] transition-colors font-sans mb-8"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          Back to Search
        </Link>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">

          {/* Teaser photo */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EEF1F7]">
            {listing.photo ? (
              <Image
                src={listing.photo}
                alt={address}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#EEF1F7] to-[#D5DBE9]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E3E]/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-[12px] tracking-[0.15em] uppercase font-sans">
                <Lock size={11} strokeWidth={2} />
                1 of many photos
              </div>
            </div>
          </div>

          {/* Gate */}
          <div>
            <span className="inline-block px-2.5 py-1 text-[12px] tracking-[0.15em] uppercase font-semibold rounded bg-[#1A2D5A] text-white mb-4">
              {listing.status}
            </span>

            <p className="text-3xl font-bold text-[#1A2D5A] tracking-tight">
              {formatPrice(listing.price)}
            </p>
            <h1 className="text-lg font-medium text-[#111827] mt-2">{address}</h1>
            {cityLine && <p className="text-sm text-[#6B7280] font-sans mt-1">{cityLine}</p>}

            {stats.length > 0 && (
              <div className="flex items-center gap-6 mt-6 pb-6 border-b border-[#D5DBE9]">
                {stats.map(({ Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-[#4B6090] font-sans">
                    <Icon size={14} strokeWidth={1.5} />
                    <span className="font-semibold text-[#111827]">{value}</span> {label}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 rounded-2xl bg-[#1A2D5A] px-7 py-8">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center mb-5">
                <Lock size={17} className="text-[#7B93C5]" strokeWidth={1.75} />
              </div>
              <p className="text-[12px] tracking-[0.3em] uppercase text-[#7B93C5] font-sans mb-2">
                Free Account Required
              </p>
              <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                See the full listing
              </h2>

              <div className="space-y-3 mt-6">
                {WITHHELD.map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon size={13} className="text-[#7B93C5] flex-shrink-0" strokeWidth={1.75} />
                    <span className="text-sm text-white/60 font-sans">{label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openAuth('listing')}
                className="w-full mt-8 py-3.5 bg-white text-[#1A2D5A] text-[12px] tracking-[0.25em] uppercase font-semibold rounded-lg hover:bg-[#EEF1F7] transition-colors"
              >
                Create Free Account
              </button>
              <p className="text-[12px] text-white/30 font-sans mt-4 text-center">
                Always free · Takes about 20 seconds
              </p>
            </div>

            <p className="text-[12px] text-[#9CA3AF] font-sans mt-6 leading-relaxed">
              Listing courtesy of the local MLS via IDX. {teamName} is an equal housing opportunity
              brokerage. All information is deemed reliable but not guaranteed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
