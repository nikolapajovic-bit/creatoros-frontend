"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = "creator" | "brand";

const PLANS: Record<
  Tab,
  {
    free: string[];
    pro: { price: string; features: string[] };
  }
> = {
  creator: {
    free: ["Up to 5 active deals", "Up to 2 contracts", "Up to 5 conversations", "Basic AI Studio"],
    pro: {
      price: "19.99",
      features: [
        "Unlimited active deals",
        "Unlimited contracts",
        "Unlimited messaging",
        "Full AI Studio access",
        "Priority support",
      ],
    },
  },
  brand: {
    free: ["Up to 5 active deals", "Up to 2 contracts", "Up to 5 conversations"],
    pro: {
      price: "59.99",
      features: [
        "Unlimited active deals",
        "Unlimited contracts",
        "Unlimited messaging",
        "Advanced creator search",
        "Priority support",
      ],
    },
  },
};

export function Pricing() {
  const [tab, setTab] = useState<Tab>("creator");
  const plan = PLANS[tab];

  return (
    <section id="pricing" className="px-3 py-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Start free. Upgrade when it pays for itself.
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            You can always switch plans later from Settings.
          </p>
        </div>

        <div className="mx-auto mt-8 flex w-fit items-center gap-1 rounded-full bg-surface p-1 ring-1 ring-foreground/10">
          {(["creator", "brand"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-5 py-2 text-[13.5px] font-medium capitalize transition-colors",
                tab === t
                  ? "bg-brand text-white shadow-glow"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {t === "creator" ? "For creators" : "For brands"}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl bg-surface p-7 ring-1 ring-foreground/10">
            <p className="text-[15px] font-semibold text-foreground">Free</p>
            <p className="mt-3 font-mono text-4xl font-semibold text-foreground">
              $0
              <span className="text-sm font-normal text-ink-faint"> forever</span>
            </p>
            <ul className="mt-6 space-y-3">
              {plan.free.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
                  {f}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" size="lg" className="mt-8 w-full">
              <Link href="/register">Continue with Free</Link>
            </Button>
          </div>

          {/* Pro — same gradient recipe as the sidebar's Upgrade to Pro nudge */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-brand/20 to-gold/20 p-7 ring-1 ring-brand/30 shadow-glow">
            <div className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-brand/20 blur-[80px]" />

            <span className="relative inline-flex items-center rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              Recommended
            </span>
            <p className="relative mt-4 flex items-center gap-1.5 text-[15px] font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-brand" />
              Pro
            </p>
            <p className="relative mt-3 font-mono text-4xl font-semibold text-foreground">
              ${plan.pro.price}
              <span className="text-sm font-normal text-ink-faint">/month</span>
            </p>
            <p className="relative mt-1 text-xs text-ink-faint">Cancel anytime</p>
            <ul className="relative mt-6 space-y-3">
              {plan.pro.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-rise" />
                  {f}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="relative mt-8 w-full">
              <Link href={`/register?plan=pro&as=${tab}`}>Start with Pro</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
