import { Button } from '../components/Button';

interface HeroProps {
  onOpenGetStarted: () => void;
}

/**
 * Hero section — the first thing a visitor sees.
 */
export function Hero({ onOpenGetStarted }: HeroProps) {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, oklch(0.97 0.01 250) 0%, oklch(0.99 0.005 250) 40%, white 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow / tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-status-healthy" aria-hidden="true" />
          <span className="text-xs font-medium text-brand-700">API Observability Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-950 tracking-tight leading-[1.1] max-w-3xl mx-auto">
          See your APIs.{' '}
          <span className="text-brand-500">Fix what's broken.</span>{' '}
          Ship with confidence.
        </h1>

        {/* Supporting copy */}
        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Pulse gives engineering teams real-time visibility into API performance,
          error rates, and endpoint health — so you catch issues before your users do.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={onOpenGetStarted}>
            Start Monitoring — Free
          </Button>
          <Button variant="secondary" size="lg" href="#product">
            View Live Demo ↓
          </Button>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-sm text-gray-400">
          No credit card required · 5-minute setup · Works with any HTTP API
        </p>
      </div>
    </section>
  );
}
