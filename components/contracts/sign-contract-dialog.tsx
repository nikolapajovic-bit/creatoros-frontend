"use client";

import { useState } from "react";
import { PenLine, Loader2, Check, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SignatureCanvas } from "@/components/contracts/signature-canvas";
import { useSignContract } from "@/hooks/use-contracts";
import { useAuthStore } from "@/store/auth-store";

type Step = "sign" | "save-prompt";

export function SignContractDialog({ contractId }: { contractId: string }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("sign");
  const [fullName, setFullName] = useState("");
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [useSaved, setUseSaved] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const signContract = useSignContract();

  const hasSaved = !!user?.hasSavedSignature;

  function resetAndClose() {
    setStep("sign");
    setFullName("");
    setSignatureData(null);
    setUseSaved(false);
    setAgreed(false);
    setError("");
    setOpen(false);
  }

  async function handleSubmitSignature(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please type your full name");
      return;
    }
    if (!agreed) {
      setError("You must agree to sign electronically");
      return;
    }
    if (!useSaved && !signatureData) {
      setError("Please draw your signature");
      return;
    }

    if (!useSaved && !hasSaved) {
      setStep("save-prompt");
      return;
    }

    await submitSignature(false);
  }

  async function submitSignature(saveForFuture: boolean) {
    try {
      await signContract.mutateAsync({
        id: contractId,
        input: {
          fullName: fullName.trim(),
          agreedToConsent: true,
          ...(useSaved
            ? { useSavedSignature: true }
            : { signatureImage: signatureData!, saveSignatureForFuture: saveForFuture }),
        },
      });
      if (saveForFuture && user) {
        setUser({ ...user, hasSavedSignature: true });
      }
      resetAndClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign contract");
      setStep("sign");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : resetAndClose())}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
      >
        <PenLine className="h-4 w-4" />
        Sign contract
      </button>
      <DialogContent className="overflow-hidden p-0">
        {step === "sign" && (
          <>
            <div className="relative overflow-hidden bg-linear-to-b from-brand/20 to-transparent p-6 pb-5">
              <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand/30 blur-[70px]" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand shadow-glow">
                  <PenLine className="h-5 w-5 text-white" />
                </div>
                <DialogHeader className="text-left">
                  <DialogTitle>Sign this contract</DialogTitle>
                </DialogHeader>
              </div>
            </div>

            <form onSubmit={handleSubmitSignature} className="space-y-4 p-6 pt-4">
              <div>
                <label className="text-xs font-medium text-ink-muted">Full legal name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
                />
              </div>

              {hasSaved && (
                <div className="flex gap-1 rounded-xl bg-surface-raised p-1">
                  <button
                    type="button"
                    onClick={() => setUseSaved(true)}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                      useSaved ? "bg-surface text-foreground shadow-sm" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    Use saved signature
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseSaved(false)}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                      !useSaved ? "bg-surface text-foreground shadow-sm" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    Draw new signature
                  </button>
                </div>
              )}

              {!useSaved && (
                <div>
                  <label className="text-xs font-medium text-ink-muted">Signature</label>
                  <div className="mt-1.5">
                    <SignatureCanvas onChange={setSignatureData} />
                  </div>
                </div>
              )}

              {useSaved && hasSaved && (
                <div>
                  <label className="text-xs font-medium text-ink-muted">Saved signature</label>
                  <div className="mt-1.5 flex items-center justify-center rounded-xl border-2 border-dashed border-surface-border bg-white p-3">
                    {user?.savedSignatureUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`http://localhost:5000${user.savedSignatureUrl}`}
                        alt="Your saved signature"
                        className="h-20 object-contain"
                      />
                    )}
                  </div>
                </div>
              )}

              <label className="flex items-start gap-2 rounded-xl bg-surface-raised p-3 text-xs text-ink-muted">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-surface-border"
                />
                I agree that drawing my signature above and clicking Sign constitutes my legal
                electronic signature on this document, and I am signing of my own free will.
              </label>

              {error && <p className="text-sm text-fall">{error}</p>}

              <button
                type="submit"
                disabled={signContract.isPending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover py-3 text-sm font-semibold text-white shadow-glow transition-all disabled:opacity-60 disabled:shadow-none"
              >
                {signContract.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {signContract.isPending ? "Signing..." : "Sign"}
              </button>
            </form>
          </>
        )}

        {step === "save-prompt" && (
          <>
            <div className="relative overflow-hidden bg-linear-to-b from-gold/20 to-transparent p-6 pb-5">
              <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/30 blur-[70px]" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold shadow-glow">
                  <Sparkles className="h-5 w-5 text-canvas" />
                </div>
                <DialogHeader className="text-left">
                  <DialogTitle>Save this signature?</DialogTitle>
                </DialogHeader>
              </div>
            </div>

            <div className="p-6 pt-4">
              <p className="text-sm text-muted-foreground">
                Would you like to save this signature so you can reuse it on future contracts
                without drawing it again?
              </p>
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => submitSignature(false)}
                  disabled={signContract.isPending}
                  className="flex-1 rounded-xl bg-surface-raised px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink disabled:opacity-60"
                >
                  No, just this once
                </button>
                <button
                  type="button"
                  onClick={() => submitSignature(true)}
                  disabled={signContract.isPending}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover px-4 py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-60 disabled:shadow-none"
                >
                  {signContract.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Yes, save it
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}