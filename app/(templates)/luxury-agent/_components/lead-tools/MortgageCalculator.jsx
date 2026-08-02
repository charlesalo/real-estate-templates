'use client'

import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'
import { monthlyPayment } from '@/lib/mortgage'

const TERM_OPTIONS = [30, 15]

export default function MortgageCalculator({ defaultPrice = 2500000 }) {
  const [homePrice, setHomePrice] = useState(defaultPrice)
  const [downPct, setDownPct] = useState(20)
  const [downMode, setDownMode] = useState('pct') // pct | dollar
  const [rate, setRate] = useState(7.0)
  const [term, setTerm] = useState(30)
  const [tax, setTax] = useState(12000)
  const [hoa, setHoa] = useState(0)
  const [insurance] = useState(150) // fixed estimate

  const downAmount = downMode === 'pct' ? (homePrice * downPct) / 100 : downPct
  const loanAmount = homePrice - downAmount

  const monthly = useMemo(
    () => monthlyPayment({ principal: loanAmount, annualRate: rate, termYears: term }),
    [loanAmount, rate, term],
  )

  const monthlyTax = tax / 12
  const total = monthly + monthlyTax + hoa + insurance

  const chartData = [
    { name: 'Principal & Interest', value: Math.round(monthly), color: '#C9A96E' },
    { name: 'Property Tax', value: Math.round(monthlyTax), color: '#6B6B6B' },
    { name: 'HOA', value: hoa, color: '#4A4A4A' },
    { name: 'Insurance', value: insurance, color: '#333333' },
  ].filter(d => d.value > 0)

  const inputClass = 'w-full text-sm px-3 py-2.5 outline-none border bg-transparent border-white/10 text-white placeholder:text-white/30 focus:border-template-accent'

  const labelClass = 'text-[12px] tracking-[0.2em] uppercase font-sans block mb-1.5 text-white/40'

  return (
    <div className="p-6 lg:p-8 bg-[#0D0D0D] border border-white/10">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Home Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/30">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={e => setHomePrice(Number(e.target.value))}
                className={cn(inputClass, 'pl-7')}
                min={0}
              />
            </div>
            <input
              type="range"
              min={100000}
              max={10000000}
              step={50000}
              value={homePrice}
              onChange={e => setHomePrice(Number(e.target.value))}
              className="w-full mt-2 accent-[#C9A96E]"
            />
          </div>

          <div>
            <label className={labelClass}>Down Payment</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={downPct}
                onChange={e => setDownPct(Number(e.target.value))}
                className={cn(inputClass, 'flex-1')}
                min={0}
                max={downMode === 'pct' ? 100 : homePrice}
              />
              <button
                onClick={() => setDownMode(m => m === 'pct' ? 'dollar' : 'pct')}
                className="px-3 py-2.5 text-sm border transition-colors border-white/10 text-white/50 hover:text-template-accent hover:border-template-accent"
              >
                {downMode === 'pct' ? '%' : '$'}
              </button>
            </div>
            <p className="text-xs mt-1 text-white/30">
              = {downMode === 'pct' ? `$${downAmount.toLocaleString()}` : `${((downAmount / homePrice) * 100).toFixed(1)}%`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Interest Rate</label>
              <div className="relative">
                <input
                  type="number"
                  value={rate}
                  onChange={e => setRate(Number(e.target.value))}
                  className={cn(inputClass, 'pr-7')}
                  step={0.1}
                  min={0}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/30">%</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>Loan Term</label>
              <div className="flex border border-white/10">
                {TERM_OPTIONS.map(t => (
                  <button
                    key={t}
                    onClick={() => setTerm(t)}
                    className={cn(
                      'flex-1 py-2.5 text-sm transition-colors',
                      t === term
                        ? 'bg-template-accent text-[#0A0A0A] font-medium'
                        : 'text-white/50 hover:text-white',
                    )}
                  >
                    {t}yr
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Property Tax /yr</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/30">$</span>
                <input type="number" value={tax} onChange={e => setTax(Number(e.target.value))} className={cn(inputClass, 'pl-7')} min={0} />
              </div>
            </div>
            <div>
              <label className={labelClass}>HOA /mo</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/30">$</span>
                <input type="number" value={hoa} onChange={e => setHoa(Number(e.target.value))} className={cn(inputClass, 'pl-7')} min={0} />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-[12px] tracking-[0.3em] uppercase mb-2 font-sans text-white/40">
              Estimated Monthly Payment
            </p>
            <p className="font-heading text-4xl lg:text-5xl font-normal text-white">
              ${Math.round(total).toLocaleString()}
            </p>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" strokeWidth={0}>
                {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip
                formatter={(v) => [`$${Math.round(v).toLocaleString()}/mo`, '']}
                contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: 0, fontSize: 12 }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-2 text-sm text-white/60">
            {chartData.map((d, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                  {d.name}
                </div>
                <span className="text-white">${Math.round(d.value).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
            className="block w-full text-center py-3 text-[12px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-90 border border-template-accent text-template-accent"
          >
            Get Pre-Approved →
          </button>
        </div>
      </div>
    </div>
  )
}
