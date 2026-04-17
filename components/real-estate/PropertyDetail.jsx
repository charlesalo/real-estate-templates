'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Bed, Bath, Maximize2, X, ChevronLeft, ChevronRight, MapPin, Calendar, Tag, Phone, Mail } from 'lucide-react'
import { formatPrice } from './PriceTag'
import StatusBadge from './StatusBadge'
import PropertyCard from './PropertyCard'
import { cn } from '@/lib/utils'

function Gallery({ photos = [], template }) {
  const [lightbox, setLightbox] = useState(null)
  const isLuxury = template === 'luxury-agent'

  return (
    <>
      {/* Main grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-1 h-[420px] lg:h-[560px]">
        {[...Array(5)].map((_, i) => {
          const src = photos[i]
          return (
            <div
              key={i}
              onClick={() => src && setLightbox(i)}
              className={cn(
                'relative overflow-hidden cursor-pointer group',
                i === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1',
                !src && (isLuxury ? 'bg-[#1A1A1A]' : 'bg-template-surface'),
              )}
            >
              {src && (
                <>
                  <Image
                    src={src}
                    alt={`Property photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                </>
              )}
              {i === 4 && photos.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-medium">+{photos.length - 5} more</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={e => { e.stopPropagation(); setLightbox(null) }}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
            >
              <X size={24} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); setLightbox(v => (v - 1 + photos.length) % photos.length) }}
              className="absolute left-4 text-white/50 hover:text-white p-2"
            >
              <ChevronLeft size={28} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-[4/3] mx-8"
            >
              <Image
                src={photos[lightbox]}
                alt={`Photo ${lightbox + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
            <button
              onClick={e => { e.stopPropagation(); setLightbox(v => (v + 1) % photos.length) }}
              className="absolute right-4 text-white/50 hover:text-white p-2"
            >
              <ChevronRight size={28} />
            </button>
            <div className="absolute bottom-4 text-white/40 text-sm">
              {lightbox + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ContactSidebar({ agentName, agentPhoto, agentPhone, agentEmail, listingAddress, template }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: `I'm interested in ${listingAddress ?? 'this property'}. Please contact me.` })
  const [sent, setSent] = useState(false)
  const isLuxury = template === 'luxury-agent'

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, listing: listingAddress }) })
    setSent(true)
  }

  return (
    <div className={cn('sticky top-24 border p-6', isLuxury ? 'bg-[#0D0D0D] border-white/10' : 'bg-template-surface border-template-border rounded-xl')}>
      {/* Agent */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
        {agentPhoto && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image src={agentPhoto} alt={agentName ?? 'Agent'} fill className="object-cover" />
          </div>
        )}
        <div>
          <div className={cn('font-medium text-sm', isLuxury ? 'text-white' : 'text-template-fg')}>{agentName}</div>
          <div className="flex gap-3 mt-1.5">
            {agentPhone && <a href={`tel:${agentPhone}`} className="text-template-accent"><Phone size={13} /></a>}
            {agentEmail && <a href={`mailto:${agentEmail}`} className="text-template-accent"><Mail size={13} /></a>}
          </div>
        </div>
      </div>

      {sent ? (
        <div className="py-6 text-center">
          <p className={cn('font-heading text-lg mb-2', isLuxury ? 'text-white' : 'text-template-fg')}>Message Sent</p>
          <p className={cn('text-sm', isLuxury ? 'text-white/50' : 'text-template-fg/60')}>We'll be in touch shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { key: 'name', placeholder: 'Your Name', type: 'text' },
            { key: 'email', placeholder: 'Email Address', type: 'email' },
            { key: 'phone', placeholder: 'Phone Number', type: 'tel' },
          ].map(f => (
            <input
              key={f.key}
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
              required={f.key !== 'phone'}
              className={cn(
                'w-full text-sm px-3 py-2.5 outline-none border bg-transparent',
                isLuxury
                  ? 'border-white/10 text-white placeholder:text-white/30 focus:border-template-accent'
                  : 'border-template-border text-template-fg placeholder:text-template-fg/40 rounded focus:border-template-accent',
              )}
            />
          ))}
          <textarea
            placeholder="Message"
            rows={3}
            value={form.message}
            onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
            className={cn(
              'w-full text-sm px-3 py-2.5 outline-none border bg-transparent resize-none',
              isLuxury
                ? 'border-white/10 text-white placeholder:text-white/30 focus:border-template-accent'
                : 'border-template-border text-template-fg placeholder:text-template-fg/40 rounded focus:border-template-accent',
            )}
          />
          <button
            type="submit"
            className={cn(
              'w-full py-3 text-[11px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-90',
              isLuxury ? 'bg-template-accent text-[#0A0A0A]' : 'bg-template-accent text-template-accent-fg rounded',
            )}
          >
            Request Info
          </button>
        </form>
      )}
    </div>
  )
}

export default function PropertyDetail({
  listing,
  similarListings = [],
  template = 'luxury-agent',
  agentName,
  agentPhoto,
  agentPhone,
  agentEmail,
}) {
  const isLuxury = template === 'luxury-agent'
  if (!listing) return null

  const {
    photos = [],
    listPrice,
    address,
    property,
    mls,
    remarks,
    listDate,
    mlsId,
  } = listing

  const fullAddress = address?.full ?? [address?.streetNumber, address?.streetName].filter(Boolean).join(' ')
  const city = address?.city
  const state = address?.state
  const zip = address?.postalCode
  const beds = property?.bedrooms
  const baths = property?.bathsFull
  const sqft = property?.area
  const lotSize = property?.lotSize
  const yearBuilt = property?.yearBuilt
  const status = mls?.status ?? 'Active'
  const features = property?.features ?? []

  return (
    <div className={cn('min-h-screen', isLuxury ? 'bg-[#0A0A0A]' : 'bg-template-bg')}>
      {/* Gallery */}
      <Gallery photos={photos} template={template} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <h1 className={cn('font-heading text-3xl lg:text-4xl font-normal', isLuxury ? 'text-white' : 'text-template-fg')}>
                  {formatPrice(listPrice)}
                </h1>
                <StatusBadge status={status} />
              </div>
              <div className={cn('flex items-center gap-1.5 text-sm', isLuxury ? 'text-white/50' : 'text-template-fg/60')}>
                <MapPin size={13} className="text-template-accent flex-shrink-0" />
                {fullAddress}{city ? `, ${city}` : ''}{state ? `, ${state}` : ''} {zip}
              </div>
            </div>

            {/* Key stats */}
            <div className={cn('grid grid-cols-3 lg:grid-cols-5 gap-4 py-6 border-y', isLuxury ? 'border-white/10' : 'border-template-border')}>
              {[
                { icon: Bed, label: 'Bedrooms', value: beds },
                { icon: Bath, label: 'Bathrooms', value: baths },
                { icon: Maximize2, label: 'Sq Ft', value: sqft?.toLocaleString() },
                { label: 'Lot Size', value: lotSize ? `${lotSize?.toLocaleString()} sqft` : null },
                { label: 'Year Built', value: yearBuilt },
              ].filter(s => s.value).map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={cn('font-heading text-xl font-normal', isLuxury ? 'text-white' : 'text-template-fg')}>
                    {stat.value}
                  </div>
                  <div className={cn('text-[10px] tracking-widest uppercase mt-1 font-sans', isLuxury ? 'text-white/35' : 'text-template-fg/50')}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            {remarks && (
              <div>
                <h2 className={cn('font-heading text-xl font-normal mb-4', isLuxury ? 'text-white' : 'text-template-fg')}>
                  About This Property
                </h2>
                <p className={cn('text-sm leading-relaxed', isLuxury ? 'text-white/60' : 'text-template-fg/70')}>
                  {remarks}
                </p>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h2 className={cn('font-heading text-xl font-normal mb-4', isLuxury ? 'text-white' : 'text-template-fg')}>
                  Property Features
                </h2>
                <ul className="grid grid-cols-2 gap-2">
                  {features.map((f, i) => (
                    <li key={i} className={cn('text-sm flex items-center gap-2', isLuxury ? 'text-white/60' : 'text-template-fg/70')}>
                      <span className="w-1 h-1 rounded-full bg-template-accent flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Listing details */}
            <div className={cn('grid grid-cols-2 gap-4 text-sm pt-6 border-t', isLuxury ? 'border-white/10' : 'border-template-border')}>
              {[
                { icon: Tag, label: 'MLS #', value: mlsId },
                { icon: Calendar, label: 'Listed', value: listDate ? new Date(listDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null },
              ].filter(d => d.value).map((d, i) => (
                <div key={i} className={cn('flex items-center gap-2', isLuxury ? 'text-white/40' : 'text-template-fg/50')}>
                  <d.icon size={13} className="flex-shrink-0" />
                  <span>{d.label}: {d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <ContactSidebar
              template={template}
              agentName={agentName}
              agentPhoto={agentPhoto}
              agentPhone={agentPhone}
              agentEmail={agentEmail}
              listingAddress={fullAddress}
            />
          </div>
        </div>

        {/* Similar listings */}
        {similarListings.length > 0 && (
          <div className={cn('mt-20 pt-12 border-t', isLuxury ? 'border-white/10' : 'border-template-border')}>
            <h2 className={cn('font-heading text-3xl font-normal mb-10', isLuxury ? 'text-white' : 'text-template-fg')}>
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarListings.slice(0, 3).map(l => (
                <PropertyCard key={l.id ?? l.mlsId} {...l} template={template} variant="featured" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
