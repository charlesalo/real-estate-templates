'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

function InstagramIcon({ size = 15 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
}
function FacebookIcon({ size = 15 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function LinkedInIcon({ size = 15 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}

const NEIGHBORHOOD_LINKS = [
  { label: 'The Heights',      href: '/modern-team/neighborhoods/the-heights' },
  { label: 'River Oaks',       href: '/modern-team/neighborhoods/river-oaks' },
  { label: 'Montrose',         href: '/modern-team/neighborhoods/montrose' },
  { label: 'Memorial',         href: '/modern-team/neighborhoods/memorial' },
  { label: 'Sugar Land',       href: '/modern-team/neighborhoods/sugar-land' },
  { label: 'The Woodlands',    href: '/modern-team/neighborhoods/the-woodlands' },
  { label: 'Katy',             href: '/modern-team/neighborhoods/katy' },
  { label: 'Midtown',          href: '/modern-team/neighborhoods/midtown' },
  { label: 'Downtown Houston', href: '/modern-team/neighborhoods/downtown-houston' },
]

const QUICK_LINKS = [
  { label: 'Home',              href: '/modern-team' },
  { label: 'Meet the Team',     href: '/modern-team/about' },
  { label: 'Featured Listings', href: '/modern-team/featured-listings' },
  { label: 'Home Search',       href: '/modern-team/listings' },
  { label: 'Home Valuation',    href: '/modern-team/home-valuation' },
  { label: 'Neighborhoods',     href: '/modern-team/neighborhoods' },
  { label: 'Testimonials',      href: '/modern-team/testimonials' },
  { label: 'Blog',              href: '/modern-team/blog' },
  { label: 'Contact Us',        modal: true },
]

export default function Footer({
  teamName    = 'The Hargrove Group',
  license     = 'TX Lic# 0624531',
  tagline,
  phone,
  email,
  address,
  socialLinks = {},
}) {
  const year = new Date().getFullYear()

  const socials = [
    { key: 'facebook',  href: socialLinks.facebook,  Icon: FacebookIcon },
    { key: 'instagram', href: socialLinks.instagram, Icon: InstagramIcon },
    { key: 'linkedin',  href: socialLinks.linkedin,  Icon: LinkedInIcon },
  ].filter(s => s.href)

  return (
    <footer className="bg-[#0F1E3E] text-white">

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-12 lg:gap-16">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="relative h-14 w-56 mb-3">
              <Image
                src="/images/modern-team/The Hargrove Group Light Logo.png"
                alt={teamName}
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-white/45 text-sm font-sans leading-relaxed mb-7 max-w-[260px]">
              Houston's trusted real estate team — helping buyers and sellers across Greater Houston since 2010.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-7">
              {phone && (
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors font-sans">
                  <Phone size={13} className="text-white/30 flex-shrink-0" />
                  {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors font-sans">
                  <Mail size={13} className="text-white/30 flex-shrink-0" />
                  {email}
                </a>
              )}
              {address && (
                <div className="flex items-start gap-3 text-sm text-white/50 font-sans">
                  <MapPin size={13} className="text-white/30 flex-shrink-0 mt-0.5" />
                  <span className="whitespace-pre-line leading-relaxed">{address}</span>
                </div>
              )}
            </div>

          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.3em] uppercase text-white/35 mb-6 font-sans">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              {QUICK_LINKS.map(link =>
                link.modal ? (
                  <button
                    key={link.label}
                    onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
                    className="text-sm text-white/50 hover:text-white transition-colors font-sans text-left w-fit"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors font-sans w-fit"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Col 3 — Neighborhoods */}
          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.3em] uppercase text-white/35 mb-6 font-sans">
              Neighborhoods
            </h3>
            <nav className="flex flex-col gap-3">
              {NEIGHBORHOOD_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors font-sans w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4 — License info */}
          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.3em] uppercase text-white/35 mb-6 font-sans">
              Licensing
            </h3>
            {/* Broker firm */}
            <div className="space-y-1 mb-5">
              <p className="text-sm text-white/50 font-sans">
                Realty Associates of Texas | <a href="tel:7135550200" className="hover:text-white transition-colors">(713) 555-0200</a>
              </p>
              <p className="text-sm text-white/35 font-sans">Designated Broker: James R. Whitfield</p>
            </div>

            {/* TREC required links */}
            <div className="space-y-2 mb-5">
              <a
                href="https://www.trec.texas.gov/forms/consumer-protection-notice"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/40 hover:text-white transition-colors font-sans leading-snug"
              >
                Texas Real Estate Commission Consumer Protection Notice
              </a>
              <a
                href="https://www.trec.texas.gov/forms/information-about-brokerage-services"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/40 hover:text-white transition-colors font-sans leading-snug"
              >
                Texas Real Estate Commission Information About Brokerage Services
              </a>
              <a
                href="https://d1e1jt2fj4r8r.cloudfront.net/938208c7-113c-4b76-96bb-f65cefa93252/pkR5n4vC6/trec.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/40 hover:text-white transition-colors font-sans"
              >
                TREC Disclaimer
              </a>
            </div>

            <p className="text-xs text-white/30 font-sans leading-relaxed mb-5">
              All information is deemed reliable but not guaranteed and should be independently reviewed and verified. Equal Housing Opportunity.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="/images/Realtor Logo.png"
                alt="Realtor®"
                className="h-8 w-auto"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.3 }}
              />
              <img
                src="/images/Equal Housing Opportunity Logo.png"
                alt="Equal Housing Opportunity"
                className="h-8 w-auto"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.3 }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-[24px] lg:py-[32px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25 font-sans">
            © {year} {teamName}. All rights reserved.
          </p>
          {socials.length > 0 && (
            <div className="flex items-center gap-2">
              {socials.map(({ key, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/35 hover:border-white/40 hover:text-white transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

    </footer>
  )
}
