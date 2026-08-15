"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { NotificationItem } from "@/components/notifications/notification-item";
import { groupByDay } from "@/lib/notification-utils";
import { useNotifications, useMarkAllAsRead, useMarkAsRead, useClearAllNotifications } from "@/hooks/use-notifications";

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useNotifications();
  const markAllAsRead = useMarkAllAsRead();
  const markAsRead = useMarkAsRead();
  const clearAll = useClearAllNotifications();
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  const safeNotifications = notifications ?? [];
  const groups = groupByDay(safeNotifications);
  const unreadCount = safeNotifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={() => markAllAsRead.mutate()}
              disabled={markAllAsRead.isPending}
              className="text-xs font-medium text-brand hover:text-brand-hover disabled:opacity-60"
            >
              Mark all as read
            </button>
          )}
          {safeNotifications.length > 0 && (
            <button
              onClick={() => setConfirmOpen(true)}
              className="flex items-center gap-1 text-xs font-medium text-ink-faint hover:text-fall disabled:opacity-60"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {safeNotifications.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-xl bg-surface ring-1 ring-foreground/10">
          <p className="text-sm font-medium text-foreground">No notifications</p>
          <p className="text-xs text-ink-faint">You&apos;ll see updates here as they happen.</p>
        </div>
      ) : (
        <div className="rounded-xl bg-surface ring-1 ring-foreground/10">
          {groups.map((group, i) => (
            <div key={group.label}>
              <p
                className={`px-4 pt-4 pb-2 text-xs font-medium uppercase tracking-wider text-ink-faint ${
                  i === 0 ? "" : "border-t border-surface-border"
                }`}
              >
                {group.label}
              </p>
              <div className="divide-y divide-surface-border">
                {group.items.map((n) => (
                  <div key={n.id} onClick={() => !n.read && markAsRead.mutate(n.id)}>
                    <NotificationItem notification={n} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
    )}
    <ConfirmDialog
      open={confirmOpen}
      onOpenChange={setConfirmOpen}
      title='Clear all notifications?'
      description="This will permanently delete all your notifications. This action cannot be undone."
      confirmLabel="Clear all"
      onConfirm={() => clearAll.mutate()}
      isPending={clearAll.isPending}
    />
    </div>
  );
}