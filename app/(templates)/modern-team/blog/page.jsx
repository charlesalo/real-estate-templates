import Image from 'next/image'
import Link from 'next/link'
import ModalTrigger from '@/components/ui/ModalTrigger'
import ModernTeamNewsletterForm from '@/components/layout/ModernTeamNewsletterForm'

export const metadata = {
  title: 'Houston Market Blog',
  description: 'Houston real estate market reports, neighborhood guides, and buyer/seller tips from the Hargrove Group.',
}

const POSTS = [
  {
    slug: 'houston-real-estate-market-report-2024',
    title: '2024 Houston Real Estate Market Report',
    category: 'Market Report',
    date: 'October 28, 2024',
    readTime: '8 min read',
    excerpt: 'A deep dive into Houston home prices, inventory, days on market, and what buyers and sellers can expect heading into 2025. Key takeaways: inventory is rising, prices are stabilizing, and it\'s the most balanced market in three years.',
    image: 'https://plus.unsplash.com/premium_photo-1734545294120-3aa935de792d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true,
  },
  {
    slug: 'heights-vs-montrose-guide',
    title: 'The Heights vs. Montrose: Which Neighborhood Fits Your Life?',
    category: 'Neighborhood Guide',
    date: 'September 14, 2024',
    readTime: '6 min read',
    excerpt: "Two of Houston's most beloved Inner Loop neighborhoods go head-to-head. We compare them on price, walkability, architecture, schools, and lifestyle to help you decide.",
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
    featured: false,
  },
  {
    slug: 'first-time-buyer-houston-guide',
    title: "A First-Time Buyer's Complete Guide to Houston",
    category: "Buyer's Guide",
    date: 'August 5, 2024',
    readTime: '10 min read',
    excerpt: 'From pre-approval to closing day — everything you need to know before purchasing your first Houston home. Includes Texas-specific tips on property taxes, HOA communities, and avoiding common mistakes.',
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80',
    featured: false,
  },
  {
    slug: 'houston-suburbs-compared-2024',
    title: 'Sugar Land vs. The Woodlands vs. Katy: Which Suburb Is Right for You?',
    category: 'Neighborhood Guide',
    date: 'July 18, 2024',
    readTime: '7 min read',
    excerpt: "Houston's three most popular suburbs compared side-by-side on schools, commute, price, and community feel. If you're moving to Houston from out of state, this guide is essential.",
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    featured: false,
  },
  {
    slug: 'sell-houston-home-fast',
    title: '7 Proven Strategies to Sell Your Houston Home Faster and for More Money',
    category: "Seller's Guide",
    date: 'June 3, 2024',
    readTime: '5 min read',
    excerpt: 'Pricing strategy, staging, marketing, and timing — our listing specialists share the exact playbook that helped our sellers close $18K over asking price on average last year.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    featured: false,
  },
  {
    slug: 'houston-property-taxes-explained',
    title: 'Houston Property Taxes: What Every Buyer Needs to Know',
    category: 'Finance',
    date: 'May 12, 2024',
    readTime: '6 min read',
    excerpt: "Texas has no state income tax — but property taxes are among the highest in the nation. Here's exactly how Houston-area property taxes are calculated, what exemptions are available, and how to protest your appraisal.",
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    featured: false,
  },
]

const CATEGORIES = ['All', 'Market Report', 'Neighborhood Guide', "Buyer's Guide", "Seller's Guide", 'Finance']

export default function BlogPage() {
  const featured = POSTS.find(p => p.featured)
  const remaining = POSTS.filter(p => !p.featured)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* Header */}
      <div className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1582417746335-b781b445c610?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-4 font-sans">Insights & Guides</p>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              Houston Market Blog
            </h1>
            <div className="w-12 h-0.5 bg-white/30 mb-6" />
            <p className="text-white/60 text-lg font-sans leading-relaxed">
              Market reports, neighborhood guides, and expert advice from the Hargrove Group — everything Houston buyers and sellers need to stay ahead of the market.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">

        {/* Featured post */}
        {featured && (
          <Link
            href={`/modern-team/blog/${featured.slug}`}
            className="group grid lg:grid-cols-2 gap-0 bg-white border border-[#D5DBE9] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#1A2D5A]/30 transition-all duration-300 mb-12"
          >
            <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[380px] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-[#1A2D5A] text-white text-[10px] tracking-[0.15em] uppercase rounded font-sans">
                Featured · {featured.category}
              </span>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-xs text-[#9CA3AF] mb-3 font-sans">{featured.date} · {featured.readTime}</p>
              <h2
                className="text-2xl lg:text-4xl font-bold text-[#111827] leading-tight mb-4 group-hover:text-[#1A2D5A] transition-colors"
                style={{ fontFamily: 'var(--font-inter, system-ui)' }}
              >
                {featured.title}
              </h2>
              <p className="text-[#6B7280] text-base leading-relaxed font-sans mb-6">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A2D5A] font-sans">
                Read Article <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
              </span>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remaining.map(post => (
            <Link
              key={post.slug}
              href={`/modern-team/blog/${post.slug}`}
              className="group bg-white border border-[#D5DBE9] rounded-xl overflow-hidden hover:shadow-md hover:border-[#1A2D5A]/30 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#1A2D5A]/85 backdrop-blur-sm text-white text-[10px] tracking-[0.15em] uppercase rounded font-sans">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-[11px] text-[#9CA3AF] mb-2 font-sans">{post.date} · {post.readTime}</p>
                <h3
                  className="font-bold text-[#111827] text-base leading-snug group-hover:text-[#1A2D5A] transition-colors"
                  style={{ fontFamily: 'var(--font-inter, system-ui)' }}
                >
                  {post.title}
                </h3>
                <p className="text-[#6B7280] text-sm mt-2 leading-relaxed line-clamp-2 font-sans">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A2D5A] mt-4 font-sans">
                  Read Article <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Newsletter ───────────────────────────────────────────── */}
      <section className="bg-[#EEF1F7] border-y border-[#D5DBE9] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 rounded-xl overflow-hidden shadow-lg">

          {/* Left — form */}
          <div className="bg-[#FAFAF8] px-8 py-16 lg:px-16 lg:py-24">
            <p className="text-xs tracking-[0.4em] uppercase text-[#4B6090] mb-4 font-sans">Stay Informed</p>
            <h2
              className="text-2xl lg:text-4xl font-bold text-[#111827] mb-5 leading-snug"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              Get Houston Real Estate Market Updates
            </h2>
            <div className="w-12 h-0.5 bg-[#1A2D5A]/30 mb-6" />
            <p className="text-[#6B7280] font-sans text-sm leading-relaxed mb-8">
              Join thousands of Houston buyers and sellers who rely on our monthly market reports, neighborhood price trends, and new listing alerts to make smarter real estate decisions.
            </p>

            <ModernTeamNewsletterForm consentId="blog-consent" />
          </div>

          {/* Right — image */}
          <div className="relative hidden lg:block min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1616486701797-0f33f61038ec?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Houston real estate market"
              fill
              className="object-cover"
            />
          </div>

        </div>
        </div>
      </section>

      {/* ── Work With Us ─────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=80"
          alt=""
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#0F1E3E]/60" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 text-center py-20">
          <h2
            className="text-2xl lg:text-4xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-inter, system-ui)' }}
          >
            Let's Get Started in Houston Real Estate
          </h2>
          <div className="w-16 h-px bg-white/40 mx-auto mb-8" />
          <p className="text-white/70 text-base lg:text-lg font-sans leading-relaxed mb-10 max-w-xl mx-auto">
            Buying, selling, or just exploring your options — the Hargrove Group is here to give you honest guidance, local expertise, and the attentive service you deserve.
          </p>
          <ModalTrigger className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-white hover:text-[#1A2D5A] transition-all duration-300 cursor-pointer">
            Contact Us
          </ModalTrigger>
        </div>
      </section>

    </div>
  )
}
