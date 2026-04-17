import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Blog',
  description: 'Market reports, buying guides, and neighborhood news from Victoria Sinclair.',
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
      <div className="border-b border-white/10 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">Insights</p>
          <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white">Market Reports &amp; News</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
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
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E] font-sans">{post.category}</span>
                <span className="text-white/20">·</span>
                <span className="text-[11px] text-white/35 font-sans">{post.date}</span>
              </div>
              <h2 className="font-heading text-xl font-normal text-white group-hover:text-[#C9A96E] transition-colors leading-snug mb-3">
                {post.title}
              </h2>
              <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
