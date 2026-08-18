import { useScrollReveal } from '../hooks/useScrollReveal';

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Connect',
    description:
      'Add a lightweight SDK to your API gateway or application. One line of config, no code changes to your endpoints.',
  },
  {
    number: '02',
    title: 'Monitor',
    description:
      'Pulse begins ingesting request data in real time. Latency, errors, and throughput populate your dashboard within seconds.',
  },
  {
    number: '03',
    title: 'Resolve',
    description:
      'Spot degraded endpoints before they escalate. Drill into error groups, trace latency spikes, and fix issues with context.',
  },
];

/**
 * "How It Works" section — a 3-step linear flow.
 *
 * Uses a horizontal connector line on desktop and a vertical
 * numbered list on mobile. Keeps the mental model simple:
 * connect → monitor → resolve.
 */
export function HowItWorks() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="reveal py-20 sm:py-28 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            No complex instrumentation. No month-long rollouts.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-8 left-[16.6%] right-[16.6%] h-px bg-gray-200"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              {/* Step number circle */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-brand-200 text-brand-600 font-bold text-sm mb-5 relative z-10">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
