import { apiFetch } from "@/lib/api/client";
import type { User } from "@/types/user";

export async function getCurrentUserRequest(): Promise<{ user: User }> {
  return apiFetch<{ user: User }>("/auth/me");
}
