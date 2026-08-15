import { STAGE_COLOR } from "@/lib/deal-stages";
import { DEAL_STAGES, type DealStage } from "@/types/deal";

export function StagePill({ stage }: { stage: DealStage }) {
  const config = DEAL_STAGES.find((s) => s.key === stage)!;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-surface-raised px-2.5 py-1 text-xs font-medium text-ink-muted"
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: STAGE_COLOR[stage] }}
      />
      {config.label}
    </span>
  );
}