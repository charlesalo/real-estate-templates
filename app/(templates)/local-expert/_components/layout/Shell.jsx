'use client'

import { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ContactModal from './ContactModal'
import GoogleOneTap from '@/components/auth/GoogleOneTap'

export default function Shell({ agent, children }) {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Navbar
        agentName={agent.name}
        phone={agent.phone}
        onContactOpen={() => setContactOpen(true)}
      />
      <GoogleOneTap clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} />
      <main>{children}</main>
      <Footer agent={agent} />
      <ContactModal
        agent={agent}
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  )
}
