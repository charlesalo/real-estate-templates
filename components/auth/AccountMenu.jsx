'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, LogOut, User } from 'lucide-react'
import { useAuth } from './AuthProvider'
import { cn } from '@/lib/utils'

function initials(name = '', email = '') {
  const source = name.trim() || email.split('@')[0] || ''
  const parts = source.split(/[\s._-]+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

/**
 * Navbar account control. Renders nothing until the session resolves so the
 * navbar doesn't flash "Sign In" at someone who's already signed in.
 */
export default function AccountMenu({ solid, savedSearchesHref }) {
  const { user, loading, configured, openAuth, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  if (!configured || loading) return null

  if (!user) {
    return (
      <button
        onClick={() => openAuth('search')}
        className={cn(
          'flex items-center gap-1.5 text-sm font-medium transition-colors duration-200',
          solid ? 'text-template-text-body hover:text-template-accent' : 'text-white/90 hover:text-white',
        )}
      >
        <User size={14} strokeWidth={2} />
        Sign In
      </button>
    )
  }

  const name = user.user_metadata?.full_name ?? user.user_metadata?.name ?? ''

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Account menu"
        className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold tracking-wide transition-all duration-200',
          solid
            ? 'bg-template-accent text-template-accent-fg hover:bg-template-accent-hover'
            : 'bg-white/15 text-white border border-white/30 hover:bg-white/25',
        )}
      >
        {initials(name, user.email ?? '')}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 mt-3 min-w-[230px] bg-template-panel border border-template-border rounded-template-md shadow-xl shadow-template-accent/8 py-2 z-10"
          >
            <div className="px-4 py-2 border-b border-template-surface mb-1">
              {name && <p className="text-sm font-semibold text-template-fg truncate">{name}</p>}
              <p className="text-[12px] text-template-text-subtle font-sans truncate">{user.email}</p>
            </div>

            <Link
              href={savedSearchesHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-template-menu-fg hover:text-template-menu-fg-hover hover:bg-template-menu-hover-bg transition-colors"
            >
              <Heart size={14} strokeWidth={1.75} />
              Saved Searches
            </Link>

            <button
              onClick={() => { setOpen(false); signOut() }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-template-menu-fg hover:text-template-menu-fg-hover hover:bg-template-menu-hover-bg transition-colors"
            >
              <LogOut size={14} strokeWidth={1.75} />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
