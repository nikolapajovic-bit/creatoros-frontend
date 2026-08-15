import Link from "next/link";
import { AlertCircle, MessageSquare, Handshake, FileSignature, Wallet } from "lucide-react";
import { formatRelativeTime } from "@/lib/format-time";
import { cn } from "@/lib/utils";
import { NOTIFICATION_TYPES } from "@/types/notification";
import type { Notification, NotificationType } from "@/types/notification";

const TYPE_ICONS: Record<NotificationType, typeof AlertCircle> = {
  deadline: AlertCircle,
  message: MessageSquare,
  deal: Handshake,
  contract: FileSignature,
  payment: Wallet,
};

const TYPE_CONFIG = Object.fromEntries(NOTIFICATION_TYPES.map((t) => [t.key, t]));

export function NotificationItem({ notification }: { notification: Notification }) {
  const Icon = TYPE_ICONS[notification.type];
  const color = TYPE_CONFIG[notification.type].color;

  const content = (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-surface-raised cursor-pointer",
        !notification.read && "bg-brand-muted/40"
      )}
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}1A`, color }}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "text-sm",
              notification.read ? "font-medium text-foreground" : "font-semibold text-foreground"
            )}
          >
            {notification.title}
          </p>
          {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />}
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{notification.description}</p>
        <p className="mt-1 text-[11px] text-ink-faint">{formatRelativeTime(notification.timestamp)}</p>
      </div>
    </div>
  );

  if (notification.link) {
    return <Link href={notification.link}>{content}</Link>;
  }

  return content;
}