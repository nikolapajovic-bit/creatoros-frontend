"use client";

import { useState } from "react";
import { Pencil, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useReviseContract, useWithdrawContract } from "@/hooks/use-contracts";
import type { Contract } from "@/types/contract";

export function ContractRevisionActions({ contract }: { contract: Contract }) {
  const [open, setOpen] = useState(false);
  const [confirmWithdrawOpen, setConfirmWithdrawOpen] = useState(false);
  const [bodyText, setBodyText] = useState(contract.bodyText);
  const [value, setValue] = useState(String(contract.value));
  const [expiryDate, setExpiryDate] = useState(contract.expiryDate.slice(0, 10));
  const [error, setError] = useState("");

  const revise = useReviseContract();
  const withdraw = useWithdrawContract();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const input: Partial<{ bodyText: string; value: number; expiryDate: string }> = {};
    if (bodyText.trim() !== contract.bodyText) input.bodyText = bodyText.trim();
    if (Number(value) !== contract.value) input.value = Number(value);
    if (expiryDate !== contract.expiryDate.slice(0, 10)) input.expiryDate = expiryDate;

    if (Object.keys(input).length === 0) {
      setError("Make at least one change before sending");
      return;
    }

    try {
      await revise.mutateAsync({ id: contract.id, input });
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update contract");
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setConfirmWithdrawOpen(true)}
        disabled={withdraw.isPending}
        className="flex items-center gap-1.5 rounded-xl bg-surface-raised px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-fall/10 hover:text-fall disabled:opacity-50"
      >
        <X className="h-4 w-4" />
        {withdraw.isPending ? "Withdrawing..." : "Withdraw"}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
        >
          <Pencil className="h-4 w-4" />
          Revise contract
        </button>
        <DialogContent className="overflow-hidden p-0">
          <div className="relative overflow-hidden bg-linear-to-b from-brand/20 to-transparent p-6 pb-5">
            <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand/30 blur-[70px]" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand shadow-glow">
                <Pencil className="h-5 w-5 text-white" />
              </div>
              <DialogHeader className="text-left">
                <DialogTitle>Revise contract</DialogTitle>
              </DialogHeader>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto p-6 pt-4">
            <div>
              <label className="text-xs font-medium text-ink-muted">Contract text</label>
              <textarea
                rows={6}
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                className="mt-1.5 w-full resize-none rounded-xl border-2 border-surface-border bg-canvas p-3 text-sm text-ink focus:border-brand focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-ink-muted">Value (USD)</label>
                <input
                  type="number"
                  min="0"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">Expiry date</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            <p className="rounded-xl bg-surface-raised p-3 text-[11px] text-ink-faint">
              Only the fields you change will be updated. Leave anything unchanged as-is.
            </p>

            {error && <p className="text-sm text-fall">{error}</p>}

            <button
              type="submit"
              disabled={revise.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover py-3 text-sm font-semibold text-white shadow-glow transition-all disabled:opacity-60 disabled:shadow-none"
            >
              {revise.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {revise.isPending ? "Sending..." : "Send revised contract"}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmWithdrawOpen}
        onOpenChange={setConfirmWithdrawOpen}
        title="Withdraw this contract?"
        description="This cannot be undone. The creator will be notified that the contract was withdrawn."
        confirmLabel="Withdraw"
        onConfirm={() => withdraw.mutate(contract.id)}
        isPending={withdraw.isPending}
      />
    </div>
  );
}