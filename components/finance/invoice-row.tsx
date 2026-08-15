import { brandGradient, brandInitial } from "@/lib/brand-visual";
import { formatCurrency, cn } from "@/lib/utils";
import { INVOICE_STATUSES } from "@/types/finance";
import type { Invoice } from "@/types/finance";

const STATUS_CONFIG = Object.fromEntries(INVOICE_STATUSES.map((s) => [s.key, s]));

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function InvoiceRow({ invoice }: { invoice: Invoice }) {
  const status = STATUS_CONFIG[invoice.status];

  return (
    <div className="group flex items-center gap-4 rounded-xl bg-surface-raised/40 p-3.5 transition-all hover:bg-surface-raised">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm font-semibold text-white shadow-glow"
        style={{ backgroundImage: brandGradient(invoice.brand) }}
      >
        {brandInitial(invoice.brand)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-brand">
          {invoice.brand}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {invoice.number} · Due {formatShortDate(invoice.dueDate)}
        </p>
      </div>

      <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted sm:flex">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: status.color }} />
        {status.label}
      </span>

      <span className="shrink-0 rounded-lg bg-gold/10 px-2.5 py-1 font-mono text-sm font-semibold text-gold">
        {formatCurrency(invoice.amount, invoice.currency)}
      </span>
    </div>
  );
}