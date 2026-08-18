import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Feature deep-dive section — focuses on ONE feature with a secondary
 * product visual (an interactive alert/notification UI mockup).
 */
export function FeatureDeepDive() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <section id="features" ref={sectionRef} className="reveal py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-5">
              <span className="text-xs font-medium text-brand-700">Smart Alerts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight leading-tight">
              Get alerted when it matters,{' '}
              <span className="text-brand-500">not when it doesn't</span>
            </h2>
            <p className="mt-5 text-gray-500 leading-relaxed">
              Pulse learns your API's normal behavior and only fires alerts when
              something genuinely deviates. No more alarm fatigue from noisy
              thresholds.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Adaptive thresholds based on historical baselines',
                'Group related errors to reduce duplicate alerts',
                'Route to Slack, PagerDuty, or webhooks',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-brand-500 mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual side — simulated interactive alert notification */}
          <div className="relative">
            <div className="rounded-xl bg-surface-dark border border-surface-border p-5 sm:p-6 shadow-xl transition-all duration-300">
              {/* Notification header */}
              <div className="flex items-center gap-2 mb-4">
                {acknowledged ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-status-healthy" aria-hidden="true" />
                    <span className="text-xs font-semibold text-status-healthy">Alert Acknowledged</span>
                    <span className="ml-auto text-xs text-gray-400 font-mono">Status: Routing Silenced</span>
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-status-down animate-pulse" aria-hidden="true" />
                    <span className="text-xs font-semibold text-status-down">Alert Triggered</span>
                    <span className="ml-auto text-xs text-gray-500 font-mono">2m ago</span>
                  </>
                )}
              </div>

              {/* Alert body */}
              <div className="rounded-lg bg-surface-card border border-surface-border p-4 mb-3">
                <p className="text-sm font-medium text-white mb-1">
                  P95 latency spike on <span className="text-brand-400 font-mono">/api/v2/products</span>
                </p>
                <p className="text-xs text-gray-400">
                  Latency increased from 120ms → 340ms (183% above baseline)
                </p>
              </div>

              {/* Secondary alert */}
              <div className="rounded-lg bg-surface-card border border-surface-border p-4 mb-3">
                <p className="text-sm font-medium text-white mb-1">
                  Error rate elevated on <span className="text-status-degraded font-mono">/api/v2/analytics</span>
                </p>
                <p className="text-xs text-gray-400">
                  Error rate: 100% — endpoint returning 503 responses
                </p>
              </div>

              {/* Action bar */}
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="#product"
                  className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  View Details in Dashboard →
                </a>
                <button
                  onClick={() => setAcknowledged(!acknowledged)}
                  className={`text-xs font-medium px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    acknowledged
                      ? 'bg-status-healthy/10 text-status-healthy hover:bg-status-healthy/20'
                      : 'text-gray-400 hover:text-white hover:bg-surface-card'
                  }`}
                >
                  {acknowledged ? '✓ Acknowledged (Undo)' : 'Acknowledge'}
                </button>
              </div>
            </div>

            {/* Decorative glow */}
            <div
              className="absolute -inset-4 bg-brand-500/5 rounded-2xl -z-10 blur-xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
