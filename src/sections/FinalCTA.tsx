import { Button } from '../components/Button';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface FinalCTAProps {
  onOpenGetStarted: () => void;
}

export function FinalCTA({ onOpenGetStarted }: FinalCTAProps) {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="reveal py-20 sm:py-28 bg-surface-dark relative overflow-hidden">
      {/* Subtle radial glow behind the CTA */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Start seeing your APIs clearly
        </h2>
        <p className="mt-4 text-lg text-gray-400 leading-relaxed">
          Set up in under 5 minutes. No credit card required.
          <br className="hidden sm:block" />
          See your first dashboard before your coffee gets cold.
        </p>
        <div className="mt-8">
          <Button size="lg" onClick={onOpenGetStarted}>
            Get Started — Free
          </Button>
        </div>
      </div>
    </section>
  );
}
