'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const CLIENT_TYPE_LABELS = {
  solo_agent: 'Solo Agent',
  team: 'Real Estate Team',
  brokerage: 'Brokerage',
  unsure: 'Not sure yet',
};

const TEMPLATE_INTEREST_LABELS = {
  luxury_agent: 'Luxury Agent',
  modern_team: 'Modern Team',
  custom: 'Custom Design',
  open: 'Open to recommendations',
};

export default function ContactModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!isOpen) { setSubmitted(false); setSubmitError(''); return; }

    // Remember what had focus so we can restore it when the modal closes.
    const previouslyFocused = document.activeElement;

    const getFocusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => el.offsetParent !== null);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      // Trap focus within the dialog.
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog (first field) once it renders.
    const focusTimer = requestAnimationFrame(() => {
      const focusable = getFocusable();
      (focusable[0] ?? dialogRef.current)?.focus();
    });

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      cancelAnimationFrame(focusTimer);
      // Restore focus to the element that opened the modal.
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isOpen, onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    // Honeypot — bots fill every field, real users never see this one.
    if (data.botcheck) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    const currentWebsite = data.current_website?.trim();
    const normalizedWebsite = currentWebsite && !/^https?:\/\//i.test(currentWebsite)
      ? `https://${currentWebsite}`
      : currentWebsite;

    const message = [
      `Client type: ${CLIENT_TYPE_LABELS[data.client_type] ?? data.client_type}`,
      `Template interest: ${TEMPLATE_INTEREST_LABELS[data.template_interest] ?? data.template_interest}`,
      normalizedWebsite ? `Current website: ${normalizedWebsite}` : null,
      data.message ? `Message: ${data.message}` : null,
    ].filter(Boolean).join(' | ');

    try {
      const res = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone,
          message,
          leadSource: 'Landing Page - Contact Modal',
          formType: 'landing-contact',
          isDemoLead: false,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setSubmitError(json.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        tabIndex={-1}
        className="relative z-10 w-full max-w-4xl bg-[#161616] border border-[#2a2a2a] rounded-2xl overflow-hidden flex max-h-[90vh]"
      >

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
              id="contact-modal-title"
              className="text-3xl font-bold text-[#e2e2e2] leading-tight"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Let&apos;s build your site.
            </h2>
            <p className="text-sm text-[#8a8a8a] mt-2">
              or email me at{' '}
              <a href="mailto:charlesalo@chavbuilds.com" className="text-[#c4a882] hover:underline">
                charlesalo@chavbuilds.com
              </a>
            </p>
          </div>

          {/* Success state */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
              <div className="w-14 h-14 rounded-full bg-[#c4a882]/15 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#c4a882]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#e2e2e2] mb-3" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                Got it — I&apos;ll be in touch soon.
              </h3>
              <p className="text-sm text-[#8a8a8a] max-w-xs leading-relaxed">
                Thanks for reaching out. I personally review every inquiry and typically respond within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-8 px-8 py-3 rounded-lg bg-[#c4a882] text-[#111111] text-sm font-semibold hover:bg-[#b8976e] transition-colors duration-200"
              >
                Close
              </button>
            </div>
          ) : (

          /* Form */
          <form
            onSubmit={handleSubmit}
            className="px-8 py-7 space-y-5"
          >
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />

            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cm-first-name" className="block text-xs text-[#8a8a8a] mb-1.5">
                  First name <span className="text-[#c4a882]">*</span>
                </label>
                <input
                  id="cm-first-name"
                  type="text"
                  name="first_name"
                  required
                  className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#8a8a8a] focus:outline-none focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/40 transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="cm-last-name" className="block text-xs text-[#8a8a8a] mb-1.5">
                  Last name <span className="text-[#c4a882]">*</span>
                </label>
                <input
                  id="cm-last-name"
                  type="text"
                  name="last_name"
                  required
                  className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#8a8a8a] focus:outline-none focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/40 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cm-email" className="block text-xs text-[#8a8a8a] mb-1.5">
                  Email <span className="text-[#c4a882]">*</span>
                </label>
                <input
                  id="cm-email"
                  type="email"
                  name="email"
                  required
                  className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#8a8a8a] focus:outline-none focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/40 transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="cm-phone" className="block text-xs text-[#8a8a8a] mb-1.5">Phone number</label>
                <input
                  id="cm-phone"
                  type="tel"
                  name="phone"
                  className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#8a8a8a] focus:outline-none focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/40 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Type + Template */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cm-client-type" className="block text-xs text-[#8a8a8a] mb-1.5">
                  Are you an agent, team, or brokerage? <span className="text-[#c4a882]">*</span>
                </label>
                <select
                  id="cm-client-type"
                  name="client_type"
                  required
                  defaultValue=""
                  className="cb-select w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] focus:outline-none focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/40 transition-colors duration-200 appearance-none"
                >
                  <option value="" disabled>Please select</option>
                  <option value="solo_agent">Solo Agent</option>
                  <option value="team">Real Estate Team</option>
                  <option value="brokerage">Brokerage</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="cm-template-interest" className="block text-xs text-[#8a8a8a] mb-1.5">
                  Which template interests you? <span className="text-[#c4a882]">*</span>
                </label>
                <select
                  id="cm-template-interest"
                  name="template_interest"
                  required
                  defaultValue=""
                  className="cb-select w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] focus:outline-none focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/40 transition-colors duration-200 appearance-none"
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
              <label htmlFor="cm-current-website" className="block text-xs text-[#8a8a8a] mb-1.5">
                Your current website <span className="text-[#8a8a8a]">(optional)</span>
              </label>
              <input
                id="cm-current-website"
                type="text"
                name="current_website"
                placeholder="chavbuilds.com"
                className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#8a8a8a] focus:outline-none focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/40 transition-colors duration-200"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="cm-message" className="block text-xs text-[#8a8a8a] mb-1.5">
                Anything else I should know? <span className="text-[#8a8a8a]">(optional)</span>
              </label>
              <textarea
                id="cm-message"
                name="message"
                rows={3}
                className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#8a8a8a] focus:outline-none focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/40 transition-colors duration-200 resize-none"
              />
            </div>

            {submitError && (
              <p className="text-sm text-red-400" role="alert">{submitError}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-lg bg-[#c4a882] text-[#111111] text-sm font-semibold hover:bg-[#b8976e] disabled:opacity-60 transition-colors duration-200"
            >
              {submitting ? 'Sending…' : 'Get Started Now'}
            </button>
          </form>
          )}
        </div>

      </div>
    </div>
  );
}
