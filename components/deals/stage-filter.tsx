"use client";

import { cn } from "@/lib/utils";
import { DEAL_STAGES, type DealStage } from "@/types/deal";

interface StageFilterProps {
  active: DealStage | "all";
  onChange: (stage: DealStage | "all") => void;
  counts: Record<string, number>;
}

export function StageFilter({ active, onChange, counts }: StageFilterProps) {
  const options: { key: DealStage | "all"; label: string }[] = [
    { key: "all", label: "All" },
    ...DEAL_STAGES,
  ];

  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl bg-surface-raised/60 p-1">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={cn(
            "rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all",
            active === opt.key
              ? "bg-linear-to-r from-brand to-brand-hover text-white shadow-glow"
              : "text-ink-muted hover:bg-surface hover:text-ink"
          )}
        >
          {opt.label}
          {counts[opt.key] ? (
            <span
              className={cn(
                "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]",
                active === opt.key ? "bg-white/20" : "bg-surface-raised"
              )}
            >
              {counts[opt.key]}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}