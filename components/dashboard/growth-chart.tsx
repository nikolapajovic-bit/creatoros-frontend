"use client";

import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";

const data = [
  { day: "1", followers: 121200 },
  { day: "4", followers: 122800 },
  { day: "7", followers: 122100 },
  { day: "10", followers: 124600 },
  { day: "13", followers: 125300 },
  { day: "16", followers: 124900 },
  { day: "19", followers: 126700 },
  { day: "22", followers: 127400 },
  { day: "25", followers: 127100 },
  { day: "28", followers: 128400 },
];

export function GrowthChart() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C5CFC" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#7C5CFC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis domain={["dataMin - 2000", "dataMax + 2000"]} hide />
          <Area
            type="monotone"
            dataKey="followers"
            stroke="#7C5CFC"
            strokeWidth={2.5}
            fill="url(#growthFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}