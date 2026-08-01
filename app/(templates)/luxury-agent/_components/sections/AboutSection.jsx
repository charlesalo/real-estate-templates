'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutSection({
  photo,
  name,
  title,
  bio,
  credentials = [],
  learnMoreHref,
}) {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A]">
      <div className="grid lg:grid-cols-2">

        {/* Photo */}
        <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[680px]">
          {photo ? (
            <Image
              src={photo}
              alt={name ?? 'Agent photo'}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1A1A1A]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A]/50 hidden lg:block" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="px-8 lg:px-16 xl:px-20 py-20 lg:py-28"
        >
          <p className="text-[12px] tracking-[0.5em] uppercase text-template-accent mb-6 font-sans">
            About
          </p>

          <h2 className="font-normal leading-tight mb-2 font-heading text-4xl lg:text-5xl text-white">
            {name}
          </h2>

          {title && (
            <p className="text-[12px] tracking-[0.3em] uppercase text-template-accent mb-10 font-sans">
              {title}
            </p>
          )}

          <div className="space-y-4 mb-12 text-base leading-relaxed font-sans text-white/55">
            {(Array.isArray(bio) ? bio : [bio]).filter(Boolean).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {credentials.length > 0 && (
            <div className="pt-8 border-t mb-8 border-white/10">
              <p className="text-[12px] tracking-[0.35em] uppercase mb-4 font-sans text-white/30">
                Designations &amp; Memberships
              </p>
              <ul className="space-y-2.5">
                {credentials.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-3 h-px bg-[#C9A96E] flex-shrink-0 mt-2" />
                    <span className="text-xs font-sans leading-relaxed text-white/45">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {learnMoreHref && (
            <div className="pt-8 border-t border-white/10">
              <Link
                href={learnMoreHref}
                className="block min-[480px]:inline-block text-center px-8 py-3.5 text-[12px] tracking-[0.2em] uppercase font-semibold font-sans transition-colors bg-[#C9A96E] text-[#0A0A0A] hover:bg-[#b8935a]"
              >
                Learn More
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
