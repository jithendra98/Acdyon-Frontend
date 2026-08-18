import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { LatencyDataPoint } from '../data/dashboardData';

interface LatencyChartProps {
  data: LatencyDataPoint[];
}

/**
 * Area chart showing P50 and P95 latency over time.
 *
 * Why Recharts:
 * - Lightweight (no D3 dependency tree overhead for our use case)
 * - Declarative React API — easy to read and explain
 * - ResponsiveContainer handles resize automatically
 *
 * The chart uses two stacked areas: a solid blue for P50 and a lighter
 * fill for P95, creating a visual "band" that shows latency variance.
 */
export function LatencyChart({ data }: LatencyChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gradP95" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.20 250)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="oklch(0.55 0.20 250)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradP50" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.65 0.15 250)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="oklch(0.65 0.15 250)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(0.28 0.02 260)"
          vertical={false}
        />
        <XAxis
          dataKey="time"
          tick={{ fill: '#9ca3af', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#9ca3af', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          unit="ms"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'oklch(0.20 0.02 260)',
            border: '1px solid oklch(0.28 0.02 260)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: 12,
          }}
          labelStyle={{ color: '#9ca3af' }}
        />
        <Area
          type="monotone"
          dataKey="p95"
          stroke="oklch(0.55 0.20 250)"
          fill="url(#gradP95)"
          strokeWidth={1.5}
          name="P95"
          dot={false}
          activeDot={{ r: 3, fill: 'oklch(0.55 0.20 250)' }}
        />
        <Area
          type="monotone"
          dataKey="p50"
          stroke="oklch(0.65 0.15 250)"
          fill="url(#gradP50)"
          strokeWidth={2}
          name="P50"
          dot={false}
          activeDot={{ r: 3, fill: 'oklch(0.65 0.15 250)' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
