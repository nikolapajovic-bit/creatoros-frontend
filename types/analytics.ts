export type Platform = "instagram" | "tiktok" | "youtube";

export interface PlatformStats {
  platform: Platform;
  followers: number;
  followersChange: number; // % promena ovog meseca
  engagementRate: number; // %
  avgViews: number;
}

export interface GrowthPoint {
  date: string; // ISO date
  followers: number;
}

export interface TopPost {
  id: string;
  platform: Platform;
  caption: string;
  views: number;
  likes: number;
  comments: number;
  postedAt: string; // ISO date
}

export interface AudienceSegment {
  label: string;
  pct: number;
}
