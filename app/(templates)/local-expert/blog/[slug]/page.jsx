import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BLOG_POSTS as BLOG_POSTS_FALLBACK, AGENT as AGENT_FALLBACK } from '@/lib/local-expert-data'
import { notFound } from 'next/navigation'
import PortableText from '@/components/sanity/PortableText'
import { resolveImageSrc } from '@/lib/sanity/image'
import { getPostBySlug, getPostSlugs } from '@/lib/sanity/queries'

async function findPost(slug) {
  const post = await getPostBySlug(slug)
  if (post) return { ...post, slug: post.slug?.current ?? post.slug, image: resolveImageSrc(post.image) }
  return BLOG_POSTS_FALLBACK.find((p) => p.slug === slug) ?? null
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  if (slugs?.length) return slugs.map(({ slug }) => ({ slug }))
  return BLOG_POSTS_FALLBACK.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await findPost(slug)
  if (!post) return {}
  return {
    alternates: { canonical: `/local-expert/blog/${slug}` },
    title: post.title,
    description: post.excerpt,
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await findPost(slug)
  if (!post) notFound()

  const author = post.author
    ? { name: post.author.name, photo: post.author.photo, title: AGENT_FALLBACK.title, brokerage: AGENT_FALLBACK.brokerage }
    : AGENT_FALLBACK

  return (
    <>
      <section className="pt-[112px] pb-[64px] lg:pt-[144px] lg:pb-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Link href="/local-expert/blog" className="inline-flex items-center gap-1.5 text-[13px] text-[#2C1E11]/55 hover:text-[#BA5B3E] transition-colors mb-8">
            <ArrowLeft size={13} /> Back to journal
          </Link>

          <p className="text-[12px] tracking-[0.3em] uppercase text-[#BA5B3E] mb-4">{post.category}</p>
          <h1 className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight mb-5" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-[12px] text-[#24180F]/35 mb-8">
            <span>{author.name}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readMinutes} min read</span>
          </div>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          <div className="prose prose-stone max-w-none" style={{ fontFamily: 'var(--font-plus-jakarta, system-ui)', color: 'rgba(27,59,43,0.7)', fontSize: '16px', lineHeight: '1.75' }}>
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <>
                <p>{post.excerpt}</p>
                <p>
                  This is a demo blog post for the Local Expert template. Publish the full article in Sanity Studio
                  under this post&apos;s <code style={{ backgroundColor: '#F4F0EA', padding: '2px 6px', borderRadius: 4, fontSize: 14 }}>body</code>{' '}
                  field to replace this placeholder.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Author card */}
      <section className="py-[64px] border-t border-[#E5E0D8]" style={{ backgroundColor: '#F4F0EA' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8 flex items-center gap-5">
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <Image src={resolveImageSrc(author.photo)} alt={author.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#2C1E11]">{author.name}</p>
            <p className="text-[12px] text-[#2C1E11]/40">{author.title} · {author.brokerage}</p>
          </div>
          <Link href="/local-expert/contact" className="ml-auto px-5 py-2.5 text-[13px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors whitespace-nowrap">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  )
}
