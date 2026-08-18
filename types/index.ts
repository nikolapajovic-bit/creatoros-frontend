export type Role = "creator" | "brand" | "agency" | "moderator" | "admin";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: Role;
}

export type ModuleKey =
  | "dashboard"
  | "analytics"
  | "deals"
  | "calendar"
  | "messages"
  | "contracts"
  | "finance"
  | "ai-studio"
  | "media";

export interface ModuleDefinition {
  key: ModuleKey;
  label: string;
  href: string;
  description: string;
  roles: Role[]; // koje uloge vide ovaj modul u navigaciji
}
