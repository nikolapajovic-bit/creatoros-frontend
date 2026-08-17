"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium text-brand">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Start free. Upgrade when it pays for itself.
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            You can always switch plans later from Settings.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mx-auto mt-8 flex w-fit items-center gap-1 rounded-full bg-surface p-1 ring-1 ring-foreground/10"
        >
          {(["creator", "brand"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative rounded-full px-5 py-2 text-[13.5px] font-medium capitalize transition-colors",
                tab === t ? "text-white" : "text-ink-muted hover:text-ink"
              )}
            >
              {tab === t && (
                <motion.span
                  layoutId="pricing-tab-bg"
                  className="absolute inset-0 rounded-full bg-brand shadow-glow"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{t === "creator" ? "For creators" : "For brands"}</span>
            </button>
          ))}
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.15, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-surface p-7 ring-1 ring-foreground/10 transition-shadow hover:shadow-lg"
          >
            <p className="text-[15px] font-semibold text-foreground">Free</p>
            <p className="mt-3 font-mono text-4xl font-semibold text-foreground">
              $0
              <span className="text-sm font-normal text-ink-faint"> forever</span>
            </p>
            <AnimatePresence mode="wait">
              <motion.ul
                key={tab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-3"
              >
                {plan.free.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
                    {f}
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
            <Button asChild variant="outline" size="lg" className="mt-8 w-full">
              <Link href="/register">Continue with Free</Link>
            </Button>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.25, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl bg-linear-to-r from-brand/20 to-gold/20 p-7 ring-1 ring-brand/30 shadow-glow"
          >
            <motion.div
              className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-brand/20 blur-[80px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <span className="relative inline-flex items-center rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              Recommended
            </span>
            <p className="relative mt-4 flex items-center gap-1.5 text-[15px] font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-brand" />
              Pro
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={tab}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="relative mt-3 font-mono text-4xl font-semibold text-foreground"
              >
                ${plan.pro.price}
                <span className="text-sm font-normal text-ink-faint">/month</span>
              </motion.p>
            </AnimatePresence>
            <p className="relative mt-1 text-xs text-ink-faint">Cancel anytime</p>
            <AnimatePresence mode="wait">
              <motion.ul
                key={tab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative mt-6 space-y-3"
              >
                {plan.pro.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-rise" />
                    {f}
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
            <Button asChild size="lg" className="relative mt-8 w-full">
              <Link href={`/register?plan=pro&as=${tab}`}>Start with Pro</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}