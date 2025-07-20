"use client";
import Link from "next/link";
import React from "react";
import LoginModals from "../modals/LoginModal";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Avatar } from "../ui/avatar";
import { AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  return (
    <header className="sticky top-0 z-50 bg-white text-white p-6 flex justify-between shadow-md backdrop-blur-sm">
      <Link className="text-xl font-bold text-black " href="/">
        CryptoDashboard
      </Link>
      {user ? (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-sm text-black font-medium">{user.email}</span>
          <Button onClick={logout}>Вийти</Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <LoginModals />
          <Button>Зареєструватися</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
