import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Bed, Bath, Square, MapPin, CheckCircle } from 'lucide-react'
import { LISTINGS, AGENT } from '@/lib/local-expert-data'
import { notFound } from 'next/navigation'
import PropertyContactForm from './PropertyContactForm'

export async function generateStaticParams() {
  return LISTINGS.map((l) => ({ id: l.id }))
}

export async function generateMetadata({ params }) {
  const listing = LISTINGS.find((l) => l.id === params.id)
  if (!listing) return {}
  return {
    title: `${listing.address} — ${listing.neighborhood}`,
    description: `${listing.beds}BR/${listing.baths}BA ${listing.type} in ${listing.neighborhood}. Asking $${listing.price.toLocaleString()}.`,
  }
}

function formatPrice(n) {
  return `$${n.toLocaleString()}`
}

export default function PropertyDetailPage({ params }) {
  const listing = LISTINGS.find((l) => l.id === params.id)
  if (!listing) notFound()

  const similar = LISTINGS.filter((l) => l.id !== listing.id && l.neighborhood === listing.neighborhood).slice(0, 3)

  return (
    <section className="pt-[112px] pb-[64px] lg:pt-[144px] lg:pb-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <Link
          href="/local-expert/listings"
          className="inline-flex items-center gap-1.5 text-[12px] text-[#2C1E11]/45 hover:text-[#2C1E11] transition-colors mb-8"
        >
          <ArrowLeft size={13} /> Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
          <div>
            {/* Image gallery */}
            <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden mb-8">
              <div className="relative col-span-2 aspect-[16/9]">
                <Image src={listing.images[0]} alt={listing.address} fill className="object-cover" priority />
              </div>
              {listing.images.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-[16/10]">
                  <Image src={img} alt={`${listing.address} — photo ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#E5E0D8] text-[#2C1E11]/60">{listing.type}</span>
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#8B9E8B]/20 text-[#24180F]">{listing.status}</span>
            </div>

            <div className="text-[38px] font-normal text-[#24180F] leading-none mb-2" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
              {formatPrice(listing.price)}
            </div>

            <div className="flex items-start gap-1.5 text-[15px] text-[#2C1E11] mb-1">
              <MapPin size={15} className="mt-0.5 text-[#2C1E11]/40 flex-shrink-0" />
              <span>{listing.address}, {listing.neighborhood}, {listing.city}, {listing.state} {listing.zip}</span>
            </div>

            <div className="flex flex-wrap items-center gap-5 py-5 my-5 border-y border-[#E5E0D8]">
              <span className="flex items-center gap-1.5 text-[15px] text-[#2C1E11]/70"><Bed size={16} className="text-[#2C1E11]/40" /> <strong>{listing.beds}</strong> Bedrooms</span>
              <span className="flex items-center gap-1.5 text-[15px] text-[#2C1E11]/70"><Bath size={16} className="text-[#2C1E11]/40" /> <strong>{listing.baths}</strong> Bathrooms</span>
              <span className="flex items-center gap-1.5 text-[15px] text-[#24180F]/70"><Square size={16} className="text-[#24180F]/40" /> <strong>{listing.sqft.toLocaleString()}</strong> sq ft</span>
            </div>

            <h2 className="text-[18px] font-bold text-[#24180F] mb-3" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>About this home</h2>
            <p className="text-[15px] text-[#24180F]/65 leading-relaxed mb-8">{listing.description}</p>

            <h3 className="text-[18px] font-normal text-[#24180F] mb-4" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>Highlights</h3>
            <div className="grid grid-cols-2 gap-2.5 mb-10">
              {listing.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-[13px] text-[#24180F]/65">
                  <CheckCircle size={14} className="text-[#8B9E8B] flex-shrink-0" /> {f}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-[#E5E0D8] bg-[#F4F0EA]">
              <p className="text-[10px] text-[#2C1E11]/35 leading-relaxed">
                Listing Provided Courtesy of {listing.listingBrokerage}. MLS ID: {listing.mlsId}.
                All information is deemed reliable but not guaranteed and should be independently reviewed and verified.
                All properties are subject to prior sale or withdrawal. Equal Housing Opportunity. Compass Real Estate LLC, NY Lic# 109802832.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 self-start">
            <PropertyContactForm listing={listing} agent={AGENT} />
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#E5E0D8]">
            <h2 className="text-[22px] font-normal text-[#24180F] mb-6" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
              More in {listing.neighborhood}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {similar.map((l) => (
                <Link key={l.id} href={`/local-expert/listings/${l.id}`} className="group block rounded-xl overflow-hidden border border-[#E5E0D8]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={l.images[0]} alt={l.address} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-[22px] font-normal text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{formatPrice(l.price)}</p>
                    <p className="text-[11px] text-[#24180F]/50 mt-0.5">{l.address}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
