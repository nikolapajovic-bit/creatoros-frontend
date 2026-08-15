"use client";

import { useState } from "react";
import { Plus, Loader2, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreatePayout } from "@/hooks/use-finance";

const METHODS = ["Bank transfer", "PayPal", "Wise", "Other"];

export function CreatePayoutDialog() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [method, setMethod] = useState(METHODS[0]);
  const [error, setError] = useState("");

  const createPayout = useCreatePayout();

  function resetForm() {
    setAmount("");
    setDate(new Date().toISOString().slice(0, 10));
    setMethod(METHODS[0]);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await createPayout.mutateAsync({ amount: Number(amount), date, method });
      resetForm();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to record payout");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-surface-raised px-4 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:bg-surface hover:text-ink"
      >
        <Plus className="h-4 w-4" />
        Record Payout
      </button>
      <DialogContent className="overflow-hidden p-0">
        <div className="relative overflow-hidden bg-linear-to-b from-gold/20 to-transparent p-6 pb-5">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/30 blur-[70px]" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold shadow-glow">
              <Wallet className="h-5 w-5 text-canvas" />
            </div>
            <DialogHeader className="text-left">
              <DialogTitle>Record a payout</DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 pt-4">
          <div>
            <label className="text-xs font-medium text-ink-muted">Amount (USD)</label>
            <input
              type="number"
              required
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Method</label>
            <div className="mt-1.5 flex gap-1 rounded-xl bg-surface-raised p-1">
              {METHODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                    method === m ? "bg-surface text-foreground shadow-sm" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-fall">{error}</p>}

          <button
            type="submit"
            disabled={createPayout.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-gold to-gold/80 py-3 text-sm font-semibold text-canvas shadow-glow transition-all disabled:opacity-60 disabled:shadow-none"
          >
            {createPayout.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {createPayout.isPending ? "Recording..." : "Record payout"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}