export type AiTool = "caption" | "ideas" | "hashtags" | "email-reply";

export interface AiToolConfig {
  key: AiTool;
  label: string;
  description: string;
  placeholder: string;
}

export const AI_TOOLS: AiToolConfig[] = [
  {
    key: "caption",
    label: "Caption Writer",
    description: "Generate captions for your posts",
    placeholder:
      "Describe your post... e.g. 'Morning skincare routine video, playful tone'",
  },
  {
    key: "ideas",
    label: "Content Ideas",
    description: "Brainstorm content angles and hooks",
    placeholder:
      "What's your niche or upcoming topic? e.g. 'Budget travel tips'",
  },
  {
    key: "hashtags",
    label: "Hashtag Generator",
    description: "Relevant hashtags for reach",
    placeholder:
      "Describe your content... e.g. 'Home workout, beginner friendly'",
  },
  {
    key: "email-reply",
    label: "Email Reply",
    description: "Draft replies to brand emails",
    placeholder: "Paste the email or describe the situation...",
  },
];

export interface GenerationHistoryItem {
  id: string;
  tool: AiTool;
  prompt: string;
  result: string;
  createdAt: string; // ISO datetime
}
