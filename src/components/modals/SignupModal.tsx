import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { ModalProps } from "./LoginModal";
import { useAuthStore } from "@/hooks/useAuthStore";

export interface SignupModalProps extends ModalProps {
  openLoginModal: () => void;
}

export default function SignupModal({
  open,
  setOpen,
  openLoginModal,
}: SignupModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailClean = email.trim().toLocaleLowerCase();

    // Простенька валідація на фронті
    if (password.length < 6) return toast.error("Пароль щонайменше 6 символів");
    if (password !== confirm) return toast.error("Паролі не збігаються");

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailClean, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return toast.error(data?.message ?? "Реєстрація не вдалася");
      }
      toast.success("Реєстрація успішна");

      // Очищаємо поля форми
      setUser(data.user);
      setEmail("");
      setPassword("");
      setConfirm("");

      // Закриваємо модалку
      openLoginModal();

      toast.success("Ви увійшли в акаунт");
    } catch (err) {
      toast.error("Помилка Мережі");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Зареєструватися
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Зареєструватися</DialogTitle>
          <DialogDescription>
            Введіть ваш email і пароль, щоб створити аккаунт
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Відмінити</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Реєструю..." : "Зареєструватись"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
