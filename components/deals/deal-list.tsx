"use client";

import { useMemo, useState } from "react";
import { DealRow } from "@/components/deals/deal-row";
import { StageFilter } from "@/components/deals/stage-filter";
import type { Deal, DealStage } from "@/types/deal";

export function DealList({ deals }: { deals: Deal[] }) {
  const [active, setActive] = useState<DealStage | "all">("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: deals.length };
    for (const d of deals) map[d.stage] = (map[d.stage] ?? 0) + 1;
    return map;
  }, [deals]);

  const filtered = active === "all" ? deals : deals.filter((d) => d.stage === active);

  return (
    <div>
      <StageFilter active={active} onChange={setActive} counts={counts} />

      <div className="mt-6 space-y-2">
        {filtered.map((deal) => (
          <DealRow key={deal.id} deal={deal} />
        ))}
        {filtered.length === 0 && (
          <div className="relative flex h-40 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl bg-surface/80 backdrop-blur-xl ring-1 ring-foreground/10">
            <p className="relative text-sm text-ink-faint">No deals in this stage.</p>
          </div>
        )}
      </div>
    </div>
  );
}