'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const NEIGHBORHOODS = ['West Village', 'Tribeca', 'SoHo', 'Chelsea', 'Upper East Side', 'Brooklyn Heights', 'DUMBO', 'Park Slope', 'Cobble Hill']

const LEFT_COPY = {
  eyebrow: 'The Insider Edition',
  description: "Plug your block. We'll send you a beautifully designed, hand-annotated PDF on your exact neighborhood — median prices, days on market, recent comps, and what a specific unit is actually worth. Built monthly. Never generic.",
  bullets: [
    'Median sale and ask price by building type',
    'Off-market intel curated by building type',
    'Days on market vs. borough average',
    'School catchment & local score cards',
    'Relocation & co-op board tips',
  ],
}

export default function MarketReportForm() {
  const [step, setStep] = useState(1)
  const [neighborhood, setNeighborhood] = useState(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', timeline: '' })

  const copy = LEFT_COPY

  function handleSubmit(e) {
    e.preventDefault()
    console.log('[MarketReport]', { neighborhood, ...form })
    setStep(3)
  }

  return (
    <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#1B3B2B' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_640px] gap-12 lg:gap-16 items-center">

          {/* Left: copy — changes per step */}
          <div>
            <p className="text-[12px] tracking-[0.4em] uppercase text-[#8B9E8B] mb-4">{copy.eyebrow}</p>
            <h2
              className="text-[38px] lg:text-[56px] font-normal text-[#F8F3EB] leading-tight mb-6"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              Get the real local<br />market report.
            </h2>
            <p className="text-[16px] text-[#F8F3EB]/55 mb-6 leading-relaxed max-w-lg">{copy.description}</p>
            <ul className="space-y-2.5">
              {copy.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[14px] text-[#F8F3EB]/55">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BA5B3E] flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: multi-step card. All three steps are stacked in a single grid
              cell, so the card is always as tall as the TALLEST step — every step
              renders at identical dimensions, at any breakpoint, with no fixed
              pixel height to maintain. Only the active step is visible and
              interactive; the others are faded out and inert. */}
          <div className="grid">
            <div
              className={cn(
                '[grid-area:1/1] flex flex-col transition-opacity duration-200',
                step === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none',
              )}
              inert={step !== 1}
            >
              <StepOne neighborhood={neighborhood} setNeighborhood={setNeighborhood} onNext={() => setStep(2)} />
            </div>
            <div
              className={cn(
                '[grid-area:1/1] flex flex-col transition-opacity duration-200',
                step === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none',
              )}
              inert={step !== 2}
            >
              <StepTwo neighborhood={neighborhood} form={form} setForm={setForm} onBack={() => setStep(1)} onSubmit={handleSubmit} />
            </div>
            <div
              className={cn(
                '[grid-area:1/1] flex flex-col transition-opacity duration-200',
                step === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none',
              )}
              inert={step !== 3}
            >
              <StepThree neighborhood={neighborhood} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepHeader({ step, total, theme = 'dark' }) {
  const labelColor = theme === 'dark' ? 'text-[#8B9E8B]' : 'text-[#BA5B3E]'
  const filledBar = theme === 'dark' ? 'bg-[#8B9E8B]' : 'bg-[#BA5B3E]'
  const emptyBar = theme === 'dark' ? 'bg-white/15' : 'bg-[#2C1E11]/12'
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={cn('text-[12px] tracking-[0.35em] uppercase font-medium', labelColor)}>
        Step {step} of {total}
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={cn('h-[2px] w-7 rounded-full transition-colors', i < step ? filledBar : emptyBar)} />
        ))}
      </div>
    </div>
  )
}

function StepOne({ neighborhood, setNeighborhood, onNext }) {
  return (
    <div className="flex-1 flex flex-col rounded-2xl p-7 lg:p-8" style={{ backgroundColor: '#FDFAF6' }}>
      <StepHeader step={1} total={3} theme="light" />
      <h3 className="text-[24px] font-normal text-[#24180F] mb-5 leading-snug" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
        Which neighborhood would you like the report on?
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {NEIGHBORHOODS.map((n) => (
          <button
            key={n}
            onClick={() => setNeighborhood(n)}
            className={cn(
              'px-4 py-2.5 text-[13px] font-medium rounded-full border transition-all duration-150 text-center',
              neighborhood === n
                ? 'bg-[#1B3B2B] text-[#F8F3EB] border-[#1B3B2B]'
                : 'bg-transparent text-[#1B3B2B]/70 border-[#1B3B2B]/30 hover:border-[#1B3B2B]/60 hover:text-[#1B3B2B]',
            )}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <button
          disabled={!neighborhood}
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold rounded-full bg-[#1B3B2B] text-[#F8F3EB] disabled:opacity-30 hover:bg-[#2a5540] transition-colors"
        >
          Continue <ArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}

function StepTwo({ neighborhood, form, setForm, onBack, onSubmit }) {
  const inputCls = 'w-full px-4 py-3 text-[14px] rounded-xl border border-[#E5E0D8] bg-[#F8F3EB] text-[#2C1E11] placeholder:text-[#2C1E11]/35 focus:outline-none focus:border-[#1B3B2B]/40 transition-colors'
  return (
    <div className="flex-1 flex flex-col rounded-2xl p-7 lg:p-8" style={{ backgroundColor: '#FDFAF6' }}>
      <StepHeader step={2} total={3} theme="light" />
      <h3
        className="text-[24px] font-normal text-[#24180F] mb-6"
        style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
      >
        A little about you.
      </h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text" required placeholder="First name"
            value={form.firstName}
            onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))}
            className={inputCls}
          />
          <input
            type="text" required placeholder="Last name"
            value={form.lastName}
            onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))}
            className={inputCls}
          />
        </div>
        <input
          type="email" required placeholder="Email address"
          value={form.email}
          onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
          className={inputCls}
        />
        <div className="relative">
          <select
            value={form.timeline}
            onChange={(e) => setForm(f => ({ ...f, timeline: e.target.value }))}
            className={cn(inputCls, 'appearance-none cursor-pointer pr-9')}
          >
            <option value="">I&apos;m exploring — no timeline yet</option>
            <option>Within 3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
            <option>Just researching the market</option>
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#2C1E11]/40"
            width="11" height="7" viewBox="0 0 11 7" fill="none"
          >
            <path d="M1 1L5.5 6L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex items-center justify-between pt-4">
          <button
            type="button" onClick={onBack}
            className="flex items-center gap-1.5 text-[13px] text-[#2C1E11]/40 hover:text-[#2C1E11]/70 transition-colors"
          >
            <ArrowLeft size={13} /> Back
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-3 text-[13px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors"
          >
            Send me the {neighborhood} report <ArrowRight size={13} />
          </button>
        </div>
      </form>
    </div>
  )
}

function StepThree({ neighborhood }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center rounded-2xl p-8 lg:p-10 text-center" style={{ backgroundColor: '#FDFAF6' }}>
      <StepHeader step={3} total={3} theme="light" />
      <div className="w-14 h-14 rounded-full bg-[#1B3B2B] flex items-center justify-center mt-2 mb-6">
        <Check size={22} strokeWidth={2.5} className="text-[#F8F3EB]" />
      </div>
      <h3
        className="text-[24px] lg:text-[24px] font-normal text-[#24180F] mb-3 leading-snug"
        style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
      >
        Your {neighborhood} briefing is on the way.
      </h3>
      <p className="text-[14px] text-[#2C1E11]/50 leading-relaxed max-w-[280px]">
        Check your inbox in the next few minutes. Nadia will follow up personally within 24 hours.
      </p>
    </div>
  )
}
