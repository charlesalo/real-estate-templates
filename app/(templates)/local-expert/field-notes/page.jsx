import Image from 'next/image'
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

const CATEGORY_COLORS = {
  Coffee: 'bg-[#C4A882]/20 text-[#7A6040]',
  Bookstore: 'bg-[#8B9E8B]/20 text-[#4A6741]',
  Park: 'bg-[#8B9E8B]/20 text-[#4A6741]',
  Food: 'bg-[#C4A882]/20 text-[#7A6040]',
  Culture: 'bg-[#1B3B2B]/8 text-[#2C1E11]',
  Market: 'bg-[#C4A882]/20 text-[#7A6040]',
}

export default async function FieldNotesPage() {
  const fieldNotes = await getFieldNotes()
  const FIELD_NOTES = withFallback(fieldNotes, FIELD_NOTES_FALLBACK).map((n) => ({
    ...n,
    id: n.id ?? n._id,
    image: resolveImageSrc(n.image),
  }))

  return (
    <section className="pt-[112px] pb-[64px] lg:pt-[144px] lg:pb-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-3">Chapter Two</p>
        <h1
          className="text-[43px] lg:text-[58px] font-normal text-[#24180F] leading-[1.05] mb-4"
          style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
        >
          Nadia&apos;s Field Notes
        </h1>
        <p className="text-[16px] text-[#2C1E11]/50 max-w-xl mb-12">
          Forty-four notebooks. Fourteen years. The places that make a New York address feel like home.
          None of this is sponsored. All of it is walked.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FIELD_NOTES.map((note) => (
            <article key={note.id} className="rounded-2xl overflow-hidden border border-[#E5E0D8] bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={note.image} alt={note.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <span className={`inline-block text-[12px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 ${CATEGORY_COLORS[note.category] ?? 'bg-[#E5E0D8] text-[#2C1E11]/50'}`}>
                  {note.category}
                </span>
                <h2
                  className="text-[19px] font-normal text-[#24180F] mb-1"
                  style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                >
                  {note.name}
                </h2>
                <p className="text-[12px] text-[#2C1E11]/40 mb-3">{note.location} · {note.address}</p>
                <p className="text-[16px] text-[#2C1E11]/60 leading-relaxed">{note.blurb}</p>
                <p className="text-[12px] text-[#2C1E11]/30 mt-3">{note.walkMinutes} min walk from the West Village</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
