'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Script from 'next/script'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, X, CheckCircle } from 'lucide-react'

const schema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.email('Enter a valid email'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  consent: z.boolean().refine(v => v === true, 'You must agree to continue'),
})

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? ''

export default function ValuationHeroBar({ agentName = 'The Hargrove Group' }) {
  const inputRef = useRef(null)
  const autocompleteRef = useRef(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [phase, setPhase] = useState('idle') // idle | loading | modal
  const [submitted, setSubmitted] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const staticMapUrl = selectedPlace?.geometry && GOOGLE_MAPS_KEY
    ? (() => {
        const addr = encodeURIComponent(selectedPlace.formatted_address)
        return `https://maps.googleapis.com/maps/api/staticmap?center=${addr}&zoom=15&size=600x400&scale=2&markers=color:0x1A2D5A%7Clabel:H%7C${addr}&key=${GOOGLE_MAPS_KEY}`
      })()
    : null

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  })

  const initAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google?.maps?.places || autocompleteRef.current) return
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    })
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace()
      if (place?.geometry) {
        setSelectedPlace(place)
        setInputValue(place.formatted_address || inputRef.current.value)
      } else {
        setSelectedPlace(null)
      }
    })
  }, [])

  // When navigating client-side, the Maps script is already in the DOM so onLoad
  // never fires. Check on mount and initialize if the API is already available.
  useEffect(() => {
    if (window.google?.maps?.places) initAutocomplete()
  }, [initAutocomplete])

  const handleGetValue = () => {
    if (!selectedPlace || phase !== 'idle') return
    setPhase('loading')
    setTimeout(() => setPhase('modal'), 1800)
  }

  const onSubmit = async (data) => {
    setSubmitError('')
    const address = selectedPlace?.formatted_address ?? inputValue
    try {
      const res = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:       data.fullName,
          email:      data.email,
          phone:      data.phone,
          message:    `Property Address: ${address}`,
          leadSource: 'Modern Team - Home Valuation',
          formType:   'valuation',
        }),
      })
      const json = await res.json()
      if (json.success) {
        setSubmitted(true)
      } else {
        setSubmitError(json.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    }
  }

  const handleClose = () => {
    setPhase('idle')
    setSubmitted(false)
    setSubmitError('')
    reset()
  }

  return (
    <>
      <style>{`
        .mt-pac-container .pac-container {
          background: #fff;
          border: 1px solid #D5DBE9;
          border-top: none;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 12px 32px rgba(15,30,62,0.18);
          font-family: var(--font-inter), system-ui, sans-serif;
        }
        .pac-container {
          background: #fff;
          border: 1px solid #D5DBE9;
          border-top: none;
          box-shadow: 0 12px 32px rgba(15,30,62,0.18);
          font-family: var(--font-inter), system-ui, sans-serif;
        }
        .pac-item {
          background: #fff;
          border-top: 1px solid #F3F4F6;
          color: #4B5563;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 13px;
        }
        .pac-item:hover, .pac-item-selected {
          background: #EEF1F7;
          color: #1A2D5A;
        }
        .pac-item-query { color: #111827; font-size: 13px; }
        .pac-matched { color: #1A2D5A; font-weight: 600; }
        .pac-icon { display: none; }
        @keyframes valuation-load {
          from { width: 0% }
          to   { width: 100% }
        }
        .animate-valuation-load {
          animation: valuation-load 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {GOOGLE_MAPS_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`}
          strategy="afterInteractive"
          onLoad={initAutocomplete}
        />
      )}

      {/* Address bar */}
      <div className="w-full flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 sm:bg-white sm:rounded-2xl sm:shadow-2xl sm:shadow-[#0F1E3E]/30 sm:p-3 sm:pl-6">
        <div className="relative flex items-center gap-3 flex-1 bg-white sm:bg-transparent rounded-xl sm:rounded-none px-5 sm:px-0 py-4 sm:py-3 shadow-2xl shadow-[#0F1E3E]/30 sm:shadow-none">
          <MapPin size={18} className="text-[#4B6090] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              if (selectedPlace) setSelectedPlace(null)
            }}
            placeholder="Enter your home address…"
            className="flex-1 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none bg-transparent font-sans"
          />
          {/* Accent / loading line — desktop only, pinned to bottom */}
          <div className="hidden sm:block absolute bottom-0 left-0 right-6 h-[1.5px] bg-[#E5E7EB] overflow-hidden rounded-full">
            <div className={`absolute inset-y-0 left-0 h-full bg-[#1A2D5A] rounded-full ${phase === 'loading' ? 'animate-valuation-load' : 'w-0'}`} />
          </div>
        </div>
        <button
          onClick={handleGetValue}
          disabled={!selectedPlace || phase === 'loading'}
          className="w-full sm:w-[260px] flex-shrink-0 whitespace-nowrap border border-white/60 sm:border-transparent bg-transparent sm:bg-[#1A2D5A] text-white text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 sm:py-4 rounded-xl hover:bg-white sm:hover:bg-[#243870] hover:text-[#1A2D5A] sm:hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {phase === 'loading' ? 'Loading…' : 'Get Free Valuation'}
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {phase === 'modal' && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-[#0F1E3E]/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
            />
            <motion.div
              key="modal"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto grid lg:grid-cols-2"
                onClick={(e) => e.stopPropagation()}
              >

                {/* ── Left: form ── */}
                <div className="p-8 lg:p-10">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center min-h-[420px] text-center">
                      <CheckCircle size={52} className="text-[#1A2D5A] mb-5" strokeWidth={1.25} />
                      <h3 className="text-2xl font-bold text-[#111827] mb-2">You're All Set</h3>
                      <p className="text-[#6B7280] text-sm font-sans leading-relaxed max-w-xs">
                        {agentName} will reach out within 24 hours with your personalized home valuation report.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-[12px] tracking-[0.4em] uppercase text-[#4B6090] font-sans mb-2">
                        Free Home Valuation
                      </p>
                      <h2 className="text-2xl font-bold text-[#111827] mb-2">
                        Unlock Your Home's Value
                      </h2>
                      <p className="text-[#6B7280] text-sm font-sans mb-6 leading-relaxed">
                        Complete the form and {agentName} will prepare your personalized valuation report.
                      </p>

                      {/* Address confirmation */}
                      <div className="flex items-start gap-3 px-4 py-3 bg-[#EEF1F7] rounded-lg mb-6">
                        <MapPin size={14} className="text-[#4B6090] mt-0.5 flex-shrink-0" />
                        <span className="text-[#1A2D5A] text-sm font-sans leading-snug font-medium">
                          {selectedPlace?.formatted_address}
                        </span>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                          <input
                            {...register('fullName')}
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-transparent border border-[#D5DBE9] text-[#111827] text-sm px-4 py-3 rounded-lg outline-none placeholder:text-[#9CA3AF] focus:border-[#1A2D5A] transition-colors font-sans"
                          />
                          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                        </div>
                        <div>
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-transparent border border-[#D5DBE9] text-[#111827] text-sm px-4 py-3 rounded-lg outline-none placeholder:text-[#9CA3AF] focus:border-[#1A2D5A] transition-colors font-sans"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                          <input
                            {...register('phone')}
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full bg-transparent border border-[#D5DBE9] text-[#111827] text-sm px-4 py-3 rounded-lg outline-none placeholder:text-[#9CA3AF] focus:border-[#1A2D5A] transition-colors font-sans"
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer group pt-1">
                          <input
                            {...register('consent')}
                            type="checkbox"
                            className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#1A2D5A]"
                          />
                          <span className="text-[12px] text-[#9CA3AF] font-sans leading-relaxed group-hover:text-[#6B7280] transition-colors">
                            I agree to be contacted by {agentName} regarding my home valuation request.
                          </span>
                        </label>
                        {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

                        {submitError && (
                          <p className="text-red-500 text-sm text-center">{submitError}</p>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-[#1A2D5A] text-white text-[12px] tracking-[0.25em] uppercase font-bold rounded-lg hover:bg-[#243870] transition-colors mt-2 disabled:opacity-50"
                        >
                          {isSubmitting ? 'Submitting…' : 'Unlock Your Free Valuation'}
                        </button>
                      </form>
                    </>
                  )}
                </div>

                {/* ── Right: map + agent info ── */}
                <div className="flex flex-col bg-[#F4F6FB] border-t lg:border-t-0 lg:border-l border-[#D5DBE9]">

                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#6B7280] hover:text-[#111827] transition-all"
                    aria-label="Close"
                  >
                    <X size={16} strokeWidth={2} />
                  </button>

                  {/* Agent header */}
                  <div className="px-8 py-6 border-b border-[#D5DBE9]">
                    <p className="text-[12px] tracking-[0.4em] uppercase text-[#4B6090] font-sans mb-1">
                      Prepared By
                    </p>
                    <p className="text-lg font-bold text-[#111827]">{agentName}</p>
                  </div>

                  {/* Map */}
                  <div className="flex-1 min-h-[260px] lg:min-h-0 relative overflow-hidden">
                    {staticMapUrl && !mapError ? (
                      <img
                        src={staticMapUrl}
                        alt="Property location"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={() => setMapError(true)}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#F3F4F6]">
                        <div className="text-center">
                          <MapPin size={36} className="text-[#D5DBE9] mx-auto mb-3" strokeWidth={1} />
                          <p className="text-[#9CA3AF] text-xs font-sans tracking-wider uppercase">Map preview</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Property address footer */}
                  <div className="px-8 py-5 border-t border-[#D5DBE9]">
                    <p className="text-[12px] tracking-[0.35em] uppercase text-[#9CA3AF] font-sans mb-1.5">
                      Property Address
                    </p>
                    <p className="text-[#4B5563] text-sm font-sans leading-snug">
                      {selectedPlace?.formatted_address}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
