"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { AudienceSegment } from "@/types/analytics";

const COLORS = ["#7C5CFC", "#F5A623", "#4ADE80", "#5C5870"];

export function AudienceDonut({ segments }: { segments: AudienceSegment[] }) {
  return (
    <div className="flex items-center gap-6">
      <div className="h-32 w-32 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              dataKey="pct"
              nameKey="label"
              innerRadius={38}
              outerRadius={58}
              paddingAngle={2}
              strokeWidth={0}
            >
              {segments.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {segments.map((seg, i) => (
          <div key={seg.label} className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-xs text-ink-muted w-12">{seg.label}</span>
            <span className="font-mono text-xs font-medium text-foreground">{seg.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}