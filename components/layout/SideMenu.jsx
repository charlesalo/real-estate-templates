'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, ChevronDown } from 'lucide-react'

function IconInstagram() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
}
function IconFacebook() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function IconLinkedIn() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}

function NavItem({ link, onClose }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = link.children?.length > 0

  const linkCls = 'font-heading text-2xl font-normal text-white/70 group-hover:text-white transition-colors duration-200'
  const rowCls  = 'group flex items-center justify-between py-3.5 border-b border-white/[0.06]'

  if (link.modal) {
    return (
      <div className={rowCls}>
        <button
          onClick={() => { onClose(); window.dispatchEvent(new CustomEvent('contact:open')) }}
          className={`${linkCls} group`}
        >
          {link.label}
        </button>
        <span className="text-white/20 group-hover:text-[#C9A96E] transition-colors text-sm pointer-events-none">→</span>
      </div>
    )
  }

  if (hasChildren) {
    return (
      <div className="border-b border-white/[0.06]">
        {/* Accordion trigger */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="group w-full flex items-center justify-between py-3.5"
        >
          <span className={linkCls}>{link.label}</span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/30 group-hover:text-[#C9A96E] transition-colors"
          >
            <ChevronDown size={18} strokeWidth={1.5} />
          </motion.span>
        </button>

        {/* Children */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="children"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pl-5 pb-3 flex flex-col gap-0.5">
                {link.children.map(child => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className="group flex items-center justify-between py-2.5"
                  >
                    <span className="font-heading text-lg font-normal text-white/45 group-hover:text-white transition-colors duration-200">
                      {child.label}
                    </span>
                    <span className="text-white/15 group-hover:text-[#C9A96E] transition-colors text-xs">→</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link href={link.href} onClick={onClose} className={`${rowCls} group`}>
      <span className={linkCls}>{link.label}</span>
      <span className="text-white/20 group-hover:text-[#C9A96E] transition-colors text-sm">→</span>
    </Link>
  )
}

export default function SideMenu({ open, onClose, agentName, links = [], phone, email, socialLinks = {} }) {
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
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] flex flex-col bg-[#0D0D0D] border-l border-white/[0.07] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-7 border-b border-white/[0.07] flex-shrink-0">
              <div>
                <div className="font-heading text-lg text-white leading-none">{agentName}</div>
                <div className="text-[9px] tracking-[0.35em] uppercase text-[#C9A96E] font-sans mt-1">Real Estate</div>
              </div>
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-white/30 hover:text-white transition-colors group"
                aria-label="Close menu"
              >
                <span className="text-[9px] tracking-[0.25em] uppercase font-sans group-hover:text-white/60">Close</span>
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-8 py-6">
              {links.map((link, i) => (
                <NavItem key={link.href ?? link.label ?? i} link={link} onClose={onClose} />
              ))}
            </nav>

            {/* Footer */}
            <div className="px-8 py-8 border-t border-white/[0.07] flex-shrink-0 space-y-6">
              <div className="space-y-3">
                {phone && (
                  <a href={`tel:${phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors font-sans">
                    <Phone size={13} className="text-[#C9A96E] flex-shrink-0" />
                    {phone}
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`}
                    className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors font-sans">
                    <Mail size={13} className="text-[#C9A96E] flex-shrink-0" />
                    {email}
                  </a>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {[
                    { key: 'facebook',  href: socialLinks.facebook,  Icon: IconFacebook },
                    { key: 'instagram', href: socialLinks.instagram, Icon: IconInstagram },
                    { key: 'linkedin',  href: socialLinks.linkedin,  Icon: IconLinkedIn },
                  ].filter(s => s.href).map(({ key, href, Icon }) => (
                    <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={key}
                      className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/35 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-200">
                      <Icon />
                    </a>
                  ))}
                </div>
                <p className="text-[10px] text-white/20 font-sans">© {new Date().getFullYear()} {agentName}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
