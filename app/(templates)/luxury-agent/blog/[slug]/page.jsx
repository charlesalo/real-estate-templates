import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/sections/CTASection'

// Demo blog posts — Phase 2 hardcoded per brief
// Phase 3 upgrade: pull from Sanity CMS
const POSTS = {
  'beverly-hills-market-report-2024': {
    title: '2024 Beverly Hills Luxury Market Report',
    category: 'Market Report',
    date: 'November 12, 2024',
    author: 'Victoria Sinclair',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    excerpt: 'A comprehensive look at the Beverly Hills luxury market: what sold, what didn\'t, and what\'s coming in 2025.',
    content: [
      {
        type: 'lead',
        text: 'The Beverly Hills luxury market in 2024 proved remarkably resilient in the face of elevated interest rates, global uncertainty, and a compressed inventory environment. Here\'s what the data reveals — and what it means for buyers and sellers heading into 2025.',
      },
      {
        type: 'h2',
        text: 'Key Market Metrics',
      },
      {
        type: 'paragraph',
        text: 'Total transaction volume in the $4M+ segment reached $2.1 billion, a 7% increase over 2023. The median sale price held steady at $4.6M, while days on market compressed from 38 to 28 — a clear indicator of sustained demand in the upper tier.',
      },
      {
        type: 'paragraph',
        text: 'The most active price band was $5M–$8M, which accounted for 41% of all transactions. Properties offering contemporary architecture, open floor plans, and smart home integration commanded a measurable premium over comparable traditional estates.',
      },
      {
        type: 'h2',
        text: 'What\'s Selling — and What\'s Not',
      },
      {
        type: 'paragraph',
        text: 'New construction and fully remodeled contemporaries continued to attract the strongest buyer interest, often generating multiple offers within the first two weeks. In contrast, unrenovated traditional estates — particularly those built prior to 1990 with dated interiors — frequently required price reductions before finding buyers.',
      },
      {
        type: 'paragraph',
        text: 'Pool homes saw a notable uptick in interest, with buyers increasingly prioritizing outdoor entertainment space post-pandemic. Properties with flat lots, motor courts, and guest houses carried a consistent 5–12% premium.',
      },
      {
        type: 'h2',
        text: 'Looking Ahead to 2025',
      },
      {
        type: 'paragraph',
        text: 'With interest rates expected to moderate in 2025 and a wave of offshore capital continuing to target prime Los Angeles real estate, the outlook remains cautiously optimistic. Inventory will likely remain constrained, supporting price stability in the $4M+ range.',
      },
      {
        type: 'paragraph',
        text: 'For sellers, Q1 2025 presents an excellent window before the spring inventory surge. For buyers, particularly those acquiring for investment or as second homes, the current environment offers more negotiating leverage than we\'ve seen in several years.',
      },
    ],
  },
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* Hero */}
      <div className="relative h-[45vh] min-h-[360px]">
        <Image src={post.heroImage} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/20" />
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans">{post.category}</span>
          <span className="text-white/20">·</span>
          <span className="text-[11px] text-white/40 font-sans">{post.date}</span>
        </div>

        <h1 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-normal text-white leading-snug mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 mb-12 pb-12 border-b border-white/10">
          <span className="text-sm text-white/40 font-sans">By {post.author}</span>
        </div>

        {/* Article body */}
        <article className="space-y-6">
          {post.content.map((block, i) => {
            if (block.type === 'lead') {
              return (
                <p key={i} className="text-lg text-white/70 leading-relaxed font-heading font-normal">
                  {block.text}
                </p>
              )
            }
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="font-heading text-2xl font-normal text-white pt-4">
                  {block.text}
                </h2>
              )
            }
            return (
              <p key={i} className="text-base text-white/60 leading-relaxed font-sans">
                {block.text}
              </p>
            )
          })}
        </article>

        {/* Author footer */}
        <div className="mt-14 pt-10 border-t border-white/10 flex items-center gap-4">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"
            alt={post.author}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-white">{post.author}</p>
            <p className="text-xs text-white/40 mt-0.5">Luxury Real Estate Specialist · Beverly Hills</p>
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-10">
          <Link
            href="/luxury-agent/blog"
            className="text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors font-sans"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>

      <CTASection
        template="luxury-agent"
        background={{ color: 'bg-[#0D0D0D]' }}
        headline="Questions About the Market?"
        subheadline="Victoria is available for a confidential conversation about market conditions in your area."
        cta={{ label: 'Schedule a Call', href: '/luxury-agent/contact' }}
      />
    </div>
  )
}
