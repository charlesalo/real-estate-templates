'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MapPin, ArrowRight } from 'lucide-react'

export default function HomeValuationCTA() {
  const router = useRouter()
  const [address, setAddress] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = address ? `?address=${encodeURIComponent(address)}` : ''
    router.push(`/modern-team/home-valuation${params}`)
  }

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
        alt="Houston home exterior"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#0F1E3E]/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-white/50 mb-4 font-sans">
          Free · No Obligation
        </p>
        <h2
          className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-inter, system-ui)' }}
        >
          What Is Your Houston Home Worth?
        </h2>
        <p className="text-white/65 text-lg font-sans mb-10 max-w-xl mx-auto leading-relaxed">
          Get a free, data-driven valuation in minutes. Our team analyzes recent sales, neighborhood trends, and your home's features to give you an accurate picture of today's market value.
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-3 flex-1 bg-white rounded-lg px-4 py-3.5 shadow-lg">
              <MapPin size={16} className="text-[#4B6090] flex-shrink-0" />
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter your home address…"
                className="flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF]"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 bg-white text-[#1A2D5A] font-semibold text-sm rounded-lg hover:bg-[#EEF1F7] transition-colors flex items-center justify-center gap-2 flex-shrink-0"
            >
              Get My Value <ArrowRight size={15} />
            </button>
          </div>
        </form>

        <p className="text-white/35 text-xs mt-5 font-sans">
          No sign-up required. An agent will follow up within 24 hours.
        </p>
      </div>
    </section>
  )
}
