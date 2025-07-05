"use client";

import { useEffect, useState } from "react";

export const useFavorites = (coinId: string) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (typeof window === undefined) return;
    const stores = localStorage.getItem("favorites");
    const favs = stores ? JSON.parse(stores) : [];

    if (favs.includes(coinId)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [coinId]);
  const toggle = () => {
    let favs: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    console.log(favs);
    if (favs.includes(coinId)) {
      favs = favs.filter((id) => id !== coinId);
    } else {
      favs.push(coinId);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));

    setIsFavorite(favs.includes(coinId));
  };

  return { isFavorite, toggle };
};
