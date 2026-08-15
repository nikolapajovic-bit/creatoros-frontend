"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Trash2 } from "lucide-react";
import { brandGradient, brandInitial } from "@/lib/brand-visual";
import { formatMessageTime } from "@/lib/format-time";
import { cn } from "@/lib/utils";
import { useMessages } from "@/hooks/use-messages";

interface MessageThreadProps {
  conversationId: string;
  conversationName: string;
}

export function MessageThread({ conversationId, conversationName }: MessageThreadProps) {
  const [draft, setDraft] = useState("");
  const { data: messages, isLoading, sendMessage } = useMessages(conversationId);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    sendMessage(draft.trim());
    setDraft("");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-surface-border/60 px-5 py-3.5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-white shadow-glow"
          style={{ backgroundImage: brandGradient(conversationName) }}
        >
          {brandInitial(conversationName)}
        </div>
        <p className="text-sm font-medium text-foreground">{conversationName}</p>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {isLoading && <p className="text-center text-sm text-ink-faint">Loading messages...</p>}

        {messages?.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm",
                msg.isOwn
                  ? "rounded-br-sm bg-brand text-white shadow-glow"
                  : "rounded-bl-sm bg-surface-raised/80 text-foreground ring-1 ring-foreground/5"
              )}
            >
              <p className="leading-snug">{msg.text}</p>
              <p className={cn("mt-1 text-[10px]", msg.isOwn ? "text-white/60" : "text-ink-faint")}>
                {formatMessageTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-surface-border/60 p-3">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message..."
          className="h-10 flex-1 rounded-full border border-surface-border/60 bg-canvas/50 px-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-glow transition-opacity hover:bg-brand-hover disabled:opacity-40 disabled:shadow-none"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}