"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, TrendingUp, Handshake, FileSignature, Wallet } from "lucide-react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency } from "@/lib/utils";

const PLATFORM_LABELS: Record<string, string> = {
  Instagram: "Instagram",
  TikTok: "TikTok",
  YouTube: "YouTube",
  "Multiple platforms": "your platforms",
};

export default function PreviewStep() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const answers = useOnboardingStore((s) => s.answers);
  const username = useOnboardingStore((s) => s.username);

  const isCreator = user?.role === "creator";
  const firstName = user?.name?.split(" ")[0] ?? "there";
  const platformLabel = answers.platform ? PLATFORM_LABELS[answers.platform] ?? answers.platform : "your platforms";

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          {firstName}, your workspace is ready
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s a preview of what @{username}&apos;s dashboard will look like
        </p>
      </div>

      <div className="rounded-xl bg-linear-to-b from-brand/10 to-transparent p-6 ring-1 ring-foreground/10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm text-muted-foreground">
              {isCreator ? `Tracking ${platformLabel}` : "Creator relationships"}
            </p>
            <p className="mt-1 font-mono text-3xl font-semibold text-foreground">
              {isCreator ? "0" : "0"} <span className="text-lg text-ink-faint">active deals</span>
            </p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-muted-foreground">Contracts</p>
              <p className="mt-1 font-mono text-lg font-semibold text-foreground">0</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {isCreator ? "Earnings" : "Budget tracked"}
              </p>
              <p className="mt-1 font-mono text-lg font-semibold text-foreground">
                {formatCurrency(0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface p-4 ring-1 ring-foreground/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand/10 text-brand">
            <Handshake className="h-4 w-4" />
          </div>
          <p className="mt-3 text-sm font-medium text-foreground">
            {isCreator ? "Deal pipeline" : "Find creators"}
          </p>
          <p className="mt-0.5 text-xs text-ink-faint">
            {answers.painPoint === "Finding brand deals"
              ? "We'll help brands find you"
              : isCreator
              ? "Track every negotiation"
              : "Browse verified creators"}
          </p>
        </div>

        <div className="rounded-xl bg-surface p-4 ring-1 ring-foreground/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold/10 text-gold">
            <FileSignature className="h-4 w-4" />
          </div>
          <p className="mt-3 text-sm font-medium text-foreground">E-signatures</p>
          <p className="mt-0.5 text-xs text-ink-faint">Sign contracts in seconds</p>
        </div>

        <div className="rounded-xl bg-surface p-4 ring-1 ring-foreground/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-rise/10 text-rise">
            <Wallet className="h-4 w-4" />
          </div>
          <p className="mt-3 text-sm font-medium text-foreground">Automatic invoices</p>
          <p className="mt-0.5 text-xs text-ink-faint">Generated the moment a deal closes</p>
        </div>

        <div className="rounded-xl bg-surface p-4 ring-1 ring-foreground/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand/10 text-brand">
            <TrendingUp className="h-4 w-4" />
          </div>
          <p className="mt-3 text-sm font-medium text-foreground">
            {answers.goal ?? "Stay organized"}
          </p>
          <p className="mt-0.5 text-xs text-ink-faint">Your goal, front and center</p>
        </div>
      </div>

      <button
        onClick={() => router.push("/onboarding/plan")}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-hover"
      >
        Continue
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}