'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import AccountMenu from '@/components/auth/AccountMenu'
import SideMenu from './SideMenu'

function DropdownNavItem({ link }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const linkCls = 'transition-colors duration-200 text-[12px] tracking-[0.25em] uppercase text-white/60 hover:text-white font-sans'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={cn(linkCls, 'flex items-center gap-1')}
      >
        {link.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={11} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-max bg-[#0D0D0D] border border-white/[0.08] py-2"
          >
            {link.children.map(child => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-2.5 text-[12px] tracking-[0.2em] uppercase text-white/50 hover:text-white hover:bg-white/[0.03] transition-colors font-sans"
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

export default function Navbar({
  template    = 'luxury-agent',
  logo,
  links     = [],
  menuLinks = [],
  cta,
  agentPhone,
  agentEmail,
  socialLinks = {},
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Sign-in is only relevant where the registration wall actually applies —
  // the search page and individual listing pages. Keep it off the rest of the
  // site so the navbar doesn't advertise an account system on pages that have
  // nothing gated.
  const listingsRoot   = `/${template}/listings`
  const onListingsPage = pathname === listingsRoot || pathname.startsWith(`${listingsRoot}/`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkCls = 'transition-colors duration-200 text-[12px] tracking-[0.25em] uppercase text-white/60 hover:text-white font-sans'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href={`/${template}`} className="flex-shrink-0 group">
              {logo?.src ? (
                <img src={logo.src} alt={logo.alt ?? 'Logo'} className="h-8 w-auto" />
              ) : (
                <div className="leading-none">
                  <div className="font-semibold tracking-wide transition-colors font-heading text-xl text-white group-hover:text-[#C9A96E]">
                    {logo?.text ?? 'Agent Name'}
                  </div>
                  <div className="text-[12px] tracking-[0.35em] text-[#C9A96E] uppercase font-sans mt-0.5">
                    Real Estate
                  </div>
                </div>
              )}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7 ml-auto mr-6">
              {links.map((link, i) => {
                if (link.children?.length) {
                  return <DropdownNavItem key={i} link={link} />
                }
                if (link.modal) {
                  return (
                    <button
                      key={i}
                      onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
                      className={linkCls}
                    >
                      {link.label}
                    </button>
                  )
                }
                if (link.phone) {
                  return (
                    <a
                      key={i}
                      href={`tel:${link.phone.replace(/\D/g, '')}`}
                      className="transition-colors duration-200 font-sans text-[12px] tracking-[0.25em] text-white/60 hover:text-white"
                    >
                      {link.phone}
                    </a>
                  )
                }
                return (
                  <Link key={i} href={link.href} className={linkCls}>
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Account — renders nothing until Supabase is configured and the
                session resolves. The header always sits on dark here, so it
                keeps its non-solid (light-on-dark) treatment. */}
            {onListingsPage && (
              <div className="ml-auto mr-5 lg:ml-0">
                <AccountMenu savedSearchesHref={`/${template}/saved-searches`} />
              </div>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="group flex flex-col items-end justify-center gap-[5px] p-1 text-white/50 hover:text-white"
            >
              <span className="block h-[1.5px] w-7 transition-all duration-300 bg-current group-hover:w-5" />
              <span className="block h-[1.5px] w-7 transition-all duration-300 bg-current" />
              <span className="block h-[1.5px] w-7 transition-all duration-300 bg-current group-hover:w-5" />
            </button>

          </div>
        </div>
      </header>

      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        agentName={logo?.text ?? 'Agent Name'}
        links={menuLinks}
        phone={agentPhone}
        email={agentEmail}
        socialLinks={socialLinks}
      />
    </>
  )
}
