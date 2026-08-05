import ContactTeaser from '../_components/sections/ContactTeaser'
import FieldNotesGrid from './FieldNotesGrid'
import { resolveImageSrc } from '@/lib/sanity/image'
import { withFallback } from '@/lib/sanity/utils'
import { getFieldNotes, getSiteSettings } from '@/lib/sanity/queries'
import { FIELD_NOTES as FIELD_NOTES_FALLBACK } from '@/lib/local-expert-data'

export async function generateMetadata() {
  const settings = await getSiteSettings()
  const name = settings?.businessName ?? 'Nadia Osei'
  return {
    alternates: { canonical: '/local-expert/field-notes' },
    title: { absolute: `New York Local Favorites | ${name} Real Estate Agent` },
    description: `Discover ${name}'s favorite NYC spots: coffee shops, bookstores, parks, and local gems across Manhattan and Brooklyn curated for residents.`,
  }
}

export default async function FieldNotesPage() {
  const fieldNotes = await getFieldNotes()
  const FIELD_NOTES = withFallback(fieldNotes, FIELD_NOTES_FALLBACK).map((n) => ({
    ...n,
    id: n.id ?? n._id,
    image: resolveImageSrc(n.image),
  }))

  return (
    <>
      <section className="pt-[112px] pb-[96px] lg:pt-[144px] lg:pb-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Eyebrow with rule */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] whitespace-nowrap">
              Chapter Two · Field Notes
            </span>
            <div className="h-px flex-1 bg-[#BEB7A9]" />
          </div>

          <h1
            className="text-[43px] lg:text-[58px] font-normal text-[#24180F] leading-[1.05] mb-5 text-balance"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            The cafés, parks and quiet<br />
            <em className="text-[#1B3B2B]">bars I actually go to.</em>
          </h1>
          <p className="text-[16px] text-[#2C1E11]/50 max-w-xl leading-relaxed text-pretty">
            Forty-four notebooks. Fourteen years. The places that make a New York address feel like home.
            None of this is sponsored. All of it is walked.
          </p>
        </div>
      </section>

      <FieldNotesGrid notes={FIELD_NOTES} />

      <ContactTeaser />
    </>
  )
}
