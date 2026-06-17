'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const WORK = [
  {
    name: 'Vilaire Estates',
    url: 'https://vilairestates.com/',
    img: '/images/work/vilairestates-og.jpg',
    description:
      'Editorial-style luxury real estate website with a bold, publication-inspired layout. Features rich typographic hierarchy and a content-forward design that puts the brand story front and center.',
    tags: ['HTML/SCSS', 'JavaScript', 'Editorial Theme', 'MLS Sync'],
  },
  {
    name: 'JD Adamson Realtor',
    url: 'https://jdadamsonrealtor.com/',
    img: '/images/work/jdadamson-og.jpg',
    description:
      'Sleek, modern agent site with rounded UI elements, accent-line pre-titles, and a customizable watermark — delivering a distinctive, polished brand identity with clean rectangular structure throughout.',
    tags: ['HTML/SCSS', 'JavaScript', 'Modern UI', 'Branding', 'MLS Sync'],
  },
  {
    name: 'Matt & Susan Real Estate',
    url: 'https://mattandsusanrealestate.com/',
    img: '/images/work/mattandsusan-og.jpg',
    description:
      'Modern team website with a cinematic scroll-down opening, geometric square and rectangle motifs throughout the layout, and deliberate use of negative space for a breathable, high-end feel.',
    tags: ['HTML/SCSS', 'JavaScript', 'Scroll Animation', 'MLS Sync'],
  },
  {
    name: 'Pineapple Place AAH',
    url: 'https://pineappleplaceaah.com/',
    img: '/images/work/pineappleplace-og.jpg',
    description:
      'Sharp, structured design language with hard corners on all UI elements and rectangular button styles — creating a confident, no-nonsense aesthetic that stands apart from typical luxury softness.',
    tags: ['HTML/SCSS', 'JavaScript', 'Sharp UI', 'MLS Sync'],
  },
  {
    name: 'Mad Chase Real Estate',
    url: 'https://madchaserealestate.com/',
    img: '/images/work/madchase-og.jpg',
    description:
      'Lead generation-focused luxury site built with highly unique visual elements — crafted to convert while maintaining an elevated, premium aesthetic throughout.',
    tags: ['HTML/SCSS', 'JavaScript', 'Lead Gen', 'Luxury UI', 'MLS Sync'],
  },
  {
    name: 'Napa Real Estate',
    url: 'https://naparealestate.com/',
    img: '/images/work/naparealestate-og.jpg',
    description:
      'Striking black-and-white template with split-screen effects on the hero and throughout key sections. Topographic line patterns woven into the UI elements for a distinctive, texture-rich feel.',
    tags: ['HTML/SCSS', 'JavaScript', 'Split-screen', 'B&W Design', 'MLS Sync'],
  },
];

export default function WorkSlider() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(2);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setContainerWidth(w);
      setPerPage(w >= 700 ? 2 : 1);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const totalPages = Math.ceil(WORK.length / perPage);

  // Clamp page when perPage changes (e.g. on resize)
  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  const gap = 24; // matches gap-6 (1.5rem)

  // Per page: 2 cards exactly fill the container (2 * (w-gap)/2 + gap = w)
  // So translateX = -page * containerWidth for both 1 and 2 per page
  const translateX = containerWidth > 0 ? -page * containerWidth : 0;

  const cardStyle =
    perPage === 2
      ? { width: `calc(50% - ${gap / 2}px)`, flexShrink: 0 }
      : { width: '100%', flexShrink: 0 };

  return (
    <div>
      {/* Attribution / description */}
      <p className="text-[#8a8a8a] text-sm leading-relaxed mb-10 max-w-3xl">
        Built during my contract engagement with{' '}
        <strong className="text-[#e2e2e2] font-semibold">Luxury Presence</strong> — an
        award-winning real estate web platform trusted by over 30% of the{' '}
        <em>Wall Street Journal</em>&apos;s top agents. Each site was customized using HTML, SCSS,
        and JavaScript, with full attention to brand identity, lead generation, MLS integration,
        SEO, and cross-device performance.{' '}
        <em>All sites are publicly available and remain the property of their respective clients.</em>
      </p>

      {/* Slider */}
      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ gap: `${gap}px`, transform: `translateX(${translateX}px)` }}
        >
          {WORK.map((item) => (
            <div
              key={item.name}
              style={cardStyle}
              className="rounded-xl border border-[#2a2a2a] bg-[#1c1c1c] overflow-hidden"
            >
              {/* Image with hover overlay */}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-video overflow-hidden"
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 px-5 py-2.5 rounded-md bg-[#c4a882] text-[#111111] text-sm font-semibold">
                    View Site
                  </span>
                </div>
              </a>

              {/* Content */}
              <div className="p-5">
                <h4 className="font-semibold text-[#e2e2e2] mb-2">{item.name}</h4>
                <p className="text-sm text-[#8a8a8a] leading-relaxed mb-4">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls: ← dots → */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="w-10 h-10 rounded-full bg-[#c4a882] text-[#111111] hover:bg-[#b8976e] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-sm"
          aria-label="Previous"
        >
          ←
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`rounded-full transition-all duration-200 ${
                i === page
                  ? 'w-6 h-2.5 bg-[#c4a882]'
                  : 'w-2.5 h-2.5 bg-[#2a2a2a] hover:bg-[#555555]'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          className="w-10 h-10 rounded-full bg-[#c4a882] text-[#111111] hover:bg-[#b8976e] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-sm"
          aria-label="Next"
        >
          →
        </button>
      </div>

      {/* CTA block */}
      <div className="mt-12 rounded-xl border border-[#2a2a2a] bg-[#1c1c1c] px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-2">Get in Touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e2e2e2] mb-2" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Want a site like these?</h2>
          <p className="text-sm text-[#8a8a8a] max-w-xl">
            A few highlights from 500+ website builds and revisions (200+ drafts, 300+ revisions) delivered while contracting at Luxury Presence.
          </p>
        </div>
        <button
          onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}
          className="shrink-0 px-6 py-3 rounded-md bg-[#c4a882] text-[#111111] text-sm font-semibold hover:bg-[#b8976e] transition-colors duration-200 whitespace-nowrap"
        >
          Build My Site
        </button>
      </div>
    </div>
  );
}
