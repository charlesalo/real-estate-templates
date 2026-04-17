'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react'

const schema = z.object({
  fullName: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().min(10, 'Please write at least a brief message'),
})

export default function ContactClient() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    console.log('Contact form:', data)
    setSent(true)
  }

  const inputClass = 'w-full text-sm px-4 py-3 outline-none border border-white/10 bg-transparent text-white placeholder:text-white/25 focus:border-[#C9A96E] transition-colors'
  const labelClass = 'block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2 font-sans'
  const errorClass = 'text-red-400 text-xs mt-1'

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* Header */}
      <div className="border-b border-white/10 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">Contact</p>
          <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white">Get in Touch</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-white/55 text-base leading-relaxed mb-10">
                Whether you&apos;re looking to buy, sell, or simply want to know what your home is worth,
                Victoria is available for a confidential conversation at your convenience.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Phone, label: 'Phone', value: '(310) 555-0194', href: 'tel:3105550194' },
                  { icon: Mail, label: 'Email', value: 'victoria@victoriasinclair.com', href: 'mailto:victoria@victoriasinclair.com' },
                  { icon: MapPin, label: 'Office', value: '432 N Beverly Drive\nBeverly Hills, CA 90210', href: null },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <item.icon size={16} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-sans mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm text-white/60 whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 text-center"
              >
                <CheckCircle size={48} className="text-[#C9A96E] mx-auto mb-6" strokeWidth={1} />
                <h2 className="font-heading text-2xl text-white mb-4">Message Received</h2>
                <p className="text-white/50 text-sm max-w-sm mx-auto">
                  Thank you for reaching out. Victoria will be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input {...register('fullName')} type="text" placeholder="Jane Smith" className={inputClass} />
                    {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input {...register('email')} type="email" placeholder="jane@example.com" className={inputClass} />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Phone (optional)</label>
                    <input {...register('phone')} type="tel" placeholder="(310) 555-0100" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>I&apos;m interested in</label>
                    <select
                      {...register('interest')}
                      className="w-full text-sm px-4 py-3 outline-none border border-white/10 bg-[#0A0A0A] text-white/60 focus:border-[#C9A96E] transition-colors [&>option]:bg-[#1A1A1A]"
                    >
                      <option value="">Select…</option>
                      {['Buying a home', 'Selling my home', 'Home valuation', 'Off-market properties', 'General inquiry'].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Message</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Tell Victoria a bit about what you're looking for…"
                    className={`${inputClass} resize-none`}
                  />
                  {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-4 bg-[#C9A96E] text-[#0A0A0A] text-[11px] tracking-[0.2em] uppercase font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
