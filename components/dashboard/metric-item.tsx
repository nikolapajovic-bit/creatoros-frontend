import { cn, formatPercent } from "@/lib/utils";

interface MetricItemProps {
  label: string;
  value: string;
  change?: number;
  className?: string;
}

export function MetricItem({ label, value, change, className }: MetricItemProps) {
  const positive = (change ?? 0) >= 0;
  return (
    <div className={cn("px-6 py-4 first:pl-0", className)}>
      <p className="text-[11px] uppercase tracking-wider text-ink-faint">{label}</p>
      <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-foreground">{value}</p>
      {typeof change === "number" && (
        <p className={cn("mt-0.5 text-xs font-medium", positive ? "text-rise" : "text-fall")}>
          {formatPercent(change)}
        </p>
      )}
    </div>
  );
}