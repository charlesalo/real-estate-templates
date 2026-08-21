import Link from 'next/link'
import Image from 'next/image'
import WorkSlider from '@/components/landing/WorkSlider'
import Navbar from '@/components/landing/Navbar'
import CTASection from '@/components/landing/CTASection'
import OpenContactButton from '@/components/landing/OpenContactButton'
import HowItWorksSteps from '@/components/landing/HowItWorksSteps'
import GoogleOneTap from '@/components/auth/GoogleOneTap'

// Title and description come from the root layout. The canonical belongs here
// rather than in that layout, because a canonical set on a layout is inherited
// by every descendant page.
export const metadata = {
  alternates: { canonical: '/' },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    name: 'Luxury Agent',
    slug: 'luxury-agent',
    badge: 'Solo Agent Template',
    tagline: 'Elevated presence for the luxury market.',
    description:
      'A premium single-agent site built for top producers in high-end markets. Rooted in a fashion-house aesthetic, every design decision communicates exclusivity, discretion, and authority — with parallax motion and a cinematic video hero to match. Features a custom neighborhood showcase, filterable closed-deal portfolio, multi-step home valuation tool, exit-intent lead capture, and a contact modal accessible from every page.',
    features: ['Cinematic Hero Video', 'MLS Home Search', 'Home Valuation Widget', 'Exit Intent Lead Capture', 'Editorial Blog / Journal', '10-Page Build'],
    preview: '/images/landing-page/luxury-agent-full-page-preview.webp',
    accent: '#2C1810',
  },
  {
    name: 'Modern Team',
    slug: 'modern-team',
    badge: 'Team Template',
    tagline: 'For real estate teams that mean business.',
    description:
      'A full-featured team site built for husband-wife duos, agent groups, and boutique teams of 2–6. Where the Luxury Agent template whispers exclusivity, this one projects warmth, credibility, and local authority. Features a search-focused video hero, individual agent profiles, filterable sold portfolio, neighborhood guides, testimonials slider, exit-intent lead capture, and a contact modal accessible from every page.',
    features: ['MLS Home Search', 'Neighborhood Guides', 'Agent Profiles', 'Home Valuation', 'Blog', 'Testimonials'],
    preview: '/images/landing-page/modern-team-full-page-preview.webp',
    accent: '#0F1E3E',
  },
  {
    name: 'Local Expert',
    slug: 'local-expert',
    badge: 'Solo Agent Template',
    tagline: 'For the agent who owns the neighborhood.',
    description:
      'An editorial-style site built for agents whose biggest competitive edge is deep local knowledge. Inspired by city guides and print journalism, this template positions you as the definitive authority on your market — with neighborhood maps, field notes, curated listings, and a blog that actually gets read. Less property search portal, more trusted local voice.',
    features: ['Editorial Neighborhood Guides', 'MLS Home Search', 'Field Notes / Blog', 'Home Valuation Widget', 'Market Reports', '10-Page Build'],
    preview: '/images/landing-page/local-expert-full-page-preview.webp',
    accent: '#1B3B2B',
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


const PRICING = [
  {
    name: 'Starter',
    price: '$1,500',
    monthly: '$200/mo',
    note: 'Setup fee',
    description: 'A professional custom site for solo agents — fast to launch, built to convert.',
    features: [
      'Custom-coded 5-page site that loads in under a second',
      'Buyers search live MLS listings right on your site',
      'Every inquiry captured and routed straight to you',
      'Your brand, your colors, your voice — never a template',
      'Instant home-valuation tool that turns visitors into leads',
      '30 days of hands-on support after launch',
    ],
    cta: 'Start My Project',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$2,500',
    monthly: '$300/mo',
    note: 'Setup fee',
    description: 'For agents and small teams ready to add IDX search, CRM routing, and content pages.',
    features: [
      'Everything in Starter',
      'Profiles that build trust for every agent on the team',
      'Advanced IDX search so buyers find listings faster',
      'Leads auto-routed to your CRM so none slip away',
      'Neighborhood guides that rank and pull in local traffic',
      'Blog & listing alerts that keep clients coming back',
    ],
    cta: 'Start My Project',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$4,000',
    monthly: '$500/mo',
    note: 'Setup fee',
    description: 'Flagship build for brokerages and top producers who need a fully tailored web presence.',
    features: [
      'Everything in Growth',
      'Multi-agent roster built to scale with your brokerage',
      'Fully custom pages and features, built to spec',
      'Priority builds and front-of-line support',
      'Analytics setup so you can see what actually converts',
      'Ongoing development on retainer',
    ],
    cta: 'Start My Project',
    highlight: false,
  },
]


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#111111] text-[#e2e2e2]" style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>

      <Navbar />
      <GoogleOneTap clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} />

      <main id="main-content" tabIndex={-1} className="outline-none">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/landing-page/background-video-v2.mp4"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#111111]/75" />
        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 md:pt-24 md:pb-24 w-full">
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/70 mb-8">
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

          <p className="text-lg text-white/75 max-w-xl leading-relaxed mb-10">
            I build fully custom real estate websites for agents and teams across the USA — MLS-connected,
            conversion-optimized, and fast enough to actually rank on Google. You work directly with me, start to finish.
          </p>

          <div className="flex flex-col min-[480px]:flex-row flex-wrap gap-4">
            <a
              href="#templates"
              className="px-6 py-3 rounded-md bg-[#c4a882] text-[#111111] text-sm font-semibold hover:bg-[#b8976e] transition-colors duration-200 text-center min-[480px]:min-w-[180px]"
            >
              Browse Templates
            </a>
            <OpenContactButton
              label="Get in Touch"
              className="px-6 py-3 rounded-md border border-white/20 text-sm font-medium text-white/80 hover:text-white hover:border-white/40 transition-colors duration-200 text-center min-[480px]:min-w-[180px]"
            />
          </div>
        </div>
      </section>

      {/* ── About the Builder ── */}
      <section id="about" className="border-b border-[#2a2a2a] bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* Image */}
          <div className="w-full lg:w-5/12 shrink-0">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/landing-page/chav-coffee.jpg"
                alt="Charles Alo, founder of Chavbuilds"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="w-full lg:w-7/12">
            <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-4">Behind the Build</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#e2e2e2] leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Hi, I'm Charles.<br />
              I've built over 500 real estate websites.<br />
              <span className="text-[#c4a882]">Yours will be next.</span>
            </h2>

            <div className="space-y-4 text-[#8a8a8a] leading-relaxed mb-10">
              <p>
                Before starting Chavbuilds, I spent years as a contractor for Luxury Presence — one of the most
                respected real estate web platforms in the industry, trusted by over 30% of the Wall Street Journal's
                top agents. I built and refined over 500 real estate websites during that time, working across every
                market segment from solo luxury agents to large brokerages.
              </p>
              <p>
                What I learned from that experience: most agents are paying platform fees for websites they don't
                own, built on templates they can't fully customize, supported by teams they never directly talk to.
              </p>
              <p>
                Chavbuilds is the alternative. You work directly with me — no account managers, no handoffs, no
                surprises. Every site is custom-coded, fully yours, and built by someone who has done this hundreds
                of times in the exact industry you work in.
              </p>
            </div>

            <div className="flex flex-col min-[480px]:flex-row flex-wrap gap-4">
              <OpenContactButton
                label="Start a Project"
                className="px-6 py-3 rounded-md bg-[#c4a882] text-[#111111] text-sm font-semibold hover:bg-[#b8976e] transition-colors duration-200 text-center"
              />
              <a
                href="#work"
                className="px-6 py-3 rounded-md border border-white/20 text-sm font-medium text-white/60 hover:text-white hover:border-white/40 transition-colors duration-200 text-center"
              >
                See My Work
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Templates ── */}
      <div id="templates">
        {/* Section header */}
        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-0">
          <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-3">Templates</p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#e2e2e2]"
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
            <div className={`max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12 items-start ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

              {/* ── Hoverable image ── */}
              <div className="w-full lg:w-1/2 shrink-0">
                <Link href={`/${t.slug}`} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="template-preview-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.preview} alt={`${t.name} template preview`} loading="lazy" decoding="async" />
                    <div className="template-preview-overlay">
                      <span className="px-6 py-2.5 rounded-md bg-[#c4a882] text-[#111111] text-sm font-semibold">
                        View Live Template →
                      </span>
                    </div>
                  </div>
                </Link>
                <p className="text-xs text-[#8a8a8a] mt-3 text-center">Hover to scroll through the full page</p>
              </div>

              {/* ── Info ── */}
              <div className="w-full lg:flex-1">
                <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-3">{t.badge}</p>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#e2e2e2] leading-tight mb-4"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {t.name}
                </h2>
                <p className="text-[#c4a882] font-medium mb-4">{t.tagline}</p>
                <p className="text-[#8a8a8a] leading-relaxed mb-8">{t.description}</p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/${t.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-[480px]:w-auto px-6 py-3 rounded-md bg-[#c4a882] text-[#111111] text-sm font-semibold hover:bg-[#b8976e] transition-colors duration-200 text-center"
                  >
                    View Live Template
                  </Link>
                </div>
              </div>

            </div>
          </section>
        ))}
      </div>

      {/* ── Why Chavbuilds ── */}
      <section className="border-y border-[#2a2a2a] bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="mb-14">
            <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-3">Why Chavbuilds</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#e2e2e2]"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Not a theme. Not a plugin. <br className="hidden sm:block" />
              <span className="text-[#c4a882]">Built from scratch.</span>
            </h2>
            <p className="mt-5 text-sm sm:text-base text-[#8a8a8a] leading-relaxed max-w-2xl">
              Every site I deliver is fully custom-coded — no WordPress, no page builders, no platform fees. Just clean, fast, tailored code that you own outright.
            </p>
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
      <section id="work" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-10">
          <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-3">Past Work</p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#e2e2e2]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Built to perform. Proven to <span className="text-[#c4a882]">convert.</span>
          </h2>
        </div>
        <WorkSlider />
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="border-y border-[#2a2a2a] bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-14">
            <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-3">Pricing</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#e2e2e2]"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Transparent, <span className="text-[#c4a882]">straightforward</span> pricing
            </h2>
            <p className="mt-3 text-[#8a8a8a]">One-time setup fee to build and launch. Monthly retainer covers hosting, support, and updates. No sales calls, no surprise quotes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(({ name, price, monthly, note, description, features, cta }) => (
              <div
                key={name}
                className="rounded-xl border border-[#2a2a2a] bg-[#1c1c1c] p-8 flex flex-col"
              >
                <div className="mb-6">
                  <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-2">{name}</p>
                  <div className="flex items-end gap-2 mb-1">
                    <span
                      className="text-4xl font-bold text-[#e2e2e2]"
                      style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                      {price}
                    </span>
                    <span className="text-sm text-[#8a8a8a] pb-1">{note}</span>
                  </div>
                  <p className="text-xs text-[#c4a882] mb-3">+ {monthly} retainer</p>
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

                <OpenContactButton
                  label={cta}
                  className="block w-full text-center py-3 rounded-md text-sm font-semibold transition-colors duration-200 bg-[#c4a882] text-[#111111] hover:bg-[#b8976e]"
                />
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#8a8a8a] mt-8">
            Need something custom? <OpenContactButton label="Email me" className="text-[#8a8a8a] hover:text-[#c4a882] transition-colors underline-offset-2 hover:underline" /> — all projects are scoped individually.
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-14">
          <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-3">How It Works</p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#e2e2e2]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            From template to live site <br className="hidden sm:block" />
            <span className="text-[#c4a882]">in under 2 weeks.</span>
          </h2>
        </div>

        <HowItWorksSteps />
      </section>

      {/* ── Final CTA ── */}
      <CTASection />

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div>
              <Image
                src="/images/landing-page/chavbuilds-horizontal.png"
                alt="Chavbuilds"
                width={160}
                height={36}
                className="h-8 w-auto object-contain mb-3"
              />
              <p className="text-xs text-[#8a8a8a] max-w-xs leading-relaxed">
                Custom websites and web tools built for people who care about quality, speed, and results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-10 text-sm">
              <div>
                <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-3">Templates</p>
                <div className="flex flex-col gap-2">
                  <Link href="/modern-team" target="_blank" rel="noopener noreferrer" className="text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors">Modern Team</Link>
                  <Link href="/luxury-agent" target="_blank" rel="noopener noreferrer" className="text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors">Luxury Agent</Link>
                  <Link href="/local-expert" target="_blank" rel="noopener noreferrer" className="text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors">Local Expert</Link>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-3">Company</p>
                <div className="flex flex-col gap-2">
                  <a href="#work" className="text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors">My Work</a>
                  <a href="#pricing" className="text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors">Pricing</a>
                  <OpenContactButton label="Contact" className="text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors text-left" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2a2a2a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8a8a8a]">© {new Date().getFullYear()} Chavbuilds. All rights reserved.</p>
            <p className="text-xs text-[#8a8a8a]">Real estate websites for agents &amp; teams across the USA.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
