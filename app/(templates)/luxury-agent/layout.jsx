import { Playfair_Display, Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
  phone: '(310) 555-0194',
  email: 'victoria@victoriasinclair.com',
  address: '432 N Beverly Drive, Beverly Hills, CA 90210',
  tagline: 'Luxury real estate with unparalleled discretion.',
  socialLinks: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
  },
}

const NAV_LINKS = [
  { label: 'About', href: '/luxury-agent/about' },
  { label: 'Listings', href: '/luxury-agent/listings' },
  { label: 'Neighborhoods', href: '/luxury-agent/neighborhoods' },
  { label: 'Blog', href: '/luxury-agent/blog' },
]

const FOOTER_LINKS = [
  { label: 'Home', href: '/luxury-agent' },
  { label: 'About', href: '/luxury-agent/about' },
  { label: 'Listings', href: '/luxury-agent/listings' },
  { label: 'Neighborhoods', href: '/luxury-agent/neighborhoods' },
  { label: 'Home Valuation', href: '/luxury-agent/home-valuation' },
  { label: 'Contact', href: '/luxury-agent/contact' },
]

export const metadata = {
  title: {
    default: 'Victoria Sinclair | Luxury Real Estate',
    template: '%s | Victoria Sinclair',
  },
  description:
    'Beverly Hills luxury real estate. Extraordinary homes for extraordinary lives. DRE# 01234567.',
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
      <Navbar
        template="luxury-agent"
        logo={{ text: AGENT.name }}
        links={NAV_LINKS}
        cta={{ label: 'Schedule a Showing', href: '/luxury-agent/contact' }}
      />
      <main>{children}</main>
      <Footer
        template="luxury-agent"
        agentName={AGENT.name}
        tagline={AGENT.tagline}
        phone={AGENT.phone}
        email={AGENT.email}
        address={AGENT.address}
        socialLinks={AGENT.socialLinks}
        links={FOOTER_LINKS}
        disclaimer="Victoria Sinclair is a licensed real estate agent in the state of California. DRE# 01234567. All information deemed reliable but not guaranteed. Equal Housing Opportunity."
      />
    </div>
  )
}
