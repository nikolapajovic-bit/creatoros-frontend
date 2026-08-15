"use client";

import { useState } from "react";
import { Plus, Loader2, CalendarPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateEvent } from "@/hooks/use-calendar";
import { EVENT_TYPES } from "@/types/calendar";
import type { EventType } from "@/types/calendar";

export function CreateEventDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<EventType>("post");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [relatedBrand, setRelatedBrand] = useState("");
  const [error, setError] = useState("");

  const createEvent = useCreateEvent();

  function resetForm() {
    setTitle("");
    setType("post");
    setDate("");
    setTime("");
    setRelatedBrand("");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await createEvent.mutateAsync({
        title,
        type,
        date,
        time: time || undefined,
        relatedBrand: relatedBrand || undefined,
      });
      resetForm();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
      >
        <Plus className="h-4 w-4" />
        New Event
      </button>
      <DialogContent className="overflow-hidden p-0">
        <div className="relative overflow-hidden bg-linear-to-b from-brand/20 to-transparent p-6 pb-5">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand/30 blur-[70px]" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand shadow-glow">
              <CalendarPlus className="h-5 w-5 text-white" />
            </div>
            <DialogHeader className="text-left">
              <DialogTitle>Create event</DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 pt-4">
          <div>
            <label className="text-xs font-medium text-ink-muted">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Content planning session"
              className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Type</label>
            <div className="mt-1.5 flex gap-1 rounded-xl bg-surface-raised p-1">
              {EVENT_TYPES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setType(t.key)}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                    type === t.key
                      ? "bg-surface text-foreground shadow-sm"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
              <label className="text-xs font-medium text-ink-muted">Time (optional)</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-muted">Related brand (optional)</label>
            <input
              type="text"
              value={relatedBrand}
              onChange={(e) => setRelatedBrand(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-fall">{error}</p>}

          <button
            type="submit"
            disabled={createEvent.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover py-3 text-sm font-semibold text-white shadow-glow transition-all disabled:opacity-60 disabled:shadow-none"
          >
            {createEvent.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {createEvent.isPending ? "Creating..." : "Create event"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}