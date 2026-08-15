import type { Notification } from "@/types/notification";

export interface NotificationGroup {
  label: string;
  items: Notification[];
}

function startOfDay(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
}

export function groupByDay(notifications: Notification[]): NotificationGroup[] {
  const today = startOfDay(new Date());
  const yesterday = today - 86400000;
  const weekAgo = today - 7 * 86400000;

  const groups: Record<string, Notification[]> = {
    Today: [],
    Yesterday: [],
    "This week": [],
    Earlier: [],
  };

  for (const n of notifications) {
    const day = startOfDay(new Date(n.timestamp));
    if (day === today) groups["Today"].push(n);
    else if (day === yesterday) groups["Yesterday"].push(n);
    else if (day >= weekAgo) groups["This week"].push(n);
    else groups["Earlier"].push(n);
  }

  return Object.entries(groups)
    .filter(([, items]) => items.length > 0)
    .map(([label, items]) => ({ label, items }));
}
