import { MessageSquareWarning } from "lucide-react";
import type { Contract } from "@/types/contract";

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function RevisionHistory({ revisionRequests }: { revisionRequests: Contract["revisionRequests"] }) {
  if (revisionRequests.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10">
      <div className="flex items-center gap-2 bg-linear-to-b from-gold/10 to-transparent px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15 text-gold">
          <MessageSquareWarning className="h-4 w-4" />
        </div>
        <p className="text-sm font-medium text-foreground">Revision history</p>
      </div>
      <div className="space-y-2 p-5 pt-4">
        {revisionRequests.map((r, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-xl bg-gold/10 p-3.5 ring-1 ring-gold/20 transition-all hover:ring-gold/40"
          >
            <MessageSquareWarning className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <div className="min-w-0">
              <p className="text-sm text-foreground">{r.message}</p>
              <p className="mt-1 text-xs text-ink-faint">
                {r.requestedByMe ? "You" : "Creator"} · {formatTime(r.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}