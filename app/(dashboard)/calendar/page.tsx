"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { MonthGrid } from "@/components/calendar/month-grid";
import { UpcomingList } from "@/components/calendar/upcoming-list";
import { CreateEventDialog } from "@/components/calendar/create-event-dialog";
import { EVENT_TYPES } from "@/types/calendar";
import { getMonthGrid, toDateKey, type CalendarDay } from "@/lib/calendar-utils";
import { useEvents } from "@/hooks/use-calendar";

export default function CalendarPage() {
  const [cursor, setCursor] = useState(new Date());
  const [selected, setSelected] = useState<CalendarDay | null>(null);

  const rangeStart = useMemo(() => {
    const firstOfMonth = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const offset = firstOfMonth.getDay();
    return new Date(cursor.getFullYear(), cursor.getMonth(), 1 - offset);
  }, [cursor]);

  const rangeEnd = useMemo(() => {
    const end = new Date(rangeStart);
    end.setDate(end.getDate() + 41);
    return end;
  }, [rangeStart]);

  const { data: events, isLoading } = useEvents(rangeStart, rangeEnd);

  const days = useMemo(
    () => getMonthGrid(cursor.getFullYear(), cursor.getMonth(), events ?? []),
    [cursor, events]
  );

  const monthLabel = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const todayEvents = useMemo(() => {
    const todayKey = toDateKey(new Date());
    return (events ?? []).filter((e) => e.date === todayKey);
  }, [events]);

  const selectedEvents = selected?.events ?? [];

  function changeMonth(delta: number) {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
    setSelected(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Calendar</h1>
          <p className="text-sm text-muted-foreground">Campaigns, posts, and deadlines</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 rounded-full bg-surface-raised/60 px-3 py-1.5">
            {EVENT_TYPES.map((t) => (
              <span key={t.key} className="flex items-center gap-1.5 text-xs text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: t.color }} />
                {t.label}
              </span>
            ))}
          </div>
          <CreateEventDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl bg-surface/80 p-5 backdrop-blur-xl ring-1 ring-foreground/10 shadow-glow lg:col-span-2">
          <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/15 blur-[100px]" />

          <div className="relative mb-4 flex items-center justify-between">
            <p className="font-display text-base font-medium text-foreground">{monthLabel}</p>
            <div className="flex items-center gap-1 rounded-xl bg-surface-raised/60 p-1">
              <button
                onClick={() => changeMonth(-1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => changeMonth(1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="relative flex h-64 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-brand" />
            </div>
          ) : (
            <div className="relative">
              <MonthGrid
                days={days}
                selectedKey={selected?.date.toDateString() ?? null}
                onSelectDay={setSelected}
              />
            </div>
          )}
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-surface/80 p-5 backdrop-blur-xl ring-1 ring-foreground/10 shadow-glow">
          <div className="pointer-events-none absolute -top-20 right-0 h-52 w-52 rounded-full bg-gold/15 blur-[90px]" />
          <div className="relative">
            {selected ? (
              <UpcomingList
                events={selectedEvents}
                title={selected.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              />
            ) : (
              <UpcomingList events={todayEvents} title="Today" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}