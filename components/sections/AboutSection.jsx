'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function AboutSection({
  photo,
  name,
  title,
  bio,
  credentials = [],
  learnMoreHref,
  template = 'luxury-agent',
}) {
  const isLuxury = template === 'luxury-agent'

  return (
    <section className={cn('relative overflow-hidden', isLuxury ? 'bg-[#0A0A0A]' : 'bg-template-bg')}>
      <div className={cn('grid lg:grid-cols-2', isLuxury ? '' : 'max-w-7xl mx-auto px-6 lg:px-8 py-24 gap-16 items-center')}>

        {/* Photo */}
        <div className={cn('relative', isLuxury ? 'aspect-[4/5] lg:aspect-auto lg:min-h-[680px]' : 'aspect-[4/3] rounded-lg overflow-hidden')}>
          {photo ? (
            <Image
              src={photo}
              alt={name ?? 'Agent photo'}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          ) : (
            <div className={cn('absolute inset-0', isLuxury ? 'bg-[#1A1A1A]' : 'bg-template-surface')} />
          )}
          {isLuxury && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A]/50 hidden lg:block" />
          )}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={cn(isLuxury ? 'px-8 lg:px-16 xl:px-20 py-20 lg:py-28' : '')}
        >
          {isLuxury && (
            <p className="text-[10px] tracking-[0.5em] uppercase text-template-accent mb-6 font-sans">
              About
            </p>
          )}

          <h2
            className={cn(
              'font-normal leading-tight mb-2',
              isLuxury ? 'font-heading text-4xl lg:text-5xl text-white' : 'text-3xl lg:text-4xl text-template-fg',
            )}
          >
            {name}
          </h2>

          {title && (
            <p className="text-[10px] tracking-[0.3em] uppercase text-template-accent mb-10 font-sans">
              {title}
            </p>
          )}

          <div
            className={cn(
              'space-y-4 mb-12 text-base leading-relaxed font-sans',
              isLuxury ? 'text-white/55' : 'text-template-fg/70',
            )}
          >
            {(Array.isArray(bio) ? bio : [bio]).filter(Boolean).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {credentials.length > 0 && (
            <div className={cn('pt-8 border-t mb-8', isLuxury ? 'border-white/10' : 'border-template-border')}>
              <p className={cn('text-[9px] tracking-[0.35em] uppercase mb-4 font-sans', isLuxury ? 'text-white/30' : 'text-template-fg/40')}>
                Designations &amp; Memberships
              </p>
              <ul className="space-y-2.5">
                {credentials.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-3 h-px bg-[#C9A96E] flex-shrink-0 mt-2" />
                    <span className={cn('text-xs font-sans leading-relaxed', isLuxury ? 'text-white/45' : 'text-template-fg/55')}>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {learnMoreHref && (
            <div className={cn('pt-8 border-t', isLuxury ? 'border-white/10' : 'border-template-border')}>
              <Link
                href={learnMoreHref}
                className={cn(
                  'inline-block px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-semibold font-sans transition-colors',
                  isLuxury
                    ? 'bg-[#C9A96E] text-[#0A0A0A] hover:bg-[#b8935a]'
                    : 'bg-template-accent text-template-accent-fg hover:opacity-90',
                )}
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
