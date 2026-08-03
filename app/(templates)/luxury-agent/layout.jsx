import { Playfair_Display, Inter } from 'next/font/google'
import Navbar from './_components/layout/Navbar'
import Footer from './_components/layout/Footer'
import ContactModal from './_components/layout/ContactModal'
import ExitIntentPopup from './_components/layout/ExitIntentPopup'
import GoogleOneTap from '@/components/auth/GoogleOneTap'
import AuthProvider from '@/components/auth/AuthProvider'
import AuthModal from '@/components/auth/AuthModal'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Demo agent config — swap with Sanity CMS data per client deployment
const AGENT = {
  name: 'Victoria Sinclair',
  title: 'Luxury Real Estate Specialist',
  dre: 'CA DRE# 01234567',
  phone: '(310) 555-0194',
  email: 'victoria@victoriasinclair.com',
  address: '432 N Beverly Drive, Beverly Hills, CA 90210',
  tagline: 'All information is deemed reliable but not guaranteed and should be independently reviewed and verified.',
  brokerage: {
    name: 'Coldwell Banker Realty',
    dre: 'CA DRE# 00616212',
  },
  managingBroker: 'Jane A. Mitchell',
  socialLinks: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
  },
}

// Links shown inline in the desktop header
const NAV_LINKS = [
  {
    label: 'Properties',
    children: [
      { label: 'Featured Listings', href: '/luxury-agent/featured-listings' },
      { label: 'Past Transactions', href: '/luxury-agent/past-transactions' },
    ],
  },
  { label: 'Home Search', href: '/luxury-agent/listings' },
  { label: 'Neighborhoods', href: '/luxury-agent/neighborhoods' },
  { label: 'Home Valuation', href: '/luxury-agent/home-valuation' },
  { label: "Let's Connect", modal: true },
  { phone: AGENT.phone },
]

// All links shown in the side menu
const MENU_LINKS = [
  { label: 'Home', href: '/luxury-agent' },
  { label: 'About Victoria', href: '/luxury-agent/about' },
  {
    label: 'Properties',
    children: [
      { label: 'Featured Listings', href: '/luxury-agent/featured-listings' },
      { label: 'Past Transactions', href: '/luxury-agent/past-transactions' },
    ],
  },
  { label: 'Home Search', href: '/luxury-agent/listings' },
  { label: 'Home Valuation', href: '/luxury-agent/home-valuation' },
  { label: 'Neighborhoods', href: '/luxury-agent/neighborhoods' },
  { label: 'Testimonials', href: '/luxury-agent/testimonials' },
  { label: 'Luxury Real Estate Journal', href: '/luxury-agent/blog' },
  { label: "Let's Connect", href: '/luxury-agent/contact' },
]

const FOOTER_LINKS = [
  { label: 'Home', href: '/luxury-agent' },
  { label: 'About Victoria', href: '/luxury-agent/about' },
  { label: 'Featured Listings', href: '/luxury-agent/featured-listings' },
  { label: 'Home Search', href: '/luxury-agent/listings' },
  { label: 'Past Transactions', href: '/luxury-agent/past-transactions' },
  { label: 'Neighborhoods', href: '/luxury-agent/neighborhoods' },
  { label: 'Home Valuation', href: '/luxury-agent/home-valuation' },
  { label: "Let's Connect", modal: true },
]

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://re-templates.chavbuilds.com'
const OG_IMAGE  = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Victoria Sinclair | Los Angeles Real Estate Agent',
    template: '%s | Victoria Sinclair',
  },
  description:
    'Beverly Hills and Los Angeles luxury real estate. Victoria Sinclair represents extraordinary homes for extraordinary clients. DRE# 01234567.',
  openGraph: {
    title:       'Victoria Sinclair | Los Angeles Real Estate Agent',
    description: 'Beverly Hills and Los Angeles luxury real estate. Victoria Sinclair represents extraordinary homes for extraordinary clients. DRE# 01234567.',
    url:         `${SITE_URL}/luxury-agent`,
    siteName:    'Victoria Sinclair Real Estate',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Victoria Sinclair — Beverly Hills Luxury Real Estate' }],
    locale:      'en_US',
    type:        'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Victoria Sinclair | Los Angeles Real Estate Agent',
    description: 'Beverly Hills and Los Angeles luxury real estate. Victoria Sinclair represents extraordinary homes for extraordinary clients.',
    images:      [OG_IMAGE],
  },
  icons: {
    icon:  '/images/luxury-agent/Victoria Sinclair Favicon.png',
    apple: '/images/luxury-agent/Victoria Sinclair Favicon.png',
  },
}

export default function LuxuryAgentLayout({ children }) {
  return (
    <div
      className={`luxury-agent ${playfair.variable} ${inter.variable}`}
      style={{
        '--template-font-heading': `var(${playfair.variable}), Georgia, serif`,
        '--template-font-body': `var(${inter.variable}), system-ui, sans-serif`,
        fontFamily: `var(${inter.variable}), system-ui, sans-serif`,
        backgroundColor: '#0A0A0A',
        color: '#FFFFFF',
        minHeight: '100vh',
      }}
    >
      <AuthProvider template="luxury-agent">
        <Navbar
          template="luxury-agent"
          logo={{ text: AGENT.name }}
          links={NAV_LINKS}
          menuLinks={MENU_LINKS}
          cta={{ label: 'Schedule a Showing', href: '/luxury-agent/contact' }}
          agentPhone={AGENT.phone}
          agentEmail={AGENT.email}
          socialLinks={AGENT.socialLinks}
        />
        {/* supabaseAuth: Home Search is behind the registration wall here, so a
            One Tap credential has to become a real session — otherwise the
            visitor signs in with Google and stays gated. */}
        <GoogleOneTap clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} supabaseAuth />
        <main>{children}</main>
        <AuthModal teamName={AGENT.name} template="luxury-agent" />
        {/* Inside the provider so it can hold its fire while the auth modal
            is open — see the `intent` gate in ExitIntentPopup. */}
        <ExitIntentPopup agentName={AGENT.name} />
      </AuthProvider>
      <ContactModal
        agentName={AGENT.name}
        agentDre={AGENT.dre}
        phone={AGENT.phone}
        email={AGENT.email}
        address={AGENT.address}
        socialLinks={AGENT.socialLinks}
      />
      <Footer
        agentName={AGENT.name}
        agentDre={AGENT.dre}
        tagline={AGENT.tagline}
        phone={AGENT.phone}
        email={AGENT.email}
        address={AGENT.address}
        socialLinks={AGENT.socialLinks}
        links={FOOTER_LINKS}
      />
    </div>
  )
}
