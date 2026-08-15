import {
  CalendarClock,
  Camera,
  PlaySquare,
  Music2,
  type LucideIcon,
} from "lucide-react";
import type { Platform } from "@/types/analytics";

export const PLATFORM_ICONS: Record<Platform | "other", LucideIcon> = {
  instagram: Camera,
  youtube: PlaySquare,
  tiktok: Music2,
  other: CalendarClock,
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
};
