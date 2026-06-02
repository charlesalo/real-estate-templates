'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

function InstagramIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedInIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Footer({
  template = 'luxury-agent',
  agentName,
  agentDre,
  tagline,
  phone,
  email,
  address,
  socialLinks = {},
  links = [],
}) {
  const isLuxury = template === 'luxury-agent'
  const year = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'border-t',
        isLuxury
          ? 'bg-[#0D0D0D] border-white/10 text-white'
          : 'bg-template-bg border-template-border text-template-fg',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-[64px] lg:py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

          {/* Brand */}
          <div>
            <div className="mb-5">
              <div className={cn('font-semibold leading-none', isLuxury ? 'font-heading text-2xl text-white' : 'text-xl text-template-fg')}>
                {agentName}
              </div>
              {isLuxury && (
                <div className="text-[9px] tracking-[0.35em] text-template-accent uppercase font-sans mt-1.5">
                  Real Estate
                </div>
              )}
            </div>
            {tagline && (
              <p className={cn('text-xs leading-relaxed', isLuxury ? 'text-white/40' : 'text-template-fg/50')}>
                {tagline}
              </p>
            )}
            {/* Compliance logos */}
            <div className="flex items-center gap-4 mt-5">
              <img
                src="/images/Realtor Logo.png"
                alt="Realtor®"
                className="h-9 w-auto"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.45 }}
              />
              <img
                src="/images/Equal Housing Opportunity Logo.png"
                alt="Equal Housing Opportunity"
                className="h-9 w-auto"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.45 }}
              />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className={cn('text-[10px] tracking-[0.3em] uppercase font-medium mb-6', 'text-template-accent')}>
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              {links.map(link => {
                const cls = cn(
                  'text-sm transition-colors text-left',
                  isLuxury ? 'text-white/50 hover:text-white' : 'text-template-fg/60 hover:text-template-fg',
                )
                return link.modal ? (
                  <button
                    key={link.label}
                    onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
                    className={cls}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link key={link.href} href={link.href} className={cls}>
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] tracking-[0.3em] uppercase font-medium mb-6 text-template-accent">
              Contact
            </h3>
            <div className="flex flex-col gap-4">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\D/g, '')}`}
                  className={cn('flex items-center gap-3 text-sm transition-colors', isLuxury ? 'text-white/50 hover:text-white' : 'text-template-fg/60 hover:text-template-fg')}
                >
                  <Phone size={13} className="flex-shrink-0 text-template-accent" />
                  {phone}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className={cn('flex items-center gap-3 text-sm transition-colors', isLuxury ? 'text-white/50 hover:text-white' : 'text-template-fg/60 hover:text-template-fg')}
                >
                  <Mail size={13} className="flex-shrink-0 text-template-accent" />
                  {email}
                </a>
              )}
              {address && (
                <div className={cn('flex items-start gap-3 text-sm', isLuxury ? 'text-white/50' : 'text-template-fg/60')}>
                  <MapPin size={13} className="flex-shrink-0 mt-0.5 text-template-accent" />
                  <span>{address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={cn('mt-14 pt-8 border-t flex items-center justify-between gap-6 text-xs', isLuxury ? 'border-white/10 text-white/45' : 'border-template-border text-template-fg/50')}>
          <p>© {year} {agentName}{agentDre ? ` | ${agentDre}` : ''}. All rights reserved.</p>
          <div className="flex gap-2 flex-shrink-0">
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
                className={cn(
                  'w-8 h-8 border flex items-center justify-center transition-all duration-200',
                  isLuxury
                    ? 'border-white/20 text-white/35 hover:border-[#C9A96E] hover:text-[#C9A96E]'
                    : 'border-template-border text-template-fg/40 hover:border-template-accent hover:text-template-accent',
                )}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
