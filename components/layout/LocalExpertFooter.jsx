import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const BASE = '/local-expert'

function EqualHousingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="currentColor" aria-label="Equal Housing Opportunity">
      <path d="M20 4L2 16h4v20h28V16h4L20 4zm0 3.5L34 16.5V34H26V24h-12v10H6V16.5L20 7.5z" />
    </svg>
  )
}

export default function LocalExpertFooter({ agent }) {
  const year = new Date().getFullYear()

  const EXPLORE_LINKS = [
    { label: 'West Village', href: `${BASE}/neighborhoods/west-village` },
    { label: 'Tribeca', href: `${BASE}/neighborhoods/tribeca` },
    { label: 'Brooklyn Heights', href: `${BASE}/neighborhoods/brooklyn-heights` },
    { label: 'DUMBO', href: `${BASE}/neighborhoods/dumbo` },
    { label: 'Park Slope', href: `${BASE}/neighborhoods/park-slope` },
    { label: 'Upper East Side', href: `${BASE}/neighborhoods/upper-east-side` },
  ]

  const RESOURCE_LINKS = [
    { label: 'Homes for Sale', href: `${BASE}/listings` },
    { label: 'Market Report', href: `${BASE}/home-valuation` },
    { label: 'Local Favorites', href: `${BASE}/field-notes` },
    { label: 'About Nadia', href: `${BASE}/about` },
    { label: 'Blog', href: `${BASE}/blog` },
    { label: 'Contact', href: `${BASE}/contact` },
  ]

  return (
    <footer style={{ backgroundColor: '#1B3B2B', color: '#F8F3EB' }}>
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-[64px] lg:py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <div
                className="text-2xl font-bold text-[#F8F3EB] leading-none"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                {agent?.firstName ?? 'Nadia'}.
              </div>
              <div className="text-[9px] tracking-[0.35em] text-[#8B9E8B] uppercase mt-1">NY LOCAL</div>
            </div>
            <p className="text-sm text-[#F8F3EB]/50 leading-relaxed mb-6">
              Your guide to living in, working in, and loving New York — curated, walked, and written by a local broker
              who has called Manhattan and Brooklyn home for fourteen years.
            </p>
            <div className="flex items-center gap-2 opacity-60">
              <EqualHousingIcon />
            </div>
          </div>

          {/* Explore neighborhoods */}
          <div>
            <h4
              className="text-[10px] tracking-[0.3em] uppercase text-[#8B9E8B] mb-5 font-medium"
              style={{ fontFamily: 'var(--font-plus-jakarta, system-ui)' }}
            >
              Explore
            </h4>
            <ul className="space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#F8F3EB]/60 hover:text-[#F8F3EB] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="text-[10px] tracking-[0.3em] uppercase text-[#8B9E8B] mb-5 font-medium"
              style={{ fontFamily: 'var(--font-plus-jakarta, system-ui)' }}
            >
              Resources
            </h4>
            <ul className="space-y-2.5">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#F8F3EB]/60 hover:text-[#F8F3EB] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[10px] tracking-[0.3em] uppercase text-[#8B9E8B] mb-5 font-medium"
              style={{ fontFamily: 'var(--font-plus-jakarta, system-ui)' }}
            >
              Get in Touch
            </h4>
            <div className="space-y-3">
              {agent?.phone && (
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center gap-2.5 text-sm text-[#F8F3EB]/60 hover:text-[#F8F3EB] transition-colors"
                >
                  <Phone size={13} className="flex-shrink-0" />
                  {agent.phone}
                </a>
              )}
              {agent?.email && (
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-2.5 text-sm text-[#F8F3EB]/60 hover:text-[#F8F3EB] transition-colors"
                >
                  <Mail size={13} className="flex-shrink-0" />
                  {agent.email}
                </a>
              )}
              {agent?.brokerageAddress && (
                <div className="flex items-start gap-2.5 text-sm text-[#F8F3EB]/40">
                  <MapPin size={13} className="flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{agent.brokerageAddress}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NYS Compliance strip */}
      <div className="border-t border-[#F8F3EB]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-[32px]">
          <div className="space-y-3">
            <p className="text-[11px] text-[#F8F3EB]/35 leading-relaxed">
              {agent?.name ?? 'Nadia Osei'} is a Licensed Associate Real Estate Salesperson ({agent?.license ?? 'NY Lic# 10401315789'}) affiliated with{' '}
              {agent?.brokerage ?? 'Compass Real Estate LLC'} ({agent?.brokerageLicense ?? 'NY Lic# 109802832'}),{' '}
              {agent?.brokerageAddress ?? '90 5th Avenue, New York, NY 10011'}. Compass is a licensed real estate
              broker and abides by Equal Housing Opportunity laws.
            </p>
            <p className="text-[11px] text-[#F8F3EB]/35 leading-relaxed">
              <strong className="font-semibold text-[#F8F3EB]/50">NYS Fair Housing Notice:</strong> We are pledged
              to the letter and spirit of U.S. policy for the achievement of equal housing throughout the nation. We
              encourage and support an affirmative advertising and marketing program in which there are no barriers to
              obtaining housing because of race, color, religion, sex, handicap, familial status, or national origin.
            </p>
            <p className="text-[11px] text-[#F8F3EB]/35 leading-relaxed">
              <strong className="font-semibold text-[#F8F3EB]/50">NYS Department of State Disclosure:</strong>{' '}
              Before working with a real estate broker, you should know that the duties of a broker depend on whom the
              broker represents. New York State requires disclosure of the relationship between agent and buyer/seller.
              All information is deemed reliable but not guaranteed and should be independently verified.
            </p>
            <p className="text-[11px] text-[#F8F3EB]/25 mt-5">
              © {year} {agent?.name ?? 'Nadia Osei'}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
