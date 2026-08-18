import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 h-100 w-125 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <img src="/logo-full-1.png" alt="CreatorOS" className="h-9 w-auto" />
        </div>

        <p className="font-mono text-7xl font-bold tracking-tight text-transparent bg-linear-to-r from-brand to-brand-hover bg-clip-text">
          404
        </p>

        <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for might have been moved, renamed, or never
          existed in the first place.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover px-6 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Back to dashboard
          </Link>
          <Link
            href="/"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-surface-raised px-6 text-sm font-medium text-ink-muted transition-colors hover:text-ink sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}