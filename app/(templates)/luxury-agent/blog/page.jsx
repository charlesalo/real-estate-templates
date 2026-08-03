import Image from 'next/image'
import Link from 'next/link'
import ParallaxBanner from '../_components/sections/ParallaxBanner'
import CTASection from '../_components/sections/CTASection'
import LeadCaptureSection from '../_components/sections/LeadCaptureSection'

export const metadata = {
  alternates: { canonical: '/luxury-agent/blog' },
  title: 'Los Angeles Real Estate & Community Blog',
  description: 'Market reports, buying guides, and neighborhood news from Victoria Sinclair — your source for Los Angeles luxury real estate insights and trends.',
}

const POSTS = [
  {
    slug: 'beverly-hills-market-report-2024',
    title: '2024 Beverly Hills Luxury Market Report',
    category: 'Market Report',
    date: 'November 12, 2024',
    excerpt: 'A comprehensive look at the Beverly Hills luxury market: what sold, what didn\'t, and what\'s coming in 2025.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
  {
    slug: 'buying-luxury-home-los-angeles',
    title: 'The Insider\'s Guide to Buying a Luxury Home in Los Angeles',
    category: 'Buyer\'s Guide',
    date: 'October 3, 2024',
    excerpt: 'From off-market deals to navigating multiple offers, everything you need to know before making a seven-figure purchase.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  },
  {
    slug: 'bel-air-vs-holmby-hills',
    title: 'Bel Air vs. Holmby Hills: Which Neighborhood Is Right for You?',
    category: 'Neighborhood Guide',
    date: 'September 18, 2024',
    excerpt: 'Two of Los Angeles\'s most prestigious addresses, compared across price, privacy, lifestyle, and architecture.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <ParallaxBanner src="/images/luxury-agent/xtra12.jpg" priority>
        <p className="text-[12px] tracking-[0.5em] uppercase text-[#C9A96E] mb-4 font-sans">Los Angeles Real Estate Market Insights</p>
        <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white mb-5">Luxury Real Estate Journal</h1>
        <div className="w-12 h-px bg-[#C9A96E] mb-5" />
        <p className="text-white/45 font-sans text-base max-w-xl leading-relaxed">
          Curated insights on high-end properties, design trends, and the evolving Los Angeles luxury market.
        </p>
      </ParallaxBanner>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map(post => (
            <Link key={post.slug} href={`/luxury-agent/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden mb-5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[12px] tracking-[0.2em] uppercase text-[#C9A96E] font-sans">{post.category}</span>
                <span className="text-white/20">·</span>
                <span className="text-[12px] text-white/35 font-sans">{post.date}</span>
              </div>
              <h2 className="font-heading text-xl font-normal text-white group-hover:text-[#C9A96E] transition-colors leading-snug mb-3">
                {post.title}
              </h2>
              <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>

      <LeadCaptureSection bottomGap />

      <CTASection
        background={{ image: '/images/luxury-agent/work-with-me.jpg' }}
        headline="Ready to Work Together?"
        subheadline="Whether buying, selling, or simply exploring, Victoria is available to guide you."
        cta={{ label: 'Let\'s Connect', modal: true }}
      />
    </div>
  )
}
