"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/api/client";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setError("No verification token found in the link.");
      return;
    }

    apiFetch(`/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(() => setStatus("success"))
      .catch((err) => {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Verification failed");
      });
  }, [token]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl bg-surface/80 p-8 text-center backdrop-blur-xl ring-1 ring-foreground/10 shadow-glow">
          {status === "loading" && (
            <>
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-brand" />
              <p className="mt-4 text-sm text-muted-foreground">Verifying your email...</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rise/15 text-rise">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h1 className="mt-4 font-display text-lg font-semibold text-foreground">
                Email verified
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Your email has been successfully verified.
              </p>
              <button
                onClick={() => router.push("/dashboard")}
                className="mt-6 w-full rounded-xl bg-linear-to-r from-brand to-brand-hover py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                Go to dashboard
              </button>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-fall/15 text-fall">
                <XCircle className="h-7 w-7" />
              </div>
              <h1 className="mt-4 font-display text-lg font-semibold text-foreground">
                Verification failed
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">{error}</p>
              <Link
                href="/dashboard"
                className="mt-6 block w-full rounded-xl bg-surface-raised py-2.5 text-sm font-medium text-ink-muted"
              >
                Back to dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}