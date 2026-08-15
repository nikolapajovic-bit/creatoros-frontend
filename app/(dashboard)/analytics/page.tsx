"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Eye, Heart, MessageCircle } from "lucide-react";
import { PlatformTabs } from "@/components/analytics/platform-tabs";
import { GrowthChart } from "@/components/analytics/growth-chart";
import { AudienceDonut } from "@/components/analytics/audience-donut";
import { TopPosts } from "@/components/analytics/top-posts";
import { ConnectYoutubeCard } from "@/components/analytics/connect-youtube-card";
import {
  useYoutubeConnectionStatus,
  useYoutubeStats,
  useYoutubeVideos,
} from "@/hooks/use-analytics";
import { formatCompactNumber } from "@/lib/utils";
import {
  MOCK_PLATFORM_STATS,
  MOCK_GROWTH,
  MOCK_TOP_POSTS,
  MOCK_AUDIENCE,
} from "@/lib/mock/analytics";

export default function AnalyticsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [banner, setBanner] = useState<"connected" | "error" | null>(null);

  useEffect(() => {
    const status = searchParams.get("youtube");
    if (status === "connected" || status === "error") {
      setBanner(status);
      router.replace("/analytics");
      const timer = setTimeout(() => setBanner(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  const { data: isConnected, isLoading: statusLoading } = useYoutubeConnectionStatus();
  const { data: stats, isLoading: statsLoading } = useYoutubeStats(!!isConnected);
  const { data: videos, isLoading: videosLoading } = useYoutubeVideos(!!isConnected);

  if (statusLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">AnalyticsOS</h1>
        <p className="text-sm text-muted-foreground">Performance across all connected accounts</p>
      </div>

      {banner === "connected" && (
        <div className="rounded-lg bg-rise/10 px-4 py-3 text-sm text-rise ring-1 ring-rise/20">
          YouTube connected successfully.
        </div>
      )}
      {banner === "error" && (
        <div className="rounded-lg bg-fall/10 px-4 py-3 text-sm text-fall ring-1 ring-fall/20">
          Something went wrong connecting YouTube. Please try again.
        </div>
      )}

      {/* --- YouTube: pravi podaci --- */}
      {!isConnected ? (
        <ConnectYoutubeCard />
      ) : (
        <div className="rounded-xl bg-linear-to-b from-brand/10 to-transparent p-6 ring-1 ring-foreground/10">
          <p className="mb-4 text-sm text-muted-foreground">YouTube · {stats?.displayName}</p>
          {statsLoading ? (
            <div className="flex h-24 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-brand" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-muted-foreground">Subscribers</p>
                <p className="mt-1 font-mono text-2xl font-semibold text-foreground">
                  {formatCompactNumber(stats?.subscriberCount ?? 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total views</p>
                <p className="mt-1 font-mono text-2xl font-semibold text-foreground">
                  {formatCompactNumber(stats?.viewCount ?? 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Videos</p>
                <p className="mt-1 font-mono text-2xl font-semibold text-foreground">
                  {formatCompactNumber(stats?.videoCount ?? 0)}
                </p>
              </div>
            </div>
          )}

          {!videosLoading && videos && videos.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-faint">
                Recent videos
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex gap-3 rounded-lg bg-surface p-3 ring-1 ring-foreground/10"
                  >
                    {video.thumbnailUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="h-16 w-28 shrink-0 rounded-md object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
                        {video.title}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-ink-faint">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {formatCompactNumber(video.views)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" /> {formatCompactNumber(video.likes)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" /> {formatCompactNumber(video.comments)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- Instagram/TikTok: i dalje mock, čeka Meta/TikTok pristup --- */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-faint">
          Other platforms (preview)
        </p>
        <div className="rounded-xl bg-surface p-6 ring-1 ring-foreground/10 opacity-60">
          <PlatformTabs stats={MOCK_PLATFORM_STATS} />
          <div className="mt-6 h-56">
            <GrowthChart data={MOCK_GROWTH} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl bg-surface p-5 opacity-60 ring-1 ring-foreground/10 lg:col-span-2">
          <p className="mb-4 text-sm text-muted-foreground">Top posts this month (preview)</p>
          <TopPosts posts={MOCK_TOP_POSTS} />
        </div>

        <div className="rounded-xl bg-surface p-5 opacity-60 ring-1 ring-foreground/10">
          <p className="mb-4 text-sm text-muted-foreground">Audience age (preview)</p>
          <AudienceDonut segments={MOCK_AUDIENCE} />
        </div>
      </div>
    </div>
  );
}