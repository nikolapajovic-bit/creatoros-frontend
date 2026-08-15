"use client";

import { ChevronDown, Loader2, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { brandGradient, brandInitial } from "@/lib/brand-visual";
import type { CreatorSummary } from "@/lib/api/users";

interface CreatorSelectProps {
  creators: CreatorSummary[];
  value: string;
  onChange: (creatorId: string) => void;
  loading?: boolean;
}

export function CreatorSelect({ creators, value, onChange, loading }: CreatorSelectProps) {
  const selected = creators.find((c) => c.id === value);

  if (loading) {
    return (
      <div className="flex h-11 items-center gap-2 rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink-faint">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading creators...
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-11 w-full items-center justify-between rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink transition-colors hover:border-brand/40 focus:border-brand focus:outline-none"
        >
          {selected ? (
            <span className="flex items-center gap-2.5">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-display text-[10px] font-semibold text-white"
                style={{ backgroundImage: brandGradient(selected.name) }}
              >
                {brandInitial(selected.name)}
              </span>
              <span className="truncate">{selected.name}</span>
            </span>
          ) : (
            <span className="flex items-center gap-2 text-ink-faint">
              <User className="h-4 w-4" />
              Select a creator...
            </span>
          )}
          <ChevronDown className="h-4 w-4 shrink-0 text-ink-faint" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto" style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}>
        {creators.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-ink-faint">No creators found</p>
        ) : (
          creators.map((c) => (
            <DropdownMenuItem key={c.id} onClick={() => onChange(c.id)} className="gap-2.5">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-xs font-semibold text-white"
                style={{ backgroundImage: brandGradient(c.name) }}
              >
                {brandInitial(c.name)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">{c.name}</span>
                <span className="block truncate text-xs text-ink-faint">{c.email}</span>
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}