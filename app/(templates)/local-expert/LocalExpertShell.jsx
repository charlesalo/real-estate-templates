'use client'

import { useState } from 'react'
import LocalExpertNavbar from '@/components/layout/LocalExpertNavbar'
import LocalExpertFooter from '@/components/layout/LocalExpertFooter'
import LocalExpertContactModal from '@/components/layout/LocalExpertContactModal'

export default function LocalExpertShell({ agent, children }) {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <LocalExpertNavbar
        agentName={agent.name}
        phone={agent.phone}
        onContactOpen={() => setContactOpen(true)}
      />
      <main>{children}</main>
      <LocalExpertFooter agent={agent} />
      <LocalExpertContactModal
        agent={agent}
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  )
}
