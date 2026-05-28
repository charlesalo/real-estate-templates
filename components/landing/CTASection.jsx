'use client';

import { useRef, useEffect } from 'react';
import CTAButton from './CTAButton';

export default function CTASection() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // How far the section has traveled through the viewport (-1 → 1)
      const progress = -rect.top / (rect.height + viewportH);
      // Move image at ~35% of scroll speed; scale up slightly to hide gaps
      img.style.transform = `translateY(${progress * rect.height * 0.35}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Background image — scaled up so parallax never shows edges */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?q=80&w=2071&auto=format&fit=crop"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-[130%] object-cover -top-[15%] will-change-transform"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#111111]/80" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-6">Ready to get started?</p>
        <h2
          className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          Let&apos;s build your site.
        </h2>
        <p className="text-white/55 mb-10 max-w-md mx-auto">
          Tell me about your brand, your market, and your goals. I&apos;ll take it from there.
        </p>
        <CTAButton />
      </div>
    </section>
  );
}
