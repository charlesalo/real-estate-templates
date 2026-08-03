import Image from 'next/image'
import ModalTrigger from '@/components/ui/ModalTrigger'
import TestimonialsGrid from './TestimonialsGrid'

export const metadata = {
  alternates: { canonical: '/modern-team/testimonials' },
  title: { absolute: 'Client Testimonials & Success Stories | The Hargrove Group' },
  description: 'See what Houston buyers and sellers say about working with the Hargrove Group — real reviews from real clients across Greater Houston.',
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* ── Opening section ──────────────────────────────────────── */}
      <div className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-4 font-sans">
              What Our Clients Say
            </p>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-inter, system-ui)' }}
            >
              Client Testimonials
            </h1>
            <div className="w-12 h-0.5 bg-white/30 mb-6" />
            <p className="text-white/60 text-lg font-sans leading-relaxed">
              Hundreds of Houston families have trusted the Hargrove Group to guide their most important financial decisions. Here's what they have to say.
            </p>
          </div>
        </div>
      </div>

{/* ── Testimonials grid + pagination ───────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <TestimonialsGrid />
      </div>

      {/* ── Work With Us ─────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=80"
          alt=""
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#0F1E3E]/60" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 text-center py-20">
          <h2
            className="text-2xl lg:text-4xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-inter, system-ui)' }}
          >
            Let's Get Started in Houston Real Estate
          </h2>
          <div className="w-16 h-px bg-white/40 mx-auto mb-8" />
          <p className="text-white/70 text-base lg:text-lg font-sans leading-relaxed mb-10 max-w-xl mx-auto">
            Buying, selling, or just exploring your options — the Hargrove Group is here to give you honest guidance, local expertise, and the attentive service you deserve.
          </p>
          <ModalTrigger className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-lg hover:bg-white hover:text-[#1A2D5A] transition-all duration-300 cursor-pointer">
            Contact Us
          </ModalTrigger>
        </div>
      </section>

    </div>
  )
}
