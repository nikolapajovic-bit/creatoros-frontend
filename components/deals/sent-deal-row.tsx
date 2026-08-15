import Link from "next/link";
import { brandGradient, brandInitial } from "@/lib/brand-visual";
import { formatCurrency } from "@/lib/utils";
import { DEAL_STAGES, type Deal } from "@/types/deal";

const APPROVAL_CONFIG: Record<Deal["approvalStatus"], { label: string; color: string }> = {
  pending: { label: "Awaiting response", color: "#F5A623" },
  accepted: { label: "Accepted", color: "#4ADE80" },
  declined: { label: "Declined", color: "#F0577A" },
};

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function SentDealRow({ deal }: { deal: Deal }) {
  const approval = APPROVAL_CONFIG[deal.approvalStatus];

  return (
    <Link href={`/deals/${deal.id}`} className="group flex items-center gap-4 py-4">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-display text-base font-semibold text-white"
        style={{ backgroundImage: brandGradient(deal.brand) }}
      >
        {brandInitial(deal.brand)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground group-hover:text-brand transition-colors">
          {deal.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {deal.approvalStatus === "accepted"
            ? DEAL_STAGES.find((s) => s.key === deal.stage)?.label
            : "Sent to creator"}{" "}
          · Due {formatShortDate(deal.deadline)}
        </p>
      </div>

      <span
        className="flex shrink-0 items-center gap-1.5 text-xs font-medium"
        style={{ color: approval.color }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: approval.color }} />
        {approval.label}
      </span>

      <span className="w-20 shrink-0 text-right font-mono text-sm font-semibold text-gold">
        {formatCurrency(deal.value, deal.currency)}
      </span>
    </Link>
  );
}