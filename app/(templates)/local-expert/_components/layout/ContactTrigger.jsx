'use client'

import { useContactModal } from './contact-modal-context'

// A styled button that opens the shared contact modal. Takes className so each
// caller keeps its own treatment — the teaser CTA is cream-on-photo, and other
// placements will differ.
export default function ContactTrigger({ className, children }) {
  const { open } = useContactModal()

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  )
}
