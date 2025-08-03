"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useHandleLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async (showToast: boolean) => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      logout();
      if (showToast) {
        toast.success("Ви вийшли з акаунта");
      }

      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Помилка при виході");
    }
  };
  return handleLogout;
};
