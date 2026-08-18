import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { ProductPreview } from './sections/ProductPreview';
import { Capabilities } from './sections/Capabilities';
import { HowItWorks } from './sections/HowItWorks';
import { FeatureDeepDive } from './sections/FeatureDeepDive';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';
import { useKonamiCode } from './hooks/useKonamiCode';

/**
 * Root application component.
 *
 * Page flow:
 * 1. Navbar (fixed, frosted glass)
 * 2. Hero (what + why + CTA)
 * 3. Product Preview (the visual centerpiece — dark dashboard)
 * 4. Capabilities (3 feature cards)
 * 5. How It Works (3-step flow)
 * 6. Feature Deep Dive (smart alerts + secondary visual)
 * 7. Final CTA (closing action)
 * 8. Footer
 *
 * Each section is self-contained. No shared state between sections.
 * The only global state is the mobile menu toggle inside Navbar.
 */
function App() {
  const easterEgg = useKonamiCode();

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <ProductPreview />
        <Capabilities />
        <HowItWorks />
        <FeatureDeepDive />
        <FinalCTA />
      </main>

      <Footer />

      {/* Easter egg toast — Konami code: ↑↑↓↓←→←→BA */}
      {easterEgg && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-surface-dark border border-surface-border text-white text-sm font-medium shadow-2xl animate-[reveal-up_0.4s_ease-out]"
          role="status"
          aria-live="polite"
        >
          <span className="mr-2">🎮</span>
          You found it. Nice taste in cheat codes.
        </div>
      )}
    </div>
  );
}

export default App;

