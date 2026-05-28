import { Inter, DM_Sans } from 'next/font/google'
import ModernTeamNavbar from '@/components/layout/ModernTeamNavbar'
import ModernTeamFooter from '@/components/layout/ModernTeamFooter'
import ContactModal from '@/components/layout/ModernTeamContactModal'
import GoogleOneTap from '@/components/auth/GoogleOneTap'

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

export const metadata = {
  title: {
    default: 'The Hargrove Group | Houston Real Estate',
    template: '%s | The Hargrove Group',
  },
  description:
    'The Hargrove Group — Houston\'s trusted real estate team. Helping buyers and sellers across Greater Houston, River Oaks, The Heights, Memorial, and The Woodlands.',
  icons: {
    icon: '/images/modern-team/favicon-modern-team.png',
    apple: '/images/modern-team/favicon-modern-team.png',
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
      <ModernTeamNavbar
        logo={{ text: TEAM.name }}
        links={NAV_LINKS}
        menuLinks={MENU_LINKS}
        agentEmail={TEAM.email}
        socialLinks={TEAM.socialLinks}
      />
      <GoogleOneTap clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} />
      <main>{children}</main>
      <ContactModal
        agentName={TEAM.name}
        agentDre={TEAM.license}
        phone={TEAM.phone}
        email={TEAM.email}
        address={TEAM.address}
        socialLinks={TEAM.socialLinks}
      />
      <ModernTeamFooter
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
