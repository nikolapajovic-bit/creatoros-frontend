"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, HelpCircle } from "lucide-react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useAuthStore } from "@/store/auth-store";
import { CREATOR_QUESTIONS, BRAND_QUESTIONS } from "@/types/onboarding";

export default function QuestionsStep() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const answers = useOnboardingStore((s) => s.answers);
  const setAnswer = useOnboardingStore((s) => s.setAnswer);
  const username = useOnboardingStore((s) => s.username);

  const questions = user?.role === "creator" ? CREATOR_QUESTIONS : BRAND_QUESTIONS;
  const [index, setIndex] = useState(0);

  if (!username) {
    router.replace("/onboarding");
    return null;
  }

  const current = questions[index];
  const selected = answers[current.key];

  function handleSelect(option: string) {
    setAnswer(current.key, option);
    setTimeout(() => {
      if (index < questions.length - 1) {
        setIndex(index + 1);
      } else {
        router.push("/onboarding/building");
      }
    }, 300);
  }

  function handleBack() {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      router.push("/onboarding");
    }
  }

  return (
    <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10">
      <div className="bg-linear-to-b from-brand/15 to-transparent p-6 pb-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-xs text-ink-faint transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>

        <div className="mt-3 flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand shadow-glow">
            <HelpCircle className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-ink-faint">
              Question {index + 1} of {questions.length}
            </p>
            <h1 className="font-display text-sm font-semibold leading-snug text-foreground">
              {current.question}
            </h1>
          </div>
        </div>

        <div className="mt-3 flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= index ? "bg-brand" : "bg-surface-raised"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-1.5 p-6 pt-3">
        {current.options.map((option, i) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            style={{ animationDelay: `${i * 50}ms` }}
            className={`flex w-full animate-in items-center justify-between rounded-lg border-2 px-4 py-3 text-left text-sm font-medium fade-in slide-in-from-bottom-1 transition-all duration-200 ${
              selected === option
                ? "border-brand bg-brand-muted text-brand"
                : "border-surface-border text-foreground hover:border-brand/40 hover:bg-surface-raised"
            }`}
          >
            {option}
            <ArrowRight
              className={`h-3.5 w-3.5 transition-opacity ${
                selected === option ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}