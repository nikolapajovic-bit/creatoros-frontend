import { apiFetch } from "@/lib/api/client";
import type { CalendarEvent } from "@/types/calendar";

interface EventApiResponse {
  _id: string;
  title: string;
  type: CalendarEvent["type"];
  date: string;
  time?: string;
  relatedBrand?: string;
}

function mapEvent(raw: EventApiResponse): CalendarEvent {
  return {
    id: raw._id,
    title: raw.title,
    type: raw.type,
    date: raw.date.slice(0, 10), // ISO datetime -> "YYYY-MM-DD"
    time: raw.time,
    relatedBrand: raw.relatedBrand,
  };
}

export async function getEventsRequest(
  from: Date,
  to: Date,
): Promise<CalendarEvent[]> {
  const params = new URLSearchParams({
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  });

  const data = await apiFetch<{ events: EventApiResponse[] }>(
    `/events?${params}`,
  );
  return data.events.map(mapEvent);
}

export async function createEventRequest(input: {
  title: string;
  type: CalendarEvent["type"];
  date: string;
  time?: string;
  relatedBrand?: string;
}): Promise<CalendarEvent> {
  const data = await apiFetch<{ event: EventApiResponse }>("/events", {
    method: "POST",
    body: JSON.stringify(input),
  });

  return mapEvent(data.event);
}
