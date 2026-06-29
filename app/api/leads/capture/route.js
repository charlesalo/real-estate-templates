import { Resend } from 'resend'

const HUBSPOT_URL = 'https://api.hubapi.com/crm/v3/objects/contacts'
const OWNER_ID    = '94414048'
const FROM        = 'notifications@chavbuilds.com'

let resend
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY)
  return resend
}

function splitName(name = '') {
  const parts = name.trim().split(/\s+/)
  return {
    firstname: parts[0] ?? '',
    lastname:  parts.length > 1 ? parts.slice(1).join(' ') : '',
  }
}

// ── Lead auto-reply copy, by form type ─────────────────────────────────────────

const AUTO_REPLY = {
  contact: {
    subject: () => 'Thanks for checking out this template!',
    body: ({ firstname }) => `
      <p style="color:#374151;font-size:14px;line-height:1.6">Hi ${firstname || 'there'},</p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Thanks for reaching out through this demo site.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Just to clarify — this is a showcase template built by <strong>chavbuilds</strong>, a web
        development studio for real estate professionals. If you're a homebuyer or seller, this
        particular site isn't an active listing service.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        If you're a real estate agent exploring what your own website could look like, this exact
        lead capture system — connected to your own CRM — comes standard with every site I build.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Want to talk about building one for your business? Reply here or reach me at
        <a href="mailto:charlesalo@chavbuilds.com" style="color:#1A2D5A">charlesalo@chavbuilds.com</a>.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">— Charles</p>
    `,
  },
  valuation: {
    subject: () => 'About your home valuation request',
    body: ({ firstname }) => `
      <p style="color:#374151;font-size:14px;line-height:1.6">Hi ${firstname || 'there'},</p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Thanks for trying out the home valuation tool on this demo site!
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        A quick note — this is a showcase template, so this particular request won't generate a
        real property estimate.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        If you're an agent and curious how this tool would work on your own live website — pulling
        real market data and routing leads straight to your CRM — that's exactly what comes
        standard when you become a client.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Want to see it in action with your own listings? Reply here or reach me at
        <a href="mailto:charlesalo@chavbuilds.com" style="color:#1A2D5A">charlesalo@chavbuilds.com</a>.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">— Charles</p>
    `,
  },
  showing: {
    subject: () => 'About your showing request',
    body: ({ firstname }) => `
      <p style="color:#374151;font-size:14px;line-height:1.6">Hi ${firstname || 'there'},</p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Thanks for trying the showing request feature on this demo site!
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Just to clarify — this is a showcase template, so no actual showing has been scheduled
        (the property shown isn't real either!).
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        If you're a real estate agent evaluating templates, this exact feature — fully connected
        to your calendar and CRM — is included in every chavbuilds website.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Curious what this would look like for your listings? Reply here or reach me at
        <a href="mailto:charlesalo@chavbuilds.com" style="color:#1A2D5A">charlesalo@chavbuilds.com</a>.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">— Charles</p>
    `,
  },
  'market-report': {
    subject: ({ neighborhood }) => neighborhood ? `Your ${neighborhood} market report request` : 'Your market report request',
    body: ({ firstname }) => `
      <p style="color:#374151;font-size:14px;line-height:1.6">Hi ${firstname || 'there'},</p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Thanks for requesting a market report on this demo site!
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Just a quick note — this is a showcase template, so the "beautifully designed,
        hand-annotated PDF" won't actually be landing in your inbox this time around.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        But if you're a real estate agent who loved this feature — this exact market report
        tool, pulling real comps and building-type data for your own neighborhoods, is built
        into every chavbuilds website. Built monthly. Never generic. Exactly like the demo.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Curious what this would look like for your market? Reply here or reach me directly at
        <a href="mailto:charlesalo@chavbuilds.com" style="color:#1A2D5A">charlesalo@chavbuilds.com</a>.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">— Charles</p>
    `,
  },
  'mortgage-cta': {
    subject: () => 'About your pre-approval request',
    body: ({ firstname }) => `
      <p style="color:#374151;font-size:14px;line-height:1.6">Hi ${firstname || 'there'},</p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Thanks for trying out the mortgage calculator on this demo site!
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Just to clarify — this is a showcase template, so this particular pre-approval request
        won't be routed to a real lender.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        If you're a real estate agent evaluating templates, this exact calculator — complete with
        instant lead capture and CRM routing — comes standard on every chavbuilds website. Buyers
        get the numbers, you get the lead.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">
        Want to see it live with your own branding? Reply here or reach me directly at
        <a href="mailto:charlesalo@chavbuilds.com" style="color:#1A2D5A">charlesalo@chavbuilds.com</a>.
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6">— Charles</p>
    `,
  },
}

// ── Email: agent notification ─────────────────────────────────────────────────

async function sendAgentNotification({ firstname, lastname, email, phone, message, leadSource }) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone:  'America/Chicago',
    dateStyle: 'full',
    timeStyle: 'short',
  })
  try {
    await getResend().emails.send({
      from:    FROM,
      to:      process.env.AGENT_EMAIL,
      subject: `New Demo Lead: ${leadSource} - ${firstname} ${lastname}`.trim(),
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111827">
          <h2 style="color:#1A2D5A;margin-bottom:4px">New Lead Captured</h2>
          <p style="color:#6B7280;font-size:13px;margin-top:0">Source: ${leadSource}</p>
          <hr style="border:none;border-top:1px solid #E5E7EB;margin:16px 0"/>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6B7280;width:110px">Name</td><td style="padding:8px 0;font-weight:600">${firstname} ${lastname}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#1A2D5A">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Phone</td><td style="padding:8px 0">${phone || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280;vertical-align:top">Message</td><td style="padding:8px 0;white-space:pre-wrap">${message || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Timestamp</td><td style="padding:8px 0">${timestamp} CT</td></tr>
          </table>
        </div>
      `,
    })
    return true
  } catch (err) {
    console.error('[leads/capture] Agent notification failed:', err)
    return false
  }
}

// ── Email: lead auto-reply ────────────────────────────────────────────────────

async function sendLeadAutoReply({ firstname, email, message, formType, neighborhood }) {
  const template = AUTO_REPLY[formType] ?? AUTO_REPLY.contact
  try {
    await getResend().emails.send({
      from:    FROM,
      to:      email,
      subject: template.subject({ firstname, neighborhood }),
      html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111827">${template.body({ firstname, message })}</div>`,
    })
    return true
  } catch (err) {
    console.error('[leads/capture] Lead auto-reply failed:', err)
    return false
  }
}

// ── HubSpot upsert ────────────────────────────────────────────────────────────

async function upsertHubSpotContact(properties) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization:  `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
  }

  const createRes = await fetch(HUBSPOT_URL, {
    method: 'POST',
    headers,
    body:   JSON.stringify({ properties }),
  })

  if (createRes.ok) return { ok: true }

  if (createRes.status === 409) {
    const patchRes = await fetch(
      `${HUBSPOT_URL}/${encodeURIComponent(properties.email)}?idProperty=email`,
      { method: 'PATCH', headers, body: JSON.stringify({ properties }) }
    )
    if (patchRes.ok) return { ok: true }
    console.error('[leads/capture] HubSpot PATCH failed:', patchRes.status, await patchRes.text())
    return { ok: false }
  }

  console.error('[leads/capture] HubSpot POST failed:', createRes.status, await createRes.text())
  return { ok: false }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      name, firstName: rawFirst, lastName: rawLast,
      email, phone, message, neighborhood,
      leadSource = 'Unknown Source',
      formType   = 'contact',
    } = body

    if (!email) {
      return Response.json({ success: false, error: 'Email is required.' }, { status: 400 })
    }

    let firstname = rawFirst ?? ''
    let lastname  = rawLast  ?? ''
    if (name && !firstname) {
      ;({ firstname, lastname } = splitName(name))
    }

    // HubSpot property internal names:
    // email, firstname, lastname, phone, inquiry_message, hubspot_owner_id, lead_source, is_demo_lead
    const properties = {
      email,
      firstname,
      lastname,
      hubspot_owner_id: OWNER_ID,
      lead_source:      leadSource,
      is_demo_lead:     true,
    }
    if (phone)   properties.phone           = phone
    if (message) properties.inquiry_message = message

    // All three fire in parallel. Each email has its own try/catch so neither
    // blocks the other. Promise.allSettled ensures HubSpot failure never
    // prevents emails from sending (and vice versa).
    const [hubspotResult, emailsResult] = await Promise.allSettled([
      upsertHubSpotContact(properties),
      Promise.all([
        sendAgentNotification({ firstname, lastname, email, phone, message, leadSource }),
        sendLeadAutoReply({ firstname, email, message, formType, neighborhood }),
      ]),
    ])

    const hubspotOk = hubspotResult.status === 'fulfilled' && hubspotResult.value.ok
    const [agentOk, leadOk] = emailsResult.status === 'fulfilled'
      ? emailsResult.value
      : [false, false]

    if (!hubspotOk) console.error('[leads/capture] HubSpot upsert failed — agent email:', agentOk)
    if (!agentOk)   console.error('[leads/capture] Agent notification failed')
    if (!leadOk)    console.error('[leads/capture] Lead auto-reply failed')

    // Succeed if HubSpot or at least the agent notification captured the lead
    if (hubspotOk || agentOk) {
      return Response.json({ success: true })
    }

    return Response.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )

  } catch (err) {
    console.error('[leads/capture] Unexpected error:', err)
    return Response.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
