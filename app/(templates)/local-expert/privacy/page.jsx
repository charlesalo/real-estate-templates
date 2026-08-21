import Link from 'next/link'
import { getAgent, getSiteSettings } from '@/lib/sanity/queries'
import { AGENT as AGENT_FALLBACK } from '@/lib/local-expert-data'

export async function generateMetadata() {
  const settings = await getSiteSettings()
  const name = settings?.businessName ?? AGENT_FALLBACK.brokerage
  return {
    alternates: { canonical: '/local-expert/privacy' },
    title: { absolute: `Privacy Policy | ${name}` },
    description: `How ${name} collects, uses, and protects the information you share through this website.`,
    robots: { index: false, follow: true },
  }
}

const UPDATED = 'August 2026'

// Matches the in-text link treatment used elsewhere in this template:
// near-black by default, terracotta on hover, with a hairline underline so a
// link inside a paragraph is still identifiable without color alone.
const LINK =
  'text-[#24180F] border-b border-[#24180F]/30 pb-px hover:text-[#BA5B3E] hover:border-[#BA5B3E] transition-colors'

function Section({ heading, children }) {
  return (
    <section className="mb-12 last:mb-0">
      <h2
        className="text-[24px] lg:text-[28px] font-normal text-[#24180F] leading-[1.2] mb-4 text-balance"
        style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
      >
        {heading}
      </h2>
      <div className="space-y-4 text-[16px] leading-[1.75] text-[#4A3B2E] text-pretty">
        {children}
      </div>
    </section>
  )
}

export default async function PrivacyPage() {
  const [agentDoc, settings] = await Promise.all([getAgent(), getSiteSettings()])
  const agent = agentDoc ? { ...AGENT_FALLBACK, ...agentDoc } : AGENT_FALLBACK

  const brokerage = settings?.brokerage?.name ?? AGENT_FALLBACK.brokerage
  const email = settings?.email ?? agent.email ?? AGENT_FALLBACK.email
  const phone = settings?.phone ?? agent.phone ?? AGENT_FALLBACK.phone
  const address = settings?.brokerageAddress ?? AGENT_FALLBACK.brokerageAddress

  return (
    <>
      {/* ─── Header ─── */}
      <section className="pt-[112px] pb-[48px] lg:pt-[144px] lg:pb-[64px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] whitespace-nowrap">
              Legal
            </span>
            <div className="h-px flex-1 bg-[#BEB7A9]" />
          </div>

          <h1
            className="text-[43px] lg:text-[58px] font-normal text-[#24180F] leading-[1.05] text-balance"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            Privacy Policy
          </h1>

          <p className="mt-5 text-[14px] text-[#6B5B4C]">
            Last updated {UPDATED}
          </p>
        </div>
      </section>

      {/* ─── Body ─── */}
      <section className="pb-[96px] lg:pb-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="h-px w-full bg-[#E5E0D8] mb-12" />

          <p className="text-[17px] leading-[1.75] text-[#4A3B2E] mb-12 text-pretty">
            {brokerage} respects your privacy. This policy explains what information this
            website collects, why we collect it, and the choices you have. It applies to this
            site only — not to third-party sites we link to.
          </p>

          <Section heading="Information we collect">
            <p>
              <strong className="font-semibold text-[#24180F]">Information you give us.</strong>{' '}
              When you submit a contact form, request a home valuation, schedule a showing, or
              sign up for market reports, we collect the details you enter — typically your name,
              email address, phone number, and any message or property details you choose to include.
            </p>
            <p>
              <strong className="font-semibold text-[#24180F]">Information collected automatically.</strong>{' '}
              Like most websites, this site records basic technical data such as your browser type,
              device, referring page, and the pages you view. If you save searches or favorite
              listings, we store those preferences against your account.
            </p>
          </Section>

          <Section heading="How we use it">
            <p>
              We use your information to respond to your inquiry, send listings and market
              information you have asked for, arrange showings, and meet the record-keeping
              obligations that apply to licensed real estate brokers in New York.
            </p>
            <p>
              We do not sell your personal information, and we do not share it with third parties
              for their own marketing.
            </p>
          </Section>

          <Section heading="Who we share it with">
            <p>
              We share information only with the service providers who help us operate this site
              and our business — for example, our email and CRM providers, listing platforms, and,
              where a transaction is underway, the attorneys, lenders, and title companies involved.
              These providers may use your information only to perform services for us.
            </p>
            <p>
              We may also disclose information where required by law or to protect our legal rights.
            </p>
          </Section>

          <Section heading="Cookies">
            <p>
              This site uses cookies to keep you signed in, remember your saved searches, and
              understand which pages people find useful. You can block or delete cookies in your
              browser settings; some parts of the site may not work correctly if you do.
            </p>
          </Section>

          <Section heading="Your choices">
            <p>
              Every marketing email we send includes an unsubscribe link, and you can opt out of
              text messages by replying STOP. You may also ask us to access, correct, or delete
              the personal information we hold about you — write to the address below and we will
              respond within the timeframe the law requires.
            </p>
          </Section>

          <Section heading="Data security and retention">
            <p>
              We use reasonable safeguards to protect the information we hold, but no method of
              transmission over the internet is completely secure. We keep information for as long
              as needed to serve you and to satisfy the legal and regulatory retention periods that
              apply to real estate transactions.
            </p>
          </Section>

          <Section heading="Children">
            <p>
              This site is intended for adults. We do not knowingly collect personal information
              from anyone under 16.
            </p>
          </Section>

          <Section heading="Changes to this policy">
            <p>
              We may update this policy from time to time. When we do, we will revise the date at
              the top of this page. Continued use of the site after a change means you accept the
              updated policy.
            </p>
          </Section>

          <Section heading="Contact us">
            <p>
              Questions about this policy, or about the information we hold? Get in touch:
            </p>
            <div className="pt-2 space-y-1.5">
              <p className="font-semibold text-[#24180F]">{brokerage}</p>
              <p>{address}</p>
              <p>
                <a href={`mailto:${email}`} className={LINK}>
                  {email}
                </a>
              </p>
              <p>
                <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className={LINK}>
                  {phone}
                </a>
              </p>
            </div>
          </Section>

          <div className="h-px w-full bg-[#E5E0D8] mt-14 mb-8" />

          <p className="text-[13px] leading-relaxed text-[#6B5B4C] text-pretty">
            This page is provided as a starting point and is not legal advice. Have your own
            counsel review it against your brokerage&rsquo;s practices before publishing.{' '}
            <Link href="/local-expert/contact" className={LINK}>
              Contact us
            </Link>{' '}
            with any questions.
          </p>
        </div>
      </section>
    </>
  )
}
