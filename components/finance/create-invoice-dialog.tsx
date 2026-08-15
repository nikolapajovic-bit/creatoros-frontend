"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateInvoice } from "@/hooks/use-finance";
import { suggestInvoiceNumberRequest } from "@/lib/api/finance";

interface CreateInvoiceDialogProps {
  // Opciono — kad se otvara sa Deal/Contract detalj stranice, ova polja dolaze predpopunjena
  prefill?: { brand: string; amount: number; dealId?: string; contractId?: string };
  trigger?: React.ReactNode;
}

export function CreateInvoiceDialog({ prefill, trigger }: CreateInvoiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [brand, setBrand] = useState(prefill?.brand ?? "");
  const [amount, setAmount] = useState(prefill?.amount ? String(prefill.amount) : "");
  const [issuedDate, setIssuedDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const createInvoice = useCreateInvoice();

  useEffect(() => {
    if (!open) return;
    suggestInvoiceNumberRequest()
      .then(setNumber)
      .catch(() => {});
  }, [open]);

  function resetForm() {
    setBrand(prefill?.brand ?? "");
    setAmount(prefill?.amount ? String(prefill.amount) : "");
    setIssuedDate(new Date().toISOString().slice(0, 10));
    setDueDate("");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await createInvoice.mutateAsync({
        number,
        brand,
        amount: Number(amount),
        issuedDate,
        dueDate,
        dealId: prefill?.dealId,
        contractId: prefill?.contractId,
      });
      resetForm();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create invoice");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <span onClick={() => setOpen(true)}>{trigger}</span>
      ) : (
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create invoice</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-ink-muted">Invoice number</label>
            <input
              type="text"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Brand</label>
            <input
              type="text"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Amount (USD)</label>
            <input
              type="number"
              required
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-ink-muted">Issued date</label>
              <input
                type="date"
                required
                value={issuedDate}
                onChange={(e) => setIssuedDate(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-muted">Due date</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          {error && <p className="text-sm text-fall">{error}</p>}

          <Button type="submit" disabled={createInvoice.isPending} className="w-full">
            {createInvoice.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {createInvoice.isPending ? "Creating..." : "Create invoice"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}