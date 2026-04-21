'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bed, Bath, Maximize2, X, ChevronLeft, ChevronRight,
  MapPin, Calendar, Tag, Phone, Mail, ExternalLink,
} from 'lucide-react'
import { formatPrice } from './PriceTag'
import StatusBadge from './StatusBadge'
import MLSPropertyCard from './MLSPropertyCard'
import PropertyMap from './PropertyMap'
import ScheduleTourModal from '@/components/ui/ScheduleTourModal'
import { cn } from '@/lib/utils'

// Split a comma-separated feature string into a clean array
function splitFeatures(str) {
  if (!str) return []
  return str.split(',').map(s => s.trim()).filter(Boolean)
}

// ── Gallery ────────────────────────────────────────────────────────────────
function Gallery({ photos = [], template }) {
  const [lightbox, setLightbox] = useState(null)
  const isLuxury = template === 'luxury-agent'
  const count = photos.length
  const gridLayout = count === 1 ? 'grid-cols-1' : count === 2 ? 'grid-cols-2' : 'grid-cols-4'
  const MAX_GRID = 7
  const slots = Math.min(count, MAX_GRID)
  const overflow = count - MAX_GRID

  function slotClass(i) {
    if (count <= 2) return 'col-span-1 row-span-2'
    if (count === 3) return i === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
    return i === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
  }

  if (count === 0) return <div className={cn('h-[420px] lg:h-[500px]', isLuxury ? 'bg-[#1A1A1A]' : 'bg-template-surface')} />

  return (
    <>
      <div className={cn('grid gap-1 h-[420px] lg:h-[520px]', gridLayout, count >= 3 && 'grid-rows-2')}>
        {Array.from({ length: slots }).map((_, i) => {
          const isLast = i === slots - 1 && overflow > 0
          return (
            <div key={i} onClick={() => setLightbox(i)} className={cn('relative overflow-hidden cursor-pointer group', slotClass(i))}>
              <Image src={photos[i]} alt={`Property photo ${i + 1}`} fill priority={i === 0} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              {isLast && (
                <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-1" onClick={e => { e.stopPropagation(); setLightbox(0) }}>
                  <span className="text-white text-lg font-medium">+{overflow} more</span>
                  <span className="text-white/60 text-xs tracking-widest uppercase">View all photos</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {count > 1 && (
        <div className="flex justify-end mt-2 px-1">
          <button onClick={() => setLightbox(0)} className={cn('text-[11px] tracking-[0.2em] uppercase transition-colors font-sans', isLuxury ? 'text-white/30 hover:text-template-accent' : 'text-template-fg/40 hover:text-template-accent')}>
            View all {count} photos →
          </button>
        </div>
      )}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
            <button onClick={e => { e.stopPropagation(); setLightbox(null) }} className="absolute top-4 right-4 text-white/60 hover:text-white p-2"><X size={24} /></button>
            <button onClick={e => { e.stopPropagation(); setLightbox(v => (v - 1 + photos.length) % photos.length) }} className="absolute left-4 text-white/50 hover:text-white p-2"><ChevronLeft size={28} /></button>
            <motion.div key={lightbox} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl aspect-[4/3] mx-8">
              <Image src={photos[lightbox]} alt={`Photo ${lightbox + 1}`} fill className="object-contain" sizes="90vw" />
            </motion.div>
            <button onClick={e => { e.stopPropagation(); setLightbox(v => (v + 1) % photos.length) }} className="absolute right-4 text-white/50 hover:text-white p-2"><ChevronRight size={28} /></button>
            <div className="absolute bottom-4 text-white/40 text-sm">{lightbox + 1} / {photos.length}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Agent sidebar ──────────────────────────────────────────────────────────
function ContactSidebar({ agentName, agentPhoto, agentPhone, agentEmail, template, propertyImage, propertyAddress, propertyPrice, propertyStatus }) {
  const [tourOpen, setTourOpen] = useState(false)
  const isLuxury = template === 'luxury-agent'

  return (
    <>
      <div className={cn('sticky top-24 border p-6', isLuxury ? 'bg-[#0D0D0D] border-white/[0.08]' : 'bg-template-surface border-template-border rounded-xl')}>
        {/* Agent info */}
        <p className="text-[9px] tracking-[0.4em] uppercase text-[#C9A96E] font-sans mb-1">Listing Agent</p>
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/[0.08]">
          {agentPhoto && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image src={agentPhoto} alt={agentName ?? 'Agent'} fill className="object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className={cn('font-heading text-base font-normal truncate', isLuxury ? 'text-white' : 'text-template-fg')}>
              {agentName ?? 'Contact Agent'}
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              {agentPhone && (
                <a href={`tel:${agentPhone}`} className="flex items-center gap-1 text-[11px] text-[#C9A96E] hover:text-white transition-colors font-sans">
                  <Phone size={11} strokeWidth={1.5} />
                  {agentPhone}
                </a>
              )}
            </div>
            {agentEmail && (
              <a href={`mailto:${agentEmail}`} className="flex items-center gap-1 mt-1 text-[11px] text-white/35 hover:text-[#C9A96E] transition-colors font-sans truncate">
                <Mail size={11} strokeWidth={1.5} />
                {agentEmail}
              </a>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {!['Sold', 'Closed'].includes(propertyStatus) && (
            <button
              onClick={() => setTourOpen(true)}
              className="w-full py-4 bg-[#C9A96E] text-[#0A0A0A] text-[11px] tracking-[0.2em] uppercase font-semibold font-sans hover:bg-[#b8935a] transition-colors"
            >
              Request a Tour
            </button>
          )}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
            className="w-full py-3.5 border border-white/15 text-white/50 text-[11px] tracking-[0.2em] uppercase font-sans hover:border-white/40 hover:text-white transition-all"
          >
            Contact Agent
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
function Section({ title, children, className }) {
  return (
    <div className={cn('pt-8 border-t border-white/[0.07]', className)}>
      <h2 className="font-heading text-xl font-normal text-white mb-5">{title}</h2>
      {children}
    </div>
  )
}

// ── Detail grid row ────────────────────────────────────────────────────────
function DetailGrid({ items }) {
  const filtered = items.filter(i => i.value != null && i.value !== '' && i.value !== false)
  if (!filtered.length) return null
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
      {filtered.map(({ label, value }) => (
        <div key={label}>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-sans mb-1">{label}</p>
          <p className="text-sm text-white/70 font-sans">{value}</p>
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
        <span key={f} className="px-3 py-1.5 text-[11px] border border-white/[0.08] text-white/50 font-sans">
          {f}
        </span>
      ))}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PropertyDetail({ listing, similarListings = [], template = 'luxury-agent', agentName, agentPhoto, agentPhone, agentEmail }) {
  const isLuxury = template === 'luxury-agent'
  if (!listing) return null

  const { photos = [], listPrice, originalListPrice, address, property, mls, geo, school, association, tax, agent, office, sales, remarks, listDate, modified, mlsId, terms, agreement, virtualTourUrl, showingInstructions } = listing

  const fullAddress = address?.full ?? [address?.streetNumber, address?.streetName].filter(Boolean).join(' ')
  const status = mls?.status ?? 'Active'

  // Property fields
  const beds        = property?.bedrooms
  const bathsFull   = property?.bathsFull
  const bathsHalf   = property?.bathsHalf
  const sqft        = property?.area
  const lotSize     = property?.lotSize
  const yearBuilt   = property?.yearBuilt
  const stories     = property?.stories
  const garageSpaces = property?.garageSpaces ? Math.round(property.garageSpaces) : null
  const fireplaces  = property?.fireplaces
  const pool        = property?.pool
  const view        = property?.view
  const style       = property?.style
  const propType    = property?.subTypeText ?? property?.type
  const subdivision = property?.subdivision
  const foundation  = property?.foundation
  const roof        = property?.roof
  const flooring    = property?.flooring
  const accessibility = property?.accessibility
  const acres       = property?.acres
  const lotDesc     = property?.lotDescription
  const addlRooms   = property?.additionalRooms
  const parking     = property?.parking

  // Feature strings → arrays
  const interiorFeatures  = splitFeatures(property?.interiorFeatures)
  const exteriorFeatures  = splitFeatures(property?.exteriorFeatures)
  const laundryFeatures   = splitFeatures(property?.laundryFeatures)
  const hoaAmenities      = splitFeatures(association?.amenities)
  const additionalRooms   = splitFeatures(addlRooms)

  const isSold = ['Sold', 'Closed'].includes(status)

  return (
    <div className={cn('min-h-screen', isLuxury ? 'bg-[#0A0A0A]' : 'bg-template-bg')}>
      <Gallery photos={photos} template={template} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* ── Main content ── */}
          <div className="lg:col-span-2 space-y-0">

            {/* Header */}
            <div className="pb-8">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <h1 className={cn('font-heading text-3xl lg:text-4xl font-normal', isLuxury ? 'text-white' : 'text-template-fg')}>
                  {formatPrice(listPrice)}
                </h1>
                <StatusBadge status={status} />
              </div>
              {originalListPrice && originalListPrice !== listPrice && (
                <p className="text-white/30 text-sm font-sans mb-2">
                  Original list price: {formatPrice(originalListPrice)}
                </p>
              )}
              <div className={cn('flex items-center gap-1.5 text-sm', isLuxury ? 'text-white/50' : 'text-template-fg/60')}>
                <MapPin size={13} className="text-template-accent flex-shrink-0" />
                {fullAddress}{address?.city ? `, ${address.city}` : ''}{address?.state ? `, ${address.state}` : ''} {address?.postalCode}
              </div>
              {virtualTourUrl && (
                <a href={virtualTourUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-[11px] tracking-[0.2em] uppercase text-[#C9A96E] hover:text-white transition-colors font-sans">
                  <ExternalLink size={12} /> Virtual Tour
                </a>
              )}
            </div>

            {/* Key stats */}
            <div className={cn('grid grid-cols-3 lg:grid-cols-5 gap-4 py-6 border-y', isLuxury ? 'border-white/10' : 'border-template-border')}>
              {[
                { label: 'Bedrooms',   value: beds },
                { label: 'Full Baths', value: bathsFull },
                { label: bathsHalf ? 'Half Baths' : null, value: bathsHalf || null },
                { label: 'Sq Ft',      value: sqft?.toLocaleString() },
                { label: 'Garage',     value: garageSpaces ? `${garageSpaces} car` : null },
                { label: 'Stories',    value: stories },
                { label: 'Year Built', value: yearBuilt },
                { label: 'Lot Size',   value: lotSize || (acres ? `${acres} ac` : null) },
                { label: 'Fireplaces', value: fireplaces || null },
                { label: 'Days on MLS', value: mls?.daysOnMarket },
              ].filter(s => s.value != null && s.label).map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={cn('font-heading text-xl font-normal', isLuxury ? 'text-white' : 'text-template-fg')}>{stat.value}</div>
                  <div className={cn('text-[10px] tracking-widest uppercase mt-1 font-sans', isLuxury ? 'text-white/35' : 'text-template-fg/50')}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            {remarks && (
              <Section title="About This Property">
                <p className={cn('text-sm leading-relaxed', isLuxury ? 'text-white/60' : 'text-template-fg/70')}>{remarks}</p>
              </Section>
            )}

            {/* Property details */}
            <Section title="Property Details">
              <DetailGrid items={[
                { label: 'Property Type',  value: propType },
                { label: 'Style',          value: style },
                { label: 'Subdivision',    value: subdivision },
                { label: 'View',           value: view },
                { label: 'Pool',           value: pool },
                { label: 'Parking',        value: parking?.description || (parking?.spaces ? `${parking.spaces} spaces` : null) },
                { label: 'Foundation',     value: foundation },
                { label: 'Roof',           value: roof },
                { label: 'Flooring',       value: flooring },
                { label: 'Accessibility',  value: accessibility },
                { label: 'Lot',            value: lotDesc },
                { label: 'Market Area',    value: geo?.marketArea ?? mls?.area },
              ]} />
            </Section>

            {/* Interior features */}
            {(interiorFeatures.length > 0 || additionalRooms.length > 0) && (
              <Section title="Interior Features">
                {additionalRooms.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-sans mb-2">Additional Rooms</p>
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
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-sans mb-2">Laundry</p>
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
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-sans mb-1">Directions</p>
                    <p className="text-sm text-white/50 font-sans leading-relaxed">{geo.directions}</p>
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
                  { label: 'Association',  value: association?.name },
                  { label: 'Fee',          value: association?.fee ? `$${association.fee.toLocaleString()}${association.frequency ? ` / ${association.frequency}` : ''}` : null },
                ]} />
                {hoaAmenities.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-sans mb-2">Amenities</p>
                    <FeaturePills items={hoaAmenities} />
                  </div>
                )}
              </Section>
            )}

            {/* Listing info */}
            <Section title="Listing Information">
              <DetailGrid items={[
                { label: 'MLS #',        value: mlsId },
                { label: 'List Date',    value: listDate ? new Date(listDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null },
                { label: 'Last Updated', value: modified ? new Date(modified).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null },
                { label: 'Tax ID',       value: tax?.id },
                { label: 'Annual Tax',   value: tax?.taxAnnualAmount ? `$${tax.taxAnnualAmount.toLocaleString()} (${tax.taxYear ?? ''})` : null },
                { label: 'Terms',        value: terms },
                { label: 'Agreement',    value: agreement },
                { label: 'Listing Agent', value: agent?.firstName ? `${agent.firstName} ${agent.lastName ?? ''}`.trim() : null },
                { label: 'Agent Email',  value: agent?.contact?.email },
                { label: 'Agent Phone',  value: agent?.contact?.cell ?? agent?.contact?.office },
                { label: 'Office',       value: office?.name ?? office?.servingName },
              ]} />
              {showingInstructions && (
                <div className="mt-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-sans mb-1">Showing Instructions</p>
                  <p className="text-sm text-white/50 font-sans leading-relaxed">{showingInstructions}</p>
                </div>
              )}
            </Section>

            {/* Sales info — sold/closed only */}
            {isSold && sales?.closePrice && (
              <Section title="Sale Information">
                <DetailGrid items={[
                  { label: 'Close Price',  value: sales.closePrice ? formatPrice(sales.closePrice) : null },
                  { label: 'Close Date',   value: sales.closeDate ? new Date(sales.closeDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null },
                  { label: 'Selling Agent', value: sales.agent?.firstName ? `${sales.agent.firstName} ${sales.agent.lastName ?? ''}`.trim() : null },
                  { label: 'Selling Office', value: sales.office?.name ?? sales.office?.servingName },
                ]} />
              </Section>
            )}

            {/* Map */}
            <Section title="Property Location">
              <PropertyMap
                lat={geo?.lat}
                lng={geo?.lng}
                address={`${fullAddress}${address?.city ? `, ${address.city}` : ''}${address?.state ? `, ${address.state}` : ''}`}
                label={fullAddress}
              />
            </Section>

          </div>

          {/* ── Sidebar ── */}
          <div>
            <ContactSidebar
              template={template}
              agentName={agentName}
              agentPhoto={agentPhoto}
              agentPhone={agentPhone}
              agentEmail={agentEmail}
              propertyImage={photos?.[0]}
              propertyAddress={`${fullAddress}${address?.city ? `, ${address.city}` : ''}${address?.state ? `, ${address.state}` : ''}`}
              propertyPrice={listPrice}
              propertyStatus={status}
            />
          </div>
        </div>

        {/* Similar listings */}
        {similarListings.length > 0 && (
          <div className={cn('mt-20 pt-12 border-t', isLuxury ? 'border-white/10' : 'border-template-border')}>
            <h2 className={cn('font-heading text-3xl font-normal mb-10', isLuxury ? 'text-white' : 'text-template-fg')}>
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
              {similarListings.slice(0, 3).map(l => (
                <MLSPropertyCard key={l.id ?? l.mlsId} {...l} template={template} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
