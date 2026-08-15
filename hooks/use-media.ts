import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as mediaApi from "@/lib/api/media";

const MEDIA_KEY = ["media"] as const;

export function useMedia() {
  return useQuery({
    queryKey: MEDIA_KEY,
    queryFn: mediaApi.getMediaRequest,
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mediaApi.uploadMediaRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEDIA_KEY });
    },
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mediaApi.deleteMediaRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEDIA_KEY });
    },
  });
}
