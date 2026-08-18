import { useState } from 'react';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenGetStarted: () => void;
}

/**
 * Responsive navigation bar with Dark Mode Toggle.
 * Desktop: horizontal links + Theme Toggle + CTA button.
 * Mobile: Theme Toggle + hamburger toggle → vertical slide-down menu.
 */
export function Navbar({ isDark, onToggleTheme, onOpenGetStarted }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'Product', href: '#product' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'How It Works', href: '#how-it-works' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0B0F17]/85 backdrop-blur-lg border-b border-gray-100 dark:border-slate-800/80 transition-colors duration-200"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2 group" aria-label="Pulse home">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
              className="text-brand-500"
            >
              <rect width="28" height="28" rx="7" fill="currentColor" />
              <path
                d="M6 14h4l2-6 3 12 2-8 2 4h3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              Pulse
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions (Theme Toggle + CTA) */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <Button size="sm" onClick={onOpenGetStarted}>
              Get Started
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <button
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          mobileOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-[#0F172A]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800/80 rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <Button
              size="sm"
              className="w-full"
              onClick={() => {
                setMobileOpen(false);
                onOpenGetStarted();
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
