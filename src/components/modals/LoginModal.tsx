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
import { useState } from "react";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Увійти</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Вхід до акаунту</DialogTitle>
        </DialogHeader>
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
          <Button>Увійти</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
