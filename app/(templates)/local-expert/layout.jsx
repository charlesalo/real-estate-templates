import { Plus_Jakarta_Sans, Gelasio } from 'next/font/google'
import LocalExpertShell from './LocalExpertShell'
import { AGENT } from '@/lib/local-expert-data'
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

const NADIA_TITLE = 'Nadia Osei | Your Manhattan & Brooklyn Real Estate Expert'
const NADIA_DESCRIPTION =
  'Discover Manhattan and Brooklyn real estate with Nadia Osei. Expert guidance on neighborhoods, market trends, and finding your perfect New York home.'

export const metadata = {
  title: {
    default: NADIA_TITLE,
    template: '%s | Nadia Osei',
  },
  description: NADIA_DESCRIPTION,
  alternates: {
    canonical: '/local-expert',
  },
  icons: {
    icon: '/images/local-expert/nadia-favicon.png',
    apple: '/images/local-expert/nadia-favicon.png',
  },
  openGraph: {
    title: NADIA_TITLE,
    description: NADIA_DESCRIPTION,
    url: '/local-expert',
    siteName: 'Nadia Osei Real Estate',
    images: ['/images/landing-page/local-expert-full-page-preview.png'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: NADIA_TITLE,
    description: NADIA_DESCRIPTION,
    images: ['/images/landing-page/local-expert-full-page-preview.png'],
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Nadia Osei',
  description: NADIA_DESCRIPTION,
  telephone: '(212) 555-0194',
  email: 'nadia@nadiaosei.com',
  url: 'https://re-templates.chavbuilds.com/local-expert',
  image: 'https://re-templates.chavbuilds.com/images/landing-page/local-expert-full-page-preview.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '90 5th Avenue',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10011',
    addressCountry: 'US',
  },
  areaServed: ['Manhattan', 'Brooklyn'],
}

export default function LocalExpertLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
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
      <LocalExpertShell agent={AGENT}>
        {children}
      </LocalExpertShell>
      </div>
    </>
  )
}
