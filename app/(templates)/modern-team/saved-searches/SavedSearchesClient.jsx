'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bell, Heart, Search, Trash2 } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

const TYPE_LABELS = {
  SingleFamily:  'Single Family',
  Condominium:   'Condo / Co-op',
  MultiFamily:   'Multi-Family',
  Land:          'Land',
}

const SORT_LABELS = {
  '-listdate':  'Newest',
  '-listprice': 'Price: High → Low',
  'listprice':  'Price: Low → High',
  '-beds':      'Most Bedrooms',
}

function priceLabel(val) {
  const n = parseInt(val)
  if (Number.isNaN(n)) return val
  if (n >= 1000000) return `$${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`
  if (n >= 1000)    return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

// Turns stored criteria back into the chips the search page shows, so a saved
// search reads the same way it did when it was saved.
function describe(criteria = {}) {
  const chips = []
  if (criteria.q)        chips.push(`"${criteria.q}"`)
  if (criteria.status)   chips.push(criteria.status)
  if (criteria.minprice) chips.push(`From ${priceLabel(criteria.minprice)}`)
  if (criteria.maxprice) chips.push(`To ${priceLabel(criteria.maxprice)}`)
  if (criteria.minbeds)  chips.push(`${criteria.minbeds}+ Beds`)
  if (criteria.minbaths) chips.push(`${criteria.minbaths}+ Baths`)
  if (criteria.type)     chips.push(TYPE_LABELS[criteria.type] ?? criteria.type)
  if (criteria.minarea)  chips.push(`${parseInt(criteria.minarea).toLocaleString()}+ sqft`)
  return chips
}

function searchHref(criteria = {}) {
  const params = new URLSearchParams()
  Object.entries(criteria).forEach(([k, v]) => {
    if (v && !(k === 'sort' && v === '-listdate')) params.set(k, v)
  })
  const qs = params.toString()
  return `/modern-team/listings${qs ? `?${qs}` : ''}`
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

export default function SavedSearchesClient({ signedIn, initialSearches = [] }) {
  const { user, openAuth } = useAuth()
  const [searches, setSearches] = useState(initialSearches)
  const [deleting, setDeleting] = useState(null)
  const [error, setError]       = useState('')

  // The server rendered this page from the cookie state at request time. If the
  // visitor signs in from here, pull their list without a full reload.
  useEffect(() => {
    if (!user || signedIn) return
    fetch('/api/saved-searches?template=modern-team')
      .then(res => (res.ok ? res.json() : null))
      .then(data => { if (data?.searches) setSearches(data.searches) })
      .catch(() => {})
  }, [user, signedIn])

  const remove = async (id) => {
    setDeleting(id)
    setError('')
    try {
      const res = await fetch(`/api/saved-searches?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (res.ok) {
        setSearches(list => list.filter(s => s.id !== id))
      } else {
        setError('Could not delete that search. Please try again.')
      }
    } catch {
      setError('Could not delete that search. Please try again.')
    } finally {
      setDeleting(null)
    }
  }

  const isSignedIn = signedIn || Boolean(user)

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-14">

      <p className="text-[12px] tracking-[0.3em] uppercase text-[#4B6090] font-sans mb-2">
        Your Account
      </p>
      <h1 className="text-3xl lg:text-4xl font-bold text-[#1A2D5A] tracking-tight">
        Saved Searches
      </h1>

      {!isSignedIn ? (
        <div className="mt-10 rounded-2xl bg-white border border-[#D5DBE9] px-8 py-14 text-center">
          <div className="w-12 h-12 rounded-full bg-[#EEF1F7] flex items-center justify-center mx-auto mb-5">
            <Heart size={18} className="text-[#1A2D5A]" strokeWidth={1.75} />
          </div>
          <h2 className="text-xl font-semibold text-[#1A2D5A] mb-2">Sign in to see your searches</h2>
          <p className="text-sm text-[#6B7280] font-sans max-w-sm mx-auto leading-relaxed">
            Create a free account and your search filters will be waiting for you every time you
            come back.
          </p>
          <button
            onClick={() => openAuth('save')}
            className="mt-8 px-10 py-3.5 bg-[#1A2D5A] text-white text-[12px] tracking-[0.25em] uppercase font-semibold rounded-lg hover:bg-[#243870] transition-colors"
          >
            Create Free Account
          </button>
        </div>
      ) : searches.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-white border border-[#D5DBE9] px-8 py-14 text-center">
          <div className="w-12 h-12 rounded-full bg-[#EEF1F7] flex items-center justify-center mx-auto mb-5">
            <Search size={18} className="text-[#1A2D5A]" strokeWidth={1.75} />
          </div>
          <h2 className="text-xl font-semibold text-[#1A2D5A] mb-2">No saved searches yet</h2>
          <p className="text-sm text-[#6B7280] font-sans max-w-sm mx-auto leading-relaxed">
            Run a search, set your filters, then hit <span className="font-medium">Save Search</span> to
            keep it here.
          </p>
          <Link
            href="/modern-team/listings"
            className="inline-block mt-8 px-10 py-3.5 bg-[#1A2D5A] text-white text-[12px] tracking-[0.25em] uppercase font-semibold rounded-lg hover:bg-[#243870] transition-colors"
          >
            Start Searching
          </Link>
        </div>
      ) : (
        <>
          {error && <p className="text-red-500 text-xs font-sans mt-6">{error}</p>}

          <div className="mt-10 flex flex-col gap-3">
            {searches.map(s => {
              const chips = describe(s.search_criteria)
              return (
                <div
                  key={s.id}
                  className="bg-white border border-[#D5DBE9] rounded-xl px-6 py-5 flex items-start gap-4 hover:border-[#1A2D5A]/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {chips.length > 0 ? (
                        chips.map(chip => (
                          <span
                            key={chip}
                            className="px-3 py-1 text-[12px] border border-[#1A2D5A]/30 text-[#1A2D5A] rounded-full font-sans"
                          >
                            {chip}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm font-medium text-[#111827]">All Houston listings</span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[12px] text-[#9CA3AF] font-sans">
                      <span>Saved {formatDate(s.created_at)}</span>
                      {s.search_criteria?.sort && SORT_LABELS[s.search_criteria.sort] && (
                        <span>Sorted by {SORT_LABELS[s.search_criteria.sort]}</span>
                      )}
                      {s.alert_frequency && (
                        <span className="flex items-center gap-1.5 text-[#4B6090]">
                          <Bell size={11} strokeWidth={1.75} />
                          {s.alert_frequency} alerts
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={searchHref(s.search_criteria)}
                      className="px-4 py-2 text-[12px] tracking-[0.15em] uppercase font-semibold bg-[#1A2D5A] text-white rounded-lg hover:bg-[#243870] transition-colors font-sans"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => remove(s.id)}
                      disabled={deleting === s.id}
                      aria-label="Delete saved search"
                      className="p-2 text-[#9CA3AF] hover:text-red-500 transition-colors disabled:opacity-40"
                    >
                      <Trash2 size={15} strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-[12px] text-[#9CA3AF] font-sans mt-8 leading-relaxed">
            Email alerts for saved searches are coming soon — your searches are stored with an alert
            frequency ready for when they launch.
          </p>
        </>
      )}
    </div>
  )
}
