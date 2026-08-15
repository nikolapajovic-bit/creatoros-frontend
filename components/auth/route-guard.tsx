"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const status = useAuthStore((s) => s.status);
  const user = useAuthStore(s => s.user);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if(status === 'authenticated' && user && !user.onboardingCompleted) {
      router.replace('/onboarding')
    }
  }, [status, router]);

  if (status === "idle" || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // redirect je već pokrenut u useEffect-u, ne renderuj ništa u međuvremenu
  }

  return <>{children}</>;
}