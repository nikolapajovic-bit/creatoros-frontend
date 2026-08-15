import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import * as notificationsApi from "@/lib/api/notifications";

const NOTIFICATIONS_KEY = ["notifications"] as const;

export function useNotifications() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: NOTIFICATIONS_KEY,
    queryFn: notificationsApi.getNotificationsRequest,
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    const socket = getSocket();
    function handleNewNotification() {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });
    }
    socket.on("notification:new", handleNewNotification);
    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [queryClient]);

  return query;
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationsApi.markAsReadRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationsApi.markAllAsReadRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });
    },
  });
}

export function useClearAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsApi.clearAllNotificationsRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY });
    },
  });
}
