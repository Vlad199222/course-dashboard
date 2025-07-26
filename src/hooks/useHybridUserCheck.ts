import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";

export const useHybridUserCheck = () => {
  const { user, setUser, logout, setAutoLoginFinished, isAutoLoginFineshed } =
    useAuthStore();

  useEffect(() => {
    // Эмулируем завершение авто-логина
    if (!isAutoLoginFineshed) {
      console.log("ждем завершение автологина");
      return;
    }

    const checkBannedStatus = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 403) {
          alert("❌ Ваш аккаунт заблокирован (403)");
          logout();
          return;
        }

        const data = await res.json();
        const freshUser = data.user;

        if (freshUser?.banned) {
          alert("❌ Ваш аккаунт заблокирован (user.banned === true)");
          logout();
          return;
        }

        setUser(freshUser);
      } catch (error) {
        console.error("❌ Ошибка при проверке banned", error);
        logout();
      }
    };

    checkBannedStatus();
  }, [isAutoLoginFineshed]);

  useEffect(() => {
    if (user && !isAutoLoginFineshed) {
      console.log("автологин завершился");
      setAutoLoginFinished(true);
    }
  }, [user]);
};
