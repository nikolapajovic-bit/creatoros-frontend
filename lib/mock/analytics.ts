import type {
  PlatformStats,
  GrowthPoint,
  TopPost,
  AudienceSegment,
} from "@/types/analytics";

export const MOCK_PLATFORM_STATS: PlatformStats[] = [
  {
    platform: "instagram",
    followers: 82400,
    followersChange: 3.8,
    engagementRate: 6.8,
    avgViews: 24500,
  },
  {
    platform: "tiktok",
    followers: 38200,
    followersChange: 6.1,
    engagementRate: 9.2,
    avgViews: 61200,
  },
  {
    platform: "youtube",
    followers: 7800,
    followersChange: 1.4,
    engagementRate: 4.1,
    avgViews: 9100,
  },
];

export const MOCK_GROWTH: GrowthPoint[] = [
  { date: "2026-07-04", followers: 121200 },
  { date: "2026-07-08", followers: 122800 },
  { date: "2026-07-12", followers: 122100 },
  { date: "2026-07-16", followers: 124600 },
  { date: "2026-07-20", followers: 125300 },
  { date: "2026-07-24", followers: 124900 },
  { date: "2026-07-28", followers: 126700 },
  { date: "2026-08-01", followers: 128400 },
];

export const MOCK_TOP_POSTS: TopPost[] = [
  {
    id: "p1",
    platform: "tiktok",
    caption: "Morning routine that changed my skin in 2 weeks",
    views: 412000,
    likes: 38200,
    comments: 1240,
    postedAt: "2026-07-22",
  },
  {
    id: "p2",
    platform: "instagram",
    caption: "Unboxing the @novabrand summer set",
    views: 98400,
    likes: 9100,
    comments: 320,
    postedAt: "2026-07-18",
  },
  {
    id: "p3",
    platform: "youtube",
    caption: "A day in my life as a full-time creator",
    views: 61200,
    likes: 4300,
    comments: 512,
    postedAt: "2026-07-11",
  },
  {
    id: "p4",
    platform: "instagram",
    caption: "3 hacks for better lighting at home",
    views: 54800,
    likes: 5200,
    comments: 187,
    postedAt: "2026-07-27",
  },
];

export const MOCK_AUDIENCE: AudienceSegment[] = [
  { label: "18-24", pct: 38 },
  { label: "25-34", pct: 34 },
  { label: "35-44", pct: 16 },
  { label: "45+", pct: 12 },
];
