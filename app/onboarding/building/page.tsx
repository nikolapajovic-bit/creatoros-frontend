"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useAuthStore } from "@/store/auth-store";
import type { OnboardingAnswers } from "@/types/onboarding";

function getBuildingSteps(role: string | undefined, answers: OnboardingAnswers) {
  const platform = answers.platform;
  const isCreator = role === "creator";

  return [
    isCreator ? `Setting up your ${platform ?? "creator"} workspace...` : "Setting up your brand workspace...",
    isCreator ? "Preparing your deal pipeline..." : "Preparing your creator search tools...",
    "Configuring contracts & e-signatures...",
    "Setting up payment tracking...",
    "Almost there...",
  ];
}

export default function BuildingStep() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const answers = useOnboardingStore((s) => s.answers);
  const username = useOnboardingStore((s) => s.username);

  const steps = getBuildingSteps(user?.role, answers);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (!username) {
      router.replace("/onboarding");
      return;
    }

    if (completedCount >= steps.length) {
      const timer = setTimeout(() => router.push("/onboarding/preview"), 500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setCompletedCount((c) => c + 1), 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCount, username]);

  return (
    <div className="rounded-xl bg-surface p-8 ring-1 ring-foreground/10">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-brand/20" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand">
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          </div>
        </div>
        <h1 className="mt-5 font-display text-lg font-semibold text-foreground">
          Building your workspace
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">This will only take a moment</p>
      </div>

      <div className="mt-8 space-y-3">
        {steps.map((step, i) => {
          const isDone = i < completedCount;
          const isCurrent = i === completedCount;
          return (
            <div
              key={step}
              className={`flex items-center gap-3 transition-opacity ${
                isDone || isCurrent ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isDone ? "bg-rise text-canvas" : "bg-surface-raised"
                }`}
              >
                {isDone ? (
                  <Check className="h-3 w-3" strokeWidth={3} />
                ) : isCurrent ? (
                  <Loader2 className="h-3 w-3 animate-spin text-ink-muted" />
                ) : null}
              </div>
              <span
                className={`text-sm ${isDone ? "text-ink-muted line-through" : "text-foreground"}`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}