import Link from 'next/link'
import Image from 'next/image'

const TEMPLATES = [
  {
    name: 'Modern Team',
    slug: 'modern-team',
    tagline: 'For Houston real estate teams that mean business.',
    description:
      'A full-featured team site with MLS-powered home search, neighborhood guides, blog, home valuation, agent profiles, testimonials, and past transactions. Built for growth.',
    accent: '#0F1E3E',
    badge: 'Team Template',
    features: ['MLS Home Search', 'Neighborhood Guides', 'Agent Profiles', 'Home Valuation', 'Blog', 'Testimonials'],
    preview: '/images/modern-team/team-preview.jpg',
  },
  {
    name: 'Luxury Agent',
    slug: 'luxury-agent',
    tagline: 'Elevated presence for the luxury market.',
    description:
      'A premium single-agent site designed to attract high-net-worth buyers and sellers. Cinematic hero video, curated listings, and a refined aesthetic that commands attention.',
    accent: '#1C1C1C',
    badge: 'Solo Agent Template',
    features: ['Cinematic Hero Video', 'Curated Listings', 'Property Detail Pages', 'Lead Capture', 'Minimalist Aesthetic'],
    preview: '/images/luxury-agent/luxury-preview.jpg',
  },
]

export const metadata = {
  title: 'Chavbuilds — Real Estate Website Templates',
  description:
    'Professional real estate website templates built for Houston agents and teams. MLS-connected, conversion-optimized, and ready to deploy.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Nav */}
      <header className="border-b border-white/10 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight text-white">
            chavbuilds<span className="text-[#4B6090]">.</span>
          </span>
          <a
            href="mailto:hello@chavbuilds.com"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            hello@chavbuilds.com
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/50 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Templates live — Houston, TX
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6 max-w-3xl">
          Real estate websites{' '}
          <span className="text-white/30">built for agents who close.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-xl leading-relaxed mb-10">
          Professionally designed templates with live MLS data, lead capture, and everything
          your clients expect — ready to deploy under your brand.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#templates"
            className="px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Browse Templates
          </a>
          <a
            href="mailto:hello@chavbuilds.com"
            className="px-6 py-3 rounded-lg border border-white/20 text-sm font-medium text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="max-w-6xl mx-auto px-6 pb-32">
        <div className="border-t border-white/10 pt-16 mb-12">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Templates</p>
          <h2 className="text-2xl font-semibold">Pick your starting point</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {TEMPLATES.map((t) => (
            <div
              key={t.slug}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-white/25 transition-all duration-300"
            >
              {/* Color accent bar */}
              <div className="h-1 w-full" style={{ backgroundColor: t.accent }} />

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-white/15 text-white/50">
                    {t.badge}
                  </span>
                  <Link
                    href={`/${t.slug}`}
                    className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1"
                  >
                    Preview
                    <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                  </Link>
                </div>

                <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
                <p className="text-sm text-white/40 mb-4 font-medium">{t.tagline}</p>
                <p className="text-sm text-white/55 leading-relaxed mb-8">{t.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {t.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-white/45 border border-white/8"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/${t.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200"
                  style={{ backgroundColor: t.accent }}
                >
                  View Template
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-white/25">
            © {new Date().getFullYear()} Chavbuilds. All rights reserved.
          </span>
          <span className="text-sm text-white/25">
            Built for Houston real estate professionals.
          </span>
        </div>
      </footer>
    </div>
  )
}
