'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight, ArrowLeft, MapPin, X } from 'lucide-react'
import { AGENT } from '@/lib/local-expert-data'

const STEPS = ['Address', 'Property Details', 'Contact Info']
const STEP_DESCRIPTIONS = [
  "Enter the property you'd like valued — I'll pull recent, comparable sales nearby to anchor the estimate.",
  'A few specifics on the unit help sharpen the number — bedrooms, size, and condition all move the estimate.',
  "Last step. I'll have your personalized valuation ready within 24 hours — here's where to send it.",
]

export default function HomeValuationPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    address: '',
    beds: '',
    baths: '',
    sqft: '',
    condition: '',
    name: '',
    email: '',
    phone: '',
    disclosure: false,
  })
  const [done, setDone] = useState(false)
  const [predictions, setPredictions] = useState([])
  const [addressValid, setAddressValid] = useState(false)
  const [showPredictions, setShowPredictions] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [advancing, setAdvancing] = useState(false)
  const addressBoxRef = useRef(null)
  const debounceRef = useRef(null)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  // Close the address suggestions dropdown on an outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (addressBoxRef.current && !addressBoxRef.current.contains(e.target)) {
        setShowPredictions(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  // Lock background scroll while the full-screen step is open
  useEffect(() => {
    document.body.style.overflow = expanded ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [expanded])

  const fetchPredictions = useCallback((value) => {
    clearTimeout(debounceRef.current)
    if (value.trim().length < 2) {
      setPredictions([])
      return
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places/autocomplete?q=${encodeURIComponent(value)}`)
        const json = await res.json()
        setPredictions(json.predictions ?? [])
      } catch {
        setPredictions([])
      }
    }, 250)
  }, [])

  function handleAddressChange(e) {
    const value = e.target.value
    setData(prev => ({ ...prev, address: value }))
    setAddressValid(false)
    setShowPredictions(true)
    fetchPredictions(value)
  }

  function handlePredictionSelect(prediction) {
    setData(prev => ({ ...prev, address: prediction.description }))
    setAddressValid(true)
    setPredictions([])
    setShowPredictions(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Phase 1: console.log — Phase 2: POST /api/valuation + Resend
    console.log('[LocalExpert] Home valuation:', data)
    setDone(true)
  }

  function handleContinue(e) {
    e.preventDefault()
    if (advancing) return
    setAdvancing(true)
    setTimeout(() => {
      setAdvancing(false)
      if (step === 0) setExpanded(true)
      setStep(s => s + 1)
    }, 650)
  }

  function handleBack() {
    if (step === 1) setExpanded(false)
    setStep(s => s - 1)
  }

  function handleClose() {
    setExpanded(false)
    setStep(0)
  }

  const formCardContent = (
    <>
      {done ? (
        <div className="flex flex-col items-center gap-5 p-12 text-center">
          <CheckCircle size={40} className="text-[#8B9E8B]" />
          <div>
            <h2
              className="text-[24px] font-normal text-[#24180F]"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              Your estimate is being prepared.
            </h2>
            <p className="text-[16px] text-[#2C1E11]/50 mt-2">
              I&apos;ll contact you within 24 hours with a full market analysis.
            </p>
          </div>
          <Link
            href="/local-expert"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#2C1E11]/55 hover:text-[#BA5B3E] transition-colors"
          >
            Back to home <ArrowRight size={12} />
          </Link>
        </div>
      ) : (
        <form onSubmit={step === 2 ? handleSubmit : handleContinue}>
          {/* Step indicator */}
          <div className="relative px-7 pt-7 pb-5 border-b border-[#E5E0D8] overflow-hidden">
            <div className="flex items-center gap-3">
              <span className="text-[12px] tracking-[0.35em] uppercase font-medium text-[#BA5B3E]">
                Step {step + 1} of {STEPS.length}
              </span>
              <div className="flex gap-1.5">
                {STEPS.map((s, i) => (
                  <div key={s} className={`h-[2px] w-7 rounded-full transition-colors ${i <= step ? 'bg-[#BA5B3E]' : 'bg-[#2C1E11]/12'}`} />
                ))}
              </div>
            </div>
            <p className="text-[14px] font-bold text-[#2C1E11] mt-3">{STEPS[step]}</p>
            <p className="text-[13px] text-[#2C1E11]/50 leading-relaxed mt-2">{STEP_DESCRIPTIONS[step]}</p>
            {advancing && (
              <div className="absolute bottom-0 left-0 h-[2px] bg-[#1B3B2B] animate-[valuation-loading-bar_650ms_ease-out_forwards]" />
            )}
          </div>

          <div className="p-7 space-y-4">
            {step === 0 && (
              <div ref={addressBoxRef} className="relative">
                <label className="block text-[12px] uppercase tracking-wider text-[#2C1E11]/40 mb-1.5">Property Address *</label>
                <input
                  name="address"
                  required
                  autoComplete="off"
                  value={data.address}
                  onChange={handleAddressChange}
                  onFocus={() => setShowPredictions(true)}
                  placeholder="147 Perry Street, West Village, NY 10014"
                  className="w-full px-3 py-3 text-[14px] border border-[#E5E0D8] rounded-lg text-[#2C1E11] placeholder-[#2C1E11]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors"
                />
                {showPredictions && predictions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E5E0D8] rounded-lg shadow-lg z-20 overflow-hidden">
                    {predictions.map((p) => (
                      <button
                        key={p.placeId}
                        type="button"
                        onClick={() => handlePredictionSelect(p)}
                        className="w-full flex items-start gap-2 px-3 py-2.5 text-left hover:bg-[#F8F3EB] transition-colors"
                      >
                        <MapPin size={13} className="text-[#2C1E11]/35 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[13px] text-[#2C1E11]">{p.mainText}</p>
                          {p.secondaryText && (
                            <p className="text-[11px] text-[#2C1E11]/40">{p.secondaryText}</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] uppercase tracking-wider text-[#2C1E11]/40 mb-1.5">Bedrooms</label>
                    <select name="beds" value={data.beds} onChange={handleChange} className="w-full px-3 py-2.5 text-[14px] border border-[#E5E0D8] rounded-lg text-[#2C1E11] focus:outline-none bg-white">
                      <option value="">Select</option>
                      {['Studio', '1', '2', '3', '4', '5+'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] uppercase tracking-wider text-[#2C1E11]/40 mb-1.5">Bathrooms</label>
                    <select name="baths" value={data.baths} onChange={handleChange} className="w-full px-3 py-2.5 text-[14px] border border-[#E5E0D8] rounded-lg text-[#2C1E11] focus:outline-none bg-white">
                      <option value="">Select</option>
                      {['1', '1.5', '2', '2.5', '3', '3.5', '4+'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] uppercase tracking-wider text-[#2C1E11]/40 mb-1.5">Square Footage (approx.)</label>
                  <input name="sqft" type="number" value={data.sqft} onChange={handleChange} placeholder="e.g. 1400" className="w-full px-3 py-2.5 text-[14px] border border-[#E5E0D8] rounded-lg text-[#2C1E11] placeholder-[#2C1E11]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-[12px] uppercase tracking-wider text-[#2C1E11]/40 mb-1.5">Property Condition</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Excellent', 'Good', 'Fair', 'Needs Work'].map((c) => (
                      <button key={c} type="button" onClick={() => setData(p => ({ ...p, condition: c }))}
                        className={`py-2.5 text-[13px] font-medium rounded-lg border transition-colors ${data.condition === c ? 'bg-[#1B3B2B] text-white border-[#1B3B2B]' : 'border-[#E5E0D8] text-[#2C1E11]/60 hover:border-[#1B3B2B]/30'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-[12px] uppercase tracking-wider text-[#2C1E11]/40 mb-1.5">Full Name *</label>
                  <input name="name" required value={data.name} onChange={handleChange} placeholder="Your name" className="w-full px-3 py-2.5 text-[14px] border border-[#E5E0D8] rounded-lg text-[#2C1E11] placeholder-[#2C1E11]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-[12px] uppercase tracking-wider text-[#2C1E11]/40 mb-1.5">Email *</label>
                  <input name="email" type="email" required value={data.email} onChange={handleChange} placeholder="your@email.com" className="w-full px-3 py-2.5 text-[14px] border border-[#E5E0D8] rounded-lg text-[#2C1E11] placeholder-[#2C1E11]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors" />
                </div>
                <div>
                  <label className="block text-[12px] uppercase tracking-wider text-[#2C1E11]/40 mb-1.5">Phone</label>
                  <input name="phone" type="tel" value={data.phone} onChange={handleChange} placeholder="(917) 555-0100" className="w-full px-3 py-2.5 text-[14px] border border-[#E5E0D8] rounded-lg text-[#2C1E11] placeholder-[#2C1E11]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors" />
                </div>
                {/* NYS First Point of Contact */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" name="disclosure" required checked={data.disclosure} onChange={handleChange} className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-[#1B3B2B]" />
                  <span className="text-[12px] text-[#2C1E11]/40 leading-relaxed">
                    I acknowledge receipt of the <strong className="text-[#2C1E11]/55">NYS Disclosure Form for Buyers and Sellers of Real Property</strong> (First Point of Contact — required by NYS DOS). *
                  </span>
                </label>
              </>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={step === 0 && !addressValid}
                className="flex-1 py-3 text-[14px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#1B3B2B] transition-colors"
              >
                {step < 2 ? 'Continue →' : 'Get My Estimate'}
              </button>
            </div>
            {step > 0 && (
              <button type="button" onClick={handleBack} className="flex items-center justify-center gap-1.5 w-full text-[13px] text-[#2C1E11]/40 hover:text-[#2C1E11]/70 transition-colors">
                <ArrowLeft size={13} /> Back
              </button>
            )}
          </div>
        </form>
      )}
    </>
  )

  const formCard = (
    <div className="rounded-2xl border border-[#E5E0D8] shadow-2xl ring-1 ring-black/5 bg-white">
      {formCardContent}
    </div>
  )

  return (
    <>
    <section className="pt-[112px] pb-[64px] lg:pt-[144px] lg:pb-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-16 lg:gap-24 items-start">

          {/* Left: copy */}
          <div>
            <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-4">Market Intelligence</p>
            <h1
              className="text-[43px] lg:text-[58px] font-normal text-[#24180F] leading-[1.05] mb-5"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              What is your home actually worth?
            </h1>
            <p className="text-[18px] text-[#2C1E11]/55 leading-relaxed mb-8 max-w-md">
              Not a Zillow estimate. A real, hand-annotated analysis from a broker who sold 240 homes
              in these exact neighborhoods. Takes 60 seconds to request. Free.
            </p>
            <ul className="space-y-3">
              {[
                'Comparable sales from the last 90 days',
                'Off-market comps you won\'t find online',
                'Board package analysis (co-ops)',
                'Current buyer demand for your unit type',
                'Delivered within 24 hours',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[16px] text-[#2C1E11]/60">
                  <CheckCircle size={15} className="text-[#8B9E8B] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: floating form */}
          <div className="lg:sticky lg:top-28">
            {!expanded && formCard}
          </div>
        </div>
      </div>
    </section>

    {/* ─── MODAL STEP: form + live map ──────────────────────────── */}
    {expanded && (
      <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8">
        <div className="relative w-full max-w-6xl h-[85vh] max-h-[760px] bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full border border-[#E5E0D8] bg-white text-[#2C1E11]/50 hover:text-[#2C1E11] hover:border-[#2C1E11]/30 transition-colors z-20"
          >
            <X size={16} />
          </button>
          <div className="relative flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
            <div className="w-full max-w-md">
              {formCardContent}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <iframe
              title="Property location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address || 'New York, NY')}&output=embed&z=15`}
            />
          </div>
        </div>
      </div>
    )}

    {/* ─── CONTACT TEASER ───────────────────────────────────────────── */}
    <section className="relative py-[120px] lg:py-[168px] overflow-hidden">
      {/* Full-bleed background */}
      <Image
        src="https://images.unsplash.com/photo-1440613905118-99b921706b5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Dumbo Manhattan Bridge"
        fill
        className="object-cover object-center"
      />
      {/* Dark green overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.38)' }} />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
        <p className="text-[12px] tracking-[0.4em] uppercase text-white mb-4">Let&apos;s Work Together</p>
        <h2
          className="text-[34px] lg:text-[45px] font-normal text-[#F8F3EB] leading-tight mb-5"
          style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
        >
          The right home<br className="sm:hidden" /> is a feeling.<br />I know how to find it.
        </h2>
        <p className="text-[16px] text-white/80 mb-8 max-w-md mx-auto leading-relaxed">
          Not sure where to start? Tell me what you&apos;re looking for — or what you&apos;re running from.
          I know this city. I&apos;ll help.
        </p>
        <Link
          href="/local-expert/contact"
          className="inline-flex items-center px-8 py-3.5 text-[14px] font-bold rounded-full bg-[#F8F3EB] text-[#1B3B2B] hover:bg-white transition-colors"
        >
          Start the conversation
        </Link>
      </div>
    </section>
    </>
  )
}
