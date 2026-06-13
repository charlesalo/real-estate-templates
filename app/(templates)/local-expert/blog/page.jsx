import Image from 'next/image'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/local-expert-data'

export const metadata = {
  title: 'Journal',
  description: 'Market reports, buyer guides, and neighborhood stories from Nadia Osei.',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BlogPage() {
  return (
    <section className="pt-[112px] pb-[64px] lg:pt-[144px] lg:pb-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-3">From the Journal</p>
        <h1 className="text-[43px] lg:text-[58px] font-normal text-[#24180F] leading-[1.05] mb-4" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
          Writing
        </h1>
        <p className="text-[16px] text-[#24180F]/50 max-w-xl mb-12">
          Market reports, neighborhood stories, and honest guides for buyers navigating New York real estate.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/local-expert/blog/${post.slug}`} className="group block">
              <article>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-[12px] tracking-[0.3em] uppercase text-[#BA5B3E] mb-2">{post.category}</p>
                <h2 className="text-[19px] font-normal text-[#24180F] leading-snug group-hover:text-[#BA5B3E] transition-colors mb-2" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                  {post.title}
                </h2>
                <p className="text-[16px] text-[#24180F]/50 leading-relaxed mb-3 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-[12px] text-[#2C1E11]/30">
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readMinutes} min read</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
