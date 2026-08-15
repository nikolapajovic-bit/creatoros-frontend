import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercent } from "@/lib/utils";

export function Hero() {
  return (
    <section className="px-3 pb-20 pt-10 md:px-6 sm:pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          For creators &amp; the brands who book them
        </p>
        <h1 className="mt-3 font-display text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
          Every brand deal,
          <br />
          <span className="text-brand">one command center.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
          CreatorOS replaces the spreadsheets, DMs, and email threads with a single
          place to pitch deals, sign contracts, track invoices, and see what your
          content actually earns.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="group h-12 w-full px-6 text-[15px] sm:w-auto">
            <Link href="/register">
              Start free — no card needed
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 w-full px-6 text-[15px] sm:w-auto">
            <a href="#features">See how it works</a>
          </Button>
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          Free forever for up to 5 active deals · Upgrade anytime
        </p>
      </div>

      {/* Product mockup — glass panel, matching the dashboard hero card recipe */}
      <div className="relative mx-auto mt-16 max-w-5xl">
        {/* Floating stat chips — siblings of the clipped panel, so they can hang outside it */}
        <div className="absolute -left-4 top-14 z-10 hidden w-56 rounded-xl bg-surface/95 p-3.5 ring-1 ring-foreground/10 shadow-glow backdrop-blur-xl sm:block sm:-left-8 md:-left-14">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rise-muted text-rise">
              <CheckCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-ink">Deal accepted</p>
              <p className="font-mono text-xs text-ink-faint">
                Test Brand · {formatCurrency(450)}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute -right-4 bottom-8 z-10 hidden w-52 rounded-xl bg-surface/95 p-3.5 ring-1 ring-foreground/10 shadow-glow backdrop-blur-xl sm:block sm:-right-6 md:-right-12">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-muted text-gold">
              <TrendingUp className="h-4 w-4" />
            </span>
            <div>
              <p className="font-mono text-sm font-medium text-ink">82.4K</p>
              <p className="text-xs text-rise">{formatPercent(3.8)} followers</p>
            </div>
          </div>
        </div>

        {/* Clipped inner panel — holds the glow blobs and the screenshot */}
        <div className="relative overflow-hidden rounded-2xl bg-surface/60 p-2 ring-1 ring-foreground/10 shadow-glow backdrop-blur-xl sm:p-3">
          <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-gold/15 blur-[90px]" />

          <div className="relative overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <Image
              src="/screenshots/overview_creator.png"
              alt="CreatorOS dashboard overview showing pipeline, response rate, and this week's schedule"
              width={1913}
              height={912}
              priority
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
