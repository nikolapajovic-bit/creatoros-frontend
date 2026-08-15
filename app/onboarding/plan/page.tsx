"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Sparkles } from "lucide-react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useAuthStore } from "@/store/auth-store";
import { completeOnboarding, mockUpgradeToPro } from "@/lib/api/onboarding";

const CREATOR_PRO_FEATURES = [
  "Unlimited active deals",
  "Unlimited contracts",
  "Unlimited messaging",
  "Full AI Studio access",
  "Priority support",
];

const CREATOR_FREE_FEATURES = [
  "Up to 5 active deals",
  "Up to 2 contracts",
  "Up to 5 conversations",
  "Basic AI Studio",
];

const BRAND_PRO_FEATURES = [
  "Unlimited active deals",
  "Unlimited contracts",
  "Unlimited messaging",
  "Advanced creator search",
  "Priority support",
];

const BRAND_FREE_FEATURES = [
  "Up to 5 active deals",
  "Up to 2 contracts",
  "Up to 5 conversations",
];

export default function PlanStep() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setAuthUser = useAuthStore((s) => s.setUser);
  const { username, answers } = useOnboardingStore();

  const [loadingPlan, setLoadingPlan] = useState<"free" | "pro" | null>(null);
  const [error, setError] = useState("");

  const isCreator = user?.role === "creator";
  const price = isCreator ? "19.99" : "59.99";
  const proFeatures = isCreator ? CREATOR_PRO_FEATURES : BRAND_PRO_FEATURES;
  const freeFeatures = isCreator ? CREATOR_FREE_FEATURES : BRAND_FREE_FEATURES;

  async function handleChoosePlan(plan: "free" | "pro") {
    setError("");
    setLoadingPlan(plan);
    try {
      const updatedUser = await completeOnboarding(username, answers);

      if (plan === "pro") {
        await mockUpgradeToPro();
      }

      if (user) {
        setAuthUser({
          ...user,
          username: updatedUser.username,
          plan: plan === "pro" ? "pro" : "free",
          onboardingCompleted: true,
        });
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoadingPlan(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Choose how you want to start
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You can always upgrade later from Settings
        </p>
      </div>

      {error && <p className="text-center text-sm text-fall">{error}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Free plan */}
        <div className="flex flex-col rounded-xl bg-surface p-5 ring-1 ring-foreground/10">
          <p className="text-sm font-medium text-foreground">Free</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-foreground">$0</p>
          <p className="text-xs text-ink-faint">forever</p>

          <ul className="mt-4 flex-1 space-y-2">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-ink-muted">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint" />
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleChoosePlan("free")}
            disabled={loadingPlan !== null}
            className="mt-5 rounded-md bg-surface-raised px-4 py-2.5 text-sm font-medium text-ink-muted hover:text-ink disabled:opacity-50"
          >
            {loadingPlan === "free" ? "Setting up..." : "Continue with Free"}
          </button>
        </div>

        {/* Pro plan */}
        <div className="relative flex flex-col rounded-xl bg-linear-to-b from-brand/15 to-transparent p-5 ring-2 ring-brand">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Recommended
          </span>

          <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-brand" />
            Pro
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold text-foreground">
            ${price}
            <span className="text-sm font-normal text-ink-faint">/month</span>
          </p>
          <p className="text-xs text-ink-faint">cancel anytime</p>

          <ul className="mt-4 flex-1 space-y-2">
            {proFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rise" />
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleChoosePlan("pro")}
            disabled={loadingPlan !== null}
            className="mt-5 flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-60"
          >
            {loadingPlan === "pro" && <Loader2 className="h-4 w-4 animate-spin" />}
            {loadingPlan === "pro" ? "Upgrading..." : "Start with Pro"}
          </button>
        </div>
      </div>
    </div>
  );
}