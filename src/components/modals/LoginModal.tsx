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
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const { setUser, logout } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error("Невірний email чи пароль");
      }

      const data = await res.json();
      if (res.status === 200) {
        if (data.user?.banned) {
          toast.error("Ваш акаунт заблокованно");
          logout();
          return;
        }
      }
      setUser(data.user);
      setOpen(false);
      toast.success("Успішний вхід");
    } catch (err) {
      toast.error("Помилка логіна");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          variant="secondary"
        >
          Увійти
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Вхід до акаунту</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="email-1">Email</Label>
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email-1"
                name="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password-1">Password</Label>
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password-1"
                name="password"
                type="password"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Закрити</Button>
            </DialogClose>
            <Button type="submit">Увійти</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
