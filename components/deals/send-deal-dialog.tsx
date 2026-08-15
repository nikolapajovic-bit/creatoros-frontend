"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2, Handshake } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreatorSelect } from "@/components/ui/creator-select";
import { useSendDeal } from "@/hooks/use-deals";
import { listCreatorsRequest, type CreatorSummary } from "@/lib/api/users";
import { useAuthStore } from "@/store/auth-store";
import type { Deal } from "@/types/deal";

const PLATFORMS: { value: Deal["platform"]; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "other", label: "Other" },
];

export function SendDealDialog() {
  const [open, setOpen] = useState(false);
  const [creators, setCreators] = useState<CreatorSummary[]>([]);
  const [loadingCreators, setLoadingCreators] = useState(false);

  const user = useAuthStore((s) => s.user);
  const [creatorId, setCreatorId] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [deadline, setDeadline] = useState("");
  const [platform, setPlatform] = useState<Deal["platform"]>("instagram");
  const [error, setError] = useState("");

  const sendDeal = useSendDeal();

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
    setValue("");
    setDeadline("");
    setPlatform("instagram");
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
      await sendDeal.mutateAsync({
        creatorId,
        brand: user?.name ?? "",
        title,
        value: Number(value),
        deadline,
        platform,
      });
      resetForm();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send deal");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
      >
        <Plus className="h-4 w-4" />
        Send Deal
      </button>
      <DialogContent className="overflow-hidden p-0">
        <div className="relative overflow-hidden bg-linear-to-b from-brand/20 to-transparent p-6 pb-5">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand/30 blur-[70px]" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand shadow-glow">
              <Handshake className="h-5 w-5 text-white" />
            </div>
            <DialogHeader className="text-left">
              <DialogTitle>Send a deal proposal</DialogTitle>
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
            <label className="text-xs font-medium text-ink-muted">Deal title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Summer campaign — 2 Reels + 1 Story"
              className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
            />
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
              <label className="text-xs font-medium text-ink-muted">Deadline</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Platform</label>
            <div className="mt-1.5 flex gap-1 rounded-xl bg-surface-raised p-1">
              {PLATFORMS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPlatform(p.value)}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                    platform === p.value
                      ? "bg-surface text-foreground shadow-sm"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-fall">{error}</p>}

          <button
            type="submit"
            disabled={sendDeal.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover py-3 text-sm font-semibold text-white shadow-glow transition-all disabled:opacity-60 disabled:shadow-none"
          >
            {sendDeal.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {sendDeal.isPending ? "Sending..." : "Send proposal"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}