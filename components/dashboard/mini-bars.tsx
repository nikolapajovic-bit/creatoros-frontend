import { formatCurrency } from "@/lib/utils";

interface Deal {
  brand: string;
  stage: string;
  value: number;
}

export function MiniBars({ deals }: { deals: Deal[] }) {
  const max = Math.max(...deals.map((d) => d.value));

  return (
    <div className="space-y-4">
      {deals.map((deal) => (
        <div key={deal.brand}>
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-sm font-medium text-foreground">{deal.brand}</span>
            <span className="font-mono text-xs text-gold">{formatCurrency(deal.value)}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-raised">
            <div
              className="h-full rounded-full bg-linear-to-r from-brand to-gold"
              style={{ width: `${(deal.value / max) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-[11px] text-ink-faint">{deal.stage}</p>
        </div>
      ))}
    </div>
  );
}