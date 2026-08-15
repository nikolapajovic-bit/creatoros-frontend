import { CheckCircle2, Clock, Loader2 } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import type { Payout, PayoutStatus } from "@/types/finance";

const STATUS_META: Record<
  PayoutStatus,
  { icon: typeof CheckCircle2; label: string; color: string; bg: string }
> = {
  completed: { icon: CheckCircle2, label: "Completed", color: "text-rise", bg: "bg-rise/15" },
  processing: { icon: Loader2, label: "Processing", color: "text-gold", bg: "bg-gold/15" },
  pending: { icon: Clock, label: "Pending", color: "text-ink-faint", bg: "bg-surface" },
};

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function PayoutsList({ payouts }: { payouts: Payout[] }) {
  return (
    <div className="space-y-2">
      {payouts.map((payout) => {
        const meta = STATUS_META[payout.status];
        const Icon = meta.icon;
        return (
          <div
            key={payout.id}
            className="flex items-center gap-3 rounded-xl bg-surface-raised/40 p-3.5 transition-colors hover:bg-surface-raised"
          >
            <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", meta.bg, meta.color)}>
              <Icon className={cn("h-4 w-4", payout.status === "processing" && "animate-spin")} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                {formatCurrency(payout.amount, payout.currency)}
              </p>
              <p className="text-xs text-ink-faint">
                {payout.method} · {formatShortDate(payout.date)}
              </p>
            </div>
            <span
              className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-medium", meta.bg, meta.color)}
            >
              {meta.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}