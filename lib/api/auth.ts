import { apiFetch, setAccessToken, getAccessToken } from "@/lib/api/client";
import type { AuthResponse } from "@/types/user";

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

export async function registerRequest(input: {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: File;
}): Promise<AuthResponse> {
  const formData = new FormData();
  formData.append("name", input.name);
  formData.append("email", input.email);
  formData.append("password", input.password);
  formData.append("role", input.role);
  if (input.avatar) {
    formData.append("avatar", input.avatar);
  }

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Registration failed");
  }

  const data = (await res.json()) as AuthResponse;
  setAccessToken(data.accessToken);
  return data;
}

export async function loginRequest(input: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
    skipAuth: true,
  });
  setAccessToken(data.accessToken);
  return data;
}

export async function refreshRequest(): Promise<{ accessToken: string }> {
  const data = await apiFetch<{ accessToken: string }>("/auth/refresh", {
    method: "POST",
    skipAuth: true,
  });
  setAccessToken(data.accessToken);
  return data;
}

export async function logoutRequest(): Promise<void> {
  await apiFetch<void>("/auth/logout", { method: "POST" });
  setAccessToken(null);
}
