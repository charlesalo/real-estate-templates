'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, ChevronRight, MapPin } from 'lucide-react'

function InstagramIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
}
function FacebookIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function LinkedInIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}

function MenuItem({ link, onClose, pathname }) {
  const [expanded, setExpanded] = useState(false)
  const isActive = link.href && pathname === link.href

  // Modal trigger (e.g. "Sell Your Home")
  if (link.modal) {
    return (
      <li>
        <button
          onClick={() => { onClose(); window.dispatchEvent(new CustomEvent('contact:open')) }}
          className="w-full flex items-center justify-between py-3.5 border-b border-[#EEF1F7] group"
        >
          <span className="text-base font-semibold text-[#374151] group-hover:text-[#1A2D5A] transition-colors">
            {link.label}
          </span>
          <ChevronRight size={16} className="text-[#CBD5E1] group-hover:text-[#1A2D5A] transition-colors" />
        </button>
      </li>
    )
  }

  // Accordion group
  if (link.children?.length) {
    return (
      <li>
        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full flex items-center justify-between py-3.5 border-b border-[#EEF1F7] group"
        >
          <span className="text-base font-semibold text-[#374151] group-hover:text-[#1A2D5A] transition-colors">
            {link.label}
          </span>
          <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={16} className="text-[#CBD5E1] group-hover:text-[#1A2D5A] transition-colors" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pl-4 pb-2 flex flex-col">
                {link.children.map(child => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className="flex items-center py-2.5 text-sm text-[#6B7280] hover:text-[#1A2D5A] transition-colors border-b border-[#F3F4F6] last:border-0"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    )
  }

  // Standard link
  return (
    <li>
      <Link
        href={link.href}
        onClick={onClose}
        className="flex items-center justify-between py-3.5 border-b border-[#EEF1F7] group"
      >
        <span className={`text-base font-semibold transition-colors ${isActive ? 'text-[#1A2D5A]' : 'text-[#374151] group-hover:text-[#1A2D5A]'}`}>
          {link.label}
        </span>
        <ChevronRight size={16} className={`transition-colors ${isActive ? 'text-[#1A2D5A]' : 'text-[#CBD5E1] group-hover:text-[#1A2D5A]'}`} />
      </Link>
    </li>
  )
}

export default function ModernTeamSideMenu({
  open,
  onClose,
  teamName = 'The Hargrove Group',
  links    = [],
  phone,
  email,
  socialLinks = {},
}) {
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#0F1E3E]/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel — slides from right, clean white/warm off-white */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[400px] flex flex-col bg-[#FAFAF8] shadow-2xl overflow-y-auto"
          >
            {/* ── Panel header ─────────────────────────────────── */}
            <div className="flex items-center justify-between px-7 py-5 bg-[#1A2D5A] flex-shrink-0">
              {/* Brand */}
              <div className="relative h-14 w-52">
                <Image
                  src="/images/modern-team/The Hargrove Group Light Logo.png"
                  alt={teamName}
                  fill
                  className="object-contain object-left"
                />
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors group"
              >
                <span className="text-[10px] font-sans tracking-wide">Close</span>
                <X size={17} strokeWidth={2} />
              </button>
            </div>

            {/* ── Navigation ───────────────────────────────────── */}
            <nav className="flex-1 px-7 pt-6 pb-4">
              <ul className="space-y-0">
                {links.map((link, i) => (
                  <MenuItem
                    key={link.href ?? link.label ?? i}
                    link={link}
                    onClose={onClose}
                    pathname={pathname}
                  />
                ))}
              </ul>
            </nav>

            {/* ── Quick CTA ────────────────────────────────────── */}
            <div className="px-7 pb-6">
              <Link
                href="/modern-team/home-valuation"
                onClick={onClose}
                className="block w-full text-center py-3.5 bg-[#1A2D5A] text-white text-sm font-semibold rounded-xl hover:bg-[#243870] transition-colors mb-3"
              >
                Free Home Valuation
              </Link>
              <Link
                href="/modern-team/listings"
                onClick={onClose}
                className="block w-full text-center py-3.5 border-2 border-[#D5DBE9] text-[#374151] text-sm font-semibold rounded-xl hover:border-[#1A2D5A] hover:text-[#1A2D5A] transition-all"
              >
                Search Houston Homes
              </Link>
            </div>

            {/* ── Contact & social ─────────────────────────────── */}
            <div className="px-7 py-6 border-t border-[#E5E7EB] flex-shrink-0">
              <div className="space-y-3 mb-5">
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-3 text-sm text-[#6B7280] hover:text-[#1A2D5A] transition-colors font-sans"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#EEF1F7] flex items-center justify-center flex-shrink-0">
                      <Phone size={12} className="text-[#1A2D5A]" />
                    </div>
                    {phone}
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-sm text-[#6B7280] hover:text-[#1A2D5A] transition-colors font-sans"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#EEF1F7] flex items-center justify-center flex-shrink-0">
                      <Mail size={12} className="text-[#1A2D5A]" />
                    </div>
                    {email}
                  </a>
                )}
                <div className="flex items-start gap-3 text-sm text-[#6B7280] font-sans">
                  <div className="w-7 h-7 rounded-lg bg-[#EEF1F7] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={12} className="text-[#1A2D5A]" />
                  </div>
                  <span>1700 Post Oak Blvd, Suite 600<br />Houston, TX 77056</span>
                </div>
              </div>

              {/* Social icons + copyright */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {[
                    { key: 'facebook',  href: socialLinks.facebook,  Icon: FacebookIcon },
                    { key: 'instagram', href: socialLinks.instagram, Icon: InstagramIcon },
                    { key: 'linkedin',  href: socialLinks.linkedin,  Icon: LinkedInIcon },
                  ].filter(s => s.href).map(({ key, href, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="w-8 h-8 rounded-full border border-[#D5DBE9] flex items-center justify-center text-[#9CA3AF] hover:border-[#1A2D5A] hover:text-[#1A2D5A] transition-all duration-200"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
                <p className="text-[10px] text-[#9CA3AF] font-sans">
                  © {new Date().getFullYear()} {teamName}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
