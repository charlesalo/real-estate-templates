import { Plus_Jakarta_Sans, Gelasio } from 'next/font/google'
import LocalExpertShell from './LocalExpertShell'
import { AGENT } from '@/lib/local-expert-data'

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

export const metadata = {
  title: {
    default: 'Nadia Osei | New York Real Estate',
    template: '%s | Nadia Osei',
  },
  description:
    'Your guide to living in, working in, and loving New York — curated by Nadia Osei, Licensed Associate RE Salesperson with Compass Real Estate.',
}

export default function LocalExpertLayout({ children }) {
  return (
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
  )
}
