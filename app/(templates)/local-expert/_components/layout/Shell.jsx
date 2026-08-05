'use client'

import { useMemo, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ContactModal from './ContactModal'
import { ContactModalProvider } from './contact-modal-context'
import GoogleOneTap from '@/components/auth/GoogleOneTap'

export default function Shell({ agent, children }) {
  const [contactOpen, setContactOpen] = useState(false)

  // Stable identity so page sections consuming the context don't re-render on
  // every open/close.
  const contactModal = useMemo(() => ({ open: () => setContactOpen(true) }), [])

  return (
    <ContactModalProvider value={contactModal}>
      <Navbar agentName={agent.name} phone={agent.phone} />
      <GoogleOneTap clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} />
      <main>{children}</main>
      <Footer agent={agent} />
      <ContactModal
        agent={agent}
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </ContactModalProvider>
  )
}
