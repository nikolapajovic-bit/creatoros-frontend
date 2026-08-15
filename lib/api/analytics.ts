import { apiFetch } from "@/lib/api/client";

export interface YoutubeStats {
  displayName: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

export interface YoutubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: number;
}

export async function getYoutubeConnectUrl(): Promise<string> {
  const data = await apiFetch<{ url: string }>("/analytics/youtube/connect");
  return data.url;
}
export async function getYoutubeConnectionStatus(): Promise<boolean> {
  const data = await apiFetch<{ connected: boolean }>(
    "/analytics/youtube/status",
  );
  return data.connected;
}
export async function getYoutubeStats(): Promise<YoutubeStats> {
  const data = await apiFetch<{ stats: YoutubeStats }>(
    "/analytics/youtube/stats",
  );
  return data.stats;
}
export async function getYoutubeVideos(): Promise<YoutubeVideo[]> {
  const data = await apiFetch<{ videos: YoutubeVideo[] }>(
    "/analytics/youtube/videos",
  );
  return data.videos;
}
