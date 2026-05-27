'use client'

export default function OpenContactButton({ label, className }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
      className={className}
    >
      {label}
    </button>
  )
}
