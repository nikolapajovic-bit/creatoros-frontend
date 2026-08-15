import Link from "next/link";
import { brandGradient, brandInitial } from "@/lib/brand-visual";
import { formatCurrency } from "@/lib/utils";
import { CONTRACT_STATUSES, type Contract } from "@/types/contract";

const STATUS_CONFIG = Object.fromEntries(CONTRACT_STATUSES.map((s) => [s.key, s]));

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function SentContractRow({ contract }: { contract: Contract }) {
  const status = STATUS_CONFIG[contract.status];

  return (
    <Link
      href={`/contracts/${contract.id}`}
      className="group flex items-center gap-4 rounded-xl bg-surface p-4 ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:ring-brand/30 hover:shadow-glow"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-base font-semibold text-white shadow-glow"
        style={{ backgroundImage: brandGradient(contract.brand) }}
      >
        {brandInitial(contract.brand)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-brand">
          {contract.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          Sent to creator · Expires {formatShortDate(contract.expiryDate)}
        </p>
      </div>

      <span
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-surface-raised px-2.5 py-1 text-xs font-medium"
        style={{ color: status.color }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: status.color }} />
        {status.label}
      </span>

      <span className="shrink-0 rounded-lg bg-gold/10 px-2.5 py-1 font-mono text-sm font-semibold text-gold">
        {formatCurrency(contract.value, contract.currency)}
      </span>
    </Link>
  );
}