"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MessageSquare,
  CalendarDays,
  Image as ImageIcon,
  Wallet,
} from "lucide-react";

const SMALL_FEATURES = [
  {
    icon: MessageSquare,
    title: "Messages",
    desc: "One inbox for every brand conversation — no more digging through email.",
  },
  {
    icon: Wallet,
    title: "Finance",
    desc: "Invoices, outstanding balances, and payouts tracked in real time.",
  },
  {
    icon: CalendarDays,
    title: "Calendar",
    desc: "Deliverables, deadlines, and campaigns laid out by week and month.",
  },
  {
    icon: ImageIcon,
    title: "Media library",
    desc: "Every asset a brand sends you, organized and searchable in one place.",
  },
];

export function FeatureBento() {
  return (
    <section id="features" className="px-3 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium text-brand">Everything after &ldquo;yes&rdquo;</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            The whole deal, not just the DM
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            From the first pitch to the final invoice — every tool a working
            creator or brand team actually needs.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-6">
          <FeatureCard
            className="lg:col-span-4"
            glow="brand"
            eyebrow="Deals"
            title="See every deal, from inquiry to paid"
            desc="Track pipeline value, response rate, and where each brand stands — Inquiry, Negotiating, Contract sent, In progress, Completed."
            delay={0}
          >
            <Image
              src="/screenshots/deals_awaiting.png"
              alt="Deals pipeline showing active deals, pipeline value, and stage columns"
              width={1917}
              height={915}
              className="w-full rounded-xl ring-1 ring-foreground/10"
            />
          </FeatureCard>

          <FeatureCard
            className="lg:col-span-2"
            glow="gold"
            eyebrow="Contracts"
            title="Send it, sign it, done"
            desc="Draft a contract, send it for e-signature, and get notified the moment it's signed."
            delay={0.1}
          >
            <Image
              src="/screenshots/contract.png"
              alt="Signed contract document viewer"
              width={1910}
              height={911}
              className="w-full rounded-xl ring-1 ring-foreground/10"
            />
          </FeatureCard>

          <FeatureCard
            className="lg:col-span-3"
            glow="gold"
            eyebrow="AI Studio"
            title="Never stare at a blank caption box"
            desc="Generate captions, content ideas, hashtags, and brand-email replies in your voice."
            delay={0.15}
          >
            <Image
              src="/screenshots/ai_studio.png"
              alt="AI Studio caption writer interface"
              width={1915}
              height={897}
              className="w-full rounded-xl ring-1 ring-foreground/10"
            />
          </FeatureCard>

          <FeatureCard
            className="lg:col-span-3"
            glow="brand"
            eyebrow="Analytics"
            title="Real numbers, synced automatically"
            desc="Followers, engagement rate, and top posts pulled straight from Instagram, TikTok, and YouTube."
            delay={0.2}
          >
            <Image
              src="/screenshots/analyticsos.png"
              alt="Analytics dashboard showing followers, engagement rate, and top posts"
              width={1917}
              height={917}
              className="w-full rounded-xl ring-1 ring-foreground/10"
            />
          </FeatureCard>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SMALL_FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl bg-surface p-5 ring-1 ring-foreground/10 transition-colors hover:bg-surface-raised/60"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-muted text-brand">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-4 font-display text-[15px] font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  eyebrow,
  title,
  desc,
  children,
  glow,
  delay = 0,
  className = "",
}: {
  eyebrow: string;
  title: string;
  desc: string;
  children: React.ReactNode;
  glow: "brand" | "gold";
  delay?: number;
  className?: string;
}) {
  const glowBg = glow === "brand" ? "bg-brand/15" : "bg-gold/15";
  const washFrom = glow === "brand" ? "from-brand/10" : "from-gold/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl bg-linear-to-b ${washFrom} to-transparent p-5 ring-1 ring-foreground/10 transition-shadow hover:shadow-glow ${className}`}
    >
      <div className={`pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full ${glowBg} blur-[80px]`} />

      <p className="relative text-xs font-semibold uppercase tracking-wide text-ink-faint">
        {eyebrow}
      </p>
      <h3 className="relative mt-1.5 font-display text-[17px] font-semibold text-foreground">
        {title}
      </h3>
      <p className="relative mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
        {desc}
      </p>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative mt-4 overflow-hidden rounded-xl bg-canvas/40"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}