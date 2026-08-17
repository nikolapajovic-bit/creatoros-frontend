"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Camera,
  Loader2,
  Check,
  Sparkles,
  ShieldCheck,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ToggleSwitch } from "@/components/settings/toggle-switch";
import { getInitials } from "@/lib/utils";
import { resolveFileUrl } from "@/lib/file-url";
import { useAuthStore } from "@/store/auth-store";
import {
  updateProfileRequest,
  changePasswordRequest,
  uploadAvatarRequest,
  removeAvatarRequest,
  resendVerificationRequest,
} from "@/lib/api/settings";
import { mockUpgradeToPro } from "@/lib/api/onboarding";

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("profile");
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const [notifPrefs, setNotifPrefs] = useState({
    deadlineReminders: true,
    newMessages: true,
    dealUpdates: true,
    weeklyDigest: false,
  });

  // --- Profile forma ---
  const [name, setName] = useState(user?.name ?? "");
  const [profileStatus, setProfileStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [profileError, setProfileError] = useState("");

  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleResendVerification() {
    setResendStatus("sending");
    try {
      await resendVerificationRequest();
      setResendStatus("sent");
      setTimeout(() => setResendStatus("idle"), 4000);
    } catch {
      setResendStatus("idle");
    }
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileStatus("saving");
    setProfileError("");
    try {
      const updated = await updateProfileRequest(name.trim());
      setUser(updated);
      setProfileStatus("saved");
      setTimeout(() => setProfileStatus("idle"), 2000);
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Failed to save");
      setProfileStatus("error");
    }
  }

  // --- Avatar upload/remove ---
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  async function handleAvatarSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setAvatarUploading(true);
    try {
      const updated = await uploadAvatarRequest(file);
      setUser(updated);
    } finally {
      setAvatarUploading(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  }

  async function handleAvatarRemove() {
    if (!user) return;
    setAvatarUploading(true);
    try {
      const updated = await removeAvatarRequest();
      setUser(updated);
    } finally {
      setAvatarUploading(false);
    }
  }

  // --- Password forma ---
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [passwordError, setPasswordError] = useState("");

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordStatus("saving");
    setPasswordError("");
    try {
      await changePasswordRequest(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setPasswordStatus("saved");
      setTimeout(() => setPasswordStatus("idle"), 2000);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Failed to update password");
      setPasswordStatus("error");
    }
  }

  // --- Billing ---
  const [upgrading, setUpgrading] = useState(false);
  async function handleUpgrade() {
    if (!user) return;
    setUpgrading(true);
    try {
      const result = await mockUpgradeToPro();
      setUser({ ...user, plan: result.plan as "free" | "pro" });
    } finally {
      setUpgrading(false);
    }
  }

  if (!user) return null;

  const isPro = user.plan === "pro";
  const price = user.role === "creator" ? "19.99" : "59.99";

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList variant="line">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <form
            onSubmit={handleSaveProfile}
            className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10"
          >
            <div className="flex items-center gap-4 bg-linear-to-b from-brand/10 to-transparent p-6">
              <div className="relative">
                <Avatar className="h-16 w-16 ring-2 ring-surface">
                  <AvatarImage src={resolveFileUrl(user.avatarUrl)} alt={user.name} />
                  <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={avatarUploading}
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white ring-2 ring-surface transition-opacity hover:bg-brand-hover disabled:opacity-50"
                >
                  {avatarUploading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Camera className="h-3 w-3" />
                  )}
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleAvatarSelect}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-ink-faint">
                  {user.username ? `@${user.username} · ` : ""}
                  <span className="capitalize">{user.role}</span>
                </p>
                {user.avatarUrl && (
                  <button
                    type="button"
                    onClick={handleAvatarRemove}
                    disabled={avatarUploading}
                    className="mt-1 text-[11px] font-medium text-fall hover:text-fall/80 disabled:opacity-50"
                  >
                    Remove photo
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label className="text-xs font-medium text-ink-muted">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="mt-1.5 h-10 w-full cursor-not-allowed rounded-md border border-surface-border bg-surface-raised px-3 text-sm text-ink-faint"
                />
                <p className="mt-1 text-[11px] text-ink-faint">
                  Email changes aren&apos;t supported yet
                </p>

                <div className="mt-3 flex items-center gap-2">
                  {user.emailVerified ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-rise/15 px-2.5 py-1 text-xs font-medium text-rise">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  ) : (
                    <>
                      <span className="flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-gold">
                        <Mail className="h-3.5 w-3.5" />
                        Not verified
                      </span>
                      <button
                        type="button"
                        onClick={handleResendVerification}
                        disabled={resendStatus !== "idle"}
                        className="text-xs font-medium text-brand hover:text-brand-hover disabled:opacity-60"
                      >
                        {resendStatus === "idle" && "Resend email"}
                        {resendStatus === "sending" && "Sending..."}
                        {resendStatus === "sent" && "Sent!"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {profileStatus === "error" && (
                <p className="text-sm text-fall">{profileError}</p>
              )}

              <button
                type="submit"
                disabled={profileStatus === "saving" || !name.trim()}
                className="flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-60"
              >
                {profileStatus === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
                {profileStatus === "saved" && <Check className="h-4 w-4" />}
                {profileStatus === "saving"
                  ? "Saving..."
                  : profileStatus === "saved"
                  ? "Saved"
                  : "Save changes"}
              </button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10">
            <div className="bg-linear-to-b from-brand/10 to-transparent px-6 py-4">
              <p className="text-sm font-medium text-foreground">Notification preferences</p>
            </div>
            <div className="divide-y divide-surface-border px-6">
              <ToggleSwitch
                label="Deadline reminders"
                description="Get notified before deals and deliverables are due"
                checked={notifPrefs.deadlineReminders}
                onChange={(v) => setNotifPrefs((p) => ({ ...p, deadlineReminders: v }))}
              />
              <ToggleSwitch
                label="New messages"
                description="Get notified when brands or team members message you"
                checked={notifPrefs.newMessages}
                onChange={(v) => setNotifPrefs((p) => ({ ...p, newMessages: v }))}
              />
              <ToggleSwitch
                label="Deal updates"
                description="Get notified when a deal changes stage"
                checked={notifPrefs.dealUpdates}
                onChange={(v) => setNotifPrefs((p) => ({ ...p, dealUpdates: v }))}
              />
              <ToggleSwitch
                label="Weekly digest"
                description="A summary of your week, every Monday"
                checked={notifPrefs.weeklyDigest}
                onChange={(v) => setNotifPrefs((p) => ({ ...p, weeklyDigest: v }))}
              />
            </div>
            <p className="px-6 py-4 text-xs text-ink-faint">
              Note: these preferences are visual only for now — not yet saved to your account.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <form
            onSubmit={handleChangePassword}
            className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10"
          >
            <div className="flex items-center gap-3 bg-linear-to-b from-fall/10 to-transparent p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-fall/15 text-fall">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium text-foreground">Password &amp; security</p>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label className="text-xs font-medium text-ink-muted">Current password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink-muted">New password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-md border border-surface-border bg-canvas px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <p className="mt-1 text-[11px] text-ink-faint">
                  At least 8 characters, one uppercase letter, one number
                </p>
              </div>

              {passwordStatus === "error" && (
                <p className="text-sm text-fall">{passwordError}</p>
              )}

              <button
                type="submit"
                disabled={passwordStatus === "saving"}
                className="flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-60"
              >
                {passwordStatus === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
                {passwordStatus === "saved" && <Check className="h-4 w-4" />}
                {passwordStatus === "saving"
                  ? "Updating..."
                  : passwordStatus === "saved"
                  ? "Updated"
                  : "Update password"}
              </button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          {isPro ? (
            <div className="overflow-hidden rounded-xl bg-linear-to-b from-brand/15 to-transparent p-6 ring-2 ring-brand">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand" />
                <p className="font-display text-lg font-semibold text-foreground">You&apos;re on Pro</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                ${price}/month · Unlimited deals, contracts, messaging, and more.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-foreground/10">
              <div className="flex items-center justify-between bg-linear-to-b from-brand/10 to-transparent p-6">
                <div>
                  <p className="text-sm font-medium text-foreground">Current plan</p>
                  <p className="mt-0.5 font-mono text-2xl font-semibold text-foreground">Free</p>
                </div>
                <span className="rounded-full bg-surface-raised px-3 py-1 text-xs font-medium text-ink-muted">
                  5 deals · 2 contracts · 5 chats
                </span>
              </div>

              <div className="p-6">
                <div className="rounded-xl bg-linear-to-b from-brand/10 to-transparent p-5 ring-2 ring-brand">
                  <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Sparkles className="h-4 w-4 text-brand" />
                    Upgrade to Pro
                  </p>
                  <p className="mt-1 font-mono text-2xl font-semibold text-foreground">
                    ${price}
                    <span className="text-sm font-normal text-ink-faint">/month</span>
                  </p>
                  <p className="mt-2 text-xs text-ink-muted">
                    Unlimited deals, contracts, messaging, full AI Studio access, and priority support.
                  </p>
                  <button
                    onClick={handleUpgrade}
                    disabled={upgrading}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-brand py-2.5 text-sm font-semibold text-white hover:bg-brand-hover disabled:opacity-60"
                  >
                    {upgrading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {upgrading ? "Upgrading..." : "Upgrade now"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}