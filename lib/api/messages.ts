import { apiFetch } from "@/lib/api/client";
import type { Conversation, Message } from "@/types/message";

interface ConversationApiResponse {
  _id: string;
  name: string;
  type: Conversation["type"];
  lastMessageAt: string;
  lastMessageText?: string;
  lastMessageSenderId?: string;
  participants: { _id: string; name: string; email: string }[];
}

interface MessageApiResponse {
  _id: string;
  conversation: string;
  sender: { _id: string; name: string } | string;
  text: string;
  createdAt: string;
}

type ConversationSummary = Omit<Conversation, "messages" | "unreadCount">;

export function mapMessage(
  raw: MessageApiResponse,
  currentUserId: string,
): Message {
  const senderId = typeof raw.sender === "string" ? raw.sender : raw.sender._id;
  const senderName = typeof raw.sender === "string" ? "" : raw.sender.name;

  return {
    id: raw._id,
    senderId,
    senderName: senderId === currentUserId ? "You" : senderName,
    text: raw.text,
    timestamp: raw.createdAt,
    isOwn: senderId === currentUserId,
  };
}

function mapConversation(
  raw: ConversationApiResponse,
  currentUserId: string,
): ConversationSummary {
  const otherParticipant = raw.participants.find(
    (p) => p._id !== currentUserId,
  );
  const displayName =
    raw.type === "team" ? raw.name : (otherParticipant?.name ?? raw.name);

  return {
    id: raw._id,
    name: displayName,
    type: raw.type,
    lastMessage: raw.lastMessageText ?? "",
    lastMessageSentByMe: raw.lastMessageSenderId === currentUserId,
    lastMessageAt: raw.lastMessageAt,
  };
}

export async function getConversationsRequest(
  currentUserId: string,
): Promise<ConversationSummary[]> {
  const data = await apiFetch<{ conversations: ConversationApiResponse[] }>(
    "/messages/conversations",
  );
  return data.conversations.map((c) => mapConversation(c, currentUserId));
}

export async function getMessagesRequest(
  conversationId: string,
  currentUserId: string,
): Promise<Message[]> {
  const data = await apiFetch<{ messages: MessageApiResponse[] }>(
    `/messages/conversations/${conversationId}/messages`,
  );
  return data.messages.map((m) => mapMessage(m, currentUserId));
}

export async function createConversationRequest(
  input: {
    name: string;
    type: "brand" | "team";
    participantIds: string[];
  },
  currentUserId: string,
): Promise<ConversationSummary> {
  const data = await apiFetch<{ conversation: ConversationApiResponse }>(
    "/messages/conversations",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
  return mapConversation(data.conversation, currentUserId);
}

export async function deleteConversationRequest(
  conversationId: string,
): Promise<void> {
  await apiFetch<void>(`/messages/conversations/${conversationId}`, {
    method: "DELETE",
  });
}
