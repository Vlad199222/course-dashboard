"use client";
import Link from "next/link";
import React, { useState } from "react";
import LoginModals from "../modals/LoginModal";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Avatar } from "../ui/avatar";
import { AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useHandleLogout } from "@/hooks/useHandleLogout";
import SignupModal from "../modals/SignupModal";

const Header: React.FC = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSinup] = useState(false);

  const openLoginWindow = (time: number = 1000) => {
    setOpenSinup(false);
    setTimeout(() => {
      setOpenLogin(true);
    }, time);
  };
  const { user } = useAuthStore();
  const handleLogout = useHandleLogout();
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
          <Button
            onClick={() => {
              handleLogout(true);
            }}
          >
            Вийти
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <LoginModals
            open={openLogin}
            setOpen={setOpenLogin as (value: boolean) => void}
          />
          <SignupModal
            open={openSignup}
            setOpen={setOpenSinup}
            openLoginModal={ openLoginWindow}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
