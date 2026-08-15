import type { Role } from "@/types";

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  role: Role;
  plan: "free" | "pro";
  avatarUrl?: string;
  hasSavedSignature?: boolean;
  savedSignatureUrl?: string;
  onboardingCompleted: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
