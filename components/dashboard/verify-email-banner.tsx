"use client";

import { useState } from "react";
import { Mail, X, Loader2, Check } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { resendVerificationRequest } from "@/lib/api/settings";

export function VerifyEmailBanner() {
  const user = useAuthStore((s) => s.user);
  const [dismissed, setDismissed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  if (!user || user.emailVerified || dismissed) return null;

  async function handleResend() {
    setStatus("sending");
    try {
      await resendVerificationRequest();
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <div className="relative mb-4 flex items-center gap-3 overflow-hidden rounded-2xl bg-linear-to-r from-gold/15 to-transparent px-4 py-3 ring-1 ring-gold/25">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/20 text-gold">
        <Mail className="h-4 w-4" />
      </div>
      <p className="flex-1 text-sm text-ink">
        Please verify your email address ({user.email}) to secure your account.
      </p>
      <button
        onClick={handleResend}
        disabled={status !== "idle"}
        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {status === "sent" && <Check className="h-3.5 w-3.5 text-rise" />}
        {status === "idle" && "Resend email"}
        {status === "sending" && "Sending..."}
        {status === "sent" && "Sent!"}
      </button>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="shrink-0 rounded-lg p-1 text-ink-faint transition-colors hover:bg-surface hover:text-ink"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}