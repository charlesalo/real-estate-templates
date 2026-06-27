import { Resend } from 'resend'

const HUBSPOT_URL = 'https://api.hubapi.com/crm/v3/objects/contacts'
const OWNER_ID    = '94414048'
const FROM        = 'notifications@resend.dev' // replace with verified domain once set up

const resend = new Resend(process.env.RESEND_API_KEY)

function splitName(name = '') {
  const parts = name.trim().split(/\s+/)
  return {
    firstname: parts[0] ?? '',
    lastname:  parts.length > 1 ? parts.slice(1).join(' ') : '',
  }
}

// ── Email: agent notification ─────────────────────────────────────────────────

async function sendAgentNotification({ firstname, lastname, email, phone, message }) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone:  'America/Chicago',
    dateStyle: 'full',
    timeStyle: 'short',
  })
  try {
    await resend.emails.send({
      from:    FROM,
      to:      process.env.AGENT_EMAIL,
      subject: `New Lead: ${firstname} ${lastname}`.trim(),
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111827">
          <h2 style="color:#1A2D5A;margin-bottom:4px">New Contact Form Submission</h2>
          <p style="color:#6B7280;font-size:13px;margin-top:0">Source: Modern Team Contact Form</p>
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

async function sendLeadAutoReply({ firstname, email, message }) {
  try {
    await resend.emails.send({
      from:    FROM,
      to:      email,
      subject: "Got your message — let's talk about your project",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111827">
          <h2 style="color:#1A2D5A;margin-bottom:4px">Thanks for reaching out, ${firstname}!</h2>
          <p style="color:#374151;font-size:14px;line-height:1.6">
            I received your message and wanted to confirm it came through:
          </p>
          <blockquote style="background:#F9FAFB;border-left:3px solid #1A2D5A;padding:12px 16px;margin:16px 0;font-size:14px;color:#374151">
            ${message || '—'}
          </blockquote>
          <p style="color:#374151;font-size:14px;line-height:1.6">
            I'll review your project details and get back to you within 24 hours with next steps.
            If anything is urgent, feel free to call or text me directly at ${process.env.AGENT_PHONE}.
          </p>
          <p style="color:#374151;font-size:14px;line-height:1.6">
            In the meantime, feel free to take a look at some of the real estate website templates I've built:
            <a href="https://re-templates.chavbuilds.com" style="color:#1A2D5A">re-templates.chavbuilds.com</a>
          </p>
          <p style="color:#374151;font-size:14px">
            Talk soon,<br/>
            ${process.env.AGENT_NAME}<br/>
            <span style="color:#6B7280;font-size:13px">chavbuilds</span>
          </p>
        </div>
      `,
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
    const { name, firstName: rawFirst, lastName: rawLast, email, phone, message } = body

    if (!email) {
      return Response.json({ success: false, error: 'Email is required.' }, { status: 400 })
    }

    let firstname = rawFirst ?? ''
    let lastname  = rawLast  ?? ''
    if (name && !firstname) {
      ;({ firstname, lastname } = splitName(name))
    }

    // HubSpot property internal names:
    // email, firstname, lastname, phone, inquiry_message, hubspot_owner_id
    const properties = {
      email,
      firstname,
      lastname,
      hubspot_owner_id: OWNER_ID,
    }
    if (phone)   properties.phone           = phone
    if (message) properties.inquiry_message = message

    // All three fire in parallel. Each email has its own try/catch so neither
    // blocks the other. Promise.allSettled ensures HubSpot failure never
    // prevents emails from sending (and vice versa).
    const [hubspotResult, emailsResult] = await Promise.allSettled([
      upsertHubSpotContact(properties),
      Promise.all([
        sendAgentNotification({ firstname, lastname, email, phone, message }),
        sendLeadAutoReply({ firstname, email, message }),
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
