import type { MetricSummary } from '../data/dashboardData';

interface MetricCardProps {
  metric: MetricSummary;
}

/**
 * Single metric card for the dashboard top bar.
 * Shows label, value+unit, and a directional trend indicator.
 *
 * The trend arrow uses color to communicate direction:
 * - green + ↓ for latency/error rate (down is good)
 * - green + ↑ for throughput (up is good)
 * - gray for flat
 */
export function MetricCard({ metric }: MetricCardProps) {
  const { label, value, unit, trend, trendValue } = metric;

  // For latency and error rate, "down" is positive. For throughput/uptime, "up" is positive.
  const isPositive =
    (trend === 'down' && (label.includes('Latency') || label.includes('Error'))) ||
    (trend === 'up' && (label.includes('Throughput') || label.includes('Uptime')));

  const trendColor = trend === 'flat' ? 'text-gray-400' : isPositive ? 'text-status-healthy' : 'text-status-down';
  const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <div className="rounded-lg bg-surface-card border border-surface-border p-4 hover:bg-surface-card-hover transition-colors duration-150">
      <p className="text-xs font-medium text-gray-400 mb-1">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
        <span className="text-sm text-gray-400">{unit}</span>
      </div>
      <p className={`text-xs font-medium mt-1.5 ${trendColor}`}>
        {trendArrow} {trendValue}
        <span className="text-gray-500 ml-1">vs last hour</span>
      </p>
    </div>
  );
}
