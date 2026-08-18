"use client";

import Link from "next/link";
import { Bell, ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { NotificationItem } from "@/components/notifications/notification-item";
import { useNotifications, useMarkAsRead } from "@/hooks/use-notifications";

export function NotificationDropdown() {
  const { data: notifications } = useNotifications();
  const markAsRead = useMarkAsRead();

  const safeNotifications = notifications ?? [];
  const unreadCount = safeNotifications.filter((n) => !n.read).length;
  const recent = safeNotifications.slice(0, 5);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink"
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <Badge
              variant="gold"
              className="absolute -top-1 -right-1 h-4 min-w-4 justify-center px-1 py-0 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-surface-border/60 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Notifications</p>
          {unreadCount > 0 && (
            <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-medium text-brand">
              {unreadCount} new
            </span>
          )}
        </div>

        {recent.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-ink-faint">You&apos;re all caught up</p>
        ) : (
          <div className="max-h-80 divide-y divide-surface-border overflow-y-auto">
            {recent.map((n) => (
              <div key={n.id} onClick={() => !n.read && markAsRead.mutate(n.id)}>
                <NotificationItem notification={n} />
              </div>
            ))}
          </div>
        )}

        <Link
          href="/notifications"
          className="flex items-center justify-center gap-1.5 border-t border-surface-border/60 px-4 py-3 text-xs font-semibold text-brand transition-colors hover:bg-surface-raised"
        >
          See all notifications
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}