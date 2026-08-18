import type { EndpointEntry } from '../data/dashboardData';
import { StatusBadge } from './StatusBadge';

interface EndpointTableProps {
  endpoints: EndpointEntry[];
}

/**
 * Table showing per-endpoint health, latency, and error rate.
 * On mobile, we hide the "Requests" column to save horizontal space.
 *
 * The method badge color comes from global CSS classes (method-get, etc.)
 * to keep the component logic clean.
 */
export function EndpointTable({ endpoints }: EndpointTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-surface-border">
            <th className="pb-2 font-medium">Endpoint</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Latency</th>
            <th className="pb-2 font-medium hidden sm:table-cell">Requests</th>
            <th className="pb-2 font-medium">Errors</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((ep) => (
            <tr
              key={`${ep.method}-${ep.path}`}
              className="border-b border-surface-border last:border-0 hover:bg-surface-card-hover transition-colors duration-100"
            >
              <td className="py-2.5 pr-4">
                <span className={`method-${ep.method.toLowerCase()} font-mono text-xs font-semibold mr-2`}>
                  {ep.method}
                </span>
                <span className="text-gray-300 font-mono text-xs">{ep.path}</span>
              </td>
              <td className="py-2.5 pr-4">
                <StatusBadge status={ep.status} />
              </td>
              <td className="py-2.5 pr-4 text-gray-300 font-mono text-xs">
                {ep.latency > 0 ? `${ep.latency}ms` : '—'}
              </td>
              <td className="py-2.5 pr-4 text-gray-400 text-xs hidden sm:table-cell">
                {ep.requests}
              </td>
              <td className="py-2.5 text-gray-300 font-mono text-xs">
                {ep.errorRate < 100 ? `${ep.errorRate}%` : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
