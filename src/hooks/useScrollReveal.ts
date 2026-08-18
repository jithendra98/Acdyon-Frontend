import { useEffect, useRef } from 'react';

/**
 * Applies a CSS-driven scroll-reveal animation to the target element.
 *
 * How it works:
 * 1. The element starts with class "reveal" (opacity: 0).
 * 2. An IntersectionObserver watches for the element entering the viewport.
 * 3. When ≥15% visible, class "visible" is added, triggering the CSS animation.
 * 4. The observer disconnects — we only animate in, never out.
 *
 * Why IntersectionObserver instead of Framer Motion:
 * - Zero dependency (browser API)
 * - Better performance (no JS per-frame)
 * - Easy to explain in an interview
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion at the JS level too
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!motionOk) {
      el.classList.remove('reveal');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
