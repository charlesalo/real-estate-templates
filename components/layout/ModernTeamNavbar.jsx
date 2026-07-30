'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ModernTeamSideMenu from './ModernTeamSideMenu'
import AccountMenu from '@/components/auth/AccountMenu'
import { cn } from '@/lib/utils'

// ── Sub-nav dropdown ─────────────────────────────────────────────────────────

function Dropdown({ link, scrolled }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const textCls = scrolled
    ? 'text-[#374151] hover:text-[#1A2D5A]'
    : 'text-white/90 hover:text-white'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={cn('flex items-center gap-1 text-sm font-medium transition-colors duration-200', textCls)}
      >
        {link.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={13} strokeWidth={2.5} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[200px] bg-white border border-[#E5E7EB] rounded-xl shadow-xl shadow-[#1A2D5A]/8 py-2 z-10"
          >
            {link.children.map(child => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#374151] hover:text-[#1A2D5A] hover:bg-[#EEF1F7] transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main Navbar ───────────────────────────────────────────────────────────────

export default function ModernTeamNavbar({
  logo,
  links     = [],
  menuLinks = [],
  agentEmail,
  socialLinks = {},
}) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const pathname = usePathname()

  // Pages with a light background (no dark hero) need the solid navbar from the start
  const forceSolid = /\/modern-team\/listings\/.+/.test(pathname)
  const solid = scrolled || forceSolid

  // Sign-in is only relevant where the registration wall actually applies —
  // the search page and individual listing pages. Keep it off the rest of the
  // site so the navbar doesn't advertise an account system on pages that have
  // nothing gated.
  const onListingsPage = pathname === '/modern-team/listings' || pathname.startsWith('/modern-team/listings/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkCls = cn(
    'text-sm font-medium transition-colors duration-200',
    solid ? 'text-[#374151] hover:text-[#1A2D5A]' : 'text-white/90 hover:text-white',
  )

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
          solid
            ? 'bg-white/96 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-20">

            {/* ── Logo ───────────────────────────────────────────── */}
            <Link href="/modern-team" className="relative flex-shrink-0 h-14 w-52">
              <Image
                src="/images/modern-team/The Hargrove Group Light Logo.png"
                alt="The Hargrove Group"
                fill
                className={cn('object-contain object-left transition-opacity duration-300', solid ? 'opacity-0' : 'opacity-100')}
                priority
              />
              <Image
                src="/images/modern-team/The Hargrove Group Dark Logo.png"
                alt="The Hargrove Group"
                fill
                className={cn('object-contain object-left transition-opacity duration-300', solid ? 'opacity-100' : 'opacity-0')}
                priority
              />
            </Link>

            {/* ── Desktop nav ────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-6 ml-auto">
              {links.map((link, i) => {
                if (link.phone) return null // phone shown in top bar when scrolled
                if (link.children?.length) return <Dropdown key={i} link={link} scrolled={solid} />
                if (link.modal) return (
                  <button
                    key={i}
                    onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
                    className={cn(
                      linkCls,
                      `relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-200 hover:after:w-full ${solid ? 'after:bg-[#1A2D5A]' : 'after:bg-white'}`,
                    )}
                  >
                    {link.label}
                  </button>
                )
                return (
                  <Link
                    key={i}
                    href={link.href}
                    className={cn(
                      linkCls,
                      `relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-200 hover:after:w-full ${solid ? 'after:bg-[#1A2D5A]' : 'after:bg-white'}`,
                      pathname === link.href && 'after:w-full',
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}

              {onListingsPage && (
                <AccountMenu solid={solid} savedSearchesHref="/modern-team/saved-searches" />
              )}
            </nav>

            {/* ── Hamburger ──────────────────────────────────────── */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={cn(
                'ml-auto lg:ml-6 flex flex-col items-center justify-center gap-[5px] hover:gap-[2px] w-9 h-9 transition-all duration-200',
                solid ? 'text-[#1A2D5A]' : 'text-white',
              )}
            >
              <span className="block h-[2px] w-6 bg-current rounded-full" />
              <span className="block h-[2px] w-6 bg-current rounded-full" />
              <span className="block h-[2px] w-6 bg-current rounded-full" />
            </button>

          </div>
        </div>
      </header>

      <ModernTeamSideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        teamName={logo?.text ?? 'The Hargrove Group'}
        links={menuLinks}
        email={agentEmail}
        socialLinks={socialLinks}
      />
    </>
  )
}
