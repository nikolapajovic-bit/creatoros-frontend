"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2, Handshake } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useProposeOffer, useAcceptOffer } from "@/hooks/use-deals";
import type { Deal } from "@/types/deal";

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function OfferPanel({ deal }: { deal: Deal }) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const propose = useProposeOffer();
  const accept = useAcceptOffer();

  const latestOffer = deal.offers[deal.offers.length - 1];
  const canAccept = latestOffer && !latestOffer.proposedByMe;

  function handlePropose(e: React.FormEvent) {
    e.preventDefault();
    if (!value) return;
    propose.mutate(
      { id: deal.id, value: Number(value), message: message.trim() || undefined },
      {
        onSuccess: () => {
          setValue("");
          setMessage("");
        },
      }
    );
  }

  function handleAccept() {
    accept.mutate(deal.id);
  }

  return (
    <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10">
      <div className="flex items-center gap-2 bg-linear-to-b from-brand/10 to-transparent px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
          <Handshake className="h-4 w-4" />
        </div>
        <p className="text-sm font-medium text-foreground">Negotiation</p>
      </div>

      <div className="p-5">
        {deal.offers.length > 0 && (
          <div className="mb-5 space-y-3">
            {deal.offers.map((offer, i) => (
              <div
                key={i}
                className={cn("flex", offer.proposedByMe ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2.5",
                    offer.proposedByMe
                      ? "rounded-br-sm bg-brand text-white shadow-glow"
                      : "rounded-bl-sm bg-surface-raised/80 text-foreground ring-1 ring-foreground/5"
                  )}
                >
                  <p className="font-mono text-sm font-semibold">
                    {formatCurrency(offer.value, deal.currency)}
                  </p>
                  {offer.message && (
                    <p
                      className={cn(
                        "mt-0.5 text-xs",
                        offer.proposedByMe ? "text-white/80" : "text-muted-foreground"
                      )}
                    >
                      {offer.message}
                    </p>
                  )}
                  <p
                    className={cn(
                      "mt-1 text-[10px]",
                      offer.proposedByMe ? "text-white/60" : "text-ink-faint"
                    )}
                  >
                    {offer.proposedByMe ? "You" : "Them"} · {formatTime(offer.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {canAccept && (
          <button
            onClick={handleAccept}
            disabled={accept.isPending}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-rise px-4 py-2.5 text-sm font-medium text-white shadow-glow transition-colors hover:bg-rise/90 disabled:opacity-60 disabled:shadow-none"
          >
            {accept.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Accept {formatCurrency(latestOffer.value, deal.currency)}
          </button>
        )}

        <form onSubmit={handlePropose} className="flex gap-2">
          <input
            type="number"
            min="0"
            placeholder="Propose amount..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-11 w-32 rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
          />
          <input
            type="text"
            placeholder="Optional message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-11 flex-1 rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
          />
          <button
            type="submit"
            disabled={!value || propose.isPending}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-r from-brand to-brand-hover text-white shadow-glow transition-all disabled:opacity-40 disabled:shadow-none"
          >
            {propose.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}