# CAFE CHIRO — カフェ チロ

Brand site for **カフェ チロ / CAFE CHIRO / 카페 치로**, a *fictional* contemporary
cat café in Minoh, Osaka. Built as a portfolio piece.

> Clean · Contemporary · Minimal · Korean-café · Geometric · Premium.
> Monochrome palette only — Charcoal `#111111`, Icy Grey `#E6E9EC`, White.

**This is a fictional café. The address, phone, email and social handles are all
placeholders — no real business is represented.**

---

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS 3 (hand-built design system) |
| i18n | Custom dictionary i18n · `/ja` `/en` `/ko` |
| Data (demo) | Browser `localStorage` store — reservations + News CMS work out of the box |
| Data (production) | Supabase (Postgres + Auth + RLS) — see `supabase/migrations` |
| Hosting | Vercel |

The reservation flow and the News CMS/Admin are **fully interactive in the demo**
using a `localStorage` store, so the site runs with zero external services.
`supabase/migrations/0001_init.sql` is the production backend (schema + RLS)
described in the brief; wiring notes are below.

---

## Run locally

Requires **Node.js 18.18+** (or 20+). Then:

```bash
npm install
npm run dev
```

Open <http://localhost:3000> — it redirects to `/ja`. Switch languages from the
header (JP / EN / KO).

Build for production:

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this folder to a Git repo and “Import Project” on Vercel (framework
   auto-detected as Next.js).
2. Optionally set env vars (see `.env.example`) — none are required for the demo.
3. Deploy.

---

## Key routes

| Path | Page |
|---|---|
| `/[locale]` | TOP (hero → about → cats → menu → price → reservation CTA → news → access) |
| `/[locale]/about` | About / concept |
| `/[locale]/cats` | The four cats (editorial profiles) |
| `/[locale]/menu` | Café menu |
| `/[locale]/price` | Cat charge + guide rules |
| `/[locale]/reservation` | 7-step booking demo (issues a code, e.g. `CHIRO-260814-A3F2`) |
| `/[locale]/news` · `/news/[slug]` | News list + article |
| `/[locale]/admin` | Admin — News CMS + reservations list |

### Admin

Go to `/ja/admin` (or `/en/admin`, `/ko/admin`). Demo passcode:

```
chiro-admin
```

(Override with `NEXT_PUBLIC_ADMIN_DEMO_PASSCODE`.) Admin can create / edit /
delete / draft / publish trilingual News articles and view all reservations.
Demo data lives in this browser only.

---

## Project structure

```
app/[locale]/         localized pages + layout, loading / error / not-found
components/            layout (header/footer/nav), home sections, ui, media,
                      news, reservation, admin, access, sections, brand
content/              cats, menu, guide, social, news.seed (trilingual)
lib/i18n/             locale config, dictionaries, client provider
lib/store/            localStorage stores (news, reservations)
lib/                  slots (hours/closed-Wed logic), format, seo, paths
messages/             ja.ts (source of truth) · en.ts · ko.ts
supabase/migrations/  0001_init.sql — production schema + RLS
app/icon.svg          favicon · IMAGE_PROMPTS.md — photography prompts
```

## Design system

Defined in `tailwind.config.ts` + `app/globals.css`. Monochrome tokens, fluid
`display-*` type scale, 4–8px radii, hairline borders, near-zero shadows,
200–600ms motion with `prefers-reduced-motion` honored. The geometric cat mark
is reconstructed as inline SVG (`components/brand/CatMark.tsx`).

## Photography

Real photos aren’t bundled — the site uses designed monochrome placeholders.
Generate photography from `IMAGE_PROMPTS.md` and follow its **Wiring** section to
swap in `next/image`.

## Switching to Supabase (production)

1. Create a Supabase project; run `supabase/migrations/0001_init.sql`.
2. Set `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Replace the `lib/store/*` calls with Supabase queries (reads via anon key
   respect RLS: only `published` news is public; reservation rows are staff-only;
   guests may only *insert* a booking). Use Supabase Auth for the Admin gate.

## Accessibility & SEO

Keyboard-navigable, visible focus rings, `aria` on interactive controls, form
labels + error messaging, reduced-motion support. Semantic HTML, per-page
`title`/`description`, canonical + `hreflang` alternates, `sitemap.xml`,
`robots.txt`, `WebSite` structured data. No false LocalBusiness data is emitted
(the café is fictional).
