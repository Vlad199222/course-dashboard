"use client";

import { useEffect, useState } from "react";
interface ClientOnlyProps {
  children: React.ReactNode;
}

export default function ClientOnly({ children }: ClientOnlyProps) {
  const [hasMounted, setHaseIsMounted] = useState(false);
  useEffect(() => {
    setHaseIsMounted(true);
  }, []);
  if (!hasMounted) return null;
  return <>{children}</>;
}
