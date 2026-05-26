'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function ContactModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl bg-[#161616] border border-[#2a2a2a] rounded-2xl overflow-hidden flex max-h-[90vh]">

        {/* ── Left: image panel ── */}
        <div className="hidden md:block relative w-[38%] shrink-0">
          <Image
            src="/images/landing-page/Contact Modal.jpg"
            alt=""
            fill
            className="object-cover"
          />
          {/* Subtle dark gradient over image bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* ── Right: form panel ── */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-9 h-9 rounded-lg border border-[#2a2a2a] bg-[#1c1c1c] text-[#8a8a8a] hover:text-[#e2e2e2] hover:border-[#555555] transition-colors duration-200 flex items-center justify-center text-lg"
            aria-label="Close"
          >
            ×
          </button>

          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-[#2a2a2a]">
            <h2
              className="text-3xl font-bold text-[#e2e2e2] leading-tight"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Let&apos;s build your site.
            </h2>
            <p className="text-sm text-[#8a8a8a] mt-2">
              or email us at{' '}
              <a href="mailto:charlesalo@chavbuilds.com" className="text-[#c4a882] hover:underline">
                charlesalo@chavbuilds.com
              </a>
            </p>
          </div>

          {/* Form */}
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="px-8 py-7 space-y-5"
          >
            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''} />
            <input type="hidden" name="subject" value="New inquiry from chavbuilds.com" />
            <input type="checkbox" name="botcheck" className="hidden" />

            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#8a8a8a] mb-1.5">
                  First name <span className="text-[#c4a882]">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#555555] focus:outline-none focus:border-[#c4a882]/60 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8a8a8a] mb-1.5">
                  Last name <span className="text-[#c4a882]">*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  required
                  className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#555555] focus:outline-none focus:border-[#c4a882]/60 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#8a8a8a] mb-1.5">
                  Email <span className="text-[#c4a882]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#555555] focus:outline-none focus:border-[#c4a882]/60 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8a8a8a] mb-1.5">Phone number</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#555555] focus:outline-none focus:border-[#c4a882]/60 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Type + Template */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#8a8a8a] mb-1.5">
                  Are you an agent, team, or brokerage? <span className="text-[#c4a882]">*</span>
                </label>
                <select
                  name="client_type"
                  required
                  defaultValue=""
                  className="cb-select w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] focus:outline-none focus:border-[#c4a882]/60 transition-colors duration-200 appearance-none"
                >
                  <option value="" disabled>Please select</option>
                  <option value="solo_agent">Solo Agent</option>
                  <option value="team">Real Estate Team</option>
                  <option value="brokerage">Brokerage</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#8a8a8a] mb-1.5">
                  Which template interests you? <span className="text-[#c4a882]">*</span>
                </label>
                <select
                  name="template_interest"
                  required
                  defaultValue=""
                  className="cb-select w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] focus:outline-none focus:border-[#c4a882]/60 transition-colors duration-200 appearance-none"
                >
                  <option value="" disabled>Please select</option>
                  <option value="luxury_agent">Luxury Agent</option>
                  <option value="modern_team">Modern Team</option>
                  <option value="custom">Custom Design</option>
                  <option value="open">Open to recommendations</option>
                </select>
              </div>
            </div>

            {/* Current website */}
            <div>
              <label className="block text-xs text-[#8a8a8a] mb-1.5">
                Your current website <span className="text-[#555555]">(optional)</span>
              </label>
              <input
                type="url"
                name="current_website"
                placeholder="https://"
                className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#555555] focus:outline-none focus:border-[#c4a882]/60 transition-colors duration-200"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs text-[#8a8a8a] mb-1.5">
                Anything else we should know? <span className="text-[#555555]">(optional)</span>
              </label>
              <textarea
                name="message"
                rows={3}
                className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#555555] focus:outline-none focus:border-[#c4a882]/60 transition-colors duration-200 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-[#c4a882] text-[#111111] text-sm font-bold uppercase tracking-widest hover:bg-[#b8976e] transition-colors duration-200"
            >
              Get Started Now
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
