export type EventType = "post" | "deadline" | "meeting" | "campaign";

export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  date: string; // ISO date (YYYY-MM-DD)
  time?: string; // "14:00" — opciono, neki eventi su celodnevni
  relatedBrand?: string;
}

export interface EventTypeConfig {
  key: EventType;
  label: string;
  color: string;
}

export const EVENT_TYPES: EventTypeConfig[] = [
  { key: "post", label: "Post", color: "#7C5CFC" },
  { key: "deadline", label: "Deadline", color: "#F0577A" },
  { key: "meeting", label: "Meeting", color: "#F5A623" },
  { key: "campaign", label: "Campaign", color: "#4ADE80" },
];
