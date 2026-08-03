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
  return `/luxury-agent/listings${qs ? `?${qs}` : ''}`
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
    fetch('/api/saved-searches?template=luxury-agent')
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

  const emptyPanelCls = 'mt-12 border border-white/[0.07] bg-[#0D0D0D] px-8 py-16 text-center'
  const goldButtonCls = 'inline-block mt-8 px-10 py-3.5 text-[12px] tracking-[0.25em] uppercase font-medium bg-[#C9A96E] text-[#0A0A0A] hover:opacity-90 transition-opacity'

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">

      <p className="text-[12px] tracking-[0.35em] uppercase text-[#C9A96E] font-sans mb-3">
        Your Account
      </p>
      <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white tracking-tight">
        Saved Searches
      </h1>

      {!isSignedIn ? (
        <div className={emptyPanelCls}>
          <div className="w-12 h-12 flex items-center justify-center border border-[#C9A96E]/30 mx-auto mb-6">
            <Heart size={17} className="text-[#C9A96E]" strokeWidth={1.5} />
          </div>
          <h2 className="font-heading text-2xl font-normal text-white mb-3">
            Register to see your searches
          </h2>
          <p className="text-sm text-white/40 font-sans max-w-sm mx-auto leading-relaxed">
            Create a complimentary account and your search criteria will be waiting for you every
            time you return.
          </p>
          <button onClick={() => openAuth('save')} className={goldButtonCls}>
            Register for Access
          </button>
        </div>
      ) : searches.length === 0 ? (
        <div className={emptyPanelCls}>
          <div className="w-12 h-12 flex items-center justify-center border border-[#C9A96E]/30 mx-auto mb-6">
            <Search size={17} className="text-[#C9A96E]" strokeWidth={1.5} />
          </div>
          <h2 className="font-heading text-2xl font-normal text-white mb-3">
            No saved searches yet
          </h2>
          <p className="text-sm text-white/40 font-sans max-w-sm mx-auto leading-relaxed">
            Run a search, set your criteria, then select{' '}
            <span className="text-white/70">Save Search</span> to keep it here.
          </p>
          <Link href="/luxury-agent/listings" className={goldButtonCls}>
            Begin Searching
          </Link>
        </div>
      ) : (
        <>
          {error && <p className="text-red-400 text-xs font-sans mt-6">{error}</p>}

          <div className="mt-12 flex flex-col gap-3">
            {searches.map(s => {
              const chips = describe(s.search_criteria)
              return (
                <div
                  key={s.id}
                  className="bg-[#0D0D0D] border border-white/[0.07] px-6 py-6 flex items-start gap-4 hover:border-[#C9A96E]/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {chips.length > 0 ? (
                        chips.map(chip => (
                          <span
                            key={chip}
                            className="px-3 py-1 text-[12px] border border-[#C9A96E]/40 text-[#C9A96E] font-sans"
                          >
                            {chip}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm font-sans text-white/70">All Los Angeles listings</span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-[12px] text-white/25 font-sans">
                      <span>Saved {formatDate(s.created_at)}</span>
                      {s.search_criteria?.sort && SORT_LABELS[s.search_criteria.sort] && (
                        <span>Sorted by {SORT_LABELS[s.search_criteria.sort]}</span>
                      )}
                      {s.alert_frequency && (
                        <span className="flex items-center gap-1.5 text-[#C9A96E]/70">
                          <Bell size={11} strokeWidth={1.5} />
                          {s.alert_frequency} alerts
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={searchHref(s.search_criteria)}
                      className="px-5 py-2 text-[12px] tracking-[0.2em] uppercase font-medium bg-[#C9A96E] text-[#0A0A0A] hover:opacity-90 transition-opacity font-sans"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => remove(s.id)}
                      disabled={deleting === s.id}
                      aria-label="Delete saved search"
                      className="p-2 text-white/25 hover:text-red-400 transition-colors disabled:opacity-40"
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-[12px] text-white/25 font-sans mt-10 leading-relaxed">
            Email alerts for saved searches are coming soon — your searches are stored with an alert
            frequency ready for when they launch.
          </p>
        </>
      )}
    </div>
  )
}
