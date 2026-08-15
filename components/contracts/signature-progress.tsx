import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignatureProgressProps {
  creatorSigned: boolean;
  brandSigned: boolean;
}

export function SignatureProgress({ creatorSigned, brandSigned }: SignatureProgressProps) {
  const dot = (signed: boolean) => (
    <span
      className={cn(
        "flex h-5 w-5 items-center justify-center rounded-full transition-all",
        signed ? "bg-rise text-canvas shadow-glow" : "bg-surface-raised text-transparent ring-1 ring-surface-border"
      )}
    >
      <Check className="h-3 w-3" strokeWidth={3} />
    </span>
  );

  const bothSigned = creatorSigned && brandSigned;

  return (
    <div className="flex items-center gap-2 rounded-full bg-surface-raised/60 px-3 py-1.5">
      <div className="flex items-center gap-1.5">
        {dot(creatorSigned)}
        <span className="text-[11px] font-medium text-ink-muted">You</span>
      </div>
      <div className={cn("h-0.5 w-5 rounded-full transition-colors", bothSigned ? "bg-rise" : "bg-surface-border")} />
      <div className="flex items-center gap-1.5">
        {dot(brandSigned)}
        <span className="text-[11px] font-medium text-ink-muted">Brand</span>
      </div>
    </div>
  );
}