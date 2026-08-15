import type { CalendarEvent } from "@/types/calendar";

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

/**
 * Generiše 6 nedelja (42 dana) za mesečni prikaz — uključuje dane
 * iz prethodnog/narednog meseca da popuni prvu i poslednju nedelju.
 */
export function getMonthGrid(
  year: number,
  month: number,
  events: CalendarEvent[],
): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay(); // 0 = nedelja
  const gridStart = new Date(year, month, 1 - startOffset);

  const today = new Date();
  const todayKey = toDateKey(today);

  const days: CalendarDay[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    const key = toDateKey(date);

    days.push({
      date,
      isCurrentMonth: date.getMonth() === month,
      isToday: key === todayKey,
      events: events.filter((e) => e.date === key),
    });
  }
  return days;
}

export function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return toDateKey(a) === toDateKey(b);
}
