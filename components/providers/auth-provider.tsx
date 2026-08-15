"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";
import { connectSocket, disconnectSocket } from "@/lib/socket";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);
  const status = useAuthStore((s) => s.status);
  const hasHydrated = useRef(false);

  useEffect(() => {
    // React Strict Mode (dev) pokreće effect-e dvaput pri mount-u — ovaj guard
    // osigurava da se hydrate() stvarno izvrši samo JEDNOM, bez obzira na to.
    if (hasHydrated.current) return;
    hasHydrated.current = true;
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      connectSocket();
    } else if (status === "unauthenticated") {
      disconnectSocket();
    }
  }, [status]);

  return <>{children}</>;
}