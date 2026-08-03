import { Inter, DM_Sans } from 'next/font/google'
import Navbar from './_components/layout/Navbar'
import Footer from './_components/layout/Footer'
import ContactModal from './_components/layout/ContactModal'
import ExitIntentPopup from './_components/layout/ExitIntentPopup'
import GoogleOneTap from '@/components/auth/GoogleOneTap'
import AuthProvider from '@/components/auth/AuthProvider'
import AuthModal from '@/components/auth/AuthModal'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// Demo team config — swap with Sanity CMS data per client deployment
export const TEAM = {
  name: 'The Hargrove Group',
  tagline: 'Houston\'s Trusted Real Estate Team',
  brokerage: 'Compass Real Estate',
  license: 'TX Lic# 0624531',
  phone: '(713) 555-0182',
  email: 'hello@hargrovegroup.com',
  address: '1700 Post Oak Blvd Ste 600\nHouston, TX 77056',
  disclaimer:
    'All information is deemed reliable but not guaranteed and should be independently reviewed and verified. Equal Housing Opportunity.',
  socialLinks: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
  },
}

const NAV_LINKS = [
  {
    label: 'Properties',
    children: [
      { label: 'Featured Listings', href: '/modern-team/featured-listings' },
      { label: 'Past Transactions', href: '/modern-team/past-transactions' },
    ],
  },
  { label: 'Neighborhoods', href: '/modern-team/neighborhoods' },
  { label: 'Home Search', href: '/modern-team/listings' },
  { label: 'Home Valuation', href: '/modern-team/home-valuation' },
  { label: 'Testimonials', href: '/modern-team/testimonials' },
  { label: 'Contact Us', modal: true },
]

const MENU_LINKS = [
  { label: 'Home', href: '/modern-team' },
  { label: 'Meet the Team', href: '/modern-team/about' },
  {
    label: 'Properties',
    children: [
      { label: 'Featured Listings', href: '/modern-team/featured-listings' },
      { label: 'Past Transactions', href: '/modern-team/past-transactions' },
    ],
  },
  { label: 'Home Search', href: '/modern-team/listings' },
  { label: 'Home Valuation', href: '/modern-team/home-valuation' },
  { label: 'Neighborhoods', href: '/modern-team/neighborhoods' },
  { label: 'Testimonials', href: '/modern-team/testimonials' },
  { label: 'Houston Market Blog', href: '/modern-team/blog' },
  { label: 'Contact Us', href: '/modern-team/contact' },
]

const MODERN_TEAM_TITLE = 'The Hargrove Group | Top Houston Real Estate Agents'
const MODERN_TEAM_DESCRIPTION =
  'The Hargrove Group — Houston\'s trusted real estate team, helping buyers & sellers in River Oaks, The Heights, Memorial & The Woodlands.'

export const metadata = {
  title: {
    default: MODERN_TEAM_TITLE,
    template: '%s | The Hargrove Group',
  },
  description: MODERN_TEAM_DESCRIPTION,
  // No `alternates.canonical` here: metadata fields set on a layout are
  // inherited by every descendant page that doesn't override them, so a
  // canonical declared at this level made all ~44 modern-team URLs point at
  // /modern-team and told Google they were duplicates. Each page declares its
  // own self-referencing canonical instead.
  icons: {
    icon: '/images/modern-team/favicon-modern-team.png',
    apple: '/images/modern-team/favicon-modern-team.png',
  },
  openGraph: {
    title: MODERN_TEAM_TITLE,
    description: MODERN_TEAM_DESCRIPTION,
    url: '/modern-team',
    siteName: TEAM.name,
    images: ['/images/landing-page/modern-team-full-page-preview.png'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: MODERN_TEAM_TITLE,
    description: MODERN_TEAM_DESCRIPTION,
    images: ['/images/landing-page/modern-team-full-page-preview.png'],
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: TEAM.name,
  description: MODERN_TEAM_DESCRIPTION,
  telephone: TEAM.phone,
  email: TEAM.email,
  url: 'https://re-templates.chavbuilds.com/modern-team',
  image: 'https://re-templates.chavbuilds.com/images/landing-page/modern-team-full-page-preview.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1700 Post Oak Blvd Ste 600',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77056',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'City',
    name: 'Houston',
  },
}

export default function ModernTeamLayout({ children }) {
  return (
    <div
      className={`modern-team ${inter.variable} ${dmSans.variable}`}
      style={{
        '--template-font-heading': `var(${inter.variable}), system-ui, sans-serif`,
        '--template-font-body': `var(${dmSans.variable}), system-ui, sans-serif`,
        fontFamily: `var(${dmSans.variable}), system-ui, sans-serif`,
        backgroundColor: '#FAFAF8',
        color: '#111827',
        minHeight: '100vh',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <AuthProvider template="modern-team">
        <Navbar
          logo={{ text: TEAM.name }}
          links={NAV_LINKS}
          menuLinks={MENU_LINKS}
          agentEmail={TEAM.email}
          socialLinks={TEAM.socialLinks}
        />
        {/* supabaseAuth: this template is behind the registration wall, so the
            One Tap credential has to become a real session — otherwise the
            visitor signs in with Google and stays gated. */}
        <GoogleOneTap clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} supabaseAuth />
        <main>{children}</main>
        <AuthModal teamName={TEAM.name} template="modern-team" />
        {/* Inside the provider so it can hold its fire while the auth modal
            is open — see the `intent` gate in ExitIntentPopup. */}
        <ExitIntentPopup teamName={TEAM.name} />
      </AuthProvider>
      <ContactModal
        agentName={TEAM.name}
        agentDre={TEAM.license}
        phone={TEAM.phone}
        email={TEAM.email}
        address={TEAM.address}
        socialLinks={TEAM.socialLinks}
      />
      <Footer
        teamName={TEAM.name}
        license={TEAM.license}
        brokerage={TEAM.brokerage}
        tagline={TEAM.disclaimer}
        phone={TEAM.phone}
        email={TEAM.email}
        address={TEAM.address}
        socialLinks={TEAM.socialLinks}
      />
    </div>
  )
}
