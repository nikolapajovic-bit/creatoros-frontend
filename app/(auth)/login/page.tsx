"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    setSubmitting(true);
    try {
      const loggedInUser = await login(email, password);
      router.push(loggedInUser?.onboardingCompleted ? '/dashboard' : '/onboarding');
    } catch {
      // greška je već u store-u (error state), prikazujemo je ispod
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl bg-surface p-6 ring-1 ring-foreground/10">
      <h1 className="font-display text-xl font-semibold text-foreground">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Log in to your CreatorOS account</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-medium text-ink-muted">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-muted">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        {error && <p className="text-sm text-fall">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-brand py-2.5 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-ink-faint">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-brand hover:text-brand-hover">
          Sign up
        </Link>
      </p>
    </div>
  );
}