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
  tagline,
  phone,
  email,
  address,
  socialLinks = {},
  links = [],
  disclaimer,
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

          {/* Brand */}
          <div>
            <div className="mb-5">
              <div
                className={cn(
                  'font-semibold leading-none',
                  isLuxury ? 'font-heading text-2xl text-white' : 'text-xl text-template-fg',
                )}
              >
                {agentName}
              </div>
              {isLuxury && (
                <div className="text-[9px] tracking-[0.35em] text-template-accent uppercase font-sans mt-1.5">
                  Real Estate
                </div>
              )}
            </div>
            {tagline && (
              <p
                className={cn(
                  'text-sm leading-relaxed',
                  isLuxury ? 'text-white/50' : 'text-template-fg/60',
                )}
              >
                {tagline}
              </p>
            )}
            <div className="flex gap-4 mt-6">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={cn(
                    'transition-colors',
                    isLuxury ? 'text-white/30 hover:text-template-accent' : 'text-template-fg/40 hover:text-template-accent',
                  )}
                >
                  <InstagramIcon size={17} />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={cn(
                    'transition-colors',
                    isLuxury ? 'text-white/30 hover:text-template-accent' : 'text-template-fg/40 hover:text-template-accent',
                  )}
                >
                  <FacebookIcon size={17} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={cn(
                    'transition-colors',
                    isLuxury ? 'text-white/30 hover:text-template-accent' : 'text-template-fg/40 hover:text-template-accent',
                  )}
                >
                  <LinkedInIcon size={17} />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className={cn(
                'text-[10px] tracking-[0.3em] uppercase font-medium mb-6',
                'text-template-accent',
              )}
            >
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm transition-colors',
                    isLuxury ? 'text-white/50 hover:text-white' : 'text-template-fg/60 hover:text-template-fg',
                  )}
                >
                  {link.label}
                </Link>
              ))}
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
                  className={cn(
                    'flex items-center gap-3 text-sm transition-colors',
                    isLuxury ? 'text-white/50 hover:text-white' : 'text-template-fg/60 hover:text-template-fg',
                  )}
                >
                  <Phone size={13} className="flex-shrink-0 text-template-accent" />
                  {phone}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className={cn(
                    'flex items-center gap-3 text-sm transition-colors',
                    isLuxury ? 'text-white/50 hover:text-white' : 'text-template-fg/60 hover:text-template-fg',
                  )}
                >
                  <Mail size={13} className="flex-shrink-0 text-template-accent" />
                  {email}
                </a>
              )}
              {address && (
                <div
                  className={cn(
                    'flex items-start gap-3 text-sm',
                    isLuxury ? 'text-white/50' : 'text-template-fg/60',
                  )}
                >
                  <MapPin size={13} className="flex-shrink-0 mt-0.5 text-template-accent" />
                  <span>{address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            'mt-14 pt-8 border-t flex flex-col md:flex-row justify-between gap-3 text-xs',
            isLuxury ? 'border-white/10 text-white/25' : 'border-template-border text-template-fg/40',
          )}
        >
          <p>© {year} {agentName}. All rights reserved.</p>
          {disclaimer && (
            <p className="md:max-w-md md:text-right leading-relaxed">{disclaimer}</p>
          )}
        </div>
      </div>
    </footer>
  )
}
