import { useState, useEffect } from 'react';
import { Button } from './Button';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'sandbox'>('quickstart');
  const [copied, setCopied] = useState(false);
  const [simulatedPings, setSimulatedPings] = useState<
    Array<{ id: number; timestamp: string; status: number; latency: number; endpoint: string }>
  >([]);
  const [isPinging, setIsPinging] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const sdkCode = `import { initPulse } from '@pulse/observability';

// Initialize with 1 line in your API gateway / app
const pulse = initPulse({
  apiKey: 'pls_live_9x82fa71k',
  serviceName: 'production-api',
  sampleRate: 1.0,
});`;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(sdkCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePing = (type: 'healthy' | 'spike' | 'error') => {
    setIsPinging(true);
    setTimeout(() => {
      let status = 200;
      let latency = Math.floor(Math.random() * 40) + 25; // 25-65ms
      let endpoint = '/api/v2/users';

      if (type === 'spike') {
        latency = Math.floor(Math.random() * 200) + 280; // 280-480ms
        endpoint = '/api/v2/products';
      } else if (type === 'error') {
        status = 503;
        latency = Math.floor(Math.random() * 100) + 120;
        endpoint = '/api/v2/analytics';
      }

      const newPing = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        status,
        latency,
        endpoint,
      };

      setSimulatedPings((prev) => [newPing, ...prev.slice(0, 4)]);
      setIsPinging(false);
    }, 250);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-surface-dark border border-surface-border text-white shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-surface-card transition-colors"
          aria-label="Close dialog"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-brand-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
            Interactive Setup
          </span>
        </div>
        <h2 id="modal-title" className="text-2xl font-bold text-white tracking-tight">
          Get Started with Pulse
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Zero friction setup. Test our live ingestion pipeline or integrate the SDK.
        </p>

        {/* Tab switch */}
        <div className="flex border-b border-surface-border mt-5 mb-5 gap-4">
          <button
            className={`pb-2.5 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'quickstart'
                ? 'border-brand-400 text-brand-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('quickstart')}
          >
            Quick SDK Setup
          </button>
          <button
            className={`pb-2.5 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'sandbox'
                ? 'border-brand-400 text-brand-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('sandbox')}
          >
            Live Ingestion Sandbox
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'quickstart' ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 font-medium block mb-1.5">
                Step 1: Install package
              </label>
              <div className="flex items-center justify-between bg-surface-card border border-surface-border rounded-lg px-3 py-2 font-mono text-xs text-brand-300">
                <span>npm install @pulse/observability</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-gray-400 font-medium">
                  Step 2: Initialize in your server
                </label>
                <button
                  onClick={handleCopy}
                  className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <span className="text-status-healthy">✓</span> Copied
                    </>
                  ) : (
                    'Copy code'
                  )}
                </button>
              </div>
              <pre className="bg-surface-card border border-surface-border rounded-lg p-3 font-mono text-xs text-gray-300 overflow-x-auto leading-relaxed">
                {sdkCode}
              </pre>
            </div>

            {/* Email form demo */}
            <div className="pt-2 border-t border-surface-border">
              {emailSubmitted ? (
                <div className="p-3 bg-brand-500/10 border border-brand-500/30 rounded-lg text-xs text-brand-300 text-center">
                  🎉 Setup instructions and test API key sent to <strong className="text-white">{email}</strong>!
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setEmailSubmitted(true);
                  }}
                  className="space-y-2"
                >
                  <label className="text-xs text-gray-400 font-medium block">
                    Receive your sandbox API credentials:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="engineer@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-brand-400 focus:outline-none"
                    />
                    <Button size="sm" type="submit">
                      Send Keys
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-gray-400">
              Click to simulate incoming HTTP traffic to our demo pipeline:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                disabled={isPinging}
                onClick={() => handleSimulatePing('healthy')}
                className="px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs font-medium text-status-healthy hover:bg-surface-card-hover active:scale-95 transition-all"
              >
                + Send GET 200 OK (Fast)
              </button>
              <button
                disabled={isPinging}
                onClick={() => handleSimulatePing('spike')}
                className="px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs font-medium text-status-degraded hover:bg-surface-card-hover active:scale-95 transition-all"
              >
                + Simulate Latency Spike
              </button>
              <button
                disabled={isPinging}
                onClick={() => handleSimulatePing('error')}
                className="px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border text-xs font-medium text-status-down hover:bg-surface-card-hover active:scale-95 transition-all"
              >
                + Trigger 503 Error
              </button>
            </div>

            {/* Ingestion stream */}
            <div className="bg-surface-card border border-surface-border rounded-lg p-3 space-y-2 min-h-[140px]">
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono pb-1 border-b border-surface-border">
                <span>SIMULATED INGESTION FEED</span>
                <span>{simulatedPings.length} events logged</span>
              </div>
              {simulatedPings.length === 0 ? (
                <div className="text-center py-6 text-xs text-gray-500">
                  Click any simulation button above to stream live telemetry events.
                </div>
              ) : (
                <div className="space-y-1.5">
                  {simulatedPings.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between text-xs font-mono py-1 border-b border-surface-border/50 last:border-0"
                    >
                      <span className="text-gray-400">{p.timestamp}</span>
                      <span className="text-white font-medium">{p.endpoint}</span>
                      <span
                        className={
                          p.status === 200
                            ? 'text-status-healthy'
                            : p.status === 503
                            ? 'text-status-down'
                            : 'text-status-degraded'
                        }
                      >
                        {p.status} ({p.latency}ms)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
