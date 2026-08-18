interface StatusBadgeProps {
  status: 'healthy' | 'degraded' | 'down';
}

const config = {
  healthy: { label: 'Healthy', dotClass: 'bg-status-healthy', textClass: 'text-status-healthy' },
  degraded: { label: 'Degraded', dotClass: 'bg-status-degraded', textClass: 'text-status-degraded' },
  down: { label: 'Down', dotClass: 'bg-status-down', textClass: 'text-status-down' },
};

/**
 * Small status indicator used in the endpoint health table.
 * Uses semantic colors defined in our Tailwind theme.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, dotClass, textClass } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${textClass}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${dotClass}`}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
