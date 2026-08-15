"use client";

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, ReferenceLine, LabelList } from "recharts";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";
import type { MonthlyRevenue } from "@/types/finance";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as MonthlyRevenue;
  return (
    <div className="rounded-md bg-surface-raised px-3 py-2 ring-1 ring-foreground/10">
      <p className="text-[11px] text-ink-faint">{point.month}</p>
      <p className="font-mono text-sm font-semibold text-foreground">{formatCurrency(point.amount)}</p>
    </div>
  );
}

function BarTopLabel(props: any) {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 8}
      textAnchor="middle"
      className="fill-ink-faint font-mono"
      fontSize={10}
    >
      {formatCompactNumber(value)}
    </text>
  );
}

export function RevenueBarChart({ data }: { data: MonthlyRevenue[] }) {
  const lastIndex = data.length - 1;
  const average = data.reduce((sum, d) => sum + d.amount, 0) / data.length;

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 4, left: 4, bottom: 0 }}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#5C5870", fontSize: 11 }}
          />
          <YAxis hide domain={[0, "dataMax + 1200"]} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#2A2636" }} />
          <ReferenceLine
            y={average}
            stroke="#5C5870"
            strokeDasharray="4 4"
            strokeWidth={1}
            label={{
              value: `avg ${formatCompactNumber(average)}`,
              position: "insideTopRight",
              fill: "#5C5870",
              fontSize: 10,
            }}
          />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={44}>
            <LabelList content={<BarTopLabel />} />
            {data.map((_, i) => (
              <Cell key={i} fill={i === lastIndex ? "#F5A623" : "#7C5CFC4D"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}