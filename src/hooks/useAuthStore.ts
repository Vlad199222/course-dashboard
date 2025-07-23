"use client";
import { create } from "zustand";

type User = {
  email: string;
  image?: string;
  name?: string;
  banned?: boolean;
};

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
