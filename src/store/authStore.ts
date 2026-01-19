// src/store/authStore.ts
"use client";
import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface AuthActions {
  login: (data: LoginPayload) => void;
  logout: () => void;
}

interface LoginPayload {
  user: User;
  token: string;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  token: null,

  login: ({ user, token }: LoginPayload) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
