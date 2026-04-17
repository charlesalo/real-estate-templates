'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function AboutSection({
  photo,
  name,
  title,
  bio,
  stats = [],
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
          className={cn(isLuxury ? 'px-8 lg:px-16 xl:px-20 py-16 lg:py-24' : '')}
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

          {stats.length > 0 && (
            <div
              className={cn(
                'grid grid-cols-3 gap-6 pt-8 border-t',
                isLuxury ? 'border-white/10' : 'border-template-border',
              )}
            >
              {stats.map((stat, i) => (
                <div key={i}>
                  <div
                    className={cn(
                      'font-heading text-3xl font-normal',
                      isLuxury ? 'text-white' : 'text-template-fg',
                    )}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={cn(
                      'text-[10px] tracking-[0.25em] uppercase mt-1.5 font-sans',
                      isLuxury ? 'text-white/35' : 'text-template-fg/50',
                    )}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
