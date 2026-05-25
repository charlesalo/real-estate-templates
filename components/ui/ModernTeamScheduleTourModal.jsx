'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, MapPin } from 'lucide-react'

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM',  '2:00 PM',  '3:00 PM',  '4:00 PM',  '5:00 PM',
]

const DAY_ABBR   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function getUpcomingDates(count = 14) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d
  })
}

const STATUS_STYLES = {
  Active:  'bg-[#1A2D5A] text-white',
  Pending: 'bg-[#4B6090] text-white',
  Sold:    'bg-[#6B7280] text-white',
  Closed:  'bg-[#6B7280] text-white',
}

export default function ModernTeamScheduleTourModal({
  open,
  onClose,
  propertyImage,
  propertyAddress,
  propertyPrice,
  propertyStatus = 'Active',
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

  const inputCls = 'w-full border border-[#D5DBE9] rounded-lg px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#1A2D5A] focus:ring-2 focus:ring-[#1A2D5A]/10 transition-all font-sans bg-white'

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative w-full max-w-3xl bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl shadow-[#1A2D5A]/8 overflow-hidden max-h-[92vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-1.5 text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-lg transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} strokeWidth={2} />
              </button>

              <div className="grid lg:grid-cols-[260px_1fr]">

                {/* ── Left: property summary ── */}
                <div className="bg-[#EEF1F7] border-b lg:border-b-0 lg:border-r border-[#D5DBE9] flex flex-col">
                  {propertyImage && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={propertyImage}
                        alt={propertyAddress ?? 'Property'}
                        fill
                        className="object-cover"
                        sizes="260px"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 space-y-3">
                    {propertyStatus && (
                      <span className={`inline-block px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase font-semibold rounded font-sans ${STATUS_STYLES[propertyStatus] ?? STATUS_STYLES.Active}`}>
                        {propertyStatus}
                      </span>
                    )}
                    {propertyAddress && (
                      <div className="flex items-start gap-1.5">
                        <MapPin size={13} className="text-[#1A2D5A] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#374151] font-sans leading-snug">{propertyAddress}</p>
                      </div>
                    )}
                    {propertyPrice && (
                      <p className="text-xl font-bold text-[#1A2D5A] font-sans">
                        ${Number(propertyPrice).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Right: form ── */}
                <div className="p-7 lg:p-8">

                  {/* ── Success state ── */}
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center min-h-[360px] text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#EEF1F7] flex items-center justify-center mb-5">
                        <CheckCircle size={32} className="text-[#1A2D5A]" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-[#111827] mb-2 font-sans">Tour Requested</h3>
                      <p className="text-[#6B7280] text-sm font-sans leading-relaxed max-w-xs">
                        We'll confirm your{' '}
                        <span className="text-[#111827] font-medium">{tourType === 'in-person' ? 'in-person' : 'virtual'}</span> tour for{' '}
                        <span className="text-[#111827] font-medium">
                          {selectedDate ? `${DAY_ABBR[selectedDate.getDay()]}, ${MONTH_ABBR[selectedDate.getMonth()]} ${selectedDate.getDate()}` : ''}
                        </span>{' '}at{' '}
                        <span className="text-[#111827] font-medium">{selectedTime}</span>.
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-8 px-6 py-2.5 border border-[#D5DBE9] text-[#374151] text-sm font-medium rounded-lg hover:border-[#1A2D5A]/40 hover:text-[#1A2D5A] transition-colors font-sans cursor-pointer"
                      >
                        Close
                      </button>
                    </motion.div>

                  ) : step === 1 ? (
                    <>
                      {/* Step 1: date + time */}
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#1A2D5A] font-semibold font-sans mb-1">
                        Schedule a Showing
                      </p>
                      <h2 className="text-2xl font-bold text-[#111827] mb-1 font-sans">
                        Interested in this home?
                      </h2>
                      <p className="text-[#6B7280] text-sm font-sans mb-7">
                        Choose a tour type, then pick a date and time.
                      </p>

                      {/* Tour type toggle */}
                      <div className="flex gap-2 mb-7">
                        {[{ value: 'in-person', label: 'In Person' }, { value: 'virtual', label: 'Virtual' }].map(({ value, label }) => (
                          <button
                            key={value}
                            onClick={() => setTourType(value)}
                            className={`px-5 py-2.5 rounded-lg border text-xs font-semibold tracking-[0.15em] uppercase font-sans transition-all cursor-pointer ${
                              tourType === value
                                ? 'border-[#1A2D5A] bg-[#1A2D5A] text-white'
                                : 'border-[#D5DBE9] text-[#374151] hover:border-[#1A2D5A]/50 hover:bg-[#EEF1F7] hover:text-[#1A2D5A]'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>

                      {/* Date picker */}
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#9CA3AF] font-sans mb-3">Select a Date</p>
                      <div className="grid grid-cols-7 gap-1.5 mb-7">
                        {dates.map((d, i) => {
                          const isSelected = selectedDate?.toDateString() === d.toDateString()
                          return (
                            <button
                              key={i}
                              onClick={() => setDate(d)}
                              className={`flex flex-col items-center py-2 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#1A2D5A] bg-[#1A2D5A] text-white'
                                  : 'border-[#D5DBE9] hover:border-[#1A2D5A]/50 hover:bg-[#EEF1F7]'
                              }`}
                            >
                              <span className={`text-[9px] uppercase tracking-wide font-sans font-medium ${isSelected ? 'text-white/70' : 'text-[#9CA3AF]'}`}>
                                {DAY_ABBR[d.getDay()]}
                              </span>
                              <span className={`text-sm font-bold font-sans mt-0.5 ${isSelected ? 'text-white' : 'text-[#111827]'}`}>
                                {d.getDate()}
                              </span>
                              <span className={`text-[8px] font-sans mt-0.5 ${isSelected ? 'text-white/60' : 'text-[#9CA3AF]'}`}>
                                {MONTH_ABBR[d.getMonth()]}
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      {/* Time slots */}
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#9CA3AF] font-sans mb-3">Select a Time</p>
                      <div className="grid grid-cols-3 gap-2 mb-8">
                        {TIME_SLOTS.map(t => {
                          const isSelected = selectedTime === t
                          return (
                            <button
                              key={t}
                              onClick={() => setTime(t)}
                              className={`py-2.5 text-xs font-medium font-sans rounded-lg border transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#1A2D5A] bg-[#1A2D5A] text-white'
                                  : 'border-[#D5DBE9] text-[#374151] hover:border-[#1A2D5A]/50 hover:bg-[#EEF1F7] hover:text-[#1A2D5A]'
                              }`}
                            >
                              {t}
                            </button>
                          )
                        })}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={handleClose}
                          className="text-sm text-[#9CA3AF] hover:text-[#374151] transition-colors font-sans cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setStep(2)}
                          disabled={!selectedDate || !selectedTime}
                          className="px-8 py-3 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-lg hover:bg-[#243870] transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-sans cursor-pointer"
                        >
                          Next →
                        </button>
                      </div>
                    </>

                  ) : (
                    <>
                      {/* Step 2: contact details */}
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#1A2D5A] font-semibold font-sans mb-1">
                        Almost There
                      </p>
                      <h2 className="text-2xl font-bold text-[#111827] mb-1 font-sans">
                        Your Details
                      </h2>
                      <p className="text-[#6B7280] text-sm font-sans mb-7">
                        {tourType === 'in-person' ? 'In-person' : 'Virtual'} tour ·{' '}
                        {selectedDate ? `${DAY_ABBR[selectedDate.getDay()]}, ${MONTH_ABBR[selectedDate.getMonth()]} ${selectedDate.getDate()}` : ''}{' '}
                        · {selectedTime}
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="text-[10px] tracking-[0.15em] uppercase text-[#9CA3AF] font-sans mb-1.5 block">Full Name</label>
                          <input
                            required
                            value={form.name}
                            onChange={e => setForm(v => ({ ...v, name: e.target.value }))}
                            type="text"
                            placeholder="Jane Smith"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-[0.15em] uppercase text-[#9CA3AF] font-sans mb-1.5 block">Email Address</label>
                          <input
                            required
                            value={form.email}
                            onChange={e => setForm(v => ({ ...v, email: e.target.value }))}
                            type="email"
                            placeholder="jane@example.com"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-[0.15em] uppercase text-[#9CA3AF] font-sans mb-1.5 block">Phone <span className="normal-case tracking-normal text-[#C4C9D4]">(optional)</span></label>
                          <input
                            value={form.phone}
                            onChange={e => setForm(v => ({ ...v, phone: e.target.value }))}
                            type="tel"
                            placeholder="(713) 555-0100"
                            className={inputCls}
                          />
                        </div>

                        <div className="flex items-center justify-between pt-3">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-sm text-[#9CA3AF] hover:text-[#374151] transition-colors font-sans cursor-pointer"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            disabled={!form.name || !form.email}
                            className="px-8 py-3 bg-[#1A2D5A] text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-lg hover:bg-[#243870] transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-sans cursor-pointer"
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
