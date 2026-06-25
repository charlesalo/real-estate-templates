'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight, ArrowLeft, MapPin, X, Bed, Bath, Square } from 'lucide-react'
import { TESTIMONIAL, SOLD_LISTINGS } from '@/lib/local-expert-data'

function formatPrice(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`
  return `$${n.toLocaleString()}`
}

const STEPS = ['Address', 'Property Details', 'Contact Info']
const STEP_DESCRIPTIONS = [
  "Enter the property you'd like valued — I'll pull recent, comparable sales nearby to anchor the estimate.",
  'A few specifics on the unit help sharpen the number — bedrooms, size, and condition all move the estimate.',
  "Last step. I'll have your personalized valuation ready within 24 hours — here's where to send it.",
]

const VALUATION_FAQS = [
  {
    q: "What you're actually getting",
    a: "Not a range pulled from a script — a specific number, backed by the three to five sales I'd point to if a buyer asked why your price makes sense.",
  },
  {
    q: 'How I calculate it',
    a: "Closed comps from the last 90 days, adjusted for unit line, light, renovation, and — for co-ops — board flexibility, then checked against what's actually in contract right now, not just what's listed.",
  },
  {
    q: 'Why the online number is usually off',
    a: "Automated estimators don't know your kitchen was gutted in 2022, that the unit next door was combined into yours, or that your board caps subletting. They average. I adjust.",
  },
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

    {/* ─── BEHIND THE NUMBER ──────────────────────────────────────────── */}
    <section className="py-[96px] lg:py-[128px] bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-4">Behind The Number</p>
          <h2
            className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight mb-5"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            What a valuation actually <br className="hidden lg:block" />tells you
          </h2>
          <p className="text-[16px] text-[#2C1E11]/55 leading-relaxed">
            A real valuation isn&apos;t a single number — it&apos;s the reasoning behind it: which comps
            matter, which don&apos;t, and what a buyer would actually pay this month. Here&apos;s what
            goes into the one I&apos;ll send you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUATION_FAQS.map((item, i) => (
            <div key={item.q} className="rounded-2xl border border-[#E5E0D8] bg-[#FDFAF6] p-7">
              <span className="text-[12px] font-bold text-[#BA5B3E]">{`0${i + 1}`}</span>
              <h3 className="text-[16px] font-bold text-[#24180F] mt-3 mb-2">{item.q}</h3>
              <p className="text-[14px] text-[#2C1E11]/55 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── TESTIMONIAL ────────────────────────────────────────────────── */}
    <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#1B3B2B' }}>
      <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
        <blockquote>
          <p
            className="text-[24px] lg:text-[28px] font-normal italic text-[#F8F3EB] leading-snug"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </p>
          <footer className="mt-6">
            <p className="text-[14px] font-semibold text-[#8B9E8B]">{TESTIMONIAL.author}</p>
            <p className="text-[12px] text-[#F8F3EB]/30 mt-0.5">{TESTIMONIAL.location}</p>
          </footer>
        </blockquote>
      </div>
    </section>

    {/* ─── RECENTLY CLOSED ────────────────────────────────────────────── */}
    <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E]">Recently Closed</span>
            <h2
              className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight mt-2 mb-3"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              Homes I&apos;ve Actually Sold
            </h2>
            <p className="text-[15px] text-[#2C1E11]/40 max-w-lg">
              Not listings — these are the same closed comps that go into every valuation I send.
            </p>
          </div>
          <Link
            href="/local-expert/listings"
            className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors whitespace-nowrap"
          >
            View all active listings <ArrowRight size={13} />
          </Link>
        </div>

        {/* Asymmetric feature layout: hero left, two sidebar cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-3 lg:h-[560px]">
          <SoldHeroCard sale={SOLD_LISTINGS[0]} />
          <div className="flex flex-col gap-3 h-full">
            <SoldSideCard sale={SOLD_LISTINGS[1]} />
            <SoldSideCard sale={SOLD_LISTINGS[2]} />
          </div>
        </div>

        <Link
          href="/local-expert/listings"
          className="flex md:hidden items-center gap-1.5 text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors mt-6"
        >
          View all active listings <ArrowRight size={13} />
        </Link>
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

function SoldHeroCard({ sale }) {
  return (
    <article className="group relative rounded-2xl overflow-hidden h-full min-h-[420px] lg:min-h-0">
      <Image
        src={sale.image}
        alt={sale.address}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute top-4 left-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/90 text-[#2C1E11]">
          Sold
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-6 py-6 lg:px-8 lg:py-7">
        <div
          className="text-[36px] lg:text-[44px] font-normal text-white leading-none mb-1.5"
          style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
        >
          {formatPrice(sale.soldPrice)}
        </div>
        <p className="text-[13px] text-white/65">{sale.address}</p>
        <p className="text-[10px] text-white/45 mt-1.5">
          Closed {sale.soldDate} · {sale.daysOnMarket} days on market
        </p>
        <div className="flex items-center justify-between gap-3 mt-1">
          <p className="text-[10px] text-white/45 flex-1">
            Listing Provided Courtesy of {sale.listingBrokerage} · {sale.mlsId}
          </p>
          <div className="bg-white rounded px-1.5 py-1 flex-shrink-0 inline-flex items-center">
            <Image
              src="/images/RLS at REBNY.png"
              alt="RLS at REBNY"
              width={40}
              height={24}
              className="h-4 w-auto"
            />
          </div>
        </div>
        {/* Details — collapsed by default, slide up to reveal on hover */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <div className="h-px w-full bg-white/25 my-3" />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-[12px] text-white/55">
                  <Bed size={12} /> {sale.beds} bd
                </span>
                <span className="flex items-center gap-1 text-[12px] text-white/55">
                  <Bath size={12} /> {sale.baths} ba
                </span>
                <span className="flex items-center gap-1 text-[12px] text-white/55">
                  <Square size={12} /> {sale.sqft.toLocaleString()} sf
                </span>
              </div>
              <span className="text-[12px] uppercase tracking-wider text-white/55">{sale.type}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function SoldSideCard({ sale }) {
  return (
    <article className="group relative flex-1 min-h-[200px] lg:min-h-0 rounded-xl overflow-hidden">
      <Image
        src={sale.image}
        alt={sale.address}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute top-3 left-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-[#2C1E11]">
          Sold
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
        <div
          className="text-[22px] font-normal text-white leading-none"
          style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
        >
          {formatPrice(sale.soldPrice)}
        </div>
        <p className="text-[12px] text-white/65 mt-1 truncate">{sale.address}</p>
        <p className="text-[10px] text-white/45 mt-1 truncate">
          Closed {sale.soldDate} · {sale.daysOnMarket} days on market
        </p>
        <div className="flex items-center justify-between gap-2 mt-1">
          <p className="text-[10px] text-white/45 truncate min-w-0 flex-1">
            Listing Provided Courtesy of {sale.listingBrokerage} · {sale.mlsId}
          </p>
          <div className="bg-white rounded px-1.5 py-0.5 flex-shrink-0 inline-flex items-center">
            <Image
              src="/images/RLS at REBNY.png"
              alt="RLS at REBNY"
              width={40}
              height={24}
              className="h-3.5 w-auto"
            />
          </div>
        </div>
        {/* Details — collapsed by default, slide up to reveal on hover */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <div className="h-px w-full bg-white/25 my-2" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] text-white/55">
                  <Bed size={11} /> {sale.beds} bd
                </span>
                <span className="flex items-center gap-1 text-[11px] text-white/55">
                  <Bath size={11} /> {sale.baths} ba
                </span>
                <span className="flex items-center gap-1 text-[11px] text-white/55">
                  <Square size={11} /> {sale.sqft.toLocaleString()} sf
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-white/55">{sale.type}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
