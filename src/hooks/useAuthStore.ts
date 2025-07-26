"use client";
import { create } from "zustand";
import {destroyCookie} from "nookies";

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
  isAutoLoginFineshed: boolean;
  setAutoLoginFinished: (val: boolean) => void;
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
    console.log('Logout')
    localStorage.removeItem("user");
    destroyCookie(null,"token");
    set({ user: null });
  },
  isAutoLoginFineshed: false,
  setAutoLoginFinished: (val) => set({ isAutoLoginFineshed: val }),
}));
