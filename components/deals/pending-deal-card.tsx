"use client";

import Link from "next/link";
import { Check, X, Loader2 } from "lucide-react";
import { brandGradient, brandInitial } from "@/lib/brand-visual";
import { formatCurrency } from "@/lib/utils";
import { useRespondToDeal } from "@/hooks/use-deals";
import type { Deal } from "@/types/deal";

export function PendingDealCard({ deal }: { deal: Deal }) {
  const respond = useRespondToDeal();

  function handleRespond(e: React.MouseEvent, response: "accepted" | "declined") {
    e.preventDefault();
    e.stopPropagation();
    respond.mutate({ id: deal.id, response });
  }

  return (
    <Link
      href={`/deals/${deal.id}`}
      className="flex items-center gap-4 rounded-xl bg-linear-to-r from-gold/15 to-transparent p-4 ring-1 ring-gold/30 transition-all hover:-translate-y-0.5 hover:ring-gold/50 hover:shadow-glow"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-base font-semibold text-white shadow-glow"
        style={{ backgroundImage: brandGradient(deal.brand) }}
      >
        {brandInitial(deal.brand)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{deal.brand}</p>
        <p className="truncate text-xs text-muted-foreground">{deal.title}</p>
      </div>

      <span className="shrink-0 rounded-lg bg-gold/15 px-2.5 py-1 font-mono text-sm font-semibold text-gold">
        {formatCurrency(deal.value, deal.currency)}
      </span>

      <div className="flex shrink-0 gap-1.5">
        <button
          onClick={(e) => handleRespond(e, "declined")}
          disabled={respond.isPending}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-raised text-ink-muted transition-colors hover:bg-fall/15 hover:text-fall disabled:opacity-50"
        >
          <X className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => handleRespond(e, "accepted")}
          disabled={respond.isPending}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-rise text-white shadow-glow transition-colors hover:bg-rise/90 disabled:opacity-50 disabled:shadow-none"
        >
          {respond.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </button>
      </div>
    </Link>
  );
}