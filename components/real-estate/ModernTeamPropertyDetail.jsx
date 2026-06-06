'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bed, Bath, Maximize2, X, ChevronLeft, ChevronRight,
  MapPin, ExternalLink,
} from 'lucide-react'
import { formatPrice } from './PriceTag'
import PropertyMap from './ModernTeamPropertyMap'
import ScheduleTourModal from '@/components/ui/ModernTeamScheduleTourModal'

function splitFeatures(str) {
  if (!str) return []
  return str.split(',').map(s => s.trim()).filter(Boolean)
}

// ── Gallery ────────────────────────────────────────────────────────────────
function Gallery({ photos = [] }) {
  const [lightbox, setLightbox] = useState(null)
  const count = photos.length
  const slots = Math.min(count, 5)
  const overflow = count - 5

  if (count === 0) return <div className="h-[480px] bg-[#EEF1F7] rounded-2xl" />

  return (
    <>
      <div className={`grid gap-2 h-[480px] rounded-2xl overflow-hidden ${count === 1 ? 'grid-cols-1' : count <= 3 ? 'grid-cols-3' : 'grid-cols-4'} grid-rows-2`}>
        {/* Main hero photo */}
        <div
          className={`relative cursor-pointer group overflow-hidden ${count >= 4 ? 'col-span-2 row-span-2' : count === 3 ? 'col-span-2 row-span-2' : count === 2 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-2'}`}
          onClick={() => setLightbox(0)}
        >
          <Image src={photos[0]} alt="Property" fill priority className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="50vw" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* Thumbnail photos */}
        {Array.from({ length: Math.min(4, count - 1) }).map((_, i) => {
          const idx = i + 1
          const isLast = i === 3 && overflow > 0
          return (
            <div
              key={i}
              className="relative cursor-pointer group overflow-hidden"
              onClick={() => setLightbox(isLast ? 0 : idx)}
            >
              <Image src={photos[idx]} alt={`Photo ${idx + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="25vw" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              {isLast && (
                <div className="absolute inset-0 bg-[#1A2D5A]/70 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-base">+{overflow}</span>
                  <span className="text-white/80 text-[12px] tracking-[0.15em] uppercase mt-1 font-sans">View all</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {count > 1 && (
        <div className="flex justify-end mt-2">
          <button
            onClick={() => setLightbox(0)}
            className="text-[12px] tracking-[0.15em] uppercase font-semibold text-[#1A2D5A] hover:text-[#243870] transition-colors font-sans cursor-pointer"
          >
            View all {count} photos →
          </button>
        </div>
      )}

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button onClick={e => { e.stopPropagation(); setLightbox(null) }} className="absolute top-4 right-4 text-white/60 hover:text-white p-2"><X size={24} /></button>
            <button onClick={e => { e.stopPropagation(); setLightbox(v => (v - 1 + count) % count) }} className="absolute left-4 text-white/50 hover:text-white p-2"><ChevronLeft size={28} /></button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-[4/3] mx-8"
            >
              <Image src={photos[lightbox]} alt={`Photo ${lightbox + 1}`} fill className="object-contain" sizes="90vw" />
            </motion.div>
            <button onClick={e => { e.stopPropagation(); setLightbox(v => (v + 1) % count) }} className="absolute right-4 text-white/50 hover:text-white p-2"><ChevronRight size={28} /></button>
            <div className="absolute bottom-4 text-white/40 text-sm font-sans">{lightbox + 1} / {count}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Agent card ─────────────────────────────────────────────────────────────
function AgentCard({ agentName, agentBrokerage, agentPhoto, propertyImage, propertyAddress, propertyPrice, propertyStatus }) {
  const [tourOpen, setTourOpen] = useState(false)
  const isSoldOrClosed = ['Sold', 'Closed'].includes(propertyStatus)

  return (
    <>
      <div className="sticky top-24 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          {agentPhoto && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-[#E5E7EB]">
              <Image src={agentPhoto} alt={agentName ?? 'Team'} fill className="object-cover" />
            </div>
          )}
          <div>
            <p className="text-[#111827] text-[18px] font-bold leading-snug font-sans">{agentName ?? 'Contact Agent'}</p>
            {agentBrokerage && <p className="text-[#9CA3AF] text-sm mt-0.5 font-sans">{agentBrokerage}</p>}
          </div>
        </div>

        <div className="space-y-3">
          {!isSoldOrClosed && (
            <button
              onClick={() => setTourOpen(true)}
              className="w-full py-4 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-[#243870] transition-colors duration-200 cursor-pointer font-sans"
            >
              Request a Tour
            </button>
          )}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
            className="w-full py-4 border border-[#1A2D5A] text-[#1A2D5A] text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-[#1A2D5A] hover:text-white transition-colors duration-200 cursor-pointer font-sans"
          >
            Contact Us
          </button>
        </div>
      </div>

      <ScheduleTourModal
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        propertyImage={propertyImage}
        propertyAddress={propertyAddress}
        propertyPrice={propertyPrice}
        propertyStatus={propertyStatus}
      />
    </>
  )
}

// ── Section wrapper ────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="pt-10 pb-4 border-t border-[#D5DBE9]">
      <h2 className="text-2xl font-bold text-[#111827] mb-6" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>{title}</h2>
      {children}
    </div>
  )
}

// ── Detail grid ────────────────────────────────────────────────────────────
function DetailGrid({ items }) {
  const filtered = items.filter(i => i.value != null && i.value !== '' && i.value !== false)
  if (!filtered.length) return null
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
      {filtered.map(({ label, value }) => (
        <div key={label}>
          <p className="text-[12px] tracking-[0.15em] uppercase text-[#9CA3AF] font-sans mb-1">{label}</p>
          <p className="text-sm text-[#111827] font-sans font-medium">{value}</p>
        </div>
      ))}
    </div>
  )
}

// ── Feature pills ──────────────────────────────────────────────────────────
function FeaturePills({ items }) {
  if (!items?.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(f => (
        <span key={f} className="px-3 py-1.5 text-[12px] bg-[#EEF1F7] text-[#1A2D5A] border border-[#D5DBE9] font-sans rounded-md font-medium">
          {f}
        </span>
      ))}
    </div>
  )
}

// ── Status badge ───────────────────────────────────────────────────────────
const STATUS_STYLES = {
  Active:  'bg-[#1A2D5A] text-white',
  Pending: 'bg-[#4B6090] text-white',
  Sold:    'bg-[#6B7280] text-white',
  Closed:  'bg-[#6B7280] text-white',
}

function StatusChip({ status }) {
  return (
    <span className={`px-3 py-1 text-[12px] tracking-[0.15em] uppercase font-semibold rounded font-sans ${STATUS_STYLES[status] ?? STATUS_STYLES.Active}`}>
      {status}
    </span>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ModernTeamPropertyDetail({
  listing,
  similarListings = [],
  agentName,
  agentBrokerage,
  agentPhoto,
  agentPhone,
  agentEmail,
}) {
  if (!listing) return null

  const {
    photos = [], listPrice, originalListPrice, address, property, mls,
    geo, school, association, tax, agent, office, sales, remarks,
    listDate, modified, mlsId, terms, agreement, virtualTourUrl, showingInstructions,
  } = listing

  const fullAddress = address?.full ?? [address?.streetNumber, address?.streetName].filter(Boolean).join(' ')
  const cityStateZip = [address?.city, address?.state, address?.postalCode].filter(Boolean).join(', ')
  const status = mls?.status ?? 'Active'
  const isSold = ['Sold', 'Closed'].includes(status)

  const beds         = property?.bedrooms
  const bathsFull    = property?.bathsFull
  const bathsHalf    = property?.bathsHalf
  const sqft         = property?.area
  const lotSize      = property?.lotSize
  const yearBuilt    = property?.yearBuilt
  const stories      = property?.stories
  const garageSpaces = property?.garageSpaces ? Math.round(property.garageSpaces) : null
  const fireplaces   = property?.fireplaces
  const pool         = property?.pool
  const view         = property?.view
  const style        = property?.style
  const propType     = property?.subTypeText ?? property?.type
  const subdivision  = property?.subdivision
  const foundation   = property?.foundation
  const roof         = property?.roof
  const flooring     = property?.flooring
  const accessibility = property?.accessibility
  const acres        = property?.acres
  const lotDesc      = property?.lotDescription
  const parking      = property?.parking

  const interiorFeatures = splitFeatures(property?.interiorFeatures)
  const exteriorFeatures = splitFeatures(property?.exteriorFeatures)
  const laundryFeatures  = splitFeatures(property?.laundryFeatures)
  const hoaAmenities     = splitFeatures(association?.amenities)
  const additionalRooms  = splitFeatures(property?.additionalRooms)

  const propertyAddress = `${fullAddress}${address?.city ? `, ${address.city}` : ''}${address?.state ? `, ${address.state}` : ''}`

  const keyStats = [
    { icon: <Bed size={15} strokeWidth={1.5} />,      label: beds === 1 ? 'Bed' : 'Beds',   value: beds },
    { icon: <Bath size={15} strokeWidth={1.5} />,     label: 'Baths',                        value: bathsFull },
    bathsHalf ? { label: 'Half Bath',                                                         value: bathsHalf } : null,
    { icon: <Maximize2 size={15} strokeWidth={1.5} />, label: 'Sq Ft',                       value: sqft?.toLocaleString() },
    garageSpaces  ? { label: 'Garage',    value: `${garageSpaces} Car` }  : null,
    yearBuilt     ? { label: 'Year Built', value: yearBuilt }             : null,
    stories       ? { label: 'Stories',   value: stories }                : null,
  ].filter(Boolean).filter(s => s.value != null)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* Gallery — contained in page width */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
        <Gallery photos={photos} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* ── Left: main content ── */}
          <div className="lg:col-span-2">

            {/* Price + address header */}
            <div className="pb-8">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <h1 className="text-4xl font-bold text-[#111827] font-sans leading-none">
                  {formatPrice(listPrice)}
                </h1>
                <StatusChip status={status} />
              </div>

              {originalListPrice && originalListPrice !== listPrice && (
                <p className="text-[#9CA3AF] text-sm font-sans mb-2">
                  Originally listed at {formatPrice(originalListPrice)}
                </p>
              )}

              <div className="flex items-center gap-1.5 text-sm text-[#6B7280] mt-1 font-sans">
                <MapPin size={13} className="text-[#1A2D5A] flex-shrink-0" />
                {fullAddress}{cityStateZip ? `, ${cityStateZip}` : ''}
              </div>

              {virtualTourUrl && (
                <a
                  href={virtualTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-[12px] tracking-[0.15em] uppercase font-semibold text-[#1A2D5A] hover:text-[#243870] transition-colors font-sans"
                >
                  <ExternalLink size={12} /> Virtual Tour
                </a>
              )}
            </div>

            {/* Key stats bar */}
            {keyStats.length > 0 && (
              <div className="flex flex-wrap items-center border-t border-[#D5DBE9] py-6 gap-y-3">
                {keyStats.map((stat, i) => (
                  <div key={i} className={`flex items-center gap-2 px-4 ${i > 0 ? 'border-l border-[#D5DBE9]' : 'pl-0'}`}>
                    {stat.icon && <span className="text-[#1A2D5A]">{stat.icon}</span>}
                    <span className="text-base font-bold text-[#111827] font-sans">{stat.value}</span>
                    <span className="text-xs text-[#6B7280] font-sans">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            {remarks && (
              <Section title="About This Property">
                <p className="text-sm leading-relaxed text-[#4B5563] font-sans">{remarks}</p>
              </Section>
            )}

            {/* Property details */}
            <Section title="Property Details">
              <DetailGrid items={[
                { label: 'Property Type', value: propType },
                { label: 'Style',         value: style },
                { label: 'Subdivision',   value: subdivision },
                { label: 'View',          value: view },
                { label: 'Pool',          value: pool },
                { label: 'Parking',       value: parking?.description || (parking?.spaces ? `${parking.spaces} spaces` : null) },
                { label: 'Foundation',    value: foundation },
                { label: 'Roof',          value: roof },
                { label: 'Flooring',      value: flooring },
                { label: 'Accessibility', value: accessibility },
                { label: 'Lot',           value: lotDesc || lotSize || (acres ? `${acres} ac` : null) },
                { label: 'Fireplaces',    value: fireplaces || null },
                { label: 'Market Area',   value: geo?.marketArea ?? mls?.area },
              ]} />
            </Section>

            {/* Interior features */}
            {(interiorFeatures.length > 0 || additionalRooms.length > 0) && (
              <Section title="Interior Features">
                {additionalRooms.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[12px] tracking-[0.15em] uppercase text-[#9CA3AF] font-sans mb-2">Additional Rooms</p>
                    <FeaturePills items={additionalRooms} />
                  </div>
                )}
                <FeaturePills items={interiorFeatures} />
              </Section>
            )}

            {/* Exterior features */}
            {exteriorFeatures.length > 0 && (
              <Section title="Exterior Features">
                <FeaturePills items={exteriorFeatures} />
              </Section>
            )}

            {/* Utilities */}
            {(property?.heating || property?.cooling || laundryFeatures.length > 0) && (
              <Section title="Utilities & Systems">
                <DetailGrid items={[
                  { label: 'Heating', value: property?.heating },
                  { label: 'Cooling', value: property?.cooling },
                ]} />
                {laundryFeatures.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[12px] tracking-[0.15em] uppercase text-[#9CA3AF] font-sans mb-2">Laundry</p>
                    <FeaturePills items={laundryFeatures} />
                  </div>
                )}
              </Section>
            )}

            {/* Location */}
            {(geo?.county || geo?.directions || address?.crossStreet) && (
              <Section title="Location">
                <DetailGrid items={[
                  { label: 'County',       value: geo?.county },
                  { label: 'Cross Street', value: address?.crossStreet },
                  { label: 'Market Area',  value: geo?.marketArea },
                ]} />
                {geo?.directions && (
                  <div className="mt-4">
                    <p className="text-[12px] tracking-[0.15em] uppercase text-[#9CA3AF] font-sans mb-1">Directions</p>
                    <p className="text-sm text-[#4B5563] font-sans leading-relaxed">{geo.directions}</p>
                  </div>
                )}
              </Section>
            )}

            {/* Schools */}
            {(school?.district || school?.elementarySchool || school?.middleSchool || school?.highSchool) && (
              <Section title="Schools">
                <DetailGrid items={[
                  { label: 'District',    value: school?.district },
                  { label: 'Elementary',  value: school?.elementarySchool },
                  { label: 'Middle',      value: school?.middleSchool },
                  { label: 'High School', value: school?.highSchool },
                ]} />
              </Section>
            )}

            {/* HOA */}
            {(association?.name || association?.fee) && (
              <Section title="HOA & Association">
                <DetailGrid items={[
                  { label: 'Association', value: association?.name },
                  { label: 'Fee',         value: association?.fee ? `$${association.fee.toLocaleString()}${association.frequency ? ` / ${association.frequency}` : ''}` : null },
                ]} />
                {hoaAmenities.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[12px] tracking-[0.15em] uppercase text-[#9CA3AF] font-sans mb-2">Amenities</p>
                    <FeaturePills items={hoaAmenities} />
                  </div>
                )}
              </Section>
            )}

            {/* Listing info */}
            <Section title="Listing Information">
              <DetailGrid items={[
                { label: 'MLS #',          value: mlsId },
                { label: 'List Date',      value: listDate ? new Date(listDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null },
                { label: 'Last Updated',   value: modified ? new Date(modified).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null },
                { label: 'Tax ID',         value: tax?.id },
                { label: 'Annual Tax',     value: tax?.taxAnnualAmount ? `$${tax.taxAnnualAmount.toLocaleString()} (${tax.taxYear ?? ''})` : null },
                { label: 'Terms',          value: terms },
                { label: 'Agreement',      value: agreement },
                { label: 'Listing Agent',  value: agent?.firstName ? `${agent.firstName} ${agent.lastName ?? ''}`.trim() : null },
                { label: 'Agent Email',    value: agent?.contact?.email },
                { label: 'Agent Phone',    value: agent?.contact?.cell ?? agent?.contact?.office },
                { label: 'Office',         value: office?.name ?? office?.servingName },
              ]} />
              {showingInstructions && (
                <div className="mt-4">
                  <p className="text-[12px] tracking-[0.15em] uppercase text-[#9CA3AF] font-sans mb-1">Showing Instructions</p>
                  <p className="text-sm text-[#4B5563] font-sans leading-relaxed">{showingInstructions}</p>
                </div>
              )}
            </Section>

            {/* Sales info — sold/closed only */}
            {isSold && sales?.closePrice && (
              <Section title="Sale Information">
                <DetailGrid items={[
                  { label: 'Close Price',    value: sales.closePrice ? formatPrice(sales.closePrice) : null },
                  { label: 'Close Date',     value: sales.closeDate ? new Date(sales.closeDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null },
                  { label: 'Selling Agent',  value: sales.agent?.firstName ? `${sales.agent.firstName} ${sales.agent.lastName ?? ''}`.trim() : null },
                  { label: 'Selling Office', value: sales.office?.name ?? sales.office?.servingName },
                ]} />
              </Section>
            )}

            {/* Map */}
            <Section title="Property Location">
              <PropertyMap
                lat={geo?.lat}
                lng={geo?.lng}
                address={propertyAddress}
                label={fullAddress}
              />
            </Section>

          </div>

          {/* ── Right: agent card sidebar ── */}
          <div>
            <AgentCard
              agentName={agentName}
              agentBrokerage={agentBrokerage}
              agentPhoto={agentPhoto}
              propertyImage={photos?.[0]}
              propertyAddress={propertyAddress}
              propertyPrice={listPrice}
              propertyStatus={status}
            />
          </div>
        </div>

      </div>

      {/* Similar listings — full-width EEF1F7 section, matches Featured Listings detail page */}
      {similarListings.length > 0 && (
        <section className="bg-[#EEF1F7] border-t border-[#D5DBE9] py-16 lg:py-20 -mx-6 lg:-mx-8 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs tracking-[0.35em] uppercase text-[#4B6090] mb-3 font-sans">You May Also Like</p>
            <h2 className="text-2xl font-bold text-[#111827] mb-10" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarListings.slice(0, 3).map(l => (
                <Link
                  key={l.mlsId ?? l.id}
                  href={`/modern-team/listings/${l.mlsId ?? l.id}`}
                  className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#1A2D5A]/6 transition-shadow duration-300 group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EEF1F7]">
                    {l.image && (
                      <Image
                        src={l.image}
                        alt={l.address ?? 'Property'}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A2D5A]/85 backdrop-blur-sm text-white text-[12px] font-semibold rounded-md tracking-wide uppercase font-sans">
                      {l.status ?? 'Active'}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-bold text-[#1A2D5A] mb-1" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                      {formatPrice(l.price)}
                    </p>
                    <p className="text-sm font-medium text-[#111827] leading-snug">{l.address}</p>
                    {l.city && (
                      <div className="flex items-center gap-1 text-xs text-[#6B7280] font-sans mt-0.5 mb-3">
                        <MapPin size={11} className="flex-shrink-0 text-[#4B6090]" />
                        {[l.city, l.state].filter(Boolean).join(', ')}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs text-[#4B5563] font-sans pt-3 border-t border-[#EEF1F7]">
                      {l.beds  != null && <span className="flex items-center gap-1.5"><Bed       size={12} className="text-[#4B6090]" />{l.beds} bd</span>}
                      {l.baths != null && <span className="flex items-center gap-1.5"><Bath      size={12} className="text-[#4B6090]" />{l.baths} ba</span>}
                      {l.sqft  != null && <span className="flex items-center gap-1.5"><Maximize2 size={12} className="text-[#4B6090]" />{l.sqft.toLocaleString()} sf</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
