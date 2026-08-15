export type NotificationType =
  | "deadline"
  | "message"
  | "deal"
  | "contract"
  | "payment";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  relatedBrand?: string;
  link?: string;
}

export interface NotificationTypeConfig {
  key: NotificationType;
  label: string;
  color: string;
}

export const NOTIFICATION_TYPES: NotificationTypeConfig[] = [
  { key: "deadline", label: "Deadline", color: "#F0577A" },
  { key: "message", label: "Message", color: "#7C5CFC" },
  { key: "deal", label: "Deal", color: "#F5A623" },
  { key: "contract", label: "Contract", color: "#9B7BFF" },
  { key: "payment", label: "Payment", color: "#4ADE80" },
];
