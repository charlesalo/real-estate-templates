import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Mail, Phone, MapPin, Clock } from 'lucide-react'

// ── Brand icons (lucide-react no longer ships brand logos) ──────────────────────
function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 320 512" fill="currentColor" aria-hidden="true">
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  )
}
function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}
function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </svg>
  )
}

const BASE = '/local-expert'

const NYS_LINKS = [
  { label: 'Fair Housing Notice', href: 'https://www.dos.ny.gov/licensing/docs/FairHousingNotice_new.pdf' },
  { label: 'Standard Operating Procedure', href: 'https://www.dos.ny.gov/licensing/re_salesperson/docs/StandardOperatingProcedures.pdf' },
]

// Placeholder social links — swap href with real profiles
const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'LinkedIn', href: '#', Icon: LinkedinIcon },
]

export default function Footer({ agent }) {
  const year = new Date().getFullYear()
  const brokerage = agent?.brokerage ?? 'Nadia Osei Real Estate LLC'
  const address = agent?.brokerageAddress ?? '90 5th Avenue, New York, NY 10011'
  const phone = agent?.phone ?? '(212) 555-0194'
  const email = agent?.email ?? 'nadia@nadiaosei.com'

  return (
    <footer style={{ backgroundColor: '#24180F', color: '#F8F3EB' }}>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-[64px] lg:py-[80px]">
        <div>

          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center" style={{ gap: '10px' }}>
              <Image
                src="/images/local-expert/Nadia Logo Light.png"
                alt="Nadia."
                height={28}
                width={99}
                style={{ height: '28px', width: 'auto' }}
              />
              <span className="text-[13px] font-medium tracking-[0.28em] uppercase text-[#F8F3EB]">
                NY LOCAL
              </span>
            </div>

            <p className="text-[14px] text-[#F8F3EB]/50 leading-relaxed mb-6">
              A licensed independent broker covering Manhattan, Brooklyn, and the neighborhoods in between since 2010.
            </p>

            {/* Brokerage + NYS DOS Disclosures */}
            <div className="space-y-1 mb-6">
              <Link href={BASE} className="block text-[14px] font-medium text-[#F8F3EB]/70 hover:text-[#F8F3EB] transition-colors w-fit">
                {brokerage}
              </Link>
              {NYS_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1.5 text-[14px] text-[#F8F3EB]/55 hover:text-[#F8F3EB] transition-colors w-fit"
                >
                  <ExternalLink size={11} className="flex-shrink-0 mt-[4px]" />
                  {l.label}
                </a>
              ))}
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 mb-6">
              {/* Column 1 — Email + Address */}
              <div className="space-y-6">
                <div>
                  <p className="flex items-center gap-1.5 text-[13px] text-[#F8F3EB]/40">
                    <Mail size={13} className="flex-shrink-0 text-[#F8F3EB]/30" />
                    Email
                  </p>
                  <a href={`mailto:${email}`} className="text-[14px] text-[#F8F3EB]/65 hover:text-[#F8F3EB] transition-colors">
                    {email}
                  </a>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[13px] text-[#F8F3EB]/40">
                    <MapPin size={13} className="flex-shrink-0 text-[#F8F3EB]/30" />
                    Address:
                  </p>
                  <p className="text-[14px] text-[#F8F3EB]/65">{address}</p>
                </div>
              </div>

              {/* Column 2 — Phone number + Office hours */}
              <div className="space-y-6">
                <div>
                  <p className="flex items-center gap-1.5 text-[13px] text-[#F8F3EB]/40">
                    <Phone size={13} className="flex-shrink-0 text-[#F8F3EB]/30" />
                    Phone number:
                  </p>
                  <a href={`tel:${phone}`} className="text-[14px] text-[#F8F3EB]/65 hover:text-[#F8F3EB] transition-colors">
                    {phone}
                  </a>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[13px] text-[#F8F3EB]/40">
                    <Clock size={13} className="flex-shrink-0 text-[#F8F3EB]/30" />
                    Office hours:
                  </p>
                  <p className="text-[14px] text-[#F8F3EB]/65">Mon–Fri 9am–6pm · Sat by appointment</p>
                </div>
              </div>
            </div>

            {/* Disclaimers */}
            <p className="text-[12px] text-[#F8F3EB]/40 leading-relaxed mb-4 mt-12">
              All information is deemed reliable but not guaranteed and should be independently reviewed and verified.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/images/Realtor Logo.png"
                alt="REALTOR®"
                width={36}
                height={40}
                className="h-9 w-auto brightness-0 invert opacity-45"
              />
              <Image
                src="/images/Equal Housing Opportunity Logo.png"
                alt="Equal Housing Opportunity"
                width={40}
                height={40}
                className="h-9 w-auto brightness-0 invert opacity-45"
              />
            </div>
            <p className="text-[12px] text-[#F8F3EB]/40 leading-relaxed">
              Listing information for certain New York City properties provided courtesy of the Real Estate Board of New
              York&rsquo;s Residential Listing Service (the &ldquo;RLS&rdquo;). The information contained in this listing
              has not been verified by the RLS and should be verified by the consumer. The listing information provided
              here is for the consumer&rsquo;s personal, non-commercial use. Retransmission, redistribution or copying of
              this listing information is strictly prohibited except in connection with a consumer&rsquo;s consideration
              of the purchase and/or sale of an individual property. This listing information is not verified for
              authenticity or accuracy and is not guaranteed and may not reflect all real estate activity in the market.
              &copy;{year} The Real Estate Board of New York, Inc., all rights reserved.
            </p>

            <div className="flex items-center gap-4 mt-3">
              <div className="bg-white rounded px-2 py-1.5 inline-flex items-center">
                <Image
                  src="/images/RLS at REBNY.png"
                  alt="RLS at REBNY"
                  width={67}
                  height={40}
                  className="h-9 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-[#F8F3EB]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[12px] text-[#F8F3EB]/30 leading-relaxed max-w-2xl text-pretty">
            © {year} {brokerage}.
            <span className="mx-2 text-[#F8F3EB]/20">|</span>
            <Link href={`${BASE}/privacy`} className="text-[#F8F3EB]/35 hover:text-[#F8F3EB]/70 transition-colors">Privacy Policy</Link>
            <span className="mx-2 text-[#F8F3EB]/20">|</span>
            Website designed and developed by{' '}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F8F3EB]/35 hover:text-[#F8F3EB]/70 transition-colors"
            >
              Chavbuilds
            </a>
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F8F3EB] text-[#1B3B2B] hover:bg-white transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
