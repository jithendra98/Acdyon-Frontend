# Decisions

## 1. Why this approach over the obvious alternative?

**Chosen:** Build the landing page around a functional-looking product dashboard (API monitoring tool) rendered as live React components with real charting.

**Rejected:** A conventional marketing template — hero, feature cards, pricing grid, testimonial carousel — styled with stock illustrations.

**Why the dashboard wins:** The brief says the page must create *"Wow, I want an account"* in 3 seconds. Marketing copy can't do that alone — the product has to sell itself visually. An API monitoring dashboard is inherently data-rich (charts, tables, status dots, metric cards), so the product preview becomes the most impressive element on the page without relying on fake testimonials or stock imagery. It also demonstrates genuine frontend skill: responsive data grids, charting integration, semantic status colors, and visual hierarchy inside a complex UI — things a marketing template never exercises.

**Stack rationale:** React + TypeScript + Vite + Tailwind v4 + Recharts. No state management library, no animation library. Scroll-reveal is a 47-line custom hook using `IntersectionObserver` + CSS `@keyframes` — zero extra dependencies. Every tool earns its place and is easy to explain line-by-line.

---

## 2. Dark Mode Implementation & Polish

**Implemented:** Full, first-class Dark Mode support (Light & Midnight Dark Blue). A dedicated moon/sun circular toggle in the navigation bar allows users to switch seamlessly. It includes:
- System preference detection via `prefers-color-scheme`
- `localStorage` persistence (`pulse-theme`)
- Complete theme coverage across all components, cards, typography, navigation, modals, and borders
- Zero color collisions or unreadable contrast states across both light and dark themes

**Future optimizations with more time:**
- Lazy-load Recharts so the chart only loads when the dashboard viewport is near (~400kB saved from initial bundle)
- Purpose-built animated micro-interactions for live telemetry streaming
- Playwright automated visual regression test suite across multiple viewports

---

## 3. AI usage — what was generated, what I verified and changed

**AI generated:** Initial component scaffolding, Recharts chart configuration (gradients, axis styling), the OKLCH color palette values, demo data with realistic latency curves, and section layout code.

**What I personally verified:**
- Every section renders correctly at 390px, 768px, and 1440px (tested in browser)
- Mobile hamburger menu toggles with correct `aria-expanded` / `aria-controls`
- Scroll-reveal fires once per element and respects `prefers-reduced-motion`
- Zero console errors at all breakpoints
- TypeScript compiles cleanly (`tsc --noEmit` passes)
- Production build completes with zero warnings
- No horizontal overflow on any screen size
- No fake testimonials, user counts, or customer logos anywhere on the page

**What I caught and fixed after AI generation:**
1. **Capability cards invisible** — AI applied `opacity: 0` (via a CSS `reveal` class) on both the parent section *and* each individual card. The parent's IntersectionObserver added `visible` to the section, but the cards inside still had `opacity: 0` with no observer of their own. Fixed by removing the nested `reveal` class from individual cards.
2. **Chart axis clipped** — AI set `left: -20` margin on the chart to save space, but it cropped the Y-axis "ms" labels. Changed to `left: 0`.
3. **CSS `@import` ordering** — Google Fonts `@import` was placed after `@import "tailwindcss"`, violating the CSS spec (imports must precede all other rules). Moved it to line 1.

**AI suggestions I rejected:**
- Framer Motion for scroll animation — 35kB for one reveal effect is over-engineering
- A testimonials section with "real-feeling" quotes — violates the honesty requirement
- A pricing table — adds complexity without improving the product story for this assessment
