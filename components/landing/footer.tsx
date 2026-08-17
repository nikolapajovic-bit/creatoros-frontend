"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "For brands", href: "#for-brands" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="px-3 pb-8 pt-4 md:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl rounded-2xl bg-surface/60 p-8 ring-1 ring-foreground/10 backdrop-blur-xl sm:p-10"
      >
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-full-1.png" alt="CreatorOS" className="h-7 w-auto" />
            </Link>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-faint">
              The all-in-one platform for creators and brands to land better
              deals — and manage everything after the &ldquo;yes&rdquo;.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-[13px] font-semibold text-foreground">{col.title}</p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13.5px] text-ink-faint transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} CreatorOS. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}