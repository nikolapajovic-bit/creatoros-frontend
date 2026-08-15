"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Menu, X, Sparkles } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { modulesForRole, MODULE_ICONS } from "@/lib/modules";
import { useAuthStore } from "@/store/auth-store";
import { resolveFileUrl } from "@/lib/file-url";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  const modules = modulesForRole(user?.role ?? "creator");
  const isPro = user?.plan === "pro";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-raised hover:text-ink md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-y-3 left-3 z-50 flex w-72 flex-col overflow-hidden rounded-2xl bg-surface/90 backdrop-blur-xl ring-1 ring-foreground/10 shadow-glow outline-none",
            "data-open:animate-in data-open:slide-in-from-left data-closed:animate-out data-closed:slide-out-to-left"
          )}
        >
          <div className="pointer-events-none absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-brand/25 blur-[80px]" />

          <DialogPrimitive.Title className="sr-only">Navigation</DialogPrimitive.Title>

          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center px-4">
            <img src="/logo-full-1.png" alt="CreatorOS" className="h-9 w-auto object-contain" />
          </div>

          {/* Moduli */}
          <nav className="relative flex-1 space-y-1 overflow-y-auto px-3 py-2">
            {modules.map((mod) => {
              const Icon = MODULE_ICONS[mod.key];
              const active = pathname?.startsWith(mod.href);
              return (
                <Link
                  key={mod.key}
                  href={mod.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand text-white shadow-glow"
                      : "text-ink-muted hover:bg-surface-raised hover:text-ink"
                  )}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" />
                  {mod.label}
                </Link>
              );
            })}
          </nav>

          {/* User / Plan kartica */}
          <div className="relative shrink-0 border-t border-surface-border/60 p-3">
            {!isPro && (
              <Link
                href="/settings?tab=billing"
                onClick={() => setOpen(false)}
                className="mb-2 flex items-center gap-2 rounded-xl bg-linear-to-r from-brand/20 to-gold/20 px-3 py-2.5 ring-1 ring-brand/30 transition-colors hover:ring-brand"
              >
                <Sparkles className="h-4 w-4 shrink-0 text-brand" />
                <span className="text-xs font-semibold text-foreground">Upgrade to Pro</span>
              </Link>
            )}

            <div className="flex items-center gap-2.5 px-1 py-1">
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
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{user?.name}</p>
                <p className="truncate text-[11px] capitalize text-ink-faint">
                  {user?.role} · {isPro ? "Pro" : "Free"}
                </p>
              </div>
            </div>
          </div>

          <DialogPrimitive.Close asChild>
            <button
              aria-label="Close menu"
              className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface-raised text-ink-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}