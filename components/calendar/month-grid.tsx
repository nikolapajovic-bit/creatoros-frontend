"use client";

import { cn } from "@/lib/utils";
import { EVENT_TYPES } from "@/types/calendar";
import type { CalendarDay } from "@/lib/calendar-utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TYPE_COLOR = Object.fromEntries(EVENT_TYPES.map((t) => [t.key, t.color]));

interface MonthGridProps {
  days: CalendarDay[];
  selectedKey: string | null;
  onSelectDay: (day: CalendarDay) => void;
}

export function MonthGrid({ days, selectedKey, onSelectDay }: MonthGridProps) {
  return (
    <div>
      <div className="grid grid-cols-7 border-b border-surface-border/60 pb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium uppercase tracking-wider text-ink-faint">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 pt-1">
        {days.map((day) => {
          const key = day.date.toDateString();
          const isSelected = selectedKey === key;
          return (
            <button
              key={key}
              onClick={() => onSelectDay(day)}
              className={cn(
                "flex min-h-20 flex-col items-start gap-1.5 rounded-xl p-2 text-left transition-all",
                !day.isCurrentMonth && "opacity-30",
                isSelected
                  ? "bg-brand-muted ring-2 ring-brand shadow-glow"
                  : "bg-surface-raised/40 hover:bg-surface-raised"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-all",
                  day.isToday ? "bg-brand text-white shadow-glow" : "text-ink-muted"
                )}
              >
                {day.date.getDate()}
              </span>
              <div className="flex flex-wrap gap-1">
                {day.events.slice(0, 3).map((ev) => (
                  <span
                    key={ev.id}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: TYPE_COLOR[ev.type] }}
                  />
                ))}
                {day.events.length > 3 && (
                  <span className="text-[9px] text-ink-faint">+{day.events.length - 3}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}