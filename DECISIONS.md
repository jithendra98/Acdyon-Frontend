# Decisions

## 1. Why this approach over the obvious alternative?

**Chosen:** Build the landing page around a functional-looking product dashboard (API monitoring tool) rendered as live React components with real charting.

**Rejected:** A conventional marketing template — hero, feature cards, pricing grid, testimonial carousel — styled with stock illustrations.

**Why the dashboard wins:** The brief says the page must create *"Wow, I want an account"* in 3 seconds. Marketing copy can't do that alone — the product has to sell itself visually. An API monitoring dashboard is inherently data-rich (charts, tables, status dots, metric cards), so the product preview becomes the most impressive element on the page without relying on fake testimonials or stock imagery. It also demonstrates genuine frontend skill: responsive data grids, charting integration, semantic status colors, and visual hierarchy inside a complex UI — things a marketing template never exercises.

**Stack rationale:** React + TypeScript + Vite + Tailwind v4 + Recharts. No state management library, no animation library. Scroll-reveal is a 47-line custom hook using `IntersectionObserver` + CSS `@keyframes` — zero extra dependencies. Every tool earns its place and is easy to explain line-by-line.

---

## 2. One trade-off under the time limit

**Trade-off:** No dark mode. The assessment states dark mode is "all-or-nothing" — a half-implemented theme is worse than none. A complete dark mode (backgrounds, text, borders, cards, charts, tooltips, focus rings, hover states, the entire dashboard preview, status colors) would have doubled the styling surface area and the bug surface with it.

**With a real week I would:**
- Implement full dark mode via CSS custom properties + `data-theme` attribute with system preference detection
- Lazy-load Recharts so the chart only loads when the dashboard viewport is near (~400kB saved from initial bundle)
- Add interactive chart features (time range selector, hover detail panels)
- Build a purpose-designed mobile dashboard layout instead of reflowing the desktop grid
- Write Playwright visual regression tests at 390px, 768px, 1024px, and 1440px

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
