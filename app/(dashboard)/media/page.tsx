"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { MediaCard } from "@/components/media/media-card";
import { TagFilter } from "@/components/media/tag-filter";
import { UploadDialog } from "@/components/media/upload-dialog";
import { useMedia } from "@/hooks/use-media";

export default function MediaPage() {
  const { data: media, isLoading } = useMedia();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<"all" | "image" | "video">("all");

  const safeMedia = useMemo(() => media ?? [], [media]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    safeMedia.forEach((m) => m.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [safeMedia]);

  const filtered = safeMedia.filter((m) => {
    const matchesTag = !activeTag || m.tags.includes(activeTag);
    const matchesType = activeType === "all" || m.type === activeType;
    return matchesTag && matchesType;
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Media Library</h1>
          <p className="text-sm text-muted-foreground">
            {safeMedia.length} assets · {safeMedia.filter((m) => m.type === "video").length} videos ·{" "}
            {safeMedia.filter((m) => m.type === "image").length} photos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex gap-1 rounded-xl bg-surface-raised/60 p-1">
            {(["all", "image", "video"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  activeType === type
                    ? "bg-linear-to-r from-brand to-brand-hover text-white shadow-glow"
                    : "text-ink-muted hover:bg-surface hover:text-ink"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <UploadDialog />
        </div>
      </div>

      {allTags.length > 0 && <TagFilter tags={allTags} active={activeTag} onChange={setActiveTag} />}

      {safeMedia.length === 0 ? (
        <div className="relative flex h-64 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-surface/80 backdrop-blur-xl ring-1 ring-foreground/10">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-brand/15 blur-[90px]" />
          <p className="relative text-sm font-medium text-foreground">No media yet</p>
          <p className="relative text-xs text-ink-faint">Upload your first photo or video to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filtered.map((asset) => (
            <MediaCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
}