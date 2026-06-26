'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ContactModal from './ContactModal';

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-sm text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors duration-200"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const open = () => setModalOpen(true);
    window.addEventListener('open-contact-modal', open);
    return () => window.removeEventListener('open-contact-modal', open);
  }, []);

  // Lock scroll and handle Escape when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const NAV_LINKS = [
    { href: '#templates', label: 'Templates' },
    { href: '#work', label: 'Work' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#how-it-works', label: 'How It Works' },
  ];

  return (
    <>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? 'bg-[#111111] border-[#2a2a2a]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/">
            <Image
              src="/images/landing-page/chavbuilds-horizontal.png"
              alt="Chavbuilds"
              width={160}
              height={40}
              className="h-8 md:h-9 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <NavLink key={href} href={href}>{label}</NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="hidden md:inline-flex text-sm font-semibold px-4 py-2 rounded-md bg-[#c4a882] text-[#111111] hover:bg-[#b8976e] transition-colors duration-200"
          >
            Get Started
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            aria-label="Open menu"
          >
            <span className="block w-5 h-px bg-[#e2e2e2]" />
            <span className="block w-5 h-px bg-[#e2e2e2]" />
            <span className="block w-3.5 h-px bg-[#e2e2e2]" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeMenu}
          />

          {/* Panel — full width */}
          <div
            ref={menuRef}
            className="absolute inset-y-0 right-0 w-full bg-[#111111] flex flex-col"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-[#2a2a2a] shrink-0">
              <a href="/" onClick={closeMenu}>
                <Image
                  src="/images/landing-page/chavbuilds-horizontal.png"
                  alt="Chavbuilds"
                  width={140}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
              </a>
              <button
                onClick={closeMenu}
                className="w-9 h-9 rounded-lg border border-[#2a2a2a] bg-[#1c1c1c] text-[#8a8a8a] hover:text-[#e2e2e2] flex items-center justify-center text-xl"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="text-2xl font-semibold text-[#e2e2e2] py-4 border-b border-[#2a2a2a] hover:text-[#c4a882] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* CTA at bottom */}
            <div className="px-6 pb-10 shrink-0">
              <button
                onClick={() => { closeMenu(); setModalOpen(true); }}
                className="w-full py-4 rounded-md bg-[#c4a882] text-[#111111] text-sm font-semibold hover:bg-[#b8976e] transition-colors duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
