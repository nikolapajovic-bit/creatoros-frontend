"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2, Search, Users } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { brandGradient, brandInitial } from "@/lib/brand-visual";
import { resolveFileUrl } from "@/lib/file-url";
import { lookupUserByEmail, getBusinessContactsRequest, type BusinessContact } from "@/lib/api/users";
import { createConversationRequest } from "@/lib/api/messages";
import { useAuthStore } from "@/store/auth-store";

export function NewConversationDialog({ onCreated }: { onCreated: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState<BusinessContact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const [showEmailSearch, setShowEmailSearch] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const queryClient = useQueryClient();
  const currentUser = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!open) return;
    setLoadingContacts(true);
    getBusinessContactsRequest()
      .then(setContacts)
      .catch(() => {})
      .finally(() => setLoadingContacts(false));
  }, [open]);

  function resetAndClose() {
    setShowEmailSearch(false);
    setEmail("");
    setError("");
    setOpen(false);
  }

  async function startConversationWith(userId: string, name: string) {
    if (!currentUser) return;
    setSubmitting(true);
    setError("");
    try {
      const conversation = await createConversationRequest(
        { name, type: "brand", participantIds: [userId] },
        currentUser.id
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      onCreated(conversation.id);
      resetAndClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start conversation");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEmailSearch(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const foundUser = await lookupUserByEmail(email.trim());
      await startConversationWith(foundUser.id, foundUser.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "User not found");
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : resetAndClose())}>
      <button
        onClick={() => setOpen(true)}
        className="mx-3 mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-linear-to-r from-brand to-brand-hover px-4 py-2.5 text-xs font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
      >
        <Plus className="h-3.5 w-3.5" />
        New conversation
      </button>
      <DialogContent className="overflow-hidden p-0">
        <div className="relative overflow-hidden bg-linear-to-b from-brand/20 to-transparent p-6 pb-5">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand/30 blur-[70px]" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand shadow-glow">
              <Users className="h-5 w-5 text-white" />
            </div>
            <DialogHeader className="text-left">
              <DialogTitle>Start a conversation</DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <div className="p-6 pt-4">
          {!showEmailSearch ? (
            <div className="space-y-4">
              {loadingContacts ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-brand" />
                </div>
              ) : contacts.length > 0 ? (
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-faint">
                    Your contacts
                  </p>
                  <div className="max-h-64 space-y-1.5 overflow-y-auto">
                    {contacts.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => startConversationWith(c.id, c.name)}
                        disabled={submitting}
                        className="flex w-full items-center gap-3 rounded-xl border-2 border-transparent p-2.5 text-left transition-all hover:border-brand/30 hover:bg-brand-muted disabled:opacity-50"
                      >
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full font-display text-sm font-semibold text-white shadow-glow"
                          style={c.avatarUrl ? undefined : { backgroundImage: brandGradient(c.name) }}
                        >
                          {c.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={resolveFileUrl(c.avatarUrl)}
                              alt={c.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            brandInitial(c.name)
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                          <p className="truncate text-xs text-ink-faint capitalize">{c.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-ink-faint">
                  No contacts yet — you&apos;ll see people here once you have a deal or contract
                  together.
                </p>
              )}

              {error && <p className="text-sm text-fall">{error}</p>}

              <button
                type="button"
                onClick={() => setShowEmailSearch(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-surface-border py-3 text-sm font-medium text-ink-muted transition-colors hover:border-brand/40 hover:text-brand"
              >
                <Search className="h-4 w-4" />
                Message someone new by email
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailSearch} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-ink-muted">User email</label>
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
                />
              </div>

              {error && <p className="text-sm text-fall">{error}</p>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowEmailSearch(false)}
                  className="flex-1 rounded-xl bg-surface-raised px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover px-4 py-2 text-sm font-medium text-white shadow-glow transition-all disabled:opacity-60 disabled:shadow-none"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Starting..." : "Start conversation"}
                </button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}