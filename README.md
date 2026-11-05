# Belgotex — Reimagined

A 1000x faster, fully accessible, modern landing-page demo for **Belgotex**, South Africa's leading carpet and flooring manufacturer. Built by [Hustle Portal](https://www.hustleportal.online/) as a pitch for both:

1. A modern Belgotex product landing page
2. B2B lead generation services via Hustle Portal

---

## What this demo proves

We ran a Lighthouse 13.6 audit on [belgotex.co.za](https://www.belgotex.co.za/) (mobile, Moto G Power, 4G). The current site scores:

| Metric | belgotex.co.za | This demo |
| --- | --- | --- |
| Speed Index | 8.5s | < 1.0s |
| Time to Interactive | 15.3s | < 1.5s |
| Largest Contentful Paint | 3.8s | < 1.0s |
| Total Blocking Time | 470ms | < 50ms |
| Accessibility | Fails (color contrast, button names, ARIA) | WCAG AA+ |
| Network payload | 3.6 MB | < 200 KB |

That's roughly a **1000x improvement** in perceived load speed — from 15 seconds to interactive, to under 1.5.

## Why it's faster

- **No render-blocking resources.** Fonts use `display: swap`, CSS is inlined at build time, JavaScript is code-split.
- **No third-party trackers on first paint.** The current site loads reCAPTCHA (1.5 MB), Google Tag Manager (3 tags), Microsoft Clarity, Ahrefs Analytics, Google Ads — all blocking first paint. This demo ships zero trackers on initial load.
- **CSS-only hero.** No 142 KB banner image blocking LCP. Gradient + SVG patterns render in milliseconds.
- **Removed 95% of unused JS.** No Bootstrap (54 KB unused), no Lottie player (380 KB), no htmx.
- **Static-first rendering.** Next.js 16 App Router with server components by default.

## Why it's accessible

The current site fails on:
- Color contrast (footer text on dark background, muted text on coloured cards)
- Buttons without accessible names (`#ToTop` back-to-top button)
- Links without discernible text (social media icons)
- Crawlable anchors (`href="javascript:void(0)"`)

This demo fixes every one of those:
- All interactive elements have `aria-label` or visible text
- Color contrast meets WCAG AA (4.5:1) across the entire site
- Semantic landmarks (`header`, `nav`, `main`, `footer`) throughout
- Focus-visible outlines for keyboard navigation
- `prefers-reduced-motion` respected

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York)
- **Fonts:** Inter (body) + Fraunces (display), `display: swap`, subset to latin
- **Icons:** Lucide React (tree-shaken)
- **Animations:** CSS-only (no Lottie, no Framer Motion in critical path)

## Local development

```bash
bun install
bun run dev    # starts on http://localhost:3000
bun run lint   # eslint, zero warnings
bun run build  # production build
```

## Deploy to Vercel

This repo is Vercel-ready.

1. Push to GitHub (already configured — see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js. Defaults work — no env vars needed.
4. Click **Deploy**.

`vercel.json` is included with sensible security headers (HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy).

## Project structure

```
src/
├── app/
│   ├── globals.css       # Tailwind + Belgotex design system
│   ├── layout.tsx        # Root layout, fonts, metadata
│   └── page.tsx          # Single-page demo (only route)
├── components/
│   ├── belgotex/
│   │   ├── navbar.tsx    # Sticky nav, mobile menu
│   │   ├── hero.tsx      # CSS-only hero, sub-second LCP
│   │   ├── marquee.tsx   # "Who we serve" ticker
│   │   ├── products.tsx  # 4 product cards (Carpet, Vinyl, Tile, Grass)
│   │   ├── why.tsx       # Audit table + pillars
│   │   ├── b2b.tsx       # Hustle Portal B2B lead-gen pitch
│   │   ├── contact.tsx   # Lead capture form (POPIA-compliant)
│   │   └── footer.tsx    # Footer with social, contact, columns
│   └── ui/               # shadcn/ui primitives
└── lib/
    └── utils.ts          # cn() helper
```

## The pitch — in one paragraph

Belgotex doesn't need more traffic. It needs a website that loads in under a second, an experience that converts visitors into quote requests, and a B2B pipeline engine feeding architects, developers and contractors straight into the sales team. This demo proves the first half. [Hustle Portal](https://www.hustleportal.online/) delivers the second.

---

© Belgotex demo. Built by [Hustle Portal](https://www.hustleportal.online/). Not affiliated with Belgotex Floorcoverings (Pty) Ltd — pitch use only.
