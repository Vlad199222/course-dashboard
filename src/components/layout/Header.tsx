"use client";
import Link from "next/link";
import React, { useState } from "react";
import LoginModals from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useHandleLogout } from "@/hooks/useHandleLogout";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const openLoginWindow = (time: number = 1000) => {
    setOpenSignup(false);
    setTimeout(() => setOpenLogin(true), time);
  };

  const { user } = useAuthStore();
  const handleLogout = useHandleLogout();

  return (
    <header className="sticky top-0 z-50 bg-white p-4 sm:p-6 shadow-md backdrop-blur-sm">
      <div className="max-w-[1180px] mx-auto flex items-center justify-between">
        {/* Лого */}
        <Link
          className="text-lg sm:text-xl font-bold text-black whitespace-nowrap"
          href="/"
        >
          CryptoDashboard
        </Link>

        {/* Бургер кнопка (мобильная версия) */}
        <button
          className="sm:hidden text-black"
          onClick={() => setOpenMenu(true)}
        >
          <Menu size={28} />
        </button>

        {/* ПК версия меню */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-sm text-black font-medium">{user.email}</span>
              <Button
                onClick={() => handleLogout(true)}
                className="text-sm px-4 py-2"
              >
                Вийти
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <LoginModals
                open={openLogin}
                setOpen={setOpenLogin as (v: boolean) => void}
              />
              <SignupModal
                open={openSignup}
                setOpen={setOpenSignup}
                openLoginModal={openLoginWindow}
              />
            </div>
          )}
        </div>
      </div>

      {/* Мобильное меню */}
      {openMenu && (
        <>
          {/* Затемнённый фон */}
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity"
            onClick={() => setOpenMenu(false)}
          />

          {/* Off-canvas меню */}
          <div className="fixed top-0 left-0 w-full sm:w-[90%] max-w-[400px] bg-white z-50 shadow-md animate-slideDown p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-black">Меню</span>
              <button onClick={() => setOpenMenu(false)}>
                <X size={28} />
              </button>
            </div>

            {user ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-black font-medium">{user.email}</span>
                </div>
                <Button
                  onClick={() => {
                    handleLogout(true);
                    setOpenMenu(false);
                  }}
                  className="w-full"
                >
                  Вийти
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <LoginModals
                  open={openLogin}
                  setOpen={setOpenLogin as (v: boolean) => void}
                />
                <SignupModal
                  open={openSignup}
                  setOpen={setOpenSignup}
                  openLoginModal={openLoginWindow}
                />
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
