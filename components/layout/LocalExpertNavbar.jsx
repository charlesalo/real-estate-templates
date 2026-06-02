'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const BASE = '/local-expert'

export default function LocalExpertNavbar({ agentName, phone, onContactOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const forceSolid = pathname !== BASE && pathname !== `${BASE}/`
  const solid = scrolled || forceSolid

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textCls = solid ? 'text-[#1B3B2B]' : 'text-[#1B3B2B]'
  const mutedCls = solid ? 'text-[#1B3B2B]/60 hover:text-[#1B3B2B]' : 'text-[#1B3B2B]/70 hover:text-[#1B3B2B]'

  const NAV_LINKS = [
    { label: 'Neighborhoods', href: `${BASE}/neighborhoods` },
    { label: 'Local Favorites', href: `${BASE}/field-notes` },
    { label: 'Homes', href: `${BASE}/listings` },
    { label: 'Market Report', href: `${BASE}/home-valuation` },
    { label: 'About', href: `${BASE}/about` },
  ]

  const MENU_LINKS = [
    { label: 'Home', href: BASE },
    { label: 'Neighborhoods', href: `${BASE}/neighborhoods` },
    { label: 'Local Favorites', href: `${BASE}/field-notes` },
    { label: 'Homes for Sale', href: `${BASE}/listings` },
    { label: 'Market Report', href: `${BASE}/home-valuation` },
    { label: 'About Nadia', href: `${BASE}/about` },
    { label: 'Blog', href: `${BASE}/blog` },
    { label: 'Contact', href: `${BASE}/contact` },
  ]

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          solid
            ? 'bg-[#F8F3EB]/95 backdrop-blur-sm border-b border-[#1B3B2B]/10'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* Logo */}
            <Link href={BASE} className="flex-shrink-0">
              <div className="flex items-center" style={{ gap: '10px' }}>
                <Image
                  src="/images/local-expert/Nadia Logo.png"
                  alt="Nadia."
                  height={28}
                  width={99}
                  style={{ height: '28px', width: 'auto' }}
                  priority
                />
                <span
                  className="inline-block lg:hidden min-[1200px]:inline-block text-[12px] font-medium tracking-[0.28em] uppercase"
                  style={{ color: '#24180F' }}
                >
                  NY LOCAL
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-[12px] tracking-wide transition-colors duration-200',
                    pathname.startsWith(link.href) && link.href !== BASE
                      ? 'text-[#1B3B2B] font-semibold'
                      : mutedCls,
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className={cn('hidden xl:flex items-center gap-1.5 text-[12px] transition-colors', mutedCls)}
                >
                  <Phone size={11} strokeWidth={2} />
                  {phone}
                </a>
              )}

              <button
                onClick={onContactOpen}
                className="hidden lg:block text-[12px] font-semibold px-4 py-2 rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors duration-200"
              >
                Talk to Nadia
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                className={cn('lg:hidden p-1 transition-colors', textCls)}
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile slide menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 z-[60] lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-[#F8F3EB] z-[70] flex flex-col shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#1B3B2B]/10">
                <div className="flex items-center" style={{ gap: '10px' }}>
                  <Image
                    src="/images/local-expert/Nadia Logo.png"
                    alt="Nadia."
                    height={28}
                    width={99}
                    style={{ height: '28px', width: 'auto' }}
                  />
                  <span
                    className="text-[12px] font-medium tracking-[0.28em] uppercase"
                    style={{ color: '#24180F' }}
                  >
                    NY LOCAL
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-[#1B3B2B]/60 hover:text-[#1B3B2B] transition-colors"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <div className="flex flex-col gap-1">
                  {MENU_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-3 border-b border-[#1B3B2B]/8 text-[15px] text-[#1B3B2B] hover:text-[#1B3B2B]/60 transition-colors"
                      style={{ fontFamily: 'var(--font-plus-jakarta, system-ui)' }}
                    >
                      {link.label}
                      <ChevronRight size={14} className="opacity-30" />
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="px-6 pb-8 pt-4 border-t border-[#1B3B2B]/10">
                <button
                  onClick={() => { setMenuOpen(false); onContactOpen?.() }}
                  className="w-full py-3.5 text-[13px] font-semibold bg-[#1B3B2B] text-[#F8F3EB] rounded-full hover:bg-[#2a5540] transition-colors"
                >
                  Talk to Nadia
                </button>
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-2 mt-3 text-[12px] text-[#1B3B2B]/50"
                  >
                    <Phone size={11} /> {phone}
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
