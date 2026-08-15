"use client";

import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
}

export function TagFilter({ tags, active, onChange }: TagFilterProps) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl bg-surface-raised/60 p-1">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all",
          active === null
            ? "bg-linear-to-r from-brand to-brand-hover text-white shadow-glow"
            : "text-ink-muted hover:bg-surface hover:text-ink"
        )}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all",
            active === tag
              ? "bg-linear-to-r from-brand to-brand-hover text-white shadow-glow"
              : "text-ink-muted hover:bg-surface hover:text-ink"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}