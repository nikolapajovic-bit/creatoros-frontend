"use client";

import { useState } from "react";
import { Loader2, MessageSquare, ArrowLeft } from "lucide-react";
import { ConversationList } from "@/components/messages/conversation-list";
import { MessageThread } from "@/components/messages/message-thread";
import { NewConversationDialog } from "@/components/messages/new-conversation-dialog";
import { useConversations } from "@/hooks/use-conversations";

export default function MessagesPage() {
  const { data: conversations, isLoading } = useConversations();
  // null = na mobilnom prikazuje listu; na desktopu se svejedno prikazuje prvi razgovor niže
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeConversation = conversations?.find((c) => c.id === activeId);
  // Na desktop-u uvek prikazujemo neki razgovor (prvi ako ništa nije eksplicitno izabrano)
  const desktopActiveConversation = activeConversation ?? conversations?.[0];

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

  const mappedConversations = conversations.map((c) => ({
    ...c,
    messages: [],
    unreadCount: 0,
  }));

  return (
    <div className="relative flex h-[calc(100vh-8rem)] overflow-hidden rounded-2xl bg-surface/80 backdrop-blur-xl ring-1 ring-foreground/10 shadow-glow">
      <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/15 blur-[100px]" />

      {/* Mobile: lista SAMO ako nijedan razgovor nije aktivno izabran */}
      <div
        className={`relative w-full shrink-0 flex-col overflow-y-auto md:flex md:w-80 md:border-r md:border-surface-border/60 ${
          activeConversation ? "hidden md:flex" : "flex"
        }`}
      >
        <NewConversationDialog onCreated={setActiveId} />
        <ConversationList
          conversations={mappedConversations}
          activeId={desktopActiveConversation?.id ?? ""}
          onSelect={setActiveId}
        />
      </div>

      {/* Mobile: thread SAMO ako je razgovor izabran. Desktop: uvek prikazan. */}
      <div
        className={`relative min-w-0 flex-1 flex-col overflow-hidden md:flex ${
          activeConversation ? "flex" : "hidden md:flex"
        }`}
      >
        {desktopActiveConversation && (
          <>
            <button
              onClick={() => setActiveId(null)}
              className="flex items-center gap-1.5 border-b border-surface-border/60 px-4 py-3 text-sm text-ink-muted md:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to conversations
            </button>
            <MessageThread
              conversationId={desktopActiveConversation.id}
              conversationName={desktopActiveConversation.name}
            />
          </>
        )}
      </div>
    </div>
  );
}