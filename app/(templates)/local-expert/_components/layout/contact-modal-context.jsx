'use client'

import { createContext, useContext } from 'react'

// The modal itself lives in Shell, but the buttons that open it are scattered
// through server-rendered page sections that can't reach Shell's state. This
// carries the opener down to them.
const ContactModalContext = createContext(null)

export function ContactModalProvider({ value, children }) {
  return <ContactModalContext.Provider value={value}>{children}</ContactModalContext.Provider>
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext)
  if (!ctx) {
    throw new Error('useContactModal must be used within the local-expert Shell')
  }
  return ctx
}
