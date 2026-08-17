"use client";

import { motion } from "framer-motion";
import { Camera, Music2, PlaySquare } from "lucide-react";

const PLATFORMS = [
  { icon: Camera, label: "Instagram" },
  { icon: Music2, label: "TikTok" },
  { icon: PlaySquare, label: "YouTube" },
];

export function PlatformRow() {
  return (
    <section className="px-3 pb-20 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-2xl bg-surface/60 px-6 py-5 ring-1 ring-foreground/10 backdrop-blur-xl sm:flex-row sm:justify-between"
      >
        <p className="text-sm text-ink-faint">Analytics synced automatically from</p>
        <div className="flex items-center gap-7">
          {PLATFORMS.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="flex items-center gap-2 text-ink-muted transition-colors hover:text-ink"
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}