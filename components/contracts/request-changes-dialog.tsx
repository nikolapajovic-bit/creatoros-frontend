"use client";

import { useState } from "react";
import { MessageSquareWarning, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useRequestChanges, useDeclineContract } from "@/hooks/use-contracts";

export function ContractResponseActions({ contractId }: { contractId: string }) {
  const [open, setOpen] = useState(false);
  const [confirmDeclineOpen, setConfirmDeclineOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const requestChanges = useRequestChanges();
  const decline = useDeclineContract();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await requestChanges.mutateAsync({ id: contractId, message: message.trim() });
      setMessage("");
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send request");
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setConfirmDeclineOpen(true)}
        disabled={decline.isPending}
        className="flex items-center gap-1.5 rounded-xl bg-surface-raised px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-fall/10 hover:text-fall disabled:opacity-50"
      >
        <X className="h-4 w-4" />
        {decline.isPending ? "Declining..." : "Decline"}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-surface-raised px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-gold/10 hover:text-gold"
        >
          <MessageSquareWarning className="h-4 w-4" />
          Request changes
        </button>
        <DialogContent className="overflow-hidden p-0">
          <div className="relative overflow-hidden bg-linear-to-b from-gold/20 to-transparent p-6 pb-5">
            <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/30 blur-[70px]" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold shadow-glow">
                <MessageSquareWarning className="h-5 w-5 text-canvas" />
              </div>
              <DialogHeader className="text-left">
                <DialogTitle>Request changes</DialogTitle>
              </DialogHeader>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6 pt-4">
            <div>
              <label className="text-xs font-medium text-ink-muted">What needs to change?</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. Please extend the deadline to end of October..."
                className="mt-1.5 w-full resize-none rounded-xl border-2 border-surface-border bg-canvas p-3 text-sm text-ink focus:border-brand focus:outline-none"
              />
            </div>
            {error && <p className="text-sm text-fall">{error}</p>}
            <button
              type="submit"
              disabled={requestChanges.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover py-3 text-sm font-semibold text-white shadow-glow transition-all disabled:opacity-60 disabled:shadow-none"
            >
              {requestChanges.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {requestChanges.isPending ? "Sending..." : "Send request"}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmDeclineOpen}
        onOpenChange={setConfirmDeclineOpen}
        title="Decline this contract?"
        description="This cannot be undone. The brand will be notified that you declined."
        confirmLabel="Decline"
        onConfirm={() => decline.mutate(contractId)}
        isPending={decline.isPending}
      />
    </div>
  );
}