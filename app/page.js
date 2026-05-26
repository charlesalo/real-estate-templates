import Link from 'next/link'
import Image from 'next/image'
import WorkSlider from '@/components/landing/WorkSlider'
import Navbar from '@/components/landing/Navbar'
import CTASection from '@/components/landing/CTASection'

// ─── Data ────────────────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    name: 'Luxury Agent',
    slug: 'luxury-agent',
    badge: 'Solo Agent Template',
    tagline: 'Elevated presence for the luxury market.',
    description:
      'A premium single-agent site designed to attract high-net-worth buyers and sellers. Cinematic hero video, curated listings, and a refined aesthetic that commands attention.',
    features: ['Cinematic Hero Video', 'Curated Listings', 'Property Detail Pages', 'Lead Capture', 'Minimalist Aesthetic'],
    preview: '/images/landing-page/luxury-agent-full-page-preview.png',
    accent: '#2C1810',
  },
  {
    name: 'Modern Team',
    slug: 'modern-team',
    badge: 'Team Template',
    tagline: 'For real estate teams that mean business.',
    description:
      'A full-featured team site with MLS-powered home search, neighborhood guides, blog, home valuation, agent profiles, testimonials, and past transactions. Built for growth.',
    features: ['MLS Home Search', 'Neighborhood Guides', 'Agent Profiles', 'Home Valuation', 'Blog', 'Testimonials'],
    preview: '/images/landing-page/modern-team-full-page-preview.png',
    accent: '#0F1E3E',
  },
]


const ADVANTAGES = [
  {
    icon: '⚡',
    title: 'Faster than WordPress',
    body: 'Built on Next.js — not a theme, not a page builder. Pages load in under a second. Better Core Web Vitals means better SEO and more leads.',
  },
  {
    icon: '✦',
    title: 'Zero bloat, zero lock-in',
    body: 'No plugins fighting each other. No monthly platform fees eating into your margins. You own the code, and it does exactly what it needs to do.',
  },
  {
    icon: '◎',
    title: 'Built for real estate',
    body: 'Live MLS data, lead capture forms, home valuation tools, property search — every feature is designed around how agents and clients actually work.',
  },
]

const STEPS = [
  { num: '01', title: 'Pick a template', body: 'Browse Modern Team or Luxury Agent. Preview the live demo and pick the one that fits your brand.' },
  { num: '02', title: 'We customize it', body: 'Your logo, colors, headshots, bios, and listings. We connect your MLS feed and configure lead routing.' },
  { num: '03', title: 'We launch it', body: 'Your site goes live on your domain — fast, SEO-ready, and built to convert from day one.' },
]

const PRICING = [
  {
    name: 'Template Only',
    price: '$497',
    note: 'One-time',
    description: 'Buy the template and deploy it with your own developer or tech-savvy team member.',
    features: [
      'Full source code ownership',
      'Modern Team or Luxury Agent',
      'MLS-ready architecture',
      'Documentation included',
      'No recurring platform fees',
    ],
    cta: 'Get the Template',
    highlight: false,
  },
  {
    name: 'Template + Setup',
    price: '$1,197',
    note: 'One-time',
    description: 'We handle everything — customization, MLS connection, branding, and launch.',
    features: [
      'Everything in Template Only',
      'Brand customization (logo, colors, copy)',
      'MLS / IDX integration',
      'Lead capture & CRM setup',
      'Domain & deployment',
      '30-day post-launch support',
    ],
    cta: 'Get Started',
    highlight: true,
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#111111] text-[#e2e2e2]" style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/landing-page/background-video.mp4"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#111111]/75" />
        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/50 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Accepting new clients — USA nationwide
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight mb-6 text-white"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Real estate websites<br />
            <em className="not-italic text-[#c4a882]">built to close.</em>
          </h1>

          <p className="text-lg text-white/55 max-w-xl leading-relaxed mb-10">
            Custom-coded sites for agents and teams across the USA — MLS-connected,
            conversion-optimized, and fast enough to actually rank on Google.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#templates"
              className="px-6 py-3 rounded-md bg-[#c4a882] text-[#111111] text-sm font-semibold hover:bg-[#b8976e] transition-colors duration-200 min-w-[180px] text-center"
            >
              Browse Templates
            </a>
            <a
              href="mailto:info@chavbuilds.com"
              className="px-6 py-3 rounded-md border border-white/20 text-sm font-medium text-white/60 hover:text-white hover:border-white/40 transition-colors duration-200 min-w-[180px] text-center"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="border-y border-[#2a2a2a] bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '500+', label: 'Real estate sites built' },
            { value: 'USA', label: 'Agents & teams nationwide' },
            { value: 'MLS', label: 'Live data integration' },
            { value: '100%', label: 'Custom-coded, no themes' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div
                className="text-3xl font-bold text-[#c4a882] mb-1"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                {value}
              </div>
              <div className="text-xs text-[#555555] uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Templates ── */}
      <div id="templates">
        {/* Section header */}
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-0">
          <p className="text-xs text-[#555555] uppercase tracking-widest mb-3">Templates</p>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#e2e2e2]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Pick your starting point
          </h2>
          <p className="mt-3 text-[#8a8a8a] max-w-md">
            Two purpose-built templates. Each ships with every feature your clients expect — ready to customize and launch.
          </p>
        </div>

        {/* One section per template, alternating image/info sides */}
        {TEMPLATES.map((t, i) => (
          <section
            key={t.slug}
            className={i > 0 ? 'border-t border-[#2a2a2a]' : ''}
          >
            <div className={`max-w-7xl mx-auto px-6 py-20 flex flex-col gap-12 items-start ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

              {/* ── Hoverable image ── */}
              <div className="w-full lg:w-1/2 shrink-0">
                <Link href={`/${t.slug}`} className="block">
                  <div className="template-preview-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.preview} alt={`${t.name} template preview`} />
                    <div className="template-preview-overlay">
                      <span className="px-6 py-2.5 rounded-md bg-[#c4a882] text-[#111111] text-sm font-semibold">
                        View Live Template →
                      </span>
                    </div>
                  </div>
                </Link>
                <p className="text-xs text-[#555555] mt-3 text-center">Hover to scroll through the full page</p>
              </div>

              {/* ── Info ── */}
              <div className="w-full lg:w-1/2 lg:max-w-lg">
                <p className="text-xs text-[#555555] uppercase tracking-widest mb-3">{t.badge}</p>
                <h2
                  className="text-4xl sm:text-5xl font-bold text-[#e2e2e2] leading-tight mb-4"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {t.name}
                </h2>
                <p className="text-[#c4a882] font-medium mb-4">{t.tagline}</p>
                <p className="text-[#8a8a8a] leading-relaxed mb-8">{t.description}</p>

                <ul className="space-y-3 mb-10">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[#8a8a8a]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c4a882] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/${t.slug}`}
                    className="px-6 py-3 rounded-md bg-[#c4a882] text-[#111111] text-sm font-semibold hover:bg-[#b8976e] transition-colors duration-200"
                  >
                    View Live Template
                  </Link>
                  <a
                    href="#pricing"
                    className="text-sm text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors"
                  >
                    Starting at $497 →
                  </a>
                </div>
              </div>

            </div>
          </section>
        ))}
      </div>

      {/* ── Why Chavbuilds ── */}
      <section className="border-y border-[#2a2a2a] bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="mb-14">
            <p className="text-xs text-[#555555] uppercase tracking-widest mb-3">Why Chavbuilds</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#e2e2e2]"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Not a theme. Not a plugin. <br className="hidden sm:block" />
              <span className="text-[#c4a882]">Built from scratch.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ADVANTAGES.map(({ icon, title, body }) => (
              <div key={title} className="rounded-xl border border-[#2a2a2a] bg-[#1c1c1c] p-7">
                <div className="text-2xl mb-4 text-[#c4a882]">{icon}</div>
                <h3 className="font-semibold text-[#e2e2e2] mb-3">{title}</h3>
                <p className="text-sm text-[#8a8a8a] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Past Work ── */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-28">
        <div className="mb-10">
          <p className="text-xs text-[#555555] uppercase tracking-widest mb-3">Past Work</p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#e2e2e2]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            500+ websites. Here are a few.
          </h2>
        </div>
        <WorkSlider />
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="border-y border-[#2a2a2a] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-6 py-28">
          <div className="text-center mb-14">
            <p className="text-xs text-[#555555] uppercase tracking-widest mb-3">Pricing</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#e2e2e2]"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Simple, one-time pricing
            </h2>
            <p className="mt-3 text-[#8a8a8a]">No subscriptions. No platform fees. Pay once, own it forever.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRICING.map(({ name, price, note, description, features, cta, highlight }) => (
              <div
                key={name}
                className={`rounded-xl border p-8 flex flex-col ${
                  highlight
                    ? 'border-[#c4a882]/60 bg-[#1c1c1c] relative'
                    : 'border-[#2a2a2a] bg-[#1c1c1c]'
                }`}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#c4a882] text-[#111111]">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-xs text-[#555555] uppercase tracking-widest mb-2">{name}</p>
                  <div className="flex items-end gap-2 mb-3">
                    <span
                      className="text-4xl font-bold text-[#e2e2e2]"
                      style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                      {price}
                    </span>
                    <span className="text-sm text-[#555555] pb-1">{note}</span>
                  </div>
                  <p className="text-sm text-[#8a8a8a]">{description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#8a8a8a]">
                      <span className="text-[#c4a882] mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:charlesalo@chavbuilds.com"
                  className={`block text-center py-3 rounded-md text-sm font-semibold transition-colors duration-200 ${
                    highlight
                      ? 'bg-[#c4a882] text-[#111111] hover:bg-[#b8976e]'
                      : 'border border-[#2a2a2a] text-[#8a8a8a] hover:text-[#e2e2e2] hover:border-[#555555]'
                  }`}
                >
                  {cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#555555] mt-8">
            Need something custom? <a href="mailto:charlesalo@chavbuilds.com" className="text-[#8a8a8a] hover:text-[#c4a882] transition-colors">Email us</a> — all projects are scoped individually.
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-28">
        <div className="mb-14">
          <p className="text-xs text-[#555555] uppercase tracking-widest mb-3">How It Works</p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#e2e2e2]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            From template to live site <br className="hidden sm:block" />
            <span className="text-[#c4a882]">in a matter of days.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-[#2a2a2a] via-[#c4a882]/30 to-[#2a2a2a]" />
          {STEPS.map(({ num, title, body }) => (
            <div key={num} className="relative">
              <div
                className="w-14 h-14 rounded-full border border-[#2a2a2a] bg-[#1c1c1c] flex items-center justify-center mb-5 text-sm font-bold text-[#c4a882]"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                {num}
              </div>
              <h3 className="font-semibold text-[#e2e2e2] mb-2">{title}</h3>
              <p className="text-sm text-[#8a8a8a] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <CTASection />

      {/* ── Footer ── */}
      <footer className="border-t border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div>
              <Image
                src="/images/landing-page/chavbuilds-horizontal.png"
                alt="Chavbuilds"
                width={160}
                height={36}
                className="h-8 w-auto object-contain mb-3"
              />
              <p className="text-xs text-[#555555] max-w-xs leading-relaxed">
                Custom websites and web tools built for people who care about quality, speed, and results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-10 text-sm">
              <div>
                <p className="text-xs text-[#555555] uppercase tracking-widest mb-3">Templates</p>
                <div className="flex flex-col gap-2">
                  <Link href="/modern-team" className="text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors">Modern Team</Link>
                  <Link href="/luxury-agent" className="text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors">Luxury Agent</Link>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#555555] uppercase tracking-widest mb-3">Company</p>
                <div className="flex flex-col gap-2">
                  <a href="#work" className="text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors">Our Work</a>
                  <a href="#pricing" className="text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors">Pricing</a>
                  <a href="mailto:charlesalo@chavbuilds.com" className="text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2a2a2a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#555555]">© {new Date().getFullYear()} Chavbuilds. All rights reserved.</p>
            <p className="text-xs text-[#555555]">Real estate websites for agents &amp; teams across the USA.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
