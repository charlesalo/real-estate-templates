'use client'

import { useState } from 'react'
import Image from 'next/image'
import ParallaxBanner from '@/components/sections/ParallaxBanner'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'

const GALLERY_MENU = [
  {
    label: 'Home Search',
    eyebrow: 'Browse Listings',
    href: '/luxury-agent/listings',
    image: '/images/luxury-agent/GSM/GSM 1.png',
  },
  {
    label: 'Home Valuation',
    eyebrow: 'What\'s Your Home Worth',
    href: '/luxury-agent/home-valuation',
    image: '/images/luxury-agent/GSM/GSM 2.jpg',
  },
  {
    label: 'About Victoria',
    eyebrow: 'Your Trusted Advisor',
    href: '/luxury-agent/about',
    image: '/images/luxury-agent/GSM/GSM 3.png',
  },
]

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
      <ParallaxBanner src="/images/luxury-agent/xtra13.jpg" priority>
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-4 font-sans">Ready to Make Your Move?</p>
        <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white mb-5">Let&apos;s Connect</h1>
        <div className="w-12 h-px bg-[#C9A96E] mb-5" />
        <p className="text-white/45 font-sans text-base max-w-xl leading-relaxed">
          Schedule a consultation to buy or sell your home with confidence.
        </p>
      </ParallaxBanner>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">

          {/* Agent photo */}
          <motion.div
            className="lg:col-span-2 hidden lg:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-full h-full min-h-[480px]">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80"
                alt="Victoria Sinclair"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 0vw, 40vw"
              />
            </div>
          </motion.div>

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

      {/* Gallery menu */}
      <div className="border-t border-white/[0.07]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {GALLERY_MENU.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="group relative block overflow-hidden aspect-[4/3]"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                {/* Dark overlay — lightens slightly on hover */}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                  <p className="text-[9px] tracking-[0.45em] uppercase text-[#C9A96E] font-sans mb-2">
                    {item.eyebrow}
                  </p>
                  <h3 className="font-heading text-2xl lg:text-3xl font-normal text-white leading-tight mb-4">
                    {item.label}
                  </h3>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 group-hover:text-[#C9A96E] transition-colors font-sans">
                    Explore →
                  </span>
                </div>

                {/* Right border divider between items */}
                {i < GALLERY_MENU.length - 1 && (
                  <div className="absolute top-0 right-0 bottom-0 w-px bg-white/[0.07]" />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
