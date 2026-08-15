"use client";

import { Loader2, Play, Handshake } from "lucide-react";
import { StoryRing } from "@/components/dashboard/story-ring";
import { MiniBars } from "@/components/dashboard/mini-bars";
import { ConnectYoutubeCard } from "@/components/analytics/connect-youtube-card";
import { useDeals, useSentDeals } from "@/hooks/use-deals";
import { useEvents } from "@/hooks/use-calendar";
import { useYoutubeConnectionStatus, useYoutubeStats, useYoutubeVideos } from "@/hooks/use-analytics";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

function formatStageLabel(stage: string): string {
  return stage
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const isSender = user?.role === "brand" || user?.role === "agency";

  // Deal pipeline — koristi odgovarajući izvor prema ulozi
  const dealsQuery = useDeals();
  const sentQuery = useSentDeals();
  const allDeals = (isSender ? sentQuery.data : dealsQuery.data) ?? [];

  const activeDealsRaw = allDeals
    .filter((d) => d.approvalStatus !== "pending" && d.stage !== "completed")
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  const activeDeals = activeDealsRaw.map((d) => ({
    brand: isSender ? d.title : d.brand,
    stage: formatStageLabel(d.stage),
    value: d.value,
  }));

  const totalPipeline = allDeals
    .filter((d) => d.approvalStatus !== "pending" && d.stage !== "completed")
    .reduce((sum, d) => sum + d.value, 0);

  const respondedDeals = allDeals.filter((d) => d.approvalStatus !== "pending");
  const acceptedCount = respondedDeals.filter((d) => d.approvalStatus === "accepted").length;
  const acceptanceRate =
    respondedDeals.length > 0 ? Math.round((acceptedCount / respondedDeals.length) * 100) : 0;

  // Rokovi ove nedelje — pravi kalendar podaci
  const today = new Date();
  const weekEnd = new Date();
  weekEnd.setDate(today.getDate() + 7);
  const { data: events, isLoading: eventsLoading } = useEvents(today, weekEnd);

  const upcomingDeadlines = (events ?? [])
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6)
    .map((e) => {
      const eventDate = new Date(e.date);
      const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return {
        title: e.title,
        date: eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        urgent: daysUntil <= 2,
      };
    });

  // YouTube — samo za kreatore
  const { data: ytConnected } = useYoutubeConnectionStatus();
  const { data: ytStats, isLoading: ytStatsLoading } = useYoutubeStats(!!ytConnected && !isSender);
  const { data: ytVideos } = useYoutubeVideos(!!ytConnected && !isSender);

  return (
    <div className="space-y-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Monthly briefing</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-foreground">
          Your business, at a glance
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-brand/15 to-transparent p-6 ring-1 ring-foreground/10 lg:col-span-2 lg:row-span-2">
          <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />

          {isSender ? (
            <div className="relative">
              <p className="text-sm text-muted-foreground">Active pipeline</p>
              <p className="font-mono text-4xl font-semibold text-foreground">
                {formatCurrency(totalPipeline)}
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-1 text-sm font-medium text-brand">
                <Handshake className="h-3.5 w-3.5" />
                {activeDealsRaw.length} active {activeDealsRaw.length === 1 ? "deal" : "deals"}
              </p>
              <div className="mt-6 space-y-2">
                {activeDealsRaw.length === 0 ? (
                  <p className="text-sm text-ink-faint">No active deals yet.</p>
                ) : (
                  activeDealsRaw.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between rounded-xl bg-surface-raised/50 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{d.title}</p>
                        <p className="text-xs text-ink-faint">{d.brand}</p>
                      </div>
                      <span className="shrink-0 font-mono text-sm font-semibold text-gold">
                        {formatCurrency(d.value, d.currency)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : ytConnected === false ? (
            <div className="relative">
              <ConnectYoutubeCard />
            </div>
          ) : ytStatsLoading ? (
            <div className="relative flex h-48 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-brand" />
            </div>
          ) : (
            <div className="relative">
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Play className="h-4 w-4" />
                {ytStats?.displayName ?? "YouTube"}
              </p>
              <p className="font-mono text-4xl font-semibold text-foreground">
                {formatCompactNumber(ytStats?.subscriberCount ?? 0)}
              </p>
              <p className="mt-1 text-sm text-ink-faint">subscribers</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-surface-raised/50 px-4 py-3">
                  <p className="text-xs text-muted-foreground">Total views</p>
                  <p className="mt-1 font-mono text-lg font-semibold text-foreground">
                    {formatCompactNumber(ytStats?.viewCount ?? 0)}
                  </p>
                </div>
                <div className="rounded-xl bg-surface-raised/50 px-4 py-3">
                  <p className="text-xs text-muted-foreground">Videos</p>
                  <p className="mt-1 font-mono text-lg font-semibold text-foreground">
                    {formatCompactNumber(ytStats?.videoCount ?? 0)}
                  </p>
                </div>
              </div>

              {ytVideos && ytVideos.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
                    Recent videos
                  </p>
                  {ytVideos.slice(0, 3).map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center justify-between rounded-xl bg-surface-raised/50 px-4 py-2.5"
                    >
                      <p className="min-w-0 truncate text-sm text-foreground">{v.title}</p>
                      <span className="shrink-0 pl-3 font-mono text-xs text-ink-faint">
                        {formatCompactNumber(v.views)} views
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Story ring — accept rate */}
        <div className="relative overflow-hidden rounded-2xl bg-surface/80 p-4 backdrop-blur-xl ring-1 ring-foreground/10 shadow-glow">
          <div className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-brand/15 blur-[80px]" />
          <p className="relative mb-1 text-sm text-muted-foreground">
            {isSender ? "Deal acceptance" : "Response rate"}
          </p>
          <div className="relative">
            <StoryRing percent={acceptanceRate} value={`${acceptanceRate}%`} label="Accepted" />
          </div>
        </div>

        {/* Deal pipeline mini bars */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-gold/15 to-transparent p-5 ring-1 ring-foreground/10">
          <div className="pointer-events-none absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-gold/15 blur-[80px]" />
          <p className="relative mb-4 text-sm text-muted-foreground">
            Pipeline · <span className="font-mono font-semibold text-gold">{formatCurrency(totalPipeline)}</span>{" "}
            total
          </p>
          <div className="relative">
            {activeDeals.length === 0 ? (
              <p className="text-sm text-ink-faint">No active deals.</p>
            ) : (
              <MiniBars deals={activeDeals} />
            )}
          </div>
        </div>

        {/* Rokovi ove nedelje */}
        <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-foreground/10 lg:col-span-3">
          <div className="bg-linear-to-b from-brand/10 to-transparent px-5 py-4">
            <p className="text-sm font-medium text-foreground">This week</p>
          </div>
          <div className="flex flex-wrap gap-2 p-5 pt-2">
            {eventsLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-brand" />
            ) : upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-ink-faint">Nothing scheduled this week.</p>
            ) : (
              upcomingDeadlines.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-2 transition-colors ${
                    item.urgent ? "bg-fall/10 hover:bg-fall/15" : "bg-surface-raised hover:bg-surface-raised/70"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full shadow-glow ${item.urgent ? "bg-fall" : "bg-brand"}`}
                  />
                  <span className="text-xs font-medium text-foreground">{item.title}</span>
                  <span className="text-xs text-ink-faint">· {item.date}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}