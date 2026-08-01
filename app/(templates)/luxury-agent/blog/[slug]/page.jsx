import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CTASection from '../../_components/sections/CTASection'

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
  'buying-luxury-home-los-angeles': {
    title: 'The Insider\'s Guide to Buying a Luxury Home in Los Angeles',
    category: 'Buyer\'s Guide',
    date: 'October 3, 2024',
    author: 'Victoria Sinclair',
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
    excerpt: 'From off-market deals to navigating multiple offers, everything you need to know before making a seven-figure purchase.',
    content: [
      {
        type: 'lead',
        text: 'Buying a luxury home in Los Angeles is one of the most significant financial and lifestyle decisions you\'ll ever make. The process is markedly different from a standard transaction — and knowing the terrain before you start can mean the difference between landing your dream property and watching it go to someone else.',
      },
      {
        type: 'h2',
        text: 'Start with Relationships, Not Searches',
      },
      {
        type: 'paragraph',
        text: 'The most desirable properties in Beverly Hills, Bel Air, and Holmby Hills rarely appear on Zillow or even the MLS. They move through networks — agent to agent, often before any formal listing. Your first priority should be establishing a relationship with an agent who has deep roots in your target neighborhood and a reputation for being trusted with off-market inventory.',
      },
      {
        type: 'paragraph',
        text: 'This means having direct conversations about your criteria — not just beds, baths, and budget, but lifestyle priorities: privacy, views, flat lot vs. hillside, proximity to schools or the city. The more specific and genuine that conversation is, the more effectively your agent can activate their network on your behalf.',
      },
      {
        type: 'h2',
        text: 'Get Financing in Order Before You Fall in Love',
      },
      {
        type: 'paragraph',
        text: 'At the $4M+ price point, sellers and their agents scrutinize buyer qualifications carefully. A proof of funds letter or pre-approval from a private bank or jumbo lender is table stakes. In competitive situations, all-cash offers or minimal contingency structures are frequently the deciding factor — even over slightly higher prices.',
      },
      {
        type: 'paragraph',
        text: 'Work with a lender who specializes in high-net-worth clients. Standard mortgage processes don\'t always accommodate complex income structures, multiple properties, or international assets. Getting this right early avoids delays and signals credibility to the seller.',
      },
      {
        type: 'h2',
        text: 'Navigating Multiple Offers',
      },
      {
        type: 'paragraph',
        text: 'When a well-positioned property hits the market in LA, multiple offers within the first week are common. Your offer strategy should be crafted in close consultation with your agent — price, contingency terms, deposit amount, and closing timeline all carry weight. In some cases, a personal letter from buyer to seller has made a meaningful difference.',
      },
      {
        type: 'paragraph',
        text: 'The key is to be decisive without being reckless. Know your walk-away number before you enter the process, and trust your agent\'s read of the seller\'s motivations. A fast, clean offer at the right price often outperforms a higher offer encumbered with conditions.',
      },
    ],
  },
  'bel-air-vs-holmby-hills': {
    title: 'Bel Air vs. Holmby Hills: Which Neighborhood Is Right for You?',
    category: 'Neighborhood Guide',
    date: 'September 18, 2024',
    author: 'Victoria Sinclair',
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    excerpt: 'Two of Los Angeles\'s most prestigious addresses, compared across price, privacy, lifestyle, and architecture.',
    content: [
      {
        type: 'lead',
        text: 'Bel Air and Holmby Hills are two of the most coveted addresses in the world. Both occupy the westside\'s most privileged terrain, both command extraordinary prices, and both attract buyers for whom privacy and prestige are non-negotiable. Yet they offer distinctly different living experiences.',
      },
      {
        type: 'h2',
        text: 'Scale and Exclusivity',
      },
      {
        type: 'paragraph',
        text: 'Holmby Hills is the smaller and arguably more exclusive of the two. With fewer than 200 parcels, properties here rarely come to market — and when they do, they move quickly among a very short list of qualified buyers. The lots are larger on average, the estates more grand, and the sense of seclusion more absolute.',
      },
      {
        type: 'paragraph',
        text: 'Bel Air, by contrast, is considerably larger — spanning gated enclaves, hillside compounds, and flatter estates along its lower reaches. This variety means more opportunity for buyers at different price points, while still delivering the prestige of one of LA\'s most recognizable addresses.',
      },
      {
        type: 'h2',
        text: 'Architecture and Character',
      },
      {
        type: 'paragraph',
        text: 'Holmby Hills tends toward grand traditional estates — Georgians, French Normandy, and Mediterranean Revival homes built on sprawling flat lots with mature trees, formal gardens, and motor courts. The neighborhood has a timeless, old-money character that resonates with buyers seeking permanence over trend.',
      },
      {
        type: 'paragraph',
        text: 'Bel Air offers greater architectural diversity. The hillside areas showcase dramatic contemporary builds with canyon and city views, while the lower streets feature a mix of traditional and updated transitional homes. For buyers drawn to modern design and indoor-outdoor living, the upper reaches of Bel Air present some of the most compelling options in the city.',
      },
      {
        type: 'h2',
        text: 'The Bottom Line',
      },
      {
        type: 'paragraph',
        text: 'If absolute exclusivity, flat land, and a legacy address are your priorities — and if you\'re prepared for a patient search and premium pricing — Holmby Hills is unmatched. If you want the range of architectural options, more frequent availability, and the flexibility of hillside or flat living, Bel Air delivers exceptional value at the top of the market.',
      },
      {
        type: 'paragraph',
        text: 'Both neighborhoods reward buyers who approach the process with knowledge and patience. Working with an agent who has closed transactions in both areas is essential — the nuances of each street, each parcel, and each micro-market matter enormously at this level.',
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
          <span className="text-[12px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans">{post.category}</span>
          <span className="text-white/20">·</span>
          <span className="text-[12px] text-white/40 font-sans">{post.date}</span>
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
            className="text-[12px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors font-sans"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>

      <CTASection
        background={{ image: '/images/luxury-agent/work-with-me.jpg' }}
        headline="Ready to Work Together?"
        subheadline="Whether buying, selling, or simply exploring, Victoria is available to guide you."
        cta={{ label: 'Schedule a Consultation', modal: true }}
      />
    </div>
  )
}
