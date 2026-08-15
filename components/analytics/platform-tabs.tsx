"use client";

import { useState } from "react";
import { PLATFORM_ICONS, PLATFORM_LABELS } from "@/lib/platform-icons";
import { formatCompactNumber, formatPercent, cn } from "@/lib/utils";
import type { PlatformStats } from "@/types/analytics";

export function PlatformTabs({ stats }: { stats: PlatformStats[] }) {
  const [active, setActive] = useState(stats[0].platform);
  const current = stats.find((s) => s.platform === active)!;

  return (
    <div>
      <div className="flex gap-1 rounded-lg bg-surface-raised p-1 w-fit">
        {stats.map((s) => {
          const Icon = PLATFORM_ICONS[s.platform];
          const isActive = s.platform === active;
          return (
            <button
              key={s.platform}
              onClick={() => setActive(s.platform)}
              className={cn(
                "flex items-center gap-2 rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors",
                isActive ? "bg-surface text-foreground shadow-sm" : "text-ink-muted hover:text-ink"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {PLATFORM_LABELS[s.platform]}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-6 sm:gap-10">
        <div>
          <p className="text-xs text-muted-foreground">Followers</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-foreground">
            {formatCompactNumber(current.followers)}
          </p>
          <p className={cn("text-xs font-medium", current.followersChange >= 0 ? "text-rise" : "text-fall")}>
            {formatPercent(current.followersChange)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Engagement rate</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-foreground">
            {current.engagementRate}%
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Avg. views</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-foreground">
            {formatCompactNumber(current.avgViews)}
          </p>
        </div>
      </div>
    </div>
  );
}