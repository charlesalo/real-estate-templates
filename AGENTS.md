<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Three templates, three designs

`luxury-agent`, `modern-team` and `local-expert` are sold as separate products. They are *meant* to look nothing alike. Visual similarity between them is a coincidence, not a refactoring opportunity.

## Where components live

Each template owns its components:

```
app/(templates)/<template>/
  _components/
    layout/       navbar, footer, side menu, contact modal, exit-intent
    sections/     page sections
    listings/     property cards, detail, search
    lead-tools/   calculators, valuation widgets
    ui/           modals and primitives for this template
  <route>/page.jsx
  <route>/SomeClient.jsx    <- used by exactly one page? keep it beside that page
```

`_components` is a Next private folder, excluded from routing. Add only the subfolders a template actually needs — `local-expert` has `maps/` and no `sections/`.

The root `components/` directory is **only** for code two or more templates genuinely share: `auth/`, `sanity/`, `ui/` primitives, and `real-estate/` (`PriceTag`, `MapView`). Plus `landing/`, which belongs to the marketing site rather than any template.

## The rule that keeps it that way

> **`components/` may not contain a brand color, a font, or a template name.**

Anything with `#C9A96E` in it belongs to `luxury-agent`. If you are reaching for a `template` prop so one component can serve two designs, stop and write the second component instead — that pattern is how this codebase previously accumulated hundreds of lines of unreachable styling branches.

Shared *logic* is a different thing and is welcome: `lib/mortgage.js` backs three visually distinct calculators. Extract behaviour, not markup.

### How a genuinely shared component gets themed

Two mechanisms, and which one you need depends on where the value ends up:

**CSS — use the `--template-*` tokens.** Each template layout wraps its subtree in a scope class (`luxury-agent`, `modern-team`, `local-expert`) that defines the whole palette in `app/globals.css`. A shared component just writes `bg-template-accent`, `text-template-text-muted`, `border-template-border` and adapts automatically, with no props. `components/auth/AuthModal` and `AccountMenu` work this way — that is why they can be shared by templates that look nothing alike. Available: `bg`, `fg`, `accent`, `accent-fg`, `accent-hover`, `accent-muted`, `accent-soft`, `surface`, `border`, `overlay`, `panel`, `text-body`, `text-muted`, `text-subtle`.

**JavaScript values — pass a theme prop.** Colors that never become CSS classes can't read the tokens. `components/real-estate/MapView` takes a `theme` prop because Mapbox basemap URLs and canvas-drawn marker colors are JS strings; each template owns its palette in `_components/listings/mapTheme.js`. Such a component may keep a brand-*neutral* documented fallback so it renders standalone — that is the one exception to the rule above.

A `template` prop is still fine when it carries *data* rather than styling — `MapView` uses it for the listing route segment, `AuthModal` records it as `signup_template`. Neither may default to a specific template name.

## Imports

Inside a template, import relatively:

```js
import Navbar from './_components/layout/Navbar'
import PropertyDetail from '../../_components/listings/PropertyDetail'
```

A template folder should be copyable into a client repo and still resolve. Use the `@/` alias only to reach genuinely shared code (`@/lib/…`, `@/components/auth/…`).

## Lead capture

Every form posts to `/api/leads/capture` — there is no per-form endpoint. Send `formType` (one of the keys in that route's `AUTO_REPLY` map: `contact`, `valuation`, `showing`, `market-report`, `mortgage-cta`, `gated-search-signup`, `landing-contact`) and a `leadSource` following the existing convention, e.g. `'Modern Team - Schedule a Tour'`. Read the response and surface failures; do not `catch {}` and show a success screen — that bug silently dropped every modern-team tour request until `691b7fd`.

`app/api/contact/` exists but nothing references it. Don't add to it.

## History

This was not always the structure. Components were grouped by kind, with template names smuggled into filenames (`ModernTeamNavbar.jsx`). 49 of 58 files served exactly one template, and several carried branches for templates that never called them. See commits `d541556` through `691b7fd`.
