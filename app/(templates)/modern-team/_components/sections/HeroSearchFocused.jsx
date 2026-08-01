'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'


export default function HeroSearchFocused({
  headline      = 'Find Your Home in Houston',
  subheadline   = 'Search thousands of listings across Greater Houston.',
  eyebrow,
  backgroundImage,
  backgroundVideo,
  listingsHref  = '/listings',
  stats         = [],
  popularAreas  = [],
}) {
  const router = useRouter()
  const [query, setQuery]             = useState('')
  const [focused, setFocused]         = useState(false)
  const [locating, setLocating]       = useState(false)
  const [predictions, setPredictions] = useState([])
  const containerRef = useRef(null)
  const debounceRef  = useRef(null)

  const hasQuery     = query.trim().length >= 2
  const showDropdown = focused && (hasQuery ? predictions.length > 0 : popularAreas.length > 0)

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  // Debounced autocomplete fetch
  const fetchPredictions = useCallback((value) => {
    clearTimeout(debounceRef.current)
    if (value.trim().length < 2) {
      setPredictions([])
      return
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res  = await fetch(`/api/listings/autocomplete?q=${encodeURIComponent(value)}`)
        const data = await res.json()
        setPredictions(data.predictions ?? [])
      } catch {
        setPredictions([])
      }
    }, 250)
  }, [])

  const handleQueryChange = (e) => {
    const value = e.target.value
    setQuery(value)
    fetchPredictions(value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    const qs = params.toString()
    router.push(`${listingsHref}${qs ? `?${qs}` : ''}`)
    setFocused(false)
  }

  const handlePredictionClick = (prediction) => {
    setQuery(prediction.mainText)
    setPredictions([])
    setFocused(false)
    const params = new URLSearchParams({ q: prediction.mainText })
    router.push(`${listingsHref}?${params}`)
  }

  const handleNearMe = () => {
    setFocused(false)
    if (!navigator.geolocation) { router.push(listingsHref); return }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        router.push(`${listingsHref}?lat=${coords.latitude}&lng=${coords.longitude}`)
        setLocating(false)
      },
      () => { router.push(listingsHref); setLocating(false) },
    )
  }

  const handleAreaClick = (href) => {
    setFocused(false)
    router.push(href)
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center">

      {/* Background — clipped independently so dropdown can overflow the section */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImage || backgroundVideo ? (
          <>
            {backgroundImage && (
              <Image
                src={backgroundImage}
                alt="Houston real estate hero"
                fill
                className={cn('object-cover', backgroundVideo && 'md:hidden')}
                priority
              />
            )}
            {backgroundVideo && (
              <video autoPlay muted loop playsInline
                className="hidden md:block absolute inset-0 w-full h-full object-cover"
              >
                <source src={backgroundVideo} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F1E3E] via-[#1A2D5A] to-[#2B4080]" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs tracking-[0.4em] uppercase text-white/60 mb-5 font-sans"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight max-w-3xl mb-5"
          style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-white/70 max-w-xl mb-10 font-sans leading-relaxed"
        >
          {subheadline}
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 max-w-2xl"
          >
            {/* Input + dropdown wrapper */}
            <div ref={containerRef} className="relative flex-1 min-w-0">
              <div className={cn(
                'flex items-center gap-3 px-5 py-4 bg-white shadow-2xl',
                showDropdown ? 'rounded-t-xl' : 'rounded-xl',
              )}>
                <Search size={16} className="text-[#4B6090] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="City, neighborhood, or ZIP…"
                  value={query}
                  onChange={handleQueryChange}
                  onFocus={() => setFocused(true)}
                  className="flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] min-w-0"
                />
              </div>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border-t border-[#E5E7EB] rounded-b-xl shadow-2xl z-50 overflow-hidden">

                  {hasQuery ? (
                    /* ── Autocomplete predictions ── */
                    <div className="py-2">
                      {predictions.map(p => (
                        <button
                          key={p.mlsId}
                          type="button"
                          onClick={() => handlePredictionClick(p)}
                          className="w-full flex items-start gap-3 px-5 py-3 hover:bg-[#EEF1F7] transition-colors duration-150 text-left"
                        >
                          <MapPin size={14} className="text-[#4B6090] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-[#111827] font-sans">{p.mainText}</p>
                            {p.secondaryText && (
                              <p className="text-xs text-[#9CA3AF] font-sans mt-0.5">{p.secondaryText}</p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    /* ── Default: Near Me + Popular Areas ── */
                    <>
                      <button
                        type="button"
                        onClick={handleNearMe}
                        className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#EEF1F7] transition-colors duration-150 border-b border-[#E5E7EB]"
                      >
                        <MapPin size={14} className="text-[#4B6090] flex-shrink-0" />
                        <span className="text-sm font-semibold text-[#1A2D5A] font-sans">
                          {locating ? 'Locating…' : 'Search Near Me'}
                        </span>
                      </button>

                      <div className="px-5 pt-4 pb-3">
                        <p className="text-[12px] font-semibold tracking-[0.25em] uppercase text-[#9CA3AF] mb-3 font-sans">
                          Popular Areas
                        </p>
                        <div className="flex flex-col">
                          {popularAreas.map(area => (
                            <button
                              key={area.href}
                              type="button"
                              onClick={() => handleAreaClick(area.href)}
                              className="px-2 py-2 -mx-2 rounded-md text-sm text-[#374151] hover:bg-[#EEF1F7] hover:text-[#1A2D5A] transition-colors font-sans text-left"
                            >
                              {area.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full sm:w-auto sm:flex-shrink-0 sm:min-w-[160px] px-8 py-4 border border-white text-white text-sm font-semibold rounded-xl hover:bg-white hover:text-[#1A2D5A] transition-all duration-300"
            >
              SEARCH
            </button>
          </form>
        </motion.div>

        {/* Stats strip */}
        {stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-6 mt-14 pt-8 border-t border-white/15"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-white">
                <div className="text-2xl font-bold leading-none">{stat.value}</div>
                <div className="text-xs text-white/50 mt-1 font-sans">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-white/30"
        />
      </motion.div>
    </section>
  )
}
