import { apiFetch } from "@/lib/api/client";
import type { AiTool } from "@/types/ai";

export async function generateContentRequest(
  tool: AiTool,
  prompt: string,
): Promise<string> {
  const data = await apiFetch<{ result: string }>("/ai/generate", {
    method: "POST",
    body: JSON.stringify({ tool, prompt }),
  });

  return data.result;
}
