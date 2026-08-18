import { useEffect, useState } from 'react';

/**
 * Listens for the Konami Code (↑↑↓↓←→←→BA).
 * Returns `true` for 3 seconds after the code is entered, then resets.
 *
 * Implementation: tracks the last 10 keystrokes in a circular buffer
 * and compares against the sequence on each keydown.
 */
const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

export function useKonamiCode(): boolean {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const buffer: string[] = [];

    function handleKey(e: KeyboardEvent) {
      buffer.push(e.code);
      if (buffer.length > KONAMI.length) buffer.shift();

      if (buffer.length === KONAMI.length &&
          buffer.every((key, i) => key === KONAMI[i])) {
        setActivated(true);
        buffer.length = 0;
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Auto-reset after 3 seconds
  useEffect(() => {
    if (!activated) return;
    const timer = setTimeout(() => setActivated(false), 3000);
    return () => clearTimeout(timer);
  }, [activated]);

  return activated;
}
