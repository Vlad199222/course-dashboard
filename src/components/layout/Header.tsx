import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white text-white p-6 flex justify-between shadow-md backdrop-blur-sm">
      <Link className="text-xl font-bold text-black " href="/">
        CryptoDashboard
      </Link>
      <div className="flex gap-2">
        <Button variant="secondary">Увійти</Button>
        <Button>Зареєструватися</Button>
      </div>
    </header>
  );
};

export default Header;
