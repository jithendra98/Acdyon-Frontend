import { useState } from 'react';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { ProductPreview } from './sections/ProductPreview';
import { Capabilities } from './sections/Capabilities';
import { HowItWorks } from './sections/HowItWorks';
import { FeatureDeepDive } from './sections/FeatureDeepDive';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';
import { GetStartedModal } from './components/GetStartedModal';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useTheme } from './hooks/useTheme';

/**
 * Root application component.
 */
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const easterEgg = useKonamiCode();
  const { isDark, toggleTheme } = useTheme();

  const handleOpenGetStarted = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F17] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenGetStarted={handleOpenGetStarted}
      />

      <main id="main-content">
        <Hero onOpenGetStarted={handleOpenGetStarted} />
        <ProductPreview />
        <Capabilities />
        <HowItWorks />
        <FeatureDeepDive />
        <FinalCTA onOpenGetStarted={handleOpenGetStarted} />
      </main>

      <Footer />

      {/* Interactive Quickstart & Sandbox Modal */}
      <GetStartedModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

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
