import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BLOG_POSTS, AGENT } from '@/lib/local-expert-data'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <>
      <section className="pt-[112px] pb-[64px] lg:pt-[144px] lg:pb-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Link href="/local-expert/blog" className="inline-flex items-center gap-1.5 text-[12px] text-[#2C1E11]/45 hover:text-[#2C1E11] transition-colors mb-8">
            <ArrowLeft size={13} /> Back to journal
          </Link>

          <p className="text-[9px] tracking-[0.3em] uppercase text-[#BA5B3E] mb-4">{post.category}</p>
          <h1 className="text-[32px] lg:text-[42px] font-normal text-[#24180F] leading-tight mb-5" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-[11px] text-[#24180F]/35 mb-8">
            <span>{AGENT.name}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readMinutes} min read</span>
          </div>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          {/* Demo article body */}
          <div className="prose prose-stone max-w-none" style={{ fontFamily: 'var(--font-plus-jakarta, system-ui)', color: 'rgba(27,59,43,0.7)', fontSize: '16px', lineHeight: '1.75' }}>
            <p>{post.excerpt}</p>
            <p>
              This is a demo blog post for the Local Expert template. In a live deployment, this content would be
              managed through Sanity CMS, allowing the agent to write and publish market reports, neighborhood
              stories, and buyer guides without touching any code.
            </p>
            <p>
              The Local Expert template is designed for agents who position themselves as neighborhood authorities —
              people who don&apos;t just sell homes but genuinely know their markets. Long-form content like this
              builds search authority (Google ranks it) and client trust (buyers share it).
            </p>
            <h2 style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)', color: '#1B3B2B', fontWeight: 900, fontSize: '22px', marginTop: '2rem', marginBottom: '0.75rem' }}>
              What to replace with real content
            </h2>
            <p>
              Replace this placeholder body with actual market analysis. The{' '}
              <code style={{ backgroundColor: '#F4F0EA', padding: '2px 6px', borderRadius: 4, fontSize: 14 }}>BLOG_POSTS</code>{' '}
              array in <code style={{ backgroundColor: '#F4F0EA', padding: '2px 6px', borderRadius: 4, fontSize: 14 }}>lib/local-expert-data.js</code>{' '}
              holds the demo content — each post maps <code style={{ fontSize: 14 }}>slug → page route</code>.
              Connect to Sanity CMS in Phase 2 for full editorial control.
            </p>
          </div>
        </div>
      </section>

      {/* Author card */}
      <section className="py-[64px] border-t border-[#E5E0D8]" style={{ backgroundColor: '#F4F0EA' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8 flex items-center gap-5">
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <Image src={AGENT.photo} alt={AGENT.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#2C1E11]">{AGENT.name}</p>
            <p className="text-[11px] text-[#2C1E11]/40">{AGENT.title} · {AGENT.brokerage}</p>
          </div>
          <Link href="/local-expert/contact" className="ml-auto px-5 py-2.5 text-[12px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors whitespace-nowrap">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  )
}
