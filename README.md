# Pulse — API Observability Platform

A premium landing page for **Pulse**, a fictional API observability platform for engineering teams. Built as a frontend engineering assessment for Acdyon Technologies.

> **Note:** Pulse is a product concept created for this assessment. It is not a real product, and no statistics, testimonials, or customer claims on this page are real.

---

## Product Concept

Pulse gives engineering teams real-time visibility into API performance — latency, error rates, throughput, and endpoint health — through a single, clean dashboard. The landing page demonstrates the product through an interactive dashboard preview with realistic (but clearly labeled) demo data.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | Component-based UI |
| TypeScript | ~5.8 | Type safety |
| Vite | 8 | Build tool and dev server |
| Tailwind CSS | 4 | Utility-first styling via CSS-first config |
| Recharts | 2 | Lightweight charting for the dashboard preview |

**Total production dependencies:** React, ReactDOM, Recharts (3 packages).

### Why this stack

- **Vite** — fastest dev server, zero config, industry standard for React projects
- **Tailwind v4** — CSS-first configuration (no `tailwind.config.js`), smaller output, `@theme` for design tokens
- **Recharts** — only charting library needed; declarative React API, no D3 dependency overhead
- **No Framer Motion** — scroll-reveal is done with a 44-line custom hook using `IntersectionObserver` + CSS `@keyframes`. Fewer dependencies, better performance, easier to explain.

---

## Local Setup

```bash
# Clone the repository
git clone <repo-url>
cd <repo-folder>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Build

```bash
npm run build
```

Output goes to `dist/`. Total build size: ~27kB CSS + ~567kB JS (gzipped: ~6kB CSS + ~169kB JS).

---

## Deployment

The `dist/` folder is a static site. Deploy to any static host:

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=dist

# GitHub Pages (via gh-pages)
npx gh-pages -d dist
```

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx       # Primary/secondary/ghost button
│   ├── EndpointTable.tsx # Endpoint health table
│   ├── LatencyChart.tsx  # P50/P95 latency area chart
│   ├── MetricCard.tsx    # Single metric with trend indicator
│   └── StatusBadge.tsx   # Health status dot + label
├── sections/            # Page-level sections (one per viewport area)
│   ├── Navbar.tsx       # Responsive nav with mobile hamburger
│   ├── Hero.tsx         # Headline, copy, CTA
│   ├── ProductPreview.tsx # Dashboard mock (visual centerpiece)
│   ├── Capabilities.tsx  # 3 feature cards
│   ├── HowItWorks.tsx   # 3-step flow
│   ├── FeatureDeepDive.tsx # Smart alerts feature + alert UI
│   ├── FinalCTA.tsx     # Closing CTA
│   └── Footer.tsx       # Minimal footer
├── data/
│   └── dashboardData.ts # Typed demo data for the dashboard
├── hooks/
│   └── useScrollReveal.ts # IntersectionObserver scroll-reveal hook
├── App.tsx              # Root component (section composition)
├── main.tsx             # Entry point
└── index.css            # Global styles + Tailwind theme tokens
```

---

## Design Decisions

See [DECISIONS.md](./DECISIONS.md) for detailed rationale on approach, trade-offs, and AI usage.

### Key choices

1. **Product concept** — API monitoring was chosen because dashboards are inherently visual, demo data is naturally expected, and the product category is immediately understandable
2. **No dark mode** — The assessment says dark mode is "all-or-nothing". A partial implementation would lose points, so we opted for a light theme with dark dashboard accents
3. **Single scroll-reveal animation** — One meaningful motion interaction (the dashboard entrance) rather than animating everything
4. **No fake social proof** — No testimonials, user counts, or customer logos. Credibility comes from the product itself

---

## Accessibility

- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`, `<table>`)
- Proper heading hierarchy (single `<h1>`, `<h2>` per section)
- Skip-to-content link for keyboard users
- Visible `:focus-visible` outlines on all interactive elements
- `aria-label` on icon buttons, `aria-expanded` on mobile menu toggle
- `prefers-reduced-motion` respected at both CSS and JS levels
- Good color contrast (tested against WCAG AA)

---

## AI Usage

AI tools (Gemini/Claude) were used to generate initial component code, which was then reviewed, tested, and adjusted. See [DECISIONS.md](./DECISIONS.md) for specific details.

---

## Known Limitations

1. **Navigation links** — `#product`, `#docs`, `#pricing` are anchor placeholders. In a real product, these would route to separate pages
2. **Bundle size** — Recharts adds ~400kB to the JS bundle. For a production app, we'd consider lazy-loading the chart component or using a lighter charting solution
3. **No dark mode** — Intentionally omitted per the assessment's "all-or-nothing" rule
4. **No real API integration** — The dashboard uses static demo data. A real product would use WebSocket/SSE for live data
