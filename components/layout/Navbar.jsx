'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar({
  template = 'luxury-agent',
  logo,
  links = [],
  cta,
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isLuxury = template === 'luxury-agent'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? isLuxury
              ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg'
              : 'bg-template-bg/95 backdrop-blur-md shadow-sm border-b border-template-border'
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
                  <div
                    className={cn(
                      'font-semibold tracking-wide transition-colors',
                      isLuxury
                        ? 'font-heading text-xl text-white group-hover:text-template-accent'
                        : 'text-lg text-template-fg group-hover:text-template-accent',
                    )}
                  >
                    {logo?.text ?? 'Agent Name'}
                  </div>
                  {isLuxury && (
                    <div className="text-[9px] tracking-[0.35em] text-template-accent uppercase font-sans mt-0.5">
                      Real Estate
                    </div>
                  )}
                </div>
              )}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors duration-200',
                    isLuxury
                      ? 'text-[11px] tracking-[0.25em] uppercase text-white/70 hover:text-template-accent font-sans'
                      : 'text-sm text-template-fg/70 hover:text-template-fg font-medium',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              {cta && (
                <Link
                  href={cta.href}
                  className={cn(
                    'hidden md:inline-block text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-200',
                    isLuxury
                      ? 'border border-template-accent text-template-accent px-5 py-2.5 hover:bg-template-accent hover:text-[#0A0A0A]'
                      : 'bg-template-accent text-template-accent-fg px-5 py-2.5 rounded-md hover:opacity-90',
                  )}
                >
                  {cta.label}
                </Link>
              )}
              <button
                onClick={() => setOpen(v => !v)}
                className={cn(
                  'md:hidden p-2 transition-colors',
                  isLuxury ? 'text-white hover:text-template-accent' : 'text-template-fg',
                )}
                aria-label="Toggle menu"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className={cn(
                'fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col pt-24 pb-10 px-8 md:hidden',
                isLuxury ? 'bg-[#0A0A0A] border-l border-white/10' : 'bg-template-bg border-l border-template-border',
              )}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className={cn('absolute top-6 right-6', isLuxury ? 'text-white/60 hover:text-white' : 'text-template-fg/60 hover:text-template-fg')}
              >
                <X size={22} />
              </button>

              <nav className="flex flex-col gap-7">
                {links.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'transition-colors duration-200',
                      isLuxury
                        ? 'text-[11px] tracking-[0.3em] uppercase text-white/70 hover:text-template-accent font-sans'
                        : 'text-lg text-template-fg/70 hover:text-template-fg font-medium',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {cta && (
                <Link
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'mt-10 text-center py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-200',
                    isLuxury
                      ? 'border border-template-accent text-template-accent hover:bg-template-accent hover:text-[#0A0A0A]'
                      : 'bg-template-accent text-template-accent-fg rounded-md',
                  )}
                >
                  {cta.label}
                </Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
