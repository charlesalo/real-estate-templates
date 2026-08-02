'use client'

import { useState } from 'react'
import { monthlyPayment, principalFromDownPct } from '@/lib/mortgage'

const COLORS = {
  pi: '#BA5B3E',   // Principal & Interest — terracotta
  tax: '#8B9E8B',  // Property Taxes — sage
  hoa: '#C99A6A',  // HOA Dues — tan
}

export default function MortgageCalculator({ listPrice }) {
  const [price, setPrice] = useState(listPrice)
  const [down, setDown] = useState(20)
  const [rate, setRate] = useState(7.25)
  const [term, setTerm] = useState(30)
  const [tax, setTax] = useState(Math.round((listPrice * 0.011) / 12)) // ~1.1%/yr, monthly
  const [hoa, setHoa] = useState(0)

  const pi = monthlyPayment({
    principal: principalFromDownPct(price, down),
    annualRate: rate,
    termYears: term,
  })
  const total = pi + tax + hoa

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
      Number.isFinite(n) ? n : 0,
    )
  const pct = (n) => (total > 0 ? Math.round((n / total) * 100) : 0)

  // ── Donut geometry ──
  const r = 40
  const C = 2 * Math.PI * r
  const segments = [
    { key: 'pi', value: pi, color: COLORS.pi },
    { key: 'tax', value: tax, color: COLORS.tax },
    { key: 'hoa', value: hoa, color: COLORS.hoa },
  ]
  let acc = 0
  const arcs = segments.map((s) => {
    const len = total > 0 ? (s.value / total) * C : 0
    const arc = { ...s, len, offset: -acc }
    acc += len
    return arc
  })

  const fieldClass =
    'w-full py-2.5 border border-[#E5E0D8] rounded-lg text-[14px] text-[#24180F] bg-white focus:outline-none focus:border-[#BA5B3E] transition-colors'
  const labelClass = 'block text-[11px] font-bold uppercase tracking-wider text-[#2C1E11]/55 mb-1.5'

  const legend = [
    { label: 'Principal & Interest', value: pi, color: COLORS.pi },
    { label: 'Property Taxes', value: tax, color: COLORS.tax },
    { label: 'HOA Dues', value: hoa, color: COLORS.hoa },
  ]

  return (
    <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 lg:p-7 mb-10">
      <h3 className="text-[19px] font-normal text-[#24180F] mb-1" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
        Mortgage Calculator
      </h3>
      <p className="text-[12px] text-[#2C1E11]/45 mb-6">
        Estimate your monthly payment including principal, interest, property taxes, and HOA.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-7">
        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
          <div>
            <label className={labelClass}>Home Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C1E11]/40 text-[14px]">$</span>
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={`${fieldClass} pl-7 pr-3`} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Loan Term</label>
            <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className={`${fieldClass} px-3`}>
              <option value={30}>30 years</option>
              <option value={20}>20 years</option>
              <option value={15}>15 years</option>
              <option value={10}>10 years</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Down Payment (%)</label>
            <div className="relative">
              <input type="number" value={down} min={0} max={100} onChange={(e) => setDown(Number(e.target.value))} className={`${fieldClass} pl-3 pr-7`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2C1E11]/40 text-[14px]">%</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>Property Tax ($/mo)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C1E11]/40 text-[14px]">$</span>
              <input type="number" value={tax} min={0} onChange={(e) => setTax(Number(e.target.value))} className={`${fieldClass} pl-7 pr-3`} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Interest Rate (%)</label>
            <div className="relative">
              <input type="number" value={rate} step={0.05} min={0} onChange={(e) => setRate(Number(e.target.value))} className={`${fieldClass} pl-3 pr-7`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2C1E11]/40 text-[14px]">%</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>HOA Dues ($/mo)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C1E11]/40 text-[14px]">$</span>
              <input type="number" value={hoa} min={0} onChange={(e) => setHoa(Number(e.target.value))} className={`${fieldClass} pl-7 pr-3`} />
            </div>
          </div>
        </div>

        {/* Donut + total */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-[200px] h-[200px]">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r={r} fill="none" stroke="#F0EAE0" strokeWidth="12" />
              {arcs.map((a) => (
                <circle
                  key={a.key}
                  cx="50"
                  cy="50"
                  r={r}
                  fill="none"
                  stroke={a.color}
                  strokeWidth="12"
                  strokeDasharray={`${a.len} ${C}`}
                  strokeDashoffset={a.offset}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-[26px] font-normal text-[#24180F] leading-none" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                {fmt(total)}
              </p>
              <p className="text-[11px] text-[#2C1E11]/50 mt-1">Your Payment /mo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-5 border-t border-[#E5E0D8] space-y-2.5">
        {legend.map((l) => (
          <div key={l.label} className="flex items-center justify-between text-[13px]">
            <span className="flex items-center gap-2 text-[#2C1E11]/70">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
              {l.label}
            </span>
            <span className="text-[#24180F]">
              {fmt(l.value)} <span className="text-[#2C1E11]/45">({pct(l.value)}%)</span>
            </span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#2C1E11]/40 mt-5">Estimate only — contact us for pre-approval guidance.</p>
    </div>
  )
}
