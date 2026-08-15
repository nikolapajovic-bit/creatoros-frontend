import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEAL_STAGES } from "@/types/deal";
import { STAGE_COLOR } from "@/lib/deal-stages";
import type { DealStage } from "@/types/deal";

export function StageStepper({ current }: { current: DealStage }) {
  const currentIndex = DEAL_STAGES.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center">
      {DEAL_STAGES.map((stage, i) => {
        const isDone = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isLast = i === DEAL_STAGES.length - 1;

        return (
          <div key={stage.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold transition-all",
                  isDone && "bg-rise text-canvas shadow-glow",
                  isCurrent && "text-white shadow-glow",
                  !isDone && !isCurrent && "bg-surface-raised text-ink-faint ring-1 ring-surface-border"
                )}
                style={isCurrent ? { backgroundColor: STAGE_COLOR[stage.key] } : undefined}
              >
                {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={cn(
                  "whitespace-nowrap text-[11px]",
                  isCurrent ? "font-semibold text-foreground" : "text-ink-faint"
                )}
              >
                {stage.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-2 h-1 flex-1 rounded-full transition-colors",
                  isDone ? "bg-rise" : "bg-surface-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}