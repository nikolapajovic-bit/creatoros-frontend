import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CREATOR_POINTS = [
  "One pipeline for every brand deal you're working",
  "AI-drafted captions, ideas, and hashtags in your voice",
  "Instagram, TikTok, and YouTube stats in one dashboard",
  "Invoices tracked, so you know exactly what's outstanding",
];

const BRAND_POINTS = [
  "Send deal proposals and contracts in minutes, not days",
  "Keep every creator conversation and asset in one thread",
  "Track campaign spend and pipeline value at a glance",
  "Advanced creator search to find the right fit, faster",
];

export function AudienceSplit() {
  return (
    <section id="for-brands" className="px-3 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            One platform, two sides of the table
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built for creators. Built for brands. Built together.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          <AudienceCard
            badge="For creators"
            badgeClass="bg-brand text-white"
            title="Run your deals like a business"
            points={CREATOR_POINTS}
            glow="bg-brand/20"
            wash="from-brand/10"
            cta={{ href: "/register?as=creator", label: "Start as a creator" }}
          />
          <AudienceCard
            badge="For brands"
            badgeClass="bg-gold text-canvas"
            title="Book creators without the chaos"
            points={BRAND_POINTS}
            glow="bg-gold/20"
            wash="from-gold/10"
            cta={{ href: "/register?as=brand", label: "Start as a brand" }}
          />
        </div>
      </div>
    </section>
  );
}

function AudienceCard({
  badge,
  badgeClass,
  title,
  points,
  glow,
  wash,
  cta,
}: {
  badge: string;
  badgeClass: string;
  title: string;
  points: string[];
  glow: string;
  wash: string;
  cta: { href: string; label: string };
}) {
  return (
    <div className={`relative flex flex-col overflow-hidden rounded-2xl bg-linear-to-b ${wash} to-transparent p-7 ring-1 ring-foreground/10`}>
      <div className={`pointer-events-none absolute -top-20 right-0 h-48 w-48 rounded-full ${glow} blur-[90px]`} />

      <span className={`relative inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
        {badge}
      </span>
      <h3 className="relative mt-4 font-display text-xl font-semibold text-foreground">
        {title}
      </h3>
      <ul className="relative mt-5 flex-1 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-rise" />
            {point}
          </li>
        ))}
      </ul>
      <Button asChild variant="link" className="relative mt-7 h-auto w-fit px-0 text-sm font-semibold text-foreground no-underline hover:no-underline">
        <Link href={cta.href} className="group flex items-center gap-1.5">
          {cta.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Button>
    </div>
  );
}
