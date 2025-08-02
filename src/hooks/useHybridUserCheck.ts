import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";
import { toast } from "react-hot-toast";

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
          toast.error("❌ Ваш аккаунт заблокирован (403)");
          logout();
          return;
        }

        const data = await res.json();
        const freshUser = data.user;

        if (freshUser?.banned) {
          toast.error("❌ Ваш аккаунт заблокирован (user.banned === true)");
          logout();
          return;
        }

        setUser(freshUser);
      } catch (error) {
        toast.error("❌ Ошибка при проверке banned");
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
