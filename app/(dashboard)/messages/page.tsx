"use client";

import { useState, useEffect } from "react";
import { Loader2, MessageSquare } from "lucide-react";
import { ConversationList } from "@/components/messages/conversation-list";
import { MessageThread } from "@/components/messages/message-thread";
import { NewConversationDialog } from "@/components/messages/new-conversation-dialog";
import { useConversations } from "@/hooks/use-conversations";

export default function MessagesPage() {
  const { data: conversations, isLoading } = useConversations();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeId && conversations && conversations.length > 0) {
      setActiveId(conversations[0].id);
    }
  }, [conversations, activeId]);

  const activeConversation = conversations?.find((c) => c.id === activeId);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="relative flex h-[calc(100vh-8rem)] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-surface/80 backdrop-blur-xl ring-1 ring-foreground/10 shadow-glow">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand shadow-glow">
          <MessageSquare className="h-6 w-6 text-white" />
        </div>
        <div className="relative text-center">
          <p className="text-sm font-medium text-foreground">No conversations yet</p>
          <p className="mt-1 text-xs text-ink-faint">Start a conversation with a brand or creator.</p>
        </div>
        <div className="relative">
          <NewConversationDialog onCreated={setActiveId} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[calc(100vh-8rem)] overflow-hidden rounded-2xl bg-surface/80 backdrop-blur-xl ring-1 ring-foreground/10 shadow-glow">
      <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/15 blur-[100px]" />

      <div className="relative hidden w-80 shrink-0 flex-col overflow-y-auto border-r border-surface-border/60 md:flex">
        <NewConversationDialog onCreated={setActiveId} />
        <ConversationList
          conversations={conversations.map((c) => ({
            ...c,
            messages: [],
            lastMessage: "",
            unreadCount: 0,
          }))}
          activeId={activeId ?? ""}
          onSelect={setActiveId}
        />
      </div>
      <div className="relative min-w-0 flex-1 overflow-hidden">
        {activeConversation && (
          <MessageThread
            conversationId={activeConversation.id}
            conversationName={activeConversation.name}
          />
        )}
      </div>
    </div>
  );
}