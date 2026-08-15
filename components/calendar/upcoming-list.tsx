import { EVENT_TYPES } from "@/types/calendar";
import type { CalendarEvent } from "@/types/calendar";

const TYPE_CONFIG = Object.fromEntries(EVENT_TYPES.map((t) => [t.key, t]));

function formatDay(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function UpcomingList({ events, title }: { events: CalendarEvent[]; title: string }) {
  return (
    <div>
      <p className="mb-4 text-sm font-medium text-foreground">{title}</p>
      {events.length === 0 && (
        <div className="flex h-32 items-center justify-center rounded-xl bg-surface-raised/40">
          <p className="text-sm text-ink-faint">No events.</p>
        </div>
      )}
      <div className="space-y-2">
        {events.map((ev) => {
          const config = TYPE_CONFIG[ev.type];
          return (
            <div
              key={ev.id}
              className="flex items-start gap-3 rounded-xl bg-surface-raised/40 p-3 transition-colors hover:bg-surface-raised"
            >
              <span
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full shadow-glow"
                style={{ backgroundColor: config.color }}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-snug text-foreground">{ev.title}</p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  {formatDay(ev.date)}
                  {ev.time ? ` · ${ev.time}` : ""} · {config.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}