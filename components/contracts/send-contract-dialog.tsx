"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2, FileSignature } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreatorSelect } from "@/components/ui/creator-select";
import { useSendContract } from "@/hooks/use-contracts";
import { listCreatorsRequest, type CreatorSummary } from "@/lib/api/users";
import { useAuthStore } from "@/store/auth-store";

export function SendContractDialog() {
  const [open, setOpen] = useState(false);
  const [creators, setCreators] = useState<CreatorSummary[]>([]);
  const [loadingCreators, setLoadingCreators] = useState(false);

  const user = useAuthStore((s) => s.user);
  const [creatorId, setCreatorId] = useState("");
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [value, setValue] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [error, setError] = useState("");

  const sendContract = useSendContract();

  useEffect(() => {
    if (!open) return;
    setLoadingCreators(true);
    listCreatorsRequest()
      .then(setCreators)
      .catch(() => setError("Failed to load creators"))
      .finally(() => setLoadingCreators(false));
  }, [open]);

  function resetForm() {
    setCreatorId("");
    setTitle("");
    setBodyText("");
    setValue("");
    setExpiryDate("");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!creatorId) {
      setError("Please select a creator");
      return;
    }

    try {
      await sendContract.mutateAsync({
        creatorId,
        brand: user?.name ?? "",
        title,
        bodyText,
        value: Number(value),
        expiryDate,
      });
      resetForm();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send contract");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
      >
        <Plus className="h-4 w-4" />
        Send Contract
      </button>
      <DialogContent className="overflow-hidden p-0">
        <div className="relative overflow-hidden bg-linear-to-b from-brand/20 to-transparent p-6 pb-5">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand/30 blur-[70px]" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand shadow-glow">
              <FileSignature className="h-5 w-5 text-white" />
            </div>
            <DialogHeader className="text-left">
              <DialogTitle>Send a contract</DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto p-6 pt-4">
          <div>
            <label className="text-xs font-medium text-ink-muted">Creator</label>
            <div className="mt-1.5">
              <CreatorSelect
                creators={creators}
                value={creatorId}
                onChange={setCreatorId}
                loading={loadingCreators}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Sending as</label>
            <div className="mt-1.5 flex h-11 items-center rounded-xl border-2 border-surface-border bg-surface-raised px-3 text-sm text-ink">
              {user?.name}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Contract title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Summer Campaign Agreement"
              className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Contract text</label>
            <textarea
              required
              rows={6}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              placeholder="Describe the terms of the agreement..."
              className="mt-1.5 w-full resize-none rounded-xl border-2 border-surface-border bg-canvas p-3 text-sm text-ink focus:border-brand focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-ink-faint">
              This text will appear on the signed document. Consider having a lawyer review your
              template.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-ink-muted">Value (USD)</label>
              <input
                type="number"
                required
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
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="text-sm text-fall">{error}</p>}

          <button
            type="submit"
            disabled={sendContract.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover py-3 text-sm font-semibold text-white shadow-glow transition-all disabled:opacity-60 disabled:shadow-none"
          >
            {sendContract.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {sendContract.isPending ? "Sending..." : "Send contract"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}