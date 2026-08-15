export type ConversationType = "brand" | "team";

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  type: ConversationType;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  online?: boolean;
  messages: Message[];
}
