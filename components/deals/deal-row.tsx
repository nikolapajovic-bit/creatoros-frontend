import Link from "next/link";
import { CalendarClock, Camera, PlaySquare, Music2 } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { brandGradient, brandInitial } from "@/lib/brand-visual";
import { StagePill } from "@/components/deals/stage-pill";
import type { Deal } from "@/types/deal";

const PLATFORM_ICONS = {
  instagram: Camera,
  youtube: PlaySquare,
  tiktok: Music2,
  other: CalendarClock,
};

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function DealRow({ deal }: { deal: Deal }) {
  const Icon = PLATFORM_ICONS[deal.platform];
  const days = daysUntil(deal.deadline);
  const urgent = days <= 5 && days >= 0 && deal.stage !== "completed";

  return (
    <Link
      href={`/deals/${deal.id}`}
      className="group flex items-center gap-4 rounded-xl bg-surface p-4 ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:ring-brand/30 hover:shadow-glow"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-base font-semibold text-white shadow-glow"
        style={{ backgroundImage: brandGradient(deal.brand) }}
      >
        {brandInitial(deal.brand)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-brand">
          {deal.brand}
        </p>
        <p className="truncate text-xs text-muted-foreground">{deal.title}</p>
      </div>

      <Icon className="hidden h-4 w-4 shrink-0 text-ink-faint sm:block" />

      <div className="hidden w-32 shrink-0 md:block">
        <StagePill stage={deal.stage} />
      </div>

      <span
        className={cn(
          "w-16 shrink-0 rounded-full px-2 py-1 text-center text-xs font-medium",
          urgent ? "bg-fall/10 text-fall" : "text-ink-faint"
        )}
      >
        {deal.stage === "completed" ? "Done" : days >= 0 ? `${days}d` : "Overdue"}
      </span>

      <span className="shrink-0 rounded-lg bg-gold/10 px-2.5 py-1 font-mono text-sm font-semibold text-gold">
        {formatCurrency(deal.value, deal.currency)}
      </span>
    </Link>
  );
}