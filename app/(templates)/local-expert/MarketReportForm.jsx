'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const NEIGHBORHOODS = ['West Village', 'Tribeca', 'Brooklyn Heights', 'DUMBO', 'Park Slope', 'Upper East Side']

export default function MarketReportForm() {
  const [step, setStep] = useState(1) // 1 = pick neighborhood, 2 = email
  const [selected, setSelected] = useState(null)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Phase 1: console.log — Phase 2: POST /api/market-report + Resend
    console.log('[LocalExpert] Market report request:', { neighborhood: selected, email })
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <CheckCircle size={36} className="text-[#8B9E8B]" />
        <div>
          <p className="text-base font-bold text-[#F8F3EB]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
            Report on its way.
          </p>
          <p className="text-sm text-[#F8F3EB]/50 mt-1">
            I&apos;ll send you the {selected} market report within 24 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-6 lg:p-7" style={{ backgroundColor: 'rgba(249,246,240,0.07)', border: '1px solid rgba(249,246,240,0.1)' }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[9px] tracking-[0.3em] text-[#8B9E8B] uppercase">
          Step {step} of 2
        </span>
        <div className="flex gap-1">
          <div className={cn('h-0.5 w-6 rounded-full transition-colors', step >= 1 ? 'bg-[#8B9E8B]' : 'bg-white/10')} />
          <div className={cn('h-0.5 w-6 rounded-full transition-colors', step >= 2 ? 'bg-[#8B9E8B]' : 'bg-white/10')} />
        </div>
      </div>

      {step === 1 && (
        <div>
          <p className="text-sm text-[#F8F3EB]/70 mb-4">Which neighborhood would you like the report on?</p>
          <div className="flex flex-wrap gap-2">
            {NEIGHBORHOODS.map((n) => (
              <button
                key={n}
                onClick={() => setSelected(n)}
                className={cn(
                  'px-3.5 py-2 text-[11px] font-medium rounded-full border transition-all duration-150',
                  selected === n
                    ? 'bg-[#F8F3EB] text-[#1B3B2B] border-[#F8F3EB]'
                    : 'bg-transparent text-[#F8F3EB]/60 border-[#F8F3EB]/15 hover:border-[#F8F3EB]/35 hover:text-[#F8F3EB]/80',
                )}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            disabled={!selected}
            onClick={() => setStep(2)}
            className="mt-5 flex items-center gap-2 px-5 py-2.5 text-[12px] font-bold rounded-full bg-[#8B9E8B] text-[#1B3B2B] disabled:opacity-30 hover:bg-[#9aad9a] transition-colors"
          >
            Continue <ArrowRight size={13} />
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-[#F8F3EB]/70 mb-4">
            Where should I send the <strong className="text-[#F8F3EB]">{selected}</strong> report?
          </p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 text-sm rounded-xl bg-white/10 border border-white/10 text-[#F8F3EB] placeholder-[#F8F3EB]/30 focus:outline-none focus:border-[#8B9E8B] transition-colors mb-3"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 text-[11px] text-[#F8F3EB]/50 hover:text-[#F8F3EB] transition-colors"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 text-[12px] font-bold rounded-full bg-[#8B9E8B] text-[#1B3B2B] hover:bg-[#9aad9a] transition-colors"
            >
              Send My Report
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
