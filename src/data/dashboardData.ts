/**
 * Demo data for the Pulse product preview dashboard.
 * All values are synthetic — designed to look realistic without
 * claiming to represent any real system.
 */

export interface LatencyDataPoint {
  time: string;
  p50: number;
  p95: number;
}

export interface EndpointEntry {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  requests: string;
  errorRate: number;
}

export interface MetricSummary {
  label: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'flat';
  trendValue: string;
}

/** Simulated latency over a 12-hour window */
export const latencyData: LatencyDataPoint[] = [
  { time: '00:00', p50: 42, p95: 128 },
  { time: '01:00', p50: 38, p95: 115 },
  { time: '02:00', p50: 35, p95: 108 },
  { time: '03:00', p50: 33, p95: 102 },
  { time: '04:00', p50: 31, p95: 98 },
  { time: '05:00', p50: 34, p95: 105 },
  { time: '06:00', p50: 45, p95: 142 },
  { time: '07:00', p50: 62, p95: 189 },
  { time: '08:00', p50: 78, p95: 234 },
  { time: '09:00', p50: 85, p95: 256 },
  { time: '10:00', p50: 72, p95: 218 },
  { time: '11:00', p50: 68, p95: 195 },
];

/** Sample endpoints for the health grid */
export const endpoints: EndpointEntry[] = [
  { method: 'GET', path: '/api/v2/users', status: 'healthy', latency: 45, requests: '12.4k', errorRate: 0.02 },
  { method: 'POST', path: '/api/v2/auth/login', status: 'healthy', latency: 112, requests: '8.1k', errorRate: 0.15 },
  { method: 'GET', path: '/api/v2/products', status: 'degraded', latency: 340, requests: '24.7k', errorRate: 1.82 },
  { method: 'PUT', path: '/api/v2/orders', status: 'healthy', latency: 89, requests: '3.2k', errorRate: 0.08 },
  { method: 'DELETE', path: '/api/v2/sessions', status: 'healthy', latency: 23, requests: '1.9k', errorRate: 0.01 },
  { method: 'GET', path: '/api/v2/analytics', status: 'down', latency: 0, requests: '0', errorRate: 100 },
];

/** Top-level metric cards */
export const metrics: MetricSummary[] = [
  { label: 'P95 Latency', value: '218', unit: 'ms', trend: 'down', trendValue: '12%' },
  { label: 'Error Rate', value: '0.24', unit: '%', trend: 'down', trendValue: '8%' },
  { label: 'Throughput', value: '14.2k', unit: 'req/s', trend: 'up', trendValue: '23%' },
  { label: 'Uptime', value: '99.97', unit: '%', trend: 'flat', trendValue: '0%' },
];
