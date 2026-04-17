'use client'

import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'

const TERM_OPTIONS = [30, 15]

export default function MortgageCalculator({
  defaultPrice = 2500000,
  template = 'luxury-agent',
}) {
  const isLuxury = template === 'luxury-agent'

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

  const monthly = useMemo(() => {
    if (loanAmount <= 0 || rate <= 0) return 0
    const r = rate / 100 / 12
    const n = term * 12
    return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  }, [loanAmount, rate, term])

  const monthlyTax = tax / 12
  const total = monthly + monthlyTax + hoa + insurance

  const chartData = [
    { name: 'Principal & Interest', value: Math.round(monthly), color: '#C9A96E' },
    { name: 'Property Tax', value: Math.round(monthlyTax), color: '#6B6B6B' },
    { name: 'HOA', value: hoa, color: '#4A4A4A' },
    { name: 'Insurance', value: insurance, color: '#333333' },
  ].filter(d => d.value > 0)

  const inputClass = cn(
    'w-full text-sm px-3 py-2.5 outline-none border bg-transparent',
    isLuxury
      ? 'border-white/10 text-white placeholder:text-white/30 focus:border-template-accent'
      : 'border-template-border text-template-fg placeholder:text-template-fg/40 rounded focus:border-template-accent',
  )

  const labelClass = cn('text-[10px] tracking-[0.2em] uppercase font-sans block mb-1.5', isLuxury ? 'text-white/40' : 'text-template-fg/50')

  return (
    <div className={cn('p-6 lg:p-8', isLuxury ? 'bg-[#0D0D0D] border border-white/10' : 'bg-template-surface border border-template-border rounded-xl')}>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Home Price</label>
            <div className="relative">
              <span className={cn('absolute left-3 top-1/2 -translate-y-1/2 text-sm', isLuxury ? 'text-white/30' : 'text-template-fg/40')}>$</span>
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
                className={cn(
                  'px-3 py-2.5 text-sm border transition-colors',
                  isLuxury
                    ? 'border-white/10 text-white/50 hover:text-template-accent hover:border-template-accent'
                    : 'border-template-border text-template-fg/50 hover:text-template-accent rounded',
                )}
              >
                {downMode === 'pct' ? '%' : '$'}
              </button>
            </div>
            <p className={cn('text-xs mt-1', isLuxury ? 'text-white/30' : 'text-template-fg/40')}>
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
                <span className={cn('absolute right-3 top-1/2 -translate-y-1/2 text-sm', isLuxury ? 'text-white/30' : 'text-template-fg/40')}>%</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>Loan Term</label>
              <div className={cn('flex border', isLuxury ? 'border-white/10' : 'border-template-border rounded overflow-hidden')}>
                {TERM_OPTIONS.map(t => (
                  <button
                    key={t}
                    onClick={() => setTerm(t)}
                    className={cn(
                      'flex-1 py-2.5 text-sm transition-colors',
                      t === term
                        ? isLuxury ? 'bg-template-accent text-[#0A0A0A] font-medium' : 'bg-template-accent text-template-accent-fg font-medium'
                        : isLuxury ? 'text-white/50 hover:text-white' : 'text-template-fg/50 hover:text-template-fg',
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
                <span className={cn('absolute left-3 top-1/2 -translate-y-1/2 text-sm', isLuxury ? 'text-white/30' : 'text-template-fg/40')}>$</span>
                <input type="number" value={tax} onChange={e => setTax(Number(e.target.value))} className={cn(inputClass, 'pl-7')} min={0} />
              </div>
            </div>
            <div>
              <label className={labelClass}>HOA /mo</label>
              <div className="relative">
                <span className={cn('absolute left-3 top-1/2 -translate-y-1/2 text-sm', isLuxury ? 'text-white/30' : 'text-template-fg/40')}>$</span>
                <input type="number" value={hoa} onChange={e => setHoa(Number(e.target.value))} className={cn(inputClass, 'pl-7')} min={0} />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="text-center">
            <p className={cn('text-[10px] tracking-[0.3em] uppercase mb-2 font-sans', isLuxury ? 'text-white/40' : 'text-template-fg/50')}>
              Estimated Monthly Payment
            </p>
            <p className={cn('font-heading text-4xl lg:text-5xl font-normal', isLuxury ? 'text-white' : 'text-template-fg')}>
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

          <div className={cn('space-y-2 text-sm', isLuxury ? 'text-white/60' : 'text-template-fg/70')}>
            {chartData.map((d, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                  {d.name}
                </div>
                <span className={isLuxury ? 'text-white' : 'text-template-fg'}>${Math.round(d.value).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <a
            href="/luxury-agent/contact"
            className={cn(
              'block w-full text-center py-3 text-[11px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-90',
              isLuxury ? 'border border-template-accent text-template-accent' : 'bg-template-accent text-template-accent-fg rounded',
            )}
          >
            Get Pre-Approved →
          </a>
        </div>
      </div>
    </div>
  )
}
