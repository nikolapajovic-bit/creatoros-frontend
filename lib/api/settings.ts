import { apiFetch, getAccessToken } from "@/lib/api/client";
import type { User } from "@/types/user";

const API_URL = (() => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== "undefined") {
    const port = process.env.NEXT_PUBLIC_API_PORT ?? "5000";
    return `${window.location.protocol}//${window.location.hostname}:${port}/api`;
  }
  return "http://localhost:5000/api";
})();

export async function updateProfileRequest(name: string): Promise<User> {
  const data = await apiFetch<{ user: User }>("/auth/profile", {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
  return data.user;
}

export async function changePasswordRequest(
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  await apiFetch<void>("/auth/password", {
    method: "PATCH",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export async function uploadAvatarRequest(file: File): Promise<User> {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch(`${API_URL}/auth/avatar`, {
    method: "POST",
    credentials: "include",
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Failed to upload avatar");
  }

  const data = await res.json();
  return data.user;
}

export async function removeAvatarRequest(): Promise<User> {
  const data = await apiFetch<{ user: User }>("/auth/avatar", {
    method: "DELETE",
  });
  return data.user;
}

export async function getSavedSignatureUrlRequest(): Promise<string> {
  const data = await apiFetch<{ url: string }>("/auth/saved-signature-url");

  return data.url;
}

export async function resendVerificationRequest(): Promise<void> {
  await apiFetch<void>("/auth/resend-verification", { method: "POST" });
}
