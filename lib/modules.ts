import type { ModuleDefinition, Role } from "@/types";
import {
  LayoutGrid,
  LineChart,
  Handshake,
  CalendarDays,
  MessageSquare,
  FileSignature,
  Wallet,
  Sparkles,
  Images,
  type LucideIcon,
} from "lucide-react";

export const MODULES: ModuleDefinition[] = [
  {
    key: "dashboard",
    label: "Overview",
    href: "/dashboard",
    description: "Your control center",
    roles: ["creator", "brand", "agency", "moderator", "admin"],
  },
  {
    key: "analytics",
    label: "AnalyticsOS",
    href: "/analytics",
    description: "Social media performance stats",
    roles: ["creator", "brand", "agency", "admin"],
  },
  {
    key: "deals",
    label: "Deals",
    href: "/deals",
    description: "Brand collaborations management",
    roles: ["creator", "brand", "agency", "admin"],
  },
  {
    key: "calendar",
    label: "Calendar",
    href: "/calendar",
    description: "Campaigns and deadlines",
    roles: ["creator", "brand", "agency", "moderator", "admin"],
  },
  {
    key: "messages",
    label: "Messages",
    href: "/messages",
    description: "Client and team communication",
    roles: ["creator", "brand", "agency", "moderator", "admin"],
  },
  {
    key: "contracts",
    label: "Contracts",
    href: "/contracts",
    description: "Contracts and documentation",
    roles: ["creator", "brand", "agency", "admin"],
  },
  {
    key: "finance",
    label: "Finance",
    href: "/finance",
    description: "Revenue, invoices, payouts",
    roles: ["creator", "brand", "agency", "admin"],
  },
  {
    key: "ai-studio",
    label: "AI Studio",
    href: "/ai-studio",
    description: "Content ideas, captions, hashtags",
    roles: ["creator", "brand", "agency", "admin"],
  },
  {
    key: "media",
    label: "Media Library",
    href: "/media",
    description: "Photos and video assets",
    roles: ["creator", "brand", "agency", "admin"],
  },
];

export const MODULE_ICONS: Record<ModuleDefinition["key"], LucideIcon> = {
  dashboard: LayoutGrid,
  analytics: LineChart,
  deals: Handshake,
  calendar: CalendarDays,
  messages: MessageSquare,
  contracts: FileSignature,
  finance: Wallet,
  "ai-studio": Sparkles,
  media: Images,
};

export function modulesForRole(role: Role): ModuleDefinition[] {
  return MODULES.filter((m) => m.roles.includes(role));
}
