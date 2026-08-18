import { useScrollReveal } from '../hooks/useScrollReveal';

interface Capability {
  icon: string;
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    icon: '⚡',
    title: 'Real-Time Monitoring',
    description:
      'Sub-second latency tracking across every endpoint. See P50, P95, and P99 percentiles as requests flow through your system.',
  },
  {
    icon: '🔍',
    title: 'Error Intelligence',
    description:
      'Automatic error classification and root cause grouping. Stop scrolling through logs — see exactly which endpoints are failing and why.',
  },
  {
    icon: '📊',
    title: 'Endpoint Analytics',
    description:
      'Per-endpoint breakdowns of throughput, latency distribution, and error rates. Identify your slowest and most error-prone routes instantly.',
  },
];

export function Capabilities() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section id="capabilities" ref={sectionRef} className="reveal py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
            Everything you need to understand your APIs
          </h2>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            Three core capabilities that replace scattered logs, manual checks,
            and guesswork.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group rounded-xl border border-gray-100 bg-gray-50/50 p-6 sm:p-8 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-200"
            >
              <div className="text-3xl mb-4" role="img" aria-label={cap.title}>
                {cap.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {cap.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
