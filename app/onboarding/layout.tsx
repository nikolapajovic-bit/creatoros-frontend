"use client";

import { usePathname } from "next/navigation";

const STEP_ROUTES = [
  { path: "/onboarding", label: "Username" },
  { path: "/onboarding/questions", label: "About you" },
  { path: "/onboarding/building", label: "Setup" },
  { path: "/onboarding/preview", label: "Preview" },
  { path: "/onboarding/plan", label: "Plan" },
];

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentStepIndex = Math.max(
    STEP_ROUTES.findIndex((s) => s.path === pathname),
    0
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 h-100 w-125 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <div className="flex flex-col items-center pt-8">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
            </div>
            <img src="/logo-full.png" alt="CreatorOS" className="h-7 w-auto" />
          </div>

          <div className="mt-6 flex items-center gap-2">
            {STEP_ROUTES.map((s, i) => (
              <div
                key={s.path}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= currentStepIndex ? "w-7 bg-brand" : "w-3 bg-surface-raised"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-10">
          <div
            key={pathname}
            className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}