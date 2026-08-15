"use client";

import { useState } from "react";
import { PlaySquare, Loader2 } from "lucide-react";
import { getYoutubeConnectUrl } from "@/lib/api/analytics";

export function ConnectYoutubeCard() {
  const [connecting, setConnecting] = useState(false);

  async function handleConnect() {
    setConnecting(true);
    try {
      const url = await getYoutubeConnectUrl();
      window.location.href = url;
    } catch {
      setConnecting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-linear-to-b from-brand/10 to-transparent p-10 text-center ring-1 ring-foreground/10">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand shadow-glow">
        <PlaySquare className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="font-display text-lg font-semibold text-foreground">Connect your YouTube channel</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          See your real subscriber count, views, and top videos — synced directly from YouTube.
        </p>
      </div>
      <button
        onClick={handleConnect}
        disabled={connecting}
        className="flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-60"
      >
        {connecting && <Loader2 className="h-4 w-4 animate-spin" />}
        {connecting ? "Redirecting..." : "Connect YouTube"}
      </button>
    </div>
  );
}