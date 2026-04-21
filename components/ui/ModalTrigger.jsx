'use client'

// Renders any children as a button that opens the ContactModal.
// Drop-in replacement for <Link href="/contact"> wherever the modal should appear.
export default function ModalTrigger({ children, className = '' }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
    >
      {children}
    </button>
  )
}
