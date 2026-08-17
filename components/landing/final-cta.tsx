"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="px-3 py-20 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-linear-to-b from-brand/15 to-transparent p-10 text-center ring-1 ring-foreground/10 sm:p-14"
      >
        <motion.div
          className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-brand/20 blur-[100px]"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, 20, -10, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-20 right-1/4 h-56 w-56 rounded-full bg-gold/15 blur-[90px]"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, -20, 10, 0],
          }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          Stop managing brand deals in your DMs.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mx-auto mt-4 max-w-md text-[15px] text-muted-foreground"
        >
          Set up your workspace in a few minutes. Free forever for your first
          five active deals.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative mt-8 flex justify-center"
        >
          <Button
            asChild
            size="lg"
            className="group h-12 w-full bg-linear-to-r from-brand to-brand-hover px-6 text-[15px] shadow-glow transition-transform hover:scale-105 sm:w-auto"
          >
            <Link href="/register">
              Create your free account
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}