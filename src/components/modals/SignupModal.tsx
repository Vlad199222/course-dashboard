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
import { Eye, EyeOff } from "lucide-react";
import PasswordStrengthBar from "../password/PasswordStrengthBar";
import { usePasswordStrength } from "../password/usePasswordStrength";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = usePasswordStrength(password);

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
            if (!open) setPassword("");
          }}
        >
          Зареєструватися
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-10">
        <DialogHeader>
          <DialogTitle>Зареєструватися</DialogTitle>
          <DialogDescription>
            Введіть ваш email і пароль, щоб створити аккаунт
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mt-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Емейл</Label>
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
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              {password.length > 0 && (
                <PasswordStrengthBar
                  label={strength.label}
                  barClass={strength.barClass}
                  barWidth={strength.barWidth}
                />
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirm">Підтвердження пароля</Label>
              <div className="relative">
                <Input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowConfirm(!showConfirm);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showConfirm ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-8">
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
