import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";

export const useHybridUserCheck = () => {
  const { user, setUser, logout } = useAuthStore();
  useEffect(() => {
    if (!user) return;
    if (!user.banned) return;

    const checkBannedStatus = async () => {
      try {
        const res = await fetch("api/auth/me");
        const data = await res.json();
        if (!res.ok || data?.user) {
          console.warn("Не вийшло отримати користувача з бази");
          logout();
          return;
        }
        const freshUser = data.user;

        if (!freshUser.banned) {
          setUser(freshUser);
        } else {
          alert("Ваш аккаунт заблаковано.");
          logout();
        }
      } catch (error) {
        console.error("Помилка при перевірці статуса banned", error);
        logout();
      }
    };
    checkBannedStatus();
  }, [user]);
};
