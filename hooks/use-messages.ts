import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/auth-store";
import * as messagesApi from "@/lib/api/messages";
import { mapMessage } from "@/lib/api/messages";
import type { Message } from "@/types/message";

export function useMessages(conversationId: string | null) {
  const currentUser = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () =>
      messagesApi.getMessagesRequest(conversationId!, currentUser!.id),
    enabled: !!conversationId && !!currentUser,
  });

  useEffect(() => {
    if (!conversationId) return;
    const socket = getSocket();

    socket.emit("conversation:join", conversationId);

    function handleNewMessage(raw: Parameters<typeof mapMessage>[0]) {
      if (!currentUser) return;
      const message = mapMessage(raw, currentUser.id);
      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        (old) => (old ? [...old, message] : [message]),
      );
    }

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.emit("conversation:leave", conversationId);
      socket.off("message:new", handleNewMessage);
    };
  }, [conversationId, currentUser, queryClient]);

  function sendMessage(text: string) {
    if (!conversationId) return;
    getSocket().emit("message:send", { conversationId, text });
  }

  return { ...query, sendMessage };
}
