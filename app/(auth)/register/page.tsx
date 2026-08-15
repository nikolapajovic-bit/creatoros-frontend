"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Camera, User as UserIcon } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "creator", label: "Creator" },
  { value: "brand", label: "Brand" },
  { value: "agency", label: "Agency" },
];

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("creator");
  const [submitting, setSubmitting] = useState(false);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    setSubmitting(true);
    try {
      await register(name, email, password, role, avatarFile ?? undefined);
      router.push("/onboarding");
    } catch {
      // greška je već u store-u
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl bg-surface p-6 ring-1 ring-foreground/10">
      <h1 className="font-display text-xl font-semibold text-foreground">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Start managing your creator business</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-surface-raised ring-2 ring-surface-border transition-colors hover:ring-brand"
          >
            {avatarPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
            ) : (
              <UserIcon className="h-8 w-8 text-ink-faint" />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-brand ring-2 ring-surface">
              <Camera className="h-3 w-3 text-white" />
            </div>
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-medium text-brand hover:text-brand-hover"
          >
            {avatarPreview ? "Change photo" : "Add a profile photo"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted">Full name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-muted">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-muted">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <p className="mt-1 text-[11px] text-ink-faint">
            At least 8 characters, one uppercase letter, one number
          </p>
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted">I am a...</label>
          <div className="mt-1.5 flex gap-1 rounded-lg bg-surface-raised p-1">
            {ROLE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setRole(opt.value)}
                className={cn(
                  "flex-1 rounded-md py-1.5 text-xs font-medium transition-colors",
                  role === opt.value
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-fall">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-brand py-2.5 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-ink-faint">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand hover:text-brand-hover">
          Log in
        </Link>
      </p>
    </div>
  );
}