'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM',  '2:00 PM',  '3:00 PM',  '4:00 PM',  '5:00 PM',
]

const DAY_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function getUpcomingDates(count = 14) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d
  })
}

export default function ScheduleTourModal({
  open,
  onClose,
  propertyImage,
  propertyAddress,
  propertyPrice,
  propertyStatus = 'Active',
  propertyBadge,
}) {
  const [step, setStep]           = useState(1)
  const [tourType, setTourType]   = useState('in-person')
  const [selectedDate, setDate]   = useState(null)
  const [selectedTime, setTime]   = useState(null)
  const [form, setForm]           = useState({ name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)

  const dates = getUpcomingDates(14)

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep(1); setTourType('in-person')
      setDate(null); setTime(null)
      setForm({ name: '', email: '', phone: '' })
      setSubmitted(false)
    }, 350)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/tour', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form, tourType,
          date: selectedDate?.toDateString(),
          time: selectedTime,
          property: propertyAddress,
        }),
      })
    } catch {}
    setSubmitted(true)
  }

  const inputCls = 'w-full bg-transparent border-b border-white/10 focus:border-[#C9A96E] py-3 text-white text-sm placeholder:text-white/25 outline-none transition-colors font-sans'

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
              className="relative w-full max-w-3xl bg-[#0D0D0D] border border-white/[0.08] overflow-hidden max-h-[92vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 text-white/30 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={18} strokeWidth={1.5} />
              </button>

              <div className="grid lg:grid-cols-[280px_1fr]">

                {/* ── Left: property card ── */}
                <div className="bg-[#111] border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col">
                  {propertyImage && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={propertyImage} alt={propertyAddress ?? 'Property'} fill className="object-cover" sizes="280px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  )}
                  <div className="p-6 flex-1 space-y-2">
                    {(propertyBadge || propertyStatus) && (
                      <span className="inline-block px-2 py-0.5 text-[12px] tracking-[0.2em] uppercase bg-[#C9A96E] text-[#0A0A0A] font-semibold font-sans whitespace-nowrap">
                        {propertyBadge ?? propertyStatus}
                      </span>
                    )}
                    <p className="text-white/70 text-sm font-sans leading-snug">
                      {propertyAddress}
                    </p>
                    {propertyPrice && (
                      <p className="font-heading text-lg text-white">
                        ${Number(propertyPrice).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Right: form ── */}
                <div className="p-7 lg:p-8">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center min-h-[360px] text-center"
                    >
                      <CheckCircle size={48} className="text-[#C9A96E] mb-5" strokeWidth={1} />
                      <h3 className="font-heading text-2xl font-normal text-white mb-3">
                        Tour Requested
                      </h3>
                      <p className="text-white/45 text-sm font-sans leading-relaxed max-w-xs">
                        We'll confirm your{' '}
                        <span className="text-white/70">{tourType === 'in-person' ? 'in-person' : 'virtual'}</span> tour for{' '}
                        <span className="text-white/70">{selectedDate ? `${DAY_ABBR[selectedDate.getDay()]}, ${MONTH_ABBR[selectedDate.getMonth()]} ${selectedDate.getDate()}` : ''}</span> at{' '}
                        <span className="text-white/70">{selectedTime}</span>.
                      </p>
                    </motion.div>
                  ) : step === 1 ? (
                    <>
                      <p className="text-[12px] tracking-[0.4em] uppercase text-[#C9A96E] font-sans mb-2">
                        Schedule a Showing
                      </p>
                      <h2 className="font-heading text-2xl font-normal text-white mb-1">
                        Interested in this listing?
                      </h2>
                      <p className="text-white/40 text-sm font-sans mb-7">
                        Pick a tour type and suggest a date and time.
                      </p>

                      {/* Tour type */}
                      <div className="flex gap-3 mb-7">
                        {[{ value: 'in-person', label: 'In Person' }, { value: 'virtual', label: 'Virtual' }].map(({ value, label }) => (
                          <button
                            key={value}
                            onClick={() => setTourType(value)}
                            className={`flex items-center gap-2.5 px-4 py-2.5 border text-sm font-sans transition-all ${
                              tourType === value
                                ? 'border-[#C9A96E] text-white bg-[#C9A96E]/10'
                                : 'border-white/10 text-white/40 hover:border-white/25 hover:text-white/70'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-all ${tourType === value ? 'border-[#C9A96E] bg-[#C9A96E]' : 'border-white/25'}`} />
                            {label}
                          </button>
                        ))}
                      </div>

                      {/* Date picker */}
                      <p className="text-[12px] tracking-[0.25em] uppercase text-white/30 font-sans mb-3">Select a Date</p>
                      <div className="grid grid-cols-7 gap-1.5 mb-7">
                        {dates.map((d, i) => {
                          const isSelected = selectedDate?.toDateString() === d.toDateString()
                          return (
                            <button
                              key={i}
                              onClick={() => setDate(d)}
                              className={`flex flex-col items-center py-2 px-1 border text-center transition-all ${
                                isSelected
                                  ? 'border-[#C9A96E] bg-[#C9A96E]/10'
                                  : 'border-white/[0.07] hover:border-white/20'
                              }`}
                            >
                              <span className={`text-[12px] uppercase tracking-wide font-sans ${isSelected ? 'text-[#C9A96E]' : 'text-white/30'}`}>
                                {DAY_ABBR[d.getDay()]}
                              </span>
                              <span className={`text-sm font-heading font-normal mt-0.5 ${isSelected ? 'text-white' : 'text-white/55'}`}>
                                {d.getDate()}
                              </span>
                              <span className={`text-[9px] font-sans mt-0.5 ${isSelected ? 'text-[#C9A96E]/70' : 'text-white/20'}`}>
                                {MONTH_ABBR[d.getMonth()]}
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      {/* Time slots */}
                      <p className="text-[12px] tracking-[0.25em] uppercase text-white/30 font-sans mb-3">Select a Time</p>
                      <div className="grid grid-cols-3 gap-2 mb-8">
                        {TIME_SLOTS.map(t => {
                          const isSelected = selectedTime === t
                          return (
                            <button
                              key={t}
                              onClick={() => setTime(t)}
                              className={`py-2 text-xs font-sans border transition-all ${
                                isSelected
                                  ? 'border-[#C9A96E] text-white bg-[#C9A96E]/10'
                                  : 'border-white/[0.07] text-white/40 hover:border-white/20 hover:text-white/70'
                              }`}
                            >
                              {t}
                            </button>
                          )
                        })}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <button onClick={handleClose} className="text-sm text-white/30 hover:text-white transition-colors font-sans">
                          Cancel
                        </button>
                        <button
                          onClick={() => setStep(2)}
                          disabled={!selectedDate || !selectedTime}
                          className="px-8 py-3 bg-[#C9A96E] text-[#0A0A0A] text-[12px] tracking-[0.2em] uppercase font-semibold font-sans hover:bg-[#b8935a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-[12px] tracking-[0.4em] uppercase text-[#C9A96E] font-sans mb-2">
                        Almost there
                      </p>
                      <h2 className="font-heading text-2xl font-normal text-white mb-1">
                        Your Details
                      </h2>
                      <p className="text-white/40 text-sm font-sans mb-7">
                        {tourType === 'in-person' ? 'In-person' : 'Virtual'} tour ·{' '}
                        {selectedDate ? `${DAY_ABBR[selectedDate.getDay()]}, ${MONTH_ABBR[selectedDate.getMonth()]} ${selectedDate.getDate()}` : ''} · {selectedTime}
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <input required value={form.name} onChange={e => setForm(v => ({ ...v, name: e.target.value }))} type="text" placeholder="Full Name" className={inputCls} />
                        </div>
                        <div>
                          <input required value={form.email} onChange={e => setForm(v => ({ ...v, email: e.target.value }))} type="email" placeholder="Email Address" className={inputCls} />
                        </div>
                        <div>
                          <input value={form.phone} onChange={e => setForm(v => ({ ...v, phone: e.target.value }))} type="tel" placeholder="Phone Number" className={inputCls} />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button type="button" onClick={() => setStep(1)} className="text-sm text-white/30 hover:text-white transition-colors font-sans">
                            ← Back
                          </button>
                          <button
                            type="submit"
                            disabled={!form.name || !form.email}
                            className="px-8 py-3 bg-[#C9A96E] text-[#0A0A0A] text-[12px] tracking-[0.2em] uppercase font-semibold font-sans hover:bg-[#b8935a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            Confirm Tour
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
