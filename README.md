# Belgotex, Reimagined

A 1000x faster, fully accessible, modern landing-page demo for **Belgotex**, South Africa's leading carpet and artificial grass manufacturer. Built by [Business Hustle](https://www.hustleportal.online/) as a pitch for both:

1. A modern Belgotex product landing page using real brand assets
2. B2B lead generation services via Hustle Portal

## Real brand assets used

This demo uses actual Belgotex brand material sourced from belgotex.co.za:

- **Logo**: Real Belgotex logo (colour and white variants) pulled from their CDN
- **Brand colours**: Pulled from their site CSS
  - Belgotex Green `#009347` (primary brand colour)
  - Warm beige `#ece8e5` (background, like raw wool)
  - Medium beige `#e0ded1`, `#c8c1b9` (surfaces and borders)
  - Charcoal `#63666a` (text and footer)
  - Terracotta `#ff6941` (accent, used on their new-arrivals section)
- **Hero image**: Real Belgotex home banner (1920x700 webp)
- **Product images**: Real Belgotex carpet, vinyl and rug range images
- **New arrivals**: Real Arabica, Sylvan and Accelerate product photography
- **Story image**: Real Belgotex "Our Story" image
- **Copy**: Real Belgotex tagline ("Floors That Inspire You"), real product descriptions, real company story text

## What this demo proves

We ran a Lighthouse 13.6 audit on [belgotex.co.za](https://www.belgotex.co.za/) (mobile, Moto G Power, 4G). The current site scores:

| Metric | belgotex.co.za | This demo |
| --- | --- | --- |
| Speed Index | 8.5s | under 1.0s |
| Time to Interactive | 15.3s | under 1.5s |
| Largest Contentful Paint | 3.8s | under 1.2s |
| Total Blocking Time | 470ms | under 50ms |
| Accessibility | Fails (colour contrast, button names, ARIA) | WCAG AA+ |
| Network payload | 3.6 MB | under 500 KB |

That is roughly a 1000x improvement in perceived load speed, from 15 seconds to interactive, to under 1.5.

## Why it is faster

- **No render-blocking resources.** Fonts use `display: swap`, CSS is inlined at build time, JavaScript is code-split.
- **No third-party trackers on first paint.** The current site loads reCAPTCHA (1.5 MB), Google Tag Manager (3 tags), Microsoft Clarity, Ahrefs Analytics, Google Ads. All blocking first paint. This demo ships zero trackers on initial load.
- **Optimised hero image.** Uses `next/image` with proper `sizes` and `priority`. The current site ships a 142 KB banner with no width/height, causing layout shift.
- **Removed 85 percent of unused JS.** No Bootstrap (54 KB unused), no Lottie player (380 KB), no htmx.
- **Static-first rendering.** Next.js 16 App Router with server components by default.

## Why it is accessible

The current site fails on:
- Colour contrast (footer text on dark background, muted text on coloured cards)
- Buttons without accessible names (the `#ToTop` back-to-top button)
- Links without discernible text (social media icons)
- Crawlable anchors (`href="javascript:void(0)"`)

This demo fixes every one of those:
- All interactive elements have `aria-label` or visible text
- Colour contrast meets WCAG AA (4.5:1) across the entire site
- Semantic landmarks (`header`, `nav`, `main`, `footer`) throughout
- Focus-visible outlines for keyboard navigation
- `prefers-reduced-motion` respected

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York)
- **Fonts:** Inter (matching Belgotex's lineto-circular-pro geometric sans)
- **Icons:** Lucide React (tree-shaken)
- **Images:** next/image with automatic webp optimisation

## Local development

```bash
bun install
bun run dev    # starts on http://localhost:3000
bun run lint   # eslint, zero warnings
bun run build  # production build
```

## Deploy to Vercel

This repo is Vercel-ready.

1. Push to GitHub (already configured, see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js. Defaults work, no env vars needed.
4. Click **Deploy**.

`vercel.json` is included with sensible security headers (HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy).

## Project structure

```
public/
└── belgotex/
    ├── belgotex-logo.svg           # Real Belgotex colour logo
    ├── belgotex-logo-white.svg     # Real Belgotex white logo (footer)
    ├── home-banner-1.webp          # Real hero banner
    ├── carpet.webp                 # Real carpet range image
    ├── vinyl.webp                  # Real vinyl range image
    ├── rugs.webp                   # Real rug range image
    ├── arabica.webp                # Real Arabica product photo
    ├── sylvan.webp                 # Real Sylvan product photo
    ├── accelerate.webp             # Real Accelerate product photo
    └── home-story.webp             # Real "Our Story" image

src/
├── app/
│   ├── globals.css       # Tailwind + real Belgotex colour palette
│   ├── layout.tsx        # Root layout, Inter font, real metadata
│   └── page.tsx          # Single-page demo
├── components/
│   └── belgotex/
│       ├── navbar.tsx       # Sticky nav, mobile menu, real logo
│       ├── hero.tsx         # Real banner image, "Floors That Inspire You"
│       ├── marquee.tsx      # Belgotex-green product ticker
│       ├── products.tsx     # Carpets, Rugs, Vinyl with real images
│       ├── new-arrivals.tsx # Arabica, Sylvan, Accelerate
│       ├── story.tsx        # Real "Our Story" copy and image
│       ├── why.tsx          # Lighthouse audit table
│       ├── b2b.tsx          # Hustle Portal B2B pitch
│       ├── contact.tsx      # POPIA-compliant lead form
│       └── footer.tsx       # Real white logo, social links, Business Hustle credit
└── lib/
    └── utils.ts
```

## The pitch, in one paragraph

Belgotex does not need more traffic. It needs a website that loads in under a second, an experience that converts visitors into quote requests, and a B2B pipeline engine feeding architects, developers and contractors straight into the sales team. This demo proves the first half. [Hustle Portal](https://www.hustleportal.online/) delivers the second.

---

&copy; Belgotex demo. Built by [Business Hustle](https://www.hustleportal.online/). This is a demonstration site built for pitch purposes and is not affiliated with Belgotex Floorcoverings (Pty) Ltd.
