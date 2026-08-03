'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Bath, Bed, Camera, FileText, Lock, Maximize2, TrendingUp } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import StatusBadge from './StatusBadge'

const WITHHELD = [
  { Icon: Camera,     label: 'The complete photography gallery' },
  { Icon: FileText,   label: 'Full property description & appointments' },
  { Icon: TrendingUp, label: 'Price history and days on market' },
]

/**
 * What a signed-out visitor sees instead of the full listing.
 *
 * Only the teaser fields from previewListing() are passed in — the rest of the
 * SimplyRETS payload stays on the server, so "view source" gets nothing extra.
 */
export default function GatedListing({ listing, agentName = 'Victoria Sinclair' }) {
  const { openAuth } = useAuth()

  const address = listing.address?.full ?? 'This residence'
  const cityLine = [listing.address?.city, listing.address?.state, listing.address?.postalCode]
    .filter(Boolean)
    .join(', ')

  const stats = [
    { Icon: Bed,       value: listing.property?.bedrooms,  label: 'Beds' },
    { Icon: Bath,      value: listing.property?.bathsFull, label: 'Baths' },
    { Icon: Maximize2, value: listing.property?.area?.toLocaleString(), label: 'Sq Ft' },
  ].filter(s => s.value != null && s.value !== '')

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        <Link
          href="/luxury-agent/listings"
          className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-white/40 hover:text-[#C9A96E] transition-colors font-sans mb-10"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Home Search
        </Link>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">

          {/* Teaser photo */}
          <div className="relative aspect-[16/10] overflow-hidden bg-[#141414]">
            {listing.photo ? (
              <Image
                src={listing.photo}
                alt={address}
                fill
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-[#141414]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <StatusBadge status={listing.status} />
            </div>
            <div className="absolute bottom-5 left-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/20 bg-black/40 backdrop-blur-sm text-white/80 text-[12px] tracking-[0.2em] uppercase font-sans">
                <Lock size={11} strokeWidth={1.75} />
                1 of many photographs
              </span>
            </div>
          </div>

          {/* Gate */}
          <div>
            <p className="font-heading text-4xl font-normal text-white tracking-tight">
              ${listing.price?.toLocaleString()}
            </p>
            <h1 className="text-base font-sans text-white/70 mt-3 leading-snug">{address}</h1>
            {cityLine && <p className="text-sm text-white/30 font-sans mt-1">{cityLine}</p>}

            {stats.length > 0 && (
              <div className="flex items-center gap-6 mt-7 pb-7 border-b border-white/[0.07]">
                {stats.map(({ Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-white/40 font-sans">
                    <Icon size={13} strokeWidth={1.5} />
                    <span className="text-white/80">{value}</span> {label}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-9 border border-[#C9A96E]/25 bg-[#0D0D0D] px-8 py-9">
              <div className="w-11 h-11 flex items-center justify-center border border-[#C9A96E]/30 mb-6">
                <Lock size={16} className="text-[#C9A96E]" strokeWidth={1.5} />
              </div>
              <p className="text-[12px] tracking-[0.35em] uppercase text-[#C9A96E] font-sans mb-3">
                Private Client Access
              </p>
              <h2 className="font-heading text-2xl font-normal text-white leading-tight">
                View the complete listing
              </h2>

              <div className="space-y-3.5 mt-7">
                {WITHHELD.map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon size={13} className="text-[#C9A96E]/70 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm text-white/45 font-sans">{label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openAuth('listing')}
                className="w-full mt-9 py-3.5 text-[12px] tracking-[0.25em] uppercase font-medium bg-[#C9A96E] text-[#0A0A0A] hover:opacity-90 transition-opacity"
              >
                Register for Access
              </button>
              <p className="text-[12px] text-white/25 font-sans mt-5 text-center">
                Complimentary · Takes about 20 seconds
              </p>
            </div>

            <p className="text-[12px] text-white/25 font-sans mt-7 leading-relaxed">
              Listing courtesy of the local MLS via IDX. {agentName} is an equal housing
              opportunity broker. All information is deemed reliable but not guaranteed and should
              be independently verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
