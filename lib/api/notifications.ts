import { apiFetch } from "@/lib/api/client";
import type { Notification } from "@/types/notification";

interface NotificationApiResponse {
  _id: string;
  type: Notification["type"];
  title: string;
  description: string;
  read: boolean;
  relatedBrand?: string;
  link?: string;
  createdAt: string;
}

function mapNotification(raw: NotificationApiResponse): Notification {
  return {
    id: raw._id,
    type: raw.type,
    title: raw.title,
    description: raw.description,
    read: raw.read,
    relatedBrand: raw.relatedBrand,
    timestamp: raw.createdAt,
    link: raw.link,
  };
}

export async function getNotificationsRequest(): Promise<Notification[]> {
  const data = await apiFetch<{ notifications: NotificationApiResponse[] }>(
    "/notifications",
  );
  return data.notifications.map(mapNotification);
}

export async function markAsReadRequest(id: string): Promise<Notification> {
  const data = await apiFetch<{ notification: NotificationApiResponse }>(
    `/notifications/${id}/read`,
    {
      method: "PATCH",
    },
  );
  return mapNotification(data.notification);
}

export async function markAllAsReadRequest(): Promise<void> {
  await apiFetch<void>("/notifications/read-all", { method: "PATCH" });
}

export async function clearAllNotificationsRequest(): Promise<void> {
  await apiFetch<void>("/notifications/clear-all", { method: "DELETE" });
}
