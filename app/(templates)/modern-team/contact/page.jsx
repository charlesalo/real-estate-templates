'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'

const schema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email:    z.string().email({ message: 'Enter a valid email' }),
  phone:    z.string().optional(),
  interest: z.string().min(1, 'Please select an option'),
  message:  z.string().min(10, 'Please write at least a brief message'),
})

const INTERESTS = [
  'Buying a home',
  'Selling my home',
  'Home valuation',
  'Relocating to Houston',
  'Investment property',
  'Just exploring',
]

const TEAM_MEMBERS = [
  {
    name: 'Sarah Hargrove',
    title: 'Team Lead · Listing Specialist',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    phone: '(713) 555-0182',
    objectPosition: 'object-top',
  },
  {
    name: 'Michael Hargrove',
    title: "Co-Founder · Buyer's Specialist",
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    phone: '(713) 555-0183',
    objectPosition: 'object-top',
  },
  {
    name: 'Jessica Chen',
    title: 'Relocation Specialist',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    phone: '(713) 555-0184',
    objectPosition: 'object-center',
  },
]

export default function ContactPage() {
  const [sent, setSent]               = useState(false)
  const [submitError, setSubmitError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    setSubmitError('')
    try {
      const res = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    data.fullName,
          email:   data.email,
          phone:   data.phone,
          message: data.message,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setSent(true)
      } else {
        setSubmitError(json.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    }
  }

  const inputCls = 'w-full px-4 py-3 text-sm border border-[#D5DBE9] rounded-lg bg-white text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#1A2D5A] transition-colors'
  const errorCls = 'text-red-500 text-xs mt-1.5 font-sans'

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* Header */}
      <div className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1642704023081-e947cadd6755?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-4 font-sans">We'd Love to Hear From You</p>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              Contact the Hargrove Group
            </h1>
            <div className="w-12 h-0.5 bg-white/30 mb-6" />
            <p className="text-white/60 text-lg font-sans leading-relaxed">
              Whether you're buying, selling, or just exploring your options — our team is here to help. No pressure, no scripts. Just honest guidance from people who know Houston.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left: Info */}
          <div className="space-y-10">

            {/* Office info */}
            <div>
              <h2 className="text-xl font-bold text-[#111827] mb-6" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                Our Office
              </h2>
              <div className="space-y-5">
                {[
                  { Icon: Phone,  label: 'Main Line',    value: '(713) 555-0182',              href: 'tel:7135550182' },
                  { Icon: Mail,   label: 'Email Us',     value: 'hello@hargrovegroup.com',      href: 'mailto:hello@hargrovegroup.com' },
                  { Icon: MapPin, label: 'Office',       value: '1700 Post Oak Blvd Ste 600\nHouston, TX 77056', href: null },
                  { Icon: Clock,  label: 'Office Hours', value: 'Mon–Fri 8am–7pm · Sat–Sun 9am–5pm', href: null },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#EEF1F7] border border-[#D5DBE9] flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#1A2D5A]" />
                    </div>
                    <div>
                      <p className="text-[12px] tracking-[0.2em] uppercase text-[#9CA3AF] font-sans mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-[#111827] hover:text-[#1A2D5A] transition-colors font-sans whitespace-pre-line">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#111827] font-sans whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reach a specific agent */}
            <div>
              <h2 className="text-xl font-bold text-[#111827] mb-5" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                Reach a Specific Agent
              </h2>
              <div className="space-y-3">
                {TEAM_MEMBERS.map(m => (
                  <div key={m.name} className="flex items-center gap-4 p-4 bg-white border border-[#D5DBE9] rounded-xl">
                    <div className="relative w-11 h-11 flex-shrink-0 rounded-full overflow-hidden">
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        className={`object-cover ${m.objectPosition}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#111827] text-sm leading-none">{m.name}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5 font-sans">{m.title}</p>
                    </div>
                    <a
                      href={`tel:${m.phone.replace(/\D/g, '')}`}
                      className="text-xs font-medium text-[#1A2D5A] hover:text-[#243870] transition-colors font-sans flex-shrink-0"
                    >
                      {m.phone}
                    </a>
                  </div>
                ))}
              </div>
              <Link
                href="/modern-team/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1A2D5A] font-sans mt-4 group"
              >
                View Full Team Bios <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>

          </div>

          {/* Right: Form */}
          <div>
            <div className="bg-white border border-[#D5DBE9] rounded-xl p-8 lg:p-10">
              <h2 className="text-xl font-bold text-[#111827] mb-2" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                Send Us a Message
              </h2>
              <div className="w-10 h-0.5 bg-[#1A2D5A] mb-7" />

              {sent ? (
                <div className="py-12 text-center">
                  <CheckCircle size={48} className="text-[#1A2D5A] mx-auto mb-5" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#111827] mb-3">Message Received!</h3>
                  <p className="text-[#6B7280] font-sans text-sm leading-relaxed max-w-xs mx-auto">
                    Thanks! I'll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-[#374151] mb-1.5">Full Name *</label>
                    <input {...register('fullName')} type="text" placeholder="Jane Smith" className={inputCls} />
                    {errors.fullName && <p className={errorCls}>{errors.fullName.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1.5">Email *</label>
                      <input {...register('email')} type="email" placeholder="jane@example.com" className={inputCls} />
                      {errors.email && <p className={errorCls}>{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#374151] mb-1.5">Phone</label>
                      <input {...register('phone')} type="tel" placeholder="(713) 555-0100" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#374151] mb-1.5">I'm interested in… *</label>
                    <select {...register('interest')} className={inputCls}>
                      <option value="">Select an option</option>
                      {INTERESTS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors.interest && <p className={errorCls}>{errors.interest.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#374151] mb-1.5">Message *</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Tell us about your situation, timeline, or questions…"
                      className={`${inputCls} resize-none`}
                    />
                    {errors.message && <p className={errorCls}>{errors.message.message}</p>}
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <input type="checkbox" required id="consent" className="mt-0.5 accent-[#1A2D5A]" />
                    <label htmlFor="consent" className="text-xs text-[#9CA3AF] font-sans leading-relaxed">
                      I agree to be contacted by the Hargrove Group via call, email, and text for real estate services. TX Lic# 0624531. Message and data rates may apply.
                    </label>
                  </div>

                  {submitError && (
                    <p className="text-red-500 text-sm font-sans text-center">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#1A2D5A] text-white text-sm font-semibold rounded-lg hover:bg-[#243870] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3-Tile Gallery Menu ───────────────────────────────────── */}
      <section className="bg-[#EEF1F7] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {[
              {
                label: 'Home Search',
                sub: 'Browse Houston Listings',
                href: '/modern-team/listings',
                image: 'https://images.unsplash.com/photo-1744723852521-76fcb22e5d21?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              },
              {
                label: 'Home Valuation',
                sub: 'What Is Your Home Worth?',
                href: '/modern-team/home-valuation',
                image: 'https://images.unsplash.com/photo-1587702068694-a909ef4aa346?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              },
              {
                label: 'Testimonials',
                sub: 'What Our Clients Say',
                href: '/modern-team/testimonials',
                image: 'https://plus.unsplash.com/premium_photo-1680806490418-f0ca24d8f390?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D',
              },
            ].map(tile => (
              <Link
                key={tile.href}
                href={tile.href}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden block"
              >
                <Image
                  src={tile.image}
                  alt={tile.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient — heavier at bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E3E]/90 via-[#0F1E3E]/30 to-transparent" />

                {/* Text — bottom left */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="w-8 h-px bg-white/40 mb-4" />
                  <p className="text-[12px] tracking-[0.3em] uppercase text-white/55 font-sans mb-2">
                    {tile.sub}
                  </p>
                  <h3
                    className="text-xl lg:text-2xl font-bold text-white leading-tight group-hover:text-white/85 transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-inter, system-ui)' }}
                  >
                    {tile.label}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
