'use client';

import { useState } from 'react';

const FIELDS = {
  firstName: '', lastName: '', email: '', phone: '',
  clientType: '', templateInterest: '', currentWebsite: '',
};

function validate(fields) {
  const errors = {};
  if (!fields.firstName.trim()) errors.firstName = 'Required';
  if (!fields.lastName.trim()) errors.lastName = 'Required';
  if (!fields.email.trim()) {
    errors.email = 'Required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email';
  }
  if (fields.phone && !/^[\d\s().+\-]{7,20}$/.test(fields.phone)) {
    errors.phone = 'Enter a valid phone number';
  }
  if (!fields.clientType) errors.clientType = 'Required';
  if (!fields.templateInterest) errors.templateInterest = 'Required';
  return errors;
}

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-[#8a8a8a] mb-1.5">
        {label}{required && <span className="text-[#c4a882] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputCls = (err) =>
  `w-full bg-[#111111] border rounded-lg px-4 py-2.5 text-sm text-[#e2e2e2] placeholder:text-[#8a8a8a] focus:outline-none transition-colors duration-200 ${
    err
      ? 'border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-400/40'
      : 'border-[#2a2a2a] focus:border-[#c4a882] focus:ring-2 focus:ring-[#c4a882]/40'
  }`;

// Shared accessibility props that link a field to its error message.
const a11yProps = (id, err) => ({
  id,
  'aria-invalid': err ? true : undefined,
  'aria-describedby': err ? `${id}-error` : undefined,
});

export default function CTAForm() {
  const [fields, setFields] = useState(FIELDS);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const set = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => { const n = { ...er }; delete n[key]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('submitting');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
          subject: 'New inquiry from chavbuilds.com',
          name: `${fields.firstName} ${fields.lastName}`,
          email: fields.email,
          phone: fields.phone,
          client_type: fields.clientType,
          template_interest: fields.templateInterest,
          current_website: fields.currentWebsite,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4 text-[#c4a882]">✓</div>
        <h3
          className="text-2xl font-bold text-[#e2e2e2] mb-2"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          I&apos;ll be in touch soon.
        </h3>
        <p className="text-[#8a8a8a] text-sm">Thanks for reaching out — expect a reply within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-2xl mx-auto space-y-4">
      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="cta-first-name" label="First name" required error={errors.firstName}>
          <input
            type="text"
            value={fields.firstName}
            onChange={set('firstName')}
            className={inputCls(errors.firstName)}
            {...a11yProps('cta-first-name', errors.firstName)}
          />
        </Field>
        <Field id="cta-last-name" label="Last name" required error={errors.lastName}>
          <input
            type="text"
            value={fields.lastName}
            onChange={set('lastName')}
            className={inputCls(errors.lastName)}
            {...a11yProps('cta-last-name', errors.lastName)}
          />
        </Field>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="cta-email" label="Email" required error={errors.email}>
          <input
            type="email"
            value={fields.email}
            onChange={set('email')}
            className={inputCls(errors.email)}
            {...a11yProps('cta-email', errors.email)}
          />
        </Field>
        <Field id="cta-phone" label="Phone number" error={errors.phone}>
          <input
            type="tel"
            value={fields.phone}
            onChange={set('phone')}
            className={inputCls(errors.phone)}
            {...a11yProps('cta-phone', errors.phone)}
          />
        </Field>
      </div>

      {/* Type + Template */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="cta-client-type" label="Are you an agent, team, or brokerage?" required error={errors.clientType}>
          <select
            value={fields.clientType}
            onChange={set('clientType')}
            className={`${inputCls(errors.clientType)} appearance-none`}
            {...a11yProps('cta-client-type', errors.clientType)}
          >
            <option value="" disabled>Please select</option>
            <option value="solo_agent">Solo Agent</option>
            <option value="team">Real Estate Team</option>
            <option value="brokerage">Brokerage</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </Field>
        <Field id="cta-template-interest" label="Which template interests you?" required error={errors.templateInterest}>
          <select
            value={fields.templateInterest}
            onChange={set('templateInterest')}
            className={`${inputCls(errors.templateInterest)} appearance-none`}
            {...a11yProps('cta-template-interest', errors.templateInterest)}
          >
            <option value="" disabled>Please select</option>
            <option value="luxury_agent">Luxury Agent</option>
            <option value="modern_team">Modern Team</option>
            <option value="custom">Custom Design</option>
            <option value="open">Open to recommendations</option>
          </select>
        </Field>
      </div>

      {/* Current website */}
      <Field id="cta-current-website" label="Your current website" error={errors.currentWebsite}>
        <input
          type="url"
          value={fields.currentWebsite}
          onChange={set('currentWebsite')}
          placeholder="https://"
          className={inputCls(errors.currentWebsite)}
          {...a11yProps('cta-current-website', errors.currentWebsite)}
        />
      </Field>

      {status === 'error' && (
        <p className="text-sm text-red-400 text-center">Something went wrong. Please email me directly.</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 rounded-lg bg-[#c4a882] text-[#111111] text-sm font-bold uppercase tracking-widest hover:bg-[#b8976e] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Get Started Now'}
      </button>
    </form>
  );
}
