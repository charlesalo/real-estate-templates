import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const BASE = '/local-expert'

const EXPLORE_LINKS = [
  { label: 'Neighborhoods', href: `${BASE}/neighborhoods` },
  { label: 'Active Listings', href: `${BASE}/listings` },
  { label: 'Field Notes', href: `${BASE}/field-notes` },
  { label: 'Market Reports', href: `${BASE}/home-valuation` },
  { label: 'Blog', href: `${BASE}/blog` },
]

const WORKING_LINKS = [
  { label: 'Buyer Process', href: `${BASE}/about` },
  { label: 'Seller Process', href: `${BASE}/about` },
  { label: 'Relocation Guide', href: `${BASE}/about` },
  { label: 'Investment Buyers', href: `${BASE}/about` },
  { label: 'Contact', href: `${BASE}/contact` },
]

const NYS_LINKS = [
  { label: 'Standard Operating Procedure', href: 'https://www.dos.ny.gov/licensing/re_salesperson/docs/StandardOperatingProcedures.pdf' },
  { label: 'Fair Housing Notice', href: 'https://www.dos.ny.gov/licensing/docs/FairHousingNotice_new.pdf' },
  { label: 'NYS Housing Discrimination Disclosure', href: 'https://www.dos.ny.gov/licensing/docs/HousingDiscriminationDisclosureNotice.pdf' },
  { label: 'Agency Disclosure Form', href: 'https://www.dos.ny.gov/licensing/docs/AgentDisclosureForm.pdf' },
]

function ColHeading({ children }) {
  return (
    <h4 className="text-[9px] tracking-[0.4em] uppercase text-[#F8F3EB]/45 mb-5 font-medium">
      {children}
    </h4>
  )
}

export default function LocalExpertFooter({ agent }) {
  const year = new Date().getFullYear()
  const name = agent?.name ?? 'Nadia Osei'
  const brokerage = agent?.brokerage ?? 'Nadia Osei Real Estate LLC'
  const address = agent?.brokerageAddress ?? '90 5th Avenue, New York, NY 10011'
  const phone = agent?.phone ?? '(212) 555-0194'
  const email = agent?.email ?? 'nadia@nadiaosei.com'
  const license = agent?.license ?? 'NY Lic# 10401315789'

  return (
    <footer style={{ backgroundColor: '#24180F', color: '#F8F3EB' }}>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-[64px] lg:py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 lg:gap-10">

          {/* Brand */}
          <div>
            <div className="mb-5">
              <div
                className="text-[26px] font-normal text-[#F8F3EB] leading-none"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                {agent?.firstName ?? 'Nadia'}<span className="text-[#BA5B3E]">.</span>
              </div>
              <div className="text-[9px] tracking-[0.35em] text-[#F8F3EB]/40 uppercase mt-1">NY Local</div>
            </div>

            <p className="text-[13px] text-[#F8F3EB]/50 leading-relaxed mb-6 max-w-xs">
              A licensed independent broker covering Manhattan, Brooklyn, and the neighborhoods in between since 2010.
            </p>

            <div className="space-y-1 mb-5">
              <p className="text-[13px] font-medium text-[#F8F3EB]/70">{brokerage}</p>
              <p className="text-[12px] text-[#F8F3EB]/45">{address}</p>
            </div>

            <p className="text-[12px] text-[#F8F3EB]/50">
              <a href={`tel:${phone}`} className="hover:text-[#F8F3EB] transition-colors">{phone}</a>
              <span className="mx-2 text-[#F8F3EB]/25">·</span>
              <a href={`mailto:${email}`} className="hover:text-[#F8F3EB] transition-colors">{email}</a>
            </p>
          </div>

          {/* Explore */}
          <div>
            <ColHeading>Explore</ColHeading>
            <ul className="space-y-3">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-[#F8F3EB]/55 hover:text-[#F8F3EB] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working With Us */}
          <div>
            <ColHeading>Working With Us</ColHeading>
            <ul className="space-y-3">
              {WORKING_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-[#F8F3EB]/55 hover:text-[#F8F3EB] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NYS DOS Disclosures */}
          <div>
            <ColHeading>NYS DOS Disclosures</ColHeading>
            <ul className="space-y-3">
              {NYS_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-1.5 text-[13px] text-[#F8F3EB]/55 hover:text-[#F8F3EB] transition-colors"
                  >
                    <ExternalLink size={11} className="flex-shrink-0 mt-[3px]" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-[#F8F3EB]/30 leading-relaxed mt-5">
              As required by New York State Department of State and REBNY, these notices are provided to every consumer engaging with this firm.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-[#F8F3EB]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[11px] text-[#F8F3EB]/30 leading-relaxed max-w-2xl">
            © {year} {brokerage}. Licensed Real Estate Broker in the State of New York ({license}). All information is deemed reliable but not guaranteed.
          </p>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href={`${BASE}/privacy`} className="text-[11px] text-[#F8F3EB]/35 hover:text-[#F8F3EB]/70 transition-colors">Privacy</Link>
            <span className="text-[#F8F3EB]/20">|</span>
            <Link href={`${BASE}/terms`} className="text-[11px] text-[#F8F3EB]/35 hover:text-[#F8F3EB]/70 transition-colors">Terms</Link>
            <span className="text-[#F8F3EB]/20">|</span>
            <Link href={`${BASE}/accessibility`} className="text-[11px] text-[#F8F3EB]/35 hover:text-[#F8F3EB]/70 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
