"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Loader2, ArrowRight, AtSign } from "lucide-react";
import { useOnboardingStore } from "@/store/onboarding-store";
import { checkUsernameAvailable } from "@/lib/api/onboarding";
import { useAuthStore } from "@/store/auth-store";

function useDebouncedValue(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function UsernameStep() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUsername = useOnboardingStore((s) => s.setUsername);

  const [value, setValue] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const debounced = useDebouncedValue(value, 400);

  const checkAvailability = useCallback(async (username: string) => {
    if (username.length < 3) {
      setAvailable(null);
      return;
    }
    setChecking(true);
    try {
      const isAvailable = await checkUsernameAvailable(username);
      setAvailable(isAvailable);
    } catch {
      setAvailable(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    const clean = debounced.toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (clean) checkAvailability(clean);
  }, [debounced, checkAvailability]);

  function handleChange(raw: string) {
    const clean = raw.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setValue(clean);
    setError("");
  }

  function handleContinue() {
    if (value.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    if (available !== true) {
      setError("Please choose an available username");
      return;
    }
    setUsername(value);
    router.push("/onboarding/questions");
  }

  return (
    <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10">
      <div className="bg-linear-to-b from-brand/15 to-transparent p-6 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-brand shadow-glow">
          <AtSign className="h-4.5 w-4.5 text-white" />
        </div>
        <h1 className="mt-3 font-display text-lg font-semibold text-foreground">
          Welcome, {user?.name?.split(" ")[0]}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Pick a username — this is how brands and creators will find you.
        </p>
      </div>

      <div className="p-6 pt-2">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-ink-faint">
            @
          </span>
          <input
            type="text"
            autoFocus
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="yourname"
            className="h-11 w-full rounded-lg border-2 border-surface-border bg-canvas pl-8 pr-9 text-sm font-medium text-ink transition-colors focus:border-brand focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {checking && <Loader2 className="h-4 w-4 animate-spin text-ink-faint" />}
            {!checking && available === true && <Check className="h-4 w-4 text-rise" />}
            {!checking && available === false && <X className="h-4 w-4 text-fall" />}
          </div>
        </div>

        <div className="mt-2 h-4">
          {!checking && available === false && (
            <p className="text-xs text-fall">This username is already taken</p>
          )}
          {!checking && available === true && (
            <p className="text-xs text-rise">@{value} is available</p>
          )}
          {error && <p className="text-xs text-fall">{error}</p>}
        </div>

        <button
          onClick={handleContinue}
          disabled={available !== true}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-hover disabled:opacity-30"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}