'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxBanner({
  src,
  alt = '',
  priority = false,
  objectPosition = 'object-center',
  overlayOpacity = 'bg-black/75',
  children,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <div
      ref={ref}
      className="relative border-b border-white/10 py-20 lg:py-28 px-6 lg:px-8 overflow-hidden"
    >
      <motion.div className="absolute inset-[-15%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={`object-cover ${objectPosition}`}
        />
      </motion.div>
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      <div className="relative max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )
}
