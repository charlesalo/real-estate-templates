# Gated MLS Search — Setup

The Home Search on **modern-team** and **luxury-agent** is behind a registration wall:
signed-out visitors get 6 results and a teaser listing page, signed-up visitors get
everything. Sign-ups land in HubSpot and get a Resend auto-reply, same as every other lead
source on the site. **local-expert** is not ported yet.

Auth is Supabase, one project per client deployment — the same "you own your data" model
already used for Sanity.

**The gate is off until Supabase is configured.** With `NEXT_PUBLIC_SUPABASE_URL` /
`NEXT_PUBLIC_SUPABASE_ANON_KEY` unset, search behaves exactly as it did before this
feature existed. That's what keeps local checkouts and un-onboarded deployments working.

---

## 1. Create the Supabase project

1. [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
2. Name it after the deployment (e.g. `hargrove-group-website`). Pick the region closest
   to the client's market.
3. Save the database password somewhere safe — you won't need it for this feature, but
   Supabase won't show it again.

## 2. Run the migration

**SQL Editor** → **New query** → paste all of
[`supabase/migrations/0001_gated_search.sql`](../supabase/migrations/0001_gated_search.sql)
→ **Run**.

This creates `profiles` and `saved_searches`, turns on Row Level Security with
owner-only policies on both, and installs the `on_auth_user_created` trigger that
bootstraps a profile row for every new user. It's written to be safe to re-run.

Verify: **Table Editor** should show both tables with an **RLS enabled** badge.

## 3. Configure auth providers

**Authentication → Sign In / Providers**:

- **Email** — enabled by default. Turn **Confirm email** *off* for the smoothest lead
  capture: the visitor is signed in the instant they submit and the wall drops on the
  results they're already looking at. Leaving it on works too — the modal switches to a
  "check your inbox" state and the confirmation link routes back through
  `/auth/callback` to the page they came from. It just costs you conversions.
- **Google** — enable it and paste in the same OAuth client already used for Google One
  Tap (`NEXT_PUBLIC_GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` in `.env.local`). Add
  Supabase's callback URL — shown on that provider panel, in the form
  `https://<project-ref>.supabase.co/auth/v1/callback` — to the **Authorized redirect
  URIs** of that client in the Google Cloud console.

**Authentication → URL Configuration**:

- **Site URL**: the deployment's origin (`https://re-templates.chavbuilds.com`).
- **Redirect URLs**: add `https://re-templates.chavbuilds.com/auth/callback` and, for
  local work, `http://localhost:3000/auth/callback`.

## 4. Set the env vars

From **Project Settings → API**:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=
```

Prefer the modern `sb_publishable_...` key over the legacy JWT `anon` key — it rotates
independently. Both work; the env var keeps the `ANON_KEY` name for continuity.

The service role key is **optional and best left blank**. It bypasses RLS, and nothing on
the request path uses it: `lib/supabase/admin.js` is `server-only` and exists for
backfills. Fill it in only when you actually need one, and never in a `NEXT_PUBLIC_` var.

## 5. Verify end to end

With the vars set and the dev server running:

1. **Signed out**, open `/modern-team/listings` — 6 cards, locked placeholders, and a
   "Sign Up to See All N Results" panel. View source: only 6 listings are in the HTML.
2. Open a listing — teaser only (one photo, price, address, beds/baths/sqft) plus the
   gate. The full description, gallery, and agent details aren't in the payload.
3. Sign up. The wall should drop without a page reload.
4. Check HubSpot for a new contact with lead source
   **"Modern Team - Gated Search Signup (Email)"** (or `(Google)`, or
   **"Luxury Agent - …"** if you tested there), and check both inboxes for the agent
   notification and the `gated-search-signup` auto-reply.
5. Set some filters, hit **Save Search**, then open **Saved Searches** from the account
   menu. Deleting should work; **View** should restore the filters.
6. Sign in a second time — no duplicate HubSpot contact, no second auto-reply. That's
   `profiles.lead_synced_at` doing its job.

---

## Two Google sign-in paths

There are two, and they need different things configured:

| Path | Component | Supabase call | Needs |
| --- | --- | --- | --- |
| "Continue with Google" button in the auth modal | `AuthModal` | `signInWithOAuth` (redirect) | Google provider enabled **and** Supabase's callback in the Google client's Authorized redirect URIs |
| Google One Tap prompt | `GoogleOneTap` with `supabaseAuth` | `signInWithIdToken` (ID token + nonce) | Google provider enabled with the matching Client ID. No redirect URI involved |

`GoogleOneTap` only talks to Supabase when passed `supabaseAuth` — modern-team and
luxury-agent do; the landing page and local-expert don't, and they keep the original
verify-then-web3forms behaviour. That prop is the switch to flip when porting.

Don't enable both notification paths for one template. In Supabase mode the web3forms
ping is deliberately skipped, because `SIGNED_IN` already routes the signup through
`/api/auth/sync-lead` into HubSpot and Resend.

## How the gate is enforced

Everything that matters happens on the server. `lib/gating.js` is the only place that
decides what a request may see, and it's called from three places:

| Where | What it does |
| --- | --- |
| `app/api/listings/search/route.js` | Truncates the result set and pins `limit`/`offset` so a signed-out caller can't page past the preview |
| `app/(templates)/<template>/listings/page.jsx` | Applies the same gate to the server-rendered first paint |
| `app/(templates)/<template>/listings/[id]/page.jsx` | Swaps the full detail component for `previewListing()` output |

The two ported templates each hold their own copy of those two pages and of the
`GatedListing` / `GateCTA` / `LockedCard` presentation, because they are meant to look
nothing alike. Only the decisions in `lib/gating.js` are shared.

The `gated` flag the search client holds is presentation only — it decides whether to
draw the CTA. Flipping it in devtools gets you nothing, because the withheld listings
were never fetched into the response.

Session identity comes from `lib/auth/session.js`, which uses `supabase.auth.getUser()`
(revalidates the JWT against Supabase) rather than `getSession()` (decodes the cookie,
forgeable). It's wrapped in React `cache()` so one render pass costs one round trip.

`proxy.js` refreshes the session cookie on `/modern-team/*` and `/luxury-agent/*`. It does
**not** enforce anything — Server Components can't write cookies, so without it a
signed-in visitor would silently drop back behind the wall when their access token
expired.

## Known gap during rollout

`/api/listings` is still open and ungated. It has to be — local-expert's search and
luxury-agent's Past Transactions both read from it, and neither is behind the wall.
Someone who opens devtools on a gated template can call it directly and get untruncated
results.

Closing this is the last step of the rollout: port the pattern to local-expert, move Past
Transactions onto a dedicated sold-comps endpoint, and then delete `/api/listings`.

## Porting to another template

1. Wrap the template's layout in `AuthProvider` and mount `AuthModal` inside it, passing
   that template's `teamName` and `template` slug. Pass `supabaseAuth` to `GoogleOneTap`
   in the same layout.
2. Drop `AccountMenu` into the template's navbar with a `savedSearchesHref`, and give it
   a `saved-searches` route to point at. `AuthModal` and `AccountMenu` theme themselves
   off the `--template-*` tokens, so neither needs restyling — but `GateCTA`,
   `LockedCard` and the gated detail view are that template's own markup and do.
3. Point the template's search client at `/api/listings/search` and have it read `gated`,
   `hiddenCount` and `approximate` off the response. Wire the refetch-on-sign-in effect
   too, or the wall stays up until the visitor reloads.
4. Apply `resolveGate()` + `gateSearchResults()` in its listings page, and
   `previewListing()` in its detail page.
5. Add the template slug to the `TEMPLATES` allowlist in
   `app/api/saved-searches/route.js`. `saved_searches.template` already scopes each
   user's list per site, so no migration is needed. All three slugs are already listed.
6. Add the template's paths to the `matcher` in `proxy.js`.

## Email alerts (not built)

`saved_searches.alert_frequency` accepts `instant` / `daily` / `weekly` and is written as
`null` by everything today. It's the hook for the future alert feature — nothing reads it
yet, and the Saved Searches page says so.
