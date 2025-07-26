"use client";

import { useHybridUserCheck } from "@/hooks/useHybridUserCheck";

const AppInit = () => {
  useHybridUserCheck();
  return null;
};

export default AppInit;
