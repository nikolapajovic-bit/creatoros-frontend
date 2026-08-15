import { useQuery } from "@tanstack/react-query";
import * as analyticsApi from "@/lib/api/analytics";

export function useYoutubeConnectionStatus() {
  return useQuery({
    queryKey: ["youtube", "status"],
    queryFn: analyticsApi.getYoutubeConnectionStatus,
  });
}

export function useYoutubeStats(enabled: boolean) {
  return useQuery({
    queryKey: ["youtube", "stats"],
    queryFn: analyticsApi.getYoutubeStats,
    enabled,
  });
}

export function useYoutubeVideos(enabled: boolean) {
  return useQuery({
    queryKey: ["youtube", "videos"],
    queryFn: analyticsApi.getYoutubeVideos,
    enabled,
  });
}
