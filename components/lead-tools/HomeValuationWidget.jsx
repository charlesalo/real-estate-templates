'use client'

import { useState, useRef, useCallback } from 'react'
import Script from 'next/script'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, CheckCircle, MapPin } from 'lucide-react'

const leadSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  consent: z.boolean().refine(v => v === true, 'You must agree to continue'),
})

export default function HomeValuationWidget({ agentName = 'Victoria Sinclair', googleMapsKey, theme = 'dark' }) {
  const isLight = theme === 'light'
  const inputRef = useRef(null)
  const autocompleteRef = useRef(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [phase, setPhase] = useState('idle') // idle | loading | modal
  const [submitted, setSubmitted] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: { consent: false },
  })

  const initAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google?.maps?.places) return
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
      // Without `fields`, picking a place fetches every available field and
      // bills the Contact + Atmosphere data SKUs on top of Basic. These two
      // are all we read, and both sit in the Basic tier.
      fields: ['formatted_address', 'geometry'],
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

  const handleGetValue = () => {
    if (!selectedPlace || phase !== 'idle') return
    setMapError(false)
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
          leadSource: 'Luxury Agent - Home Valuation',
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

  const staticMapUrl = selectedPlace?.geometry && googleMapsKey
    ? (() => {
        const addr = encodeURIComponent(selectedPlace.formatted_address)
        return `https://maps.googleapis.com/maps/api/staticmap?center=${addr}&zoom=15&size=600x400&scale=2&markers=color:0xC9A96E%7C${addr}&key=${googleMapsKey}`
      })()
    : null

  return (
    <>
      <style>{isLight ? `
        .pac-container {
          background: #fff;
          border: 1px solid #D5DBE9;
          border-top: none;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 12px 32px rgba(15,30,62,0.12);
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
      ` : `
        .pac-container {
          background: #0D0D0D;
          border: 1px solid rgba(255,255,255,0.08);
          border-top: none;
          border-radius: 0;
          box-shadow: 0 16px 40px rgba(0,0,0,0.6);
          font-family: var(--font-inter), system-ui, sans-serif;
        }
        .pac-item {
          background: #0D0D0D;
          border-top: 1px solid rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.55);
          padding: 10px 16px;
          cursor: pointer;
          font-size: 13px;
        }
        .pac-item:hover, .pac-item-selected {
          background: rgba(201,169,110,0.08);
          color: #fff;
        }
        .pac-item-query { color: rgba(255,255,255,0.85); font-size: 13px; }
        .pac-matched { color: #C9A96E; }
        .pac-icon { display: none; }
      `}</style>

      {googleMapsKey && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places`}
          strategy="afterInteractive"
          onLoad={initAutocomplete}
        />
      )}

      {/* Address bar + loading bar */}
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col min-[480px]:flex-row bg-white">
          <div className="flex flex-1 items-center px-5 gap-3 min-w-0">
            <MapPin size={15} className={isLight ? 'text-[#4B6090] flex-shrink-0' : 'text-[#C9A96E] flex-shrink-0'} />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value)
                if (selectedPlace) setSelectedPlace(null)
              }}
              placeholder="Enter your home address..."
              className="flex-1 py-[18px] text-[#111] text-sm placeholder:text-gray-400 outline-none bg-transparent font-sans min-w-0"
            />
          </div>
          <button
            onClick={handleGetValue}
            disabled={!selectedPlace || phase === 'loading'}
            className={isLight
              ? 'px-6 lg:px-8 py-4 min-[480px]:py-[18px] bg-[#1A2D5A] text-white text-[12px] tracking-[0.2em] uppercase font-semibold font-sans transition-colors hover:bg-[#243870] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1A2D5A]'
              : 'px-6 lg:px-8 py-4 min-[480px]:py-[18px] bg-[#C9A96E] text-[#0A0A0A] text-[12px] tracking-[0.2em] uppercase font-semibold font-sans transition-colors hover:bg-[#b8935a] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#C9A96E]'
            }
          >
            Get Free Valuation
          </button>
        </div>

        {/* Loading bar */}
        <div className={isLight ? 'h-[2px] bg-[#D5DBE9] overflow-hidden' : 'h-[2px] bg-white/10 overflow-hidden'}>
          <AnimatePresence>
            {phase === 'loading' && (
              <motion.div
                key="bar"
                className={isLight ? 'h-full bg-[#1A2D5A]' : 'h-full bg-[#C9A96E]'}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {phase === 'modal' && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
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
                className={isLight
                  ? 'relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto'
                  : 'relative w-full max-w-4xl bg-[#0D0D0D] border border-white/[0.08] overflow-hidden max-h-[90vh] overflow-y-auto'
                }
                onClick={e => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className={isLight
                    ? 'absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#6B7280] hover:text-[#111827] transition-all'
                    : 'absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all'
                  }
                  aria-label="Close"
                >
                  <X size={isLight ? 16 : 18} strokeWidth={isLight ? 2 : 1.5} />
                </button>

                <div className="grid lg:grid-cols-2">

                  {/* ── Left: form ── */}
                  <div className="p-8 lg:p-10">
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center min-h-[420px] text-center"
                      >
                        <CheckCircle size={52} className={isLight ? 'text-[#1A2D5A] mb-5' : 'text-[#C9A96E] mb-6'} strokeWidth={1.25} />
                        <h3 className={isLight ? 'text-2xl font-bold text-[#111827] mb-2' : 'font-heading text-2xl lg:text-3xl font-normal text-white mb-3'}>
                          You're All Set
                        </h3>
                        <p className={isLight ? 'text-[#6B7280] text-sm font-sans leading-relaxed max-w-xs' : 'text-white/45 text-sm font-sans leading-relaxed max-w-xs'}>
                          {agentName} will reach out within 24 hours with your personalized home valuation report.
                        </p>
                      </motion.div>
                    ) : (
                      <>
                        <p className={isLight ? 'text-[12px] tracking-[0.4em] uppercase text-[#4B6090] font-sans mb-2' : 'text-[12px] tracking-[0.45em] uppercase text-[#C9A96E] font-sans mb-3'}>
                          Free Home Valuation
                        </p>
                        <h2 className={isLight ? 'text-2xl font-bold text-[#111827] mb-2 text-balance' : 'font-heading text-2xl lg:text-3xl font-normal text-white mb-2 text-balance'}>
                          Unlock Your Home's Value
                        </h2>
                        <p className={isLight ? 'text-[#6B7280] text-sm font-sans mb-6 leading-relaxed' : 'text-white/40 text-sm font-sans mb-8 leading-relaxed'}>
                          Complete the form and {agentName} will prepare your personalized valuation report.
                        </p>

                        {/* Address confirmation */}
                        <div className={isLight
                          ? 'flex items-start gap-3 px-4 py-3 bg-[#EEF1F7] rounded-lg mb-6'
                          : 'flex items-start gap-3 p-3.5 border border-white/[0.07] bg-white/[0.02] mb-7'
                        }>
                          <MapPin size={13} className={isLight ? 'text-[#4B6090] mt-0.5 flex-shrink-0' : 'text-[#C9A96E] mt-0.5 flex-shrink-0'} />
                          <span className={isLight ? 'text-[#1A2D5A] text-sm font-sans leading-snug font-medium' : 'text-white/60 text-sm font-sans leading-snug'}>
                            {selectedPlace?.formatted_address}
                          </span>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                          <div>
                            <input
                              {...register('fullName')}
                              type="text"
                              placeholder="Full Name"
                              className={isLight
                                ? 'w-full bg-transparent border border-[#D5DBE9] text-[#111827] text-sm px-4 py-3 rounded-lg outline-none placeholder:text-[#9CA3AF] focus:border-[#1A2D5A] transition-colors font-sans'
                                : 'w-full bg-transparent border-b border-white/10 focus:border-[#C9A96E] py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors font-sans'
                              }
                            />
                            {errors.fullName && (
                              <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                            )}
                          </div>
                          <div>
                            <input
                              {...register('email')}
                              type="email"
                              placeholder="Email Address"
                              className={isLight
                                ? 'w-full bg-transparent border border-[#D5DBE9] text-[#111827] text-sm px-4 py-3 rounded-lg outline-none placeholder:text-[#9CA3AF] focus:border-[#1A2D5A] transition-colors font-sans'
                                : 'w-full bg-transparent border-b border-white/10 focus:border-[#C9A96E] py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors font-sans'
                              }
                            />
                            {errors.email && (
                              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                          </div>
                          <div>
                            <input
                              {...register('phone')}
                              type="tel"
                              placeholder="Phone Number"
                              className={isLight
                                ? 'w-full bg-transparent border border-[#D5DBE9] text-[#111827] text-sm px-4 py-3 rounded-lg outline-none placeholder:text-[#9CA3AF] focus:border-[#1A2D5A] transition-colors font-sans'
                                : 'w-full bg-transparent border-b border-white/10 focus:border-[#C9A96E] py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors font-sans'
                              }
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                            )}
                          </div>

                          <label className="flex items-start gap-3 cursor-pointer group pt-1">
                            <input
                              {...register('consent')}
                              type="checkbox"
                              className={isLight ? 'mt-0.5 w-4 h-4 flex-shrink-0 accent-[#1A2D5A]' : 'mt-0.5 flex-shrink-0 accent-[#C9A96E]'}
                            />
                            <span className={isLight
                              ? 'text-[12px] text-[#9CA3AF] font-sans leading-relaxed group-hover:text-[#6B7280] transition-colors'
                              : 'text-[12px] text-white/30 font-sans leading-relaxed group-hover:text-white/50 transition-colors'
                            }>
                              I agree to be contacted by {agentName} regarding my home valuation request.
                            </span>
                          </label>
                          {errors.consent && (
                            <p className="text-red-500 text-xs -mt-2">{errors.consent.message}</p>
                          )}

                          {submitError && (
                            <p className={isLight ? 'text-red-500 text-sm text-center' : 'text-red-400 text-sm text-center'}>{submitError}</p>
                          )}

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={isLight
                              ? 'w-full py-3.5 bg-[#1A2D5A] text-white text-[12px] tracking-[0.25em] uppercase font-bold rounded-lg hover:bg-[#243870] transition-colors mt-2 disabled:opacity-50'
                              : 'w-full bg-[#C9A96E] text-[#0A0A0A] py-4 text-[12px] tracking-[0.2em] uppercase font-semibold font-sans hover:bg-[#b8935a] transition-colors mt-2 disabled:opacity-50'
                            }
                          >
                            {isSubmitting ? 'Submitting…' : 'Unlock Your Free Valuation'}
                          </button>
                        </form>
                      </>
                    )}
                  </div>

                  {/* ── Right: map + agent info ── */}
                  <div className={isLight
                    ? 'flex flex-col bg-[#F4F6FB] border-t lg:border-t-0 lg:border-l border-[#D5DBE9]'
                    : 'flex flex-col bg-[#111] border-t lg:border-t-0 lg:border-l border-white/[0.06]'
                  }>
                    <div className={isLight ? 'px-8 py-6 border-b border-[#D5DBE9]' : 'px-8 py-6 border-b border-white/[0.07]'}>
                      <p className={isLight ? 'text-[12px] tracking-[0.4em] uppercase text-[#4B6090] font-sans mb-1' : 'text-[12px] tracking-[0.4em] uppercase text-[#C9A96E] font-sans mb-1'}>
                        Prepared By
                      </p>
                      <p className={isLight ? 'text-lg font-bold text-[#111827]' : 'font-heading text-xl text-white'}>{agentName}</p>
                    </div>

                    <div className="flex-1 min-h-[260px] lg:min-h-0 relative overflow-hidden">
                      {staticMapUrl && !mapError ? (
                        <img
                          src={staticMapUrl}
                          alt="Property location"
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={() => setMapError(true)}
                        />
                      ) : (
                        <div className={isLight ? 'absolute inset-0 flex items-center justify-center bg-[#F3F4F6]' : 'absolute inset-0 flex items-center justify-center'}>
                          <div className="text-center">
                            <MapPin size={36} className={isLight ? 'text-[#D5DBE9] mx-auto mb-3' : 'text-[#C9A96E]/25 mx-auto mb-3'} strokeWidth={1} />
                            <p className={isLight ? 'text-[#9CA3AF] text-xs font-sans tracking-wider uppercase' : 'text-white/15 text-xs font-sans tracking-wider uppercase'}>Map preview</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={isLight ? 'px-8 py-5 border-t border-[#D5DBE9]' : 'px-8 py-5 border-t border-white/[0.07]'}>
                      <p className={isLight ? 'text-[12px] tracking-[0.35em] uppercase text-[#9CA3AF] font-sans mb-1.5' : 'text-[12px] tracking-[0.35em] uppercase text-white/20 font-sans mb-1.5'}>
                        Property Address
                      </p>
                      <p className={isLight ? 'text-[#4B5563] text-sm font-sans leading-snug' : 'text-white/55 text-sm font-sans leading-snug'}>
                        {selectedPlace?.formatted_address}
                      </p>
                    </div>
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
