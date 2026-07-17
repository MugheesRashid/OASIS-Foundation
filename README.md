# OASIS Foundation — Website (v1)

A production-grade Next.js build of the approved design blueprint for
[oasisfoundation.net](https://oasisfoundation.net). Built with the App
Router, Tailwind CSS v4, GSAP (ScrollTrigger), and Framer Motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build locally
```

Requires Node.js 18.18+ (Next.js 16 / React 19).

## Stack & architectural decisions

- **Next.js 16 App Router + TypeScript** — file-based routing, native
  `metadata`/`sitemap`/`robots`/`manifest` APIs for SEO out of the box.
- **Tailwind CSS v4** — theme tokens (colors, fonts, radii) are defined once
  in `src/app/globals.css` under `@theme inline`, so `bg-ink`, `text-ember`,
  `font-display`, etc. are all real Tailwind utilities, not one-off inline
  styles.
- **GSAP + ScrollTrigger** is used specifically for *scroll-choreographed*
  motion: the signature `EmberRail` progress trail, and the pinned
  "Who We Are" narrative panel. **Framer Motion** handles everything else —
  component-level enter animations, hover/tap states, the FAQ accordion,
  and the mobile menu. Splitting the responsibility this way avoids the two
  libraries fighting over the same element.
- **Lenis** provides the smoothed/eased scroll feel, synced into GSAP's
  ScrollTrigger ticker so pinned/scrubbed animations don't drift out of
  alignment with the eased scroll position.
- **next-themes** drives the dark/light toggle. Dark is the default and
  primary brand register (`data-theme="dark"`); light mode is a genuinely
  designed secondary palette, not a mechanical inversion — see the
  `[data-theme="light"]` block in `globals.css`.
- **Self-hosted variable fonts** (Bricolage Grotesque, Instrument Sans,
  JetBrains Mono) live in `public/fonts/` and load via `@font-face` in
  `globals.css`, so there's no runtime dependency on Google Fonts' CDN and
  no external request blocking First Contentful Paint.

## Folder structure

```
src/
  app/
    layout.tsx         Root layout: fonts, metadata, JSON-LD, providers
    page.tsx            Assembles all sections in order
    template.tsx        Route-transition wrapper (Framer Motion)
    globals.css          Design tokens, @font-face, base styles
    sitemap.ts / robots.ts / manifest.ts    Generated SEO/PWA files
  components/
    layout/             Header, Footer, EmberRail, Providers, ThemeToggle
    sections/            One file per page section (Hero, Mission, FAQ, …)
    ui/                  Reusable primitives (Button, Card, Reveal, …)
  hooks/                useSmoothScroll, useCountUp
  lib/
    data.ts              All site copy/content — edit here, not in components
    utils.ts              cn() class-merging helper
public/
  fonts/                 Self-hosted variable font files
```

## Content

All copy lives in `src/lib/data.ts`, pulled directly from the live
oasisfoundation.net site (pillars, FAQ, volunteer roles, differentiators,
etc.). Update that one file to change site-wide text — no component edits
needed for copy changes.

## Known placeholders to replace before launch

- **Documentary photography** — the "Proof" section currently renders
  styled gradient placeholders labeled with what should go there (e.g.
  "Campus workshop — Lahore"). Swap the `SpotlightCard` children in
  `src/components/sections/Proof.tsx` for real `<Image>` components once
  photos/video are available.
- **Founder photo** — `Team.tsx` currently renders an initials avatar
  instead of a photo; swap in an `<Image>` once a headshot is available.
- **OG image** — `layout.tsx` references `/og-image.png` for social share
  previews; add a 1200×630 image at `public/og-image.png`.
- **Reach map** — the Pakistan outline in `ReachMap.tsx` is a simplified,
  illustrative SVG path, not a geographically precise map.
- **Join form** — `JoinCTA.tsx` currently just captures an email into local
  component state for demonstration. Wire it to your actual form
  backend/ESP (e.g. a serverless route, Formspree, Google Form redirect).

## Performance & accessibility notes

- All entrance/hover motion respects `prefers-reduced-motion`: GSAP-driven
  effects (EmberRail, pinned scroll) skip entirely, Framer Motion effects
  fall back to instant/opacity-only transitions, and a global CSS backstop
  caps any remaining animation duration to near-zero.
- Fonts are self-hosted, subset to single variable-font files, and use
  `font-display: swap`.
- Images should be served via `next/image` once real photography is added,
  to get automatic responsive `srcset`/AVIF/WebP output.
- Semantic landmarks (`header`, `main`, `footer`), visible focus rings, and
  accessible accordion/menu markup (`aria-expanded`, `aria-controls`) are
  in place throughout.

## Deploying

Any Next.js host works (Vercel is the zero-config option). No environment
variables are required for this v1 — everything is static content plus
client-side interactivity.
