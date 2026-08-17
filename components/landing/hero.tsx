"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section className="relative overflow-hidden px-3 pb-24 pt-20 md:px-6 sm:pt-28">
      {/* Animirana gradient pozadina — sporo pluta u krug */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-150 w-225 -translate-x-1/2 rounded-full bg-brand/15 blur-[130px]"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-32 h-100 w-125 rounded-full bg-gold/10 blur-[110px]"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dot-grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--surface-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-surface-raised/80 px-3 py-1.5 text-xs font-medium text-ink-muted ring-1 ring-foreground/10 backdrop-blur-sm"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-3.5 w-3.5 text-brand" />
          </motion.span>
          Built for creators and the brands who book them
        </motion.div>

        <h1 className="mt-6 font-display text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
          Every brand deal,
          <br />
          <span className="bg-linear-to-r from-brand via-brand-hover to-brand bg-size-[200%_auto] bg-clip-text text-transparent animate-gradient-x">
            one command center.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
          CreatorOS replaces the spreadsheets, DMs, and email threads with a single
          place to pitch deals, sign contracts, track invoices, and see what your
          content actually earns.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-12 w-full bg-linear-to-r from-brand to-brand-hover px-6 text-[15px] shadow-glow transition-transform hover:scale-105 sm:w-auto"
          >
            <Link href="/register">
              Start for free
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 w-full px-6 text-[15px] sm:w-auto">
            <a href="#features">See how it works</a>
          </Button>
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          Free for up to 5 active deals. No credit card required.
        </p>
      </motion.div>

      {/* Screenshot — 3D tilt prateći miša + kontinuirano lebdenje */}
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mx-auto mt-16 max-w-4xl"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.2 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
          }}
        >
          <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-foreground/10 shadow-glow">
            <div className="flex items-center gap-1.5 border-b border-surface-border/60 bg-surface-raised/50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-fall/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-rise/40" />
            </div>
            <Image
              src="/screenshots/overview_creator.png"
              alt="CreatorOS dashboard overview showing pipeline, response rate, and this week's schedule"
              width={1913}
              height={912}
              priority
              className="w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}