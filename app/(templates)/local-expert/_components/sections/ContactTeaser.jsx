import Image from 'next/image'
import ContactTrigger from '../layout/ContactTrigger'

// The closing "Let's Work Together" band. Appears at the foot of most pages in
// this template, so it lives here rather than being repeated per page.
export default function ContactTeaser() {
  return (
    <section className="relative py-[120px] lg:py-[168px] overflow-hidden">
      {/* Full-bleed background */}
      <Image
        src="https://images.unsplash.com/photo-1440613905118-99b921706b5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Dumbo Manhattan Bridge"
        fill
        className="object-cover object-center"
      />
      {/* Density is concentrated in the middle band, where the centered copy
          sits, so the text clears 4.5:1 against the bright sky in this photo.
          A flat wash would need ~60% everywhere to do the same and would flatten
          the image; the edges stay at 30% so the photo still reads. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#24180F]/30 via-[#24180F]/62 to-[#24180F]/30" />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
        <p className="text-[12px] tracking-[0.4em] uppercase text-white mb-4">Let&apos;s Work Together</p>
        <h2
          className="text-[34px] lg:text-[45px] font-normal text-[#F8F3EB] leading-tight mb-5 text-balance"
          style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
        >
          The right home<br className="sm:hidden" /> is a feeling.<br />I know how to find it.
        </h2>
        <p className="text-[16px] text-white/80 mb-8 max-w-md mx-auto leading-relaxed text-pretty">
          Not sure where to start? Tell me what you&apos;re looking for — or what you&apos;re running from.
          I know this city. I&apos;ll help.
        </p>
        <ContactTrigger
          className="inline-flex items-center px-8 py-3.5 text-[14px] font-bold rounded-full bg-[#F8F3EB] text-[#1B3B2B] hover:bg-white transition-colors"
        >
          Start the conversation
        </ContactTrigger>
      </div>
    </section>
  )
}
