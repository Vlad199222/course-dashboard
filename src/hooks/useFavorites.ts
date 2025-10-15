"use client";

import { CryptoCoin } from "@/app/types/coin";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: CryptoCoin[];
  toggle: (coin: CryptoCoin) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  removeFavorite: (coinId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggle: (coin) => {
        const exists = get().favorites.some((item) => item.id === coin.id);
        const updated = exists
          ? get().favorites.filter((item) => item.id !== coin.id)
          : [...get().favorites, coin];
        set({ favorites: updated });
      },
      isFavorite: (id) => {
        return get().favorites.some((item) => item.id === id);
      },
      clearFavorites: () => set({ favorites: [] }),
      removeFavorite: (coinId) =>
        set((state) => {
          const update = state.favorites.filter((c) => c.id !== coinId);
          return { favorites: update };
        }),
    }),
    {
      name: "favorites-storage",
    }
  )
);
