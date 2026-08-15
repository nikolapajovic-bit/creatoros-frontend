import { create } from "zustand";
import * as authApi from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import type { User } from "@/types/user";
import { getCurrentUserRequest } from "@/lib/api/user";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  error: string | null;

  login: (email: string, password: string) => Promise<User>;
  register: (
    name: string,
    email: string,
    password: string,
    role: string,
    avatar?: File,
  ) => Promise<User>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "idle",
  error: null,

  login: async (email, password) => {
    set({ status: "loading", error: null });
    try {
      const data = await authApi.loginRequest({ email, password });
      set({ user: data.user, status: "authenticated" });
      return data.user;
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Login failed";
      set({ status: "unauthenticated", error: message });
      throw err;
    }
  },

  register: async (name, email, password, role, avatar) => {
    set({ status: "loading", error: null });
    try {
      const data = await authApi.registerRequest({
        name,
        email,
        password,
        role,
        avatar,
      });
      set({ user: data.user, status: "authenticated" });
      return data.user;
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Registration failed";
      set({ status: "unauthenticated", error: message });
      throw err;
    }
  },

  logout: async () => {
    await authApi.logoutRequest();
    set({ user: null, status: "unauthenticated" });
  },

  // Poziva se jednom pri pokretanju app-a — pokušava da obnovi sesiju iz httpOnly refresh cookie-ja
  hydrate: async () => {
    set({ status: "loading" });
    try {
      await authApi.refreshRequest();
      const { user } = await getCurrentUserRequest();
      set({ user, status: "authenticated" });
    } catch {
      set({ user: null, status: "unauthenticated" });
    }
  },

  clearError: () => set({ error: null }),
  setUser: (user) => set({ user }),
}));
