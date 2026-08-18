import { useScrollReveal } from '../hooks/useScrollReveal';
import { MetricCard } from '../components/MetricCard';
import { LatencyChart } from '../components/LatencyChart';
import { EndpointTable } from '../components/EndpointTable';
import { latencyData, endpoints, metrics } from '../data/dashboardData';

/**
 * Product Preview — the visual centerpiece of the page.
 *
 * This is a full-width dark section that renders a mock dashboard UI.
 * It's designed to look like a real running application, not a screenshot.
 *
 * Layout:
 * ┌──────────────────────────────────────────────┐
 * │  Metric Cards (4 across on desktop, 2x2 mob) │
 * ├───────────────────────┬──────────────────────┤
 * │  Latency Chart        │  Endpoint Health     │
 * └───────────────────────┴──────────────────────┘
 *
 * The scroll-reveal animation fires once when the section enters viewport.
 * On reduced-motion, it appears instantly (handled by the hook).
 */
export function ProductPreview() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="product"
      ref={sectionRef}
      className="reveal relative py-4 sm:py-8"
    >
      {/* Dark background that extends full-width */}
      <div className="absolute inset-0 bg-surface-dark -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard chrome — simulated window frame */}
        <div className="rounded-xl border border-surface-border bg-surface-dark overflow-hidden shadow-2xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bg-status-down opacity-80" />
              <span className="w-3 h-3 rounded-full bg-status-degraded opacity-80" />
              <span className="w-3 h-3 rounded-full bg-status-healthy opacity-80" />
            </div>
            <span className="text-xs text-gray-500 ml-2 font-mono">
              pulse.dev/dashboard
            </span>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-gray-500">Demo Data</span>
              <span className="h-2 w-2 rounded-full bg-status-healthy animate-pulse" aria-label="Live indicator" />
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Metric cards row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {metrics.map((m) => (
                <MetricCard key={m.label} metric={m} />
              ))}
            </div>

            {/* Chart + Table row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Latency chart */}
              <div className="rounded-lg bg-surface-card border border-surface-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-200">
                    Response Latency
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-0.5 rounded bg-brand-400" aria-hidden="true" />
                      P50
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-0.5 rounded bg-brand-600" aria-hidden="true" />
                      P95
                    </span>
                  </div>
                </div>
                <LatencyChart data={latencyData} />
              </div>

              {/* Endpoint health table */}
              <div className="rounded-lg bg-surface-card border border-surface-border p-4">
                <h3 className="text-sm font-semibold text-gray-200 mb-4">
                  Endpoint Health
                </h3>
                <EndpointTable endpoints={endpoints} />
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Live dashboard preview · Sample data for demonstration purposes
        </p>
      </div>
    </section>
  );
}
