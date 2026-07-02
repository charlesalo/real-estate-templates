import { Plus_Jakarta_Sans, Gelasio } from 'next/font/google'
import LocalExpertShell from './LocalExpertShell'
import { getAgent, getSiteSettings } from '@/lib/sanity/queries'
import { AGENT as AGENT_FALLBACK } from '@/lib/local-expert-data'
import './page-transition.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const gelasio = Gelasio({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-gelasio',
  display: 'swap',
})

// Combines the `agent` (personal profile) and `siteSettings` (business/legal
// identity) Sanity documents into the single `agent` shape LocalExpertShell
// and its children already expect, falling back to the demo data file when
// Sanity hasn't been populated for this deployment yet.
async function getResolvedAgent() {
  const [agentDoc, settings] = await Promise.all([getAgent(), getSiteSettings()])
  if (!agentDoc && !settings) return AGENT_FALLBACK

  return {
    ...AGENT_FALLBACK,
    ...agentDoc,
    phone: settings?.phone ?? agentDoc?.phone ?? AGENT_FALLBACK.phone,
    email: settings?.email ?? agentDoc?.email ?? AGENT_FALLBACK.email,
    brokerage: settings?.brokerage?.name ?? AGENT_FALLBACK.brokerage,
    brokerageLicense: settings?.brokerage?.license ?? AGENT_FALLBACK.brokerageLicense,
    brokerageAddress: settings?.brokerageAddress ?? AGENT_FALLBACK.brokerageAddress,
  }
}

export async function generateMetadata() {
  const settings = await getSiteSettings()
  const name = settings?.businessName ?? AGENT_FALLBACK.name
  const title = settings?.seo?.metaTitle ?? `${name} | Your Manhattan & Brooklyn Real Estate Expert`
  const description =
    settings?.seo?.metaDescription ??
    `Discover Manhattan and Brooklyn real estate with ${name}. Expert guidance on neighborhoods, market trends, and finding your perfect New York home.`

  return {
    title: { default: title, template: `%s | ${name}` },
    description,
    alternates: { canonical: '/local-expert' },
    icons: {
      icon: '/images/local-expert/nadia-favicon.png',
      apple: '/images/local-expert/nadia-favicon.png',
    },
    openGraph: {
      title,
      description,
      url: '/local-expert',
      siteName: `${name} Real Estate`,
      images: ['/images/landing-page/local-expert-full-page-preview.png'],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/landing-page/local-expert-full-page-preview.png'],
    },
  }
}

export default async function LocalExpertLayout({ children }) {
  const agent = await getResolvedAgent()
  const settings = await getSiteSettings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: agent.name,
    description: settings?.seo?.metaDescription ?? agent.tagline,
    telephone: agent.phone,
    email: agent.email,
    url: 'https://re-templates.chavbuilds.com/local-expert',
    image: 'https://re-templates.chavbuilds.com/images/landing-page/local-expert-full-page-preview.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: agent.brokerageAddress,
    },
    areaServed: agent.areas,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        className={`local-expert ${plusJakarta.variable} ${gelasio.variable}`}
      style={{
        '--font-heading': `var(${gelasio.variable}), Georgia, serif`,
        '--font-body': `var(${plusJakarta.variable}), system-ui, sans-serif`,
        '--le-bg': '#F8F3EB',
        '--le-fg': '#2C1E11',
        '--le-accent': '#8B9E8B',
        '--le-accent-warm': '#C4A882',
        '--le-border': '#E5E0D8',
        '--le-muted': '#6B7E65',
        '--le-dark': '#1B3B2B',
        fontFamily: `var(${plusJakarta.variable}), system-ui, sans-serif`,
        backgroundColor: '#F8F3EB',
        color: '#2C1E11',
        minHeight: '100vh',
      }}
    >
      <LocalExpertShell agent={agent}>
        {children}
      </LocalExpertShell>
      </div>
    </>
  )
}
