"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useHandleLogout } from "@/hooks/useHandleLogout";
import { useState } from "react";
import { toast } from "react-hot-toast";

export interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function LoginModal({ open, setOpen }: ModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthStore();
  const handleLogout = useHandleLogout();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Невірний email чи пароль");

      const data = await res.json();
      if (res.status === 200 && data.user?.banned) {
        toast.error("Ваш акаунт заблокованно");
        handleLogout(false);
        return;
      }

      setUser(data.user);
      setOpen(false);
      toast.success("Успішний вхід");
    } catch {
      toast.error("Помилка логіна");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="secondary"
          className="px-6 py-2 sm:px-8 sm:py-3"
        >
          Увійти
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Вхід до акаунту</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="email-1">Email</Label>
            <Input
              id="email-1"
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password-1">Password</Label>
            <Input
              id="password-1"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 py-2 sm:px-4 sm:py-2"
              >
                Закрити
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 sm:px-4 sm:py-2"
            >
              Увійти
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
