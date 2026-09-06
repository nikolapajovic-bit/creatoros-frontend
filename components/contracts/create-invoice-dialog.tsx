"use client";

import { useState } from "react";
import { Receipt, Loader2, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createInvoiceFromContractRequest } from "@/lib/api/finance";
import { formatCurrency } from "@/lib/utils";

interface CreateInvoiceDialogProps {
  contractId: string;
  contractTitle: string;
  value: number;
  currency: string;
  onCreated?: () => void;
}

export function CreateInvoiceDialog({
  contractId,
  contractTitle,
  value,
  currency,
  onCreated,
}: CreateInvoiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function resetAndClose() {
    setConfirmed(false);
    setNotes("");
    setError("");
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await createInvoiceFromContractRequest(contractId, notes.trim() || undefined);
      onCreated?.();
      resetAndClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create invoice");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : resetAndClose())}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-xl bg-linear-to-r from-gold to-gold/80 px-3.5 py-2 text-xs font-semibold text-canvas shadow-glow transition-transform hover:scale-[1.02]"
      >
        <Receipt className="h-3.5 w-3.5" />
        Create Invoice
      </button>
      <DialogContent className="overflow-hidden p-0">
        <div className="relative overflow-hidden bg-linear-to-b from-gold/20 to-transparent p-6 pb-5">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/30 blur-[70px]" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold shadow-glow">
              <Receipt className="h-5 w-5 text-canvas" />
            </div>
            <DialogHeader className="text-left">
              <DialogTitle>Create invoice</DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 pt-4">
          <div className="rounded-xl bg-surface-raised p-3.5">
            <p className="text-xs text-ink-faint">Invoice for</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">INVOICE FOR: {contractTitle}</p>
            <p className="mt-2 font-mono text-lg font-semibold text-gold">
              {formatCurrency(value, currency)}
            </p>
            <p className="mt-1 text-[11px] text-ink-faint">Due 30 days from today</p>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Additional notes (optional)</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 2 Instagram Reels and 1 Story delivered..."
              className="mt-1.5 w-full resize-none rounded-xl border-2 border-surface-border bg-canvas p-3 text-sm text-ink focus:border-brand focus:outline-none"
            />
          </div>

          <label className="flex items-start gap-2 rounded-xl bg-surface-raised p-3 text-xs text-ink-muted">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-surface-border"
            />
            I confirm all agreed work under this contract has been completed.
          </label>

          {error && <p className="text-sm text-fall">{error}</p>}

          <button
            type="submit"
            disabled={!confirmed || submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-gold/80 py-3 text-sm font-semibold text-canvas shadow-glow transition-all disabled:opacity-60 disabled:shadow-none"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            {submitting ? "Creating..." : "Create invoice"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}