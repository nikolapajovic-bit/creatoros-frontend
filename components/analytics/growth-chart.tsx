"use client";

import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from "recharts";
import { formatCompactNumber } from "@/lib/utils";
import type { GrowthPoint } from "@/types/analytics";

function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as GrowthPoint;
  return (
    <div className="rounded-md bg-surface-raised px-3 py-2 ring-1 ring-foreground/10">
      <p className="text-[11px] text-ink-faint">{formatDateShort(point.date)}</p>
      <p className="font-mono text-sm font-semibold text-foreground">
        {formatCompactNumber(point.followers)}
      </p>
    </div>
  );
}

export function GrowthChart({ data }: { data: GrowthPoint[] }) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="analyticsGrowthFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C5CFC" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#7C5CFC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis domain={["dataMin - 2000", "dataMax + 2000"]} hide />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#2A2636", strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="followers"
            stroke="#7C5CFC"
            strokeWidth={2.5}
            fill="url(#analyticsGrowthFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}