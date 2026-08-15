import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/auth-store";
import * as messagesApi from "@/lib/api/messages";

export function useConversations() {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((s) => s.user);

  const query = useQuery({
    queryKey: ["conversations", currentUser?.id],
    queryFn: () => messagesApi.getConversationsRequest(currentUser!.id),
    enabled: !!currentUser,
  });

  useEffect(() => {
    const socket = getSocket();
    function refreshConversations() {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    }
    socket.on("message:new", refreshConversations);
    socket.on("conversation:new", refreshConversations);
    return () => {
      socket.off("message:new", refreshConversations);
      socket.off("conversation:new", refreshConversations);
    };
  }, [queryClient]);

  return query;
}

export function useDeleteConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: messagesApi.deleteConversationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
