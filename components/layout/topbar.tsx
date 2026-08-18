"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NotificationDropdown } from "@/components/notifications/notification-dropdown";
import { useAuthStore } from "@/store/auth-store";
import { getInitials } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { resolveFileUrl } from "@/lib/file-url";

export function Topbar() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <header className="sticky top-3 z-30 mx-3 mb-3 flex h-14 items-center justify-between gap-4 rounded-2xl bg-surface/70 px-5 shadow-glow ring-1 ring-foreground/10 backdrop-blur-xl md:mx-0 md:mr-3">
      <div className="flex flex-1 items-center gap-3">
        <MobileNav />
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            placeholder="Search deals, messages, contracts..."
            className="h-9 w-full rounded-xl border border-surface-border/60 bg-canvas/60 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NotificationDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 border-l border-surface-border/60 pl-3 outline-none">
              <Avatar>
                <AvatarImage src={resolveFileUrl(user?.avatarUrl)} alt={user?.name ?? ""} />
                <AvatarFallback>{getInitials(user?.name ?? "?")}</AvatarFallback>
              </Avatar>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium leading-none text-ink">{user?.name}</p>
                <p className="text-xs text-ink-faint capitalize">{user?.role}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}