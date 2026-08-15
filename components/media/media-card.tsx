import { Play, Image as ImageIcon } from "lucide-react";
import { mediaGradient, formatDuration } from "@/lib/media-visual";
import { getMediaFileUrl } from "@/lib/api/media";
import type { MediaAsset } from "@/types/media";

export function MediaCard({ asset }: { asset: MediaAsset }) {
  const hasRealFile = !!asset.fileUrl;

  return (
    <div className="group cursor-pointer">
      <div
        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl ring-1 ring-foreground/10 transition-all group-hover:-translate-y-0.5 group-hover:shadow-glow group-hover:ring-brand/30"
        style={hasRealFile ? undefined : { backgroundImage: mediaGradient(asset.id, asset.type) }}
      >
        {hasRealFile ? (
          asset.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getMediaFileUrl(asset.fileUrl!)}
              alt={asset.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              src={getMediaFileUrl(asset.fileUrl!)}
              className="h-full w-full object-cover"
              muted
            />
          )
        ) : asset.type === "video" ? (
          <Play className="h-8 w-8 text-white/90" fill="currentColor" />
        ) : (
          <ImageIcon className="h-8 w-8 text-white/70" />
        )}

        {asset.type === "video" && asset.durationSeconds && (
          <span className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-1.5 py-0.5 font-mono text-[10px] text-white backdrop-blur-sm">
            {formatDuration(asset.durationSeconds)}
          </span>
        )}

        {hasRealFile && asset.type === "video" && (
          <div className="pointer-events-none absolute flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
            <Play className="h-4 w-4 text-white" fill="currentColor" />
          </div>
        )}
      </div>

      <p className="mt-2.5 truncate text-sm font-medium text-foreground transition-colors group-hover:text-brand">
        {asset.title}
      </p>
      <p className="truncate text-xs text-ink-faint">{asset.relatedBrand ?? asset.tags[0]}</p>
    </div>
  );
}