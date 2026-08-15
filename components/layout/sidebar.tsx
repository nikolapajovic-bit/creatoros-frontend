"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { modulesForRole, MODULE_ICONS } from "@/lib/modules";
import { useAuthStore } from "@/store/auth-store";
import { getInitials } from "@/lib/utils";
import { resolveFileUrl } from "@/lib/file-url";

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const [expanded, setExpanded] = useState(false);

  const modules = modulesForRole(user?.role ?? "creator");
  const isPro = user?.plan === "pro";

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={cn(
        "fixed inset-y-3 left-3 z-40 hidden flex-col overflow-hidden rounded-2xl bg-surface/80 backdrop-blur-xl ring-1 ring-foreground/10 shadow-glow transition-[width] duration-300 ease-out md:flex",
        expanded ? "w-64" : "w-18"
      )}
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-brand/25 blur-[80px]" />
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center overflow-hidden px-3">
        <div
          className={cn(
            "relative flex shrink-0",
            expanded && "hidden"
          )}
        >
          <span className="absolute -right-1 -top-1 z-10 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
          </span>
          <img src="/logo-icon.png" alt="CreatorOS" className="h-11 w-11 object-contain" />
        </div>
        <img
          src="/logo-full-1.png"
          alt="CreatorOS"
          className={cn("h-9 w-auto object-contain", !expanded && "hidden")}
        />
      </div>

      {/* Moduli */}
      <nav className="flex-1 space-y-1 overflow-hidden px-3 py-2">
        {modules.map((mod) => {
          const Icon = MODULE_ICONS[mod.key];
          const active = pathname?.startsWith(mod.href);
          return (
            <Link
              key={mod.key}
              href={mod.href}
              className={cn(
                "relative flex h-11 items-center gap-3 rounded-xl px-3 transition-colors",
                active
                  ? "bg-brand text-white shadow-glow"
                  : "text-ink-muted hover:bg-surface-raised hover:text-ink"
              )}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              <span
                className={cn(
                  "whitespace-nowrap text-sm font-medium transition-opacity duration-200",
                  expanded ? "opacity-100" : "opacity-0"
                )}
              >
                {mod.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User / Plan kartica */}
      <div className="shrink-0 border-t border-surface-border/60 p-3">
        {!isPro && (
          <Link
            href="/settings?tab=billing"
            className={cn(
              "mb-2 flex items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-brand/20 to-gold/20 px-3 py-2.5 ring-1 ring-brand/30 transition-colors hover:ring-brand",
              !expanded && "justify-center px-0"
            )}
          >
            <Sparkles className="h-4 w-4 shrink-0 text-brand" />
            <span
              className={cn(
                "whitespace-nowrap text-xs font-semibold text-foreground transition-opacity duration-200",
                expanded ? "opacity-100" : "hidden opacity-0"
              )}
            >
              Upgrade to Pro
            </span>
          </Link>
        )}

        <div className="flex items-center gap-2.5 overflow-hidden rounded-xl px-1 py-1">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-muted text-xs font-semibold text-brand">
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resolveFileUrl(user.avatarUrl)}
                alt={user?.name ?? "Avatar"}
                className="h-full w-full object-cover"
              />
            ) : (
              getInitials(user?.name ?? "?")
            )}
          </div>
          <div
            className={cn(
              "min-w-0 whitespace-nowrap transition-opacity duration-200",
              expanded ? "opacity-100" : "opacity-0"
            )}
          >
            <p className="truncate text-sm font-medium text-ink">{user?.name}</p>
            <p className="truncate text-[11px] capitalize text-ink-faint">
              {user?.role} · {isPro ? "Pro" : "Free"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}