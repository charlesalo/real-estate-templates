'use client';

export default function CTAButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
      className="px-8 py-4 rounded-md bg-[#c4a882] text-[#111111] text-sm font-semibold hover:bg-[#b8976e] transition-colors duration-200"
    >
      Get Started
    </button>
  );
}
