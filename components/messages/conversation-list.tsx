"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { brandGradient, brandInitial } from "@/lib/brand-visual";
import { formatRelativeTime } from "@/lib/format-time";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useDeleteConversation } from "@/hooks/use-conversations";
import type { Conversation } from "@/types/message";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  const [toDelete, setToDelete] = useState<Conversation | null>(null);
  const deleteConversation = useDeleteConversation();

  function handleConfirmDelete() {
    if (!toDelete) return;
    deleteConversation.mutate(toDelete.id);
    setToDelete(null);
  }

  return (
    <>
      <div className="space-y-1 p-2">
        {conversations.map((conv) => {
          const isActive = conv.id === activeId;
          return (
            <div
              key={conv.id}
              className={cn(
                "group relative flex w-full items-start gap-3 rounded-xl border-2 border-transparent px-3 py-3 transition-all",
                isActive
                  ? "border-brand/40 bg-linear-to-r from-brand/15 to-transparent"
                  : "hover:border-surface-border hover:bg-surface-raised"
              )}
            >
              <button onClick={() => onSelect(conv.id)} className="flex flex-1 items-start gap-3 text-left">
                <div className="relative shrink-0">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-semibold text-white transition-shadow",
                      isActive && "shadow-glow"
                    )}
                    style={{ backgroundImage: brandGradient(conv.name) }}
                  >
                    {brandInitial(conv.name)}
                  </div>
                  {conv.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-rise ring-2 ring-surface" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "truncate text-sm",
                        isActive ? "font-semibold text-brand" : "font-medium text-foreground"
                      )}
                    >
                      {conv.name}
                    </p>
                    <span className="shrink-0 pr-6 text-[11px] text-ink-faint transition-opacity group-hover:opacity-0">
                      {formatRelativeTime(conv.lastMessageAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs text-muted-foreground">{conv.lastMessage}</p>
                    {conv.unreadCount > 0 && (
                      <span className="flex h-4.5 min-w-4.5 shrink-0 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white shadow-glow">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setToDelete(conv);
                }}
                aria-label="Delete conversation"
                className="absolute right-2 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-ink-faint opacity-0 transition-all hover:bg-fall/15 hover:text-fall group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(open) => !open && setToDelete(null)}
        title="Delete conversation?"
        description={`This will remove "${toDelete?.name}" from your inbox. You'll still be able to message them again later.`}
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        isPending={deleteConversation.isPending}
      />
    </>
  );
}