import type { MediaType } from "@/types/media";

const IMAGE_GRADIENTS: [string, string][] = [
  ["#7C5CFC", "#9B7BFF"],
  ["#4ADE80", "#7CF0A8"],
  ["#F5A623", "#FFC978"],
];

const VIDEO_GRADIENTS: [string, string][] = [
  ["#F0577A", "#FF8FA8"],
  ["#7C5CFC", "#F0577A"],
  ["#F5A623", "#F0577A"],
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function mediaGradient(id: string, type: MediaType): string {
  const palette = type === "video" ? VIDEO_GRADIENTS : IMAGE_GRADIENTS;
  const [from, to] = palette[hashString(id) % palette.length];
  return `linear-gradient(135deg, ${from}, ${to})`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}
