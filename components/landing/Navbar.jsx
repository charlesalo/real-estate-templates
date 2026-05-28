'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ContactModal from './ContactModal';

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm text-[#8a8a8a] hover:text-[#e2e2e2] transition-colors duration-200"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
            className="h-9 w-auto object-contain"
          />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#templates">Templates</NavLink>
          <NavLink href="#work">Work</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
        </nav>
        <button
          onClick={() => setModalOpen(true)}
          className="text-sm font-semibold px-4 py-2 rounded-md bg-[#c4a882] text-[#111111] hover:bg-[#b8976e] transition-colors duration-200"
        >
          Get Started
        </button>
      </div>
    </header>
    </>
  );
}
