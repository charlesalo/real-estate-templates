'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const step1Schema = z.object({
  address: z.string().min(5, 'Please enter a valid address'),
})
const step2Schema = z.object({
  bedrooms: z.string().min(1, 'Required'),
  bathrooms: z.string().min(1, 'Required'),
  sqft: z.string().min(1, 'Required').regex(/^\d+$/, 'Must be a number'),
  condition: z.string().min(1, 'Required'),
})
const step3Schema = z.object({
  fullName: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Enter a valid phone number'),
})

const SCHEMAS = [step1Schema, step2Schema, step3Schema]

const TEMPLATE_LABELS = {
  'luxury-agent': 'Luxury Agent',
  'modern-team':  'Modern Team',
  'local-expert': 'Local Expert',
}

export default function HomeValuationForm({ template = 'luxury-agent' }) {
  const isLuxury = template === 'luxury-agent'
  const [step, setStep] = useState(0)
  const [allData, setAllData] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SCHEMAS[step]),
  })

  const onStepSubmit = async (data) => {
    const merged = { ...allData, ...data }
    setAllData(merged)
    if (step < 2) {
      setStep(s => s + 1)
      return
    }

    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:       merged.fullName,
          email:      merged.email,
          phone:      merged.phone,
          message:    `Address: ${merged.address} | Bedrooms: ${merged.bedrooms} | Bathrooms: ${merged.bathrooms} | Sqft: ${merged.sqft} | Condition: ${merged.condition}`,
          leadSource: `${TEMPLATE_LABELS[template] ?? template} - Home Valuation`,
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
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = cn(
    'w-full text-sm px-4 py-3 outline-none border bg-transparent transition-colors',
    isLuxury
      ? 'border-white/10 text-white placeholder:text-white/25 focus:border-template-accent'
      : 'border-template-border text-template-fg placeholder:text-template-fg/40 rounded-lg focus:border-template-accent',
  )

  const selectClass = cn(
    inputClass,
    isLuxury ? '[&>option]:bg-[#1A1A1A]' : '',
  )

  const labelClass = cn('block text-[12px] tracking-[0.2em] uppercase mb-2 font-sans', isLuxury ? 'text-white/40' : 'text-template-fg/50')
  const errorClass = 'text-red-400 text-xs mt-1'

  const stepLabels = ['Address', 'Property Details', 'Your Info']

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 text-center"
      >
        <CheckCircle size={48} className="text-template-accent mx-auto mb-6" strokeWidth={1} />
        <h3 className={cn('font-heading text-2xl font-normal mb-4', isLuxury ? 'text-white' : 'text-template-fg')}>
          Your Estimate is Being Prepared
        </h3>
        <p className={cn('text-sm leading-relaxed max-w-sm mx-auto', isLuxury ? 'text-white/50' : 'text-template-fg/60')}>
          An agent will contact you within 24 hours with your personalized home valuation report.
        </p>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {stepLabels.map((label, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all',
                i < step
                  ? 'bg-template-accent text-[#0A0A0A]'
                  : i === step
                    ? isLuxury ? 'border border-template-accent text-template-accent' : 'border border-template-accent text-template-accent'
                    : isLuxury ? 'border border-white/20 text-white/30' : 'border border-template-border text-template-fg/30',
              )}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={cn('text-xs hidden sm:block', i === step ? (isLuxury ? 'text-white' : 'text-template-fg') : (isLuxury ? 'text-white/30' : 'text-template-fg/40'))}>
                {label}
              </span>
            </div>
            {i < 2 && <div className={cn('flex-1 h-px mx-3', isLuxury ? 'bg-white/10' : 'bg-template-border')} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.form
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit(onStepSubmit)}
          className="space-y-5"
        >
          {step === 0 && (
            <div>
              <label className={labelClass}>Property Address</label>
              <input
                {...register('address')}
                type="text"
                placeholder="123 Main Street, Beverly Hills, CA 90210"
                className={inputClass}
                defaultValue={allData.address ?? ''}
              />
              {errors.address && <p className={errorClass}>{errors.address.message}</p>}
            </div>
          )}

          {step === 1 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Bedrooms</label>
                  <select {...register('bedrooms')} className={selectClass} defaultValue={allData.bedrooms ?? ''}>
                    <option value="">Select</option>
                    {['1', '2', '3', '4', '5', '6+'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                  {errors.bedrooms && <p className={errorClass}>{errors.bedrooms.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Bathrooms</label>
                  <select {...register('bathrooms')} className={selectClass} defaultValue={allData.bathrooms ?? ''}>
                    <option value="">Select</option>
                    {['1', '1.5', '2', '2.5', '3', '4', '5+'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                  {errors.bathrooms && <p className={errorClass}>{errors.bathrooms.message}</p>}
                </div>
              </div>
              <div>
                <label className={labelClass}>Square Footage</label>
                <input {...register('sqft')} type="number" placeholder="e.g. 3500" className={inputClass} defaultValue={allData.sqft ?? ''} />
                {errors.sqft && <p className={errorClass}>{errors.sqft.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Property Condition</label>
                <select {...register('condition')} className={selectClass} defaultValue={allData.condition ?? ''}>
                  <option value="">Select condition</option>
                  {['Excellent', 'Good', 'Fair', 'Needs Work'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                {errors.condition && <p className={errorClass}>{errors.condition.message}</p>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className={labelClass}>Full Name</label>
                <input {...register('fullName')} type="text" placeholder="Jane Smith" className={inputClass} defaultValue={allData.fullName ?? ''} />
                {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input {...register('email')} type="email" placeholder="jane@example.com" className={inputClass} defaultValue={allData.email ?? ''} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input {...register('phone')} type="tel" placeholder="(310) 555-0100" className={inputClass} defaultValue={allData.phone ?? ''} />
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>
            </>
          )}

          {step === 2 && submitError && (
            <p className="text-red-400 text-sm">{submitError}</p>
          )}

          <div className="flex justify-between items-center pt-2">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className={cn('text-sm transition-colors', isLuxury ? 'text-white/40 hover:text-white' : 'text-template-fg/50 hover:text-template-fg')}
              >
                ← Back
              </button>
            ) : <div />}
            <button
              type="submit"
              disabled={submitting}
              className={cn(
                'flex items-center gap-2 px-8 py-3 text-[12px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-90 disabled:opacity-50',
                isLuxury ? 'bg-template-accent text-[#0A0A0A]' : 'bg-template-accent text-template-accent-fg rounded-lg',
              )}
            >
              {step < 2 ? 'Next' : submitting ? 'Submitting…' : 'Get My Estimate'}
              <ChevronRight size={14} />
            </button>
          </div>
        </motion.form>
      </AnimatePresence>
    </div>
  )
}
