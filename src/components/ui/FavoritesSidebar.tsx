"use client";

import { useFavoritesStore } from "@/hooks/useFavorites";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

export default function Favoritessidebar() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  if (favorites.length === 0) return null;

  const handleClear = () => {
    const confirmed = window.confirm(
      "Ви точно хочете видалити всі монeти з обраного?"
    );
    if (confirmed) {
      clearFavorites();
    }
  };

  return (
    <div className="fixed translate-x-0 top-28 right-0 w-72 h-[calc(100vh-5rem)] transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 overflow-y-auto z-50 border border-gray-200 dark:border-gray-700">
      <div className="flex  justify-between">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          ⭐️ Обране
        </h2>
        <button
          onClick={handleClear}
          title="видалите все"
          className="text-red-500 hover:text-red-700 flex justify-center cursor-pointer"
        >
          <FaTrash size={18} />
        </button>
      </div>

      <ul className="space-y-3">
        {/* Пример мини-карточки монеты */}
        {favorites.map((item) => (
          <li
            key={item.id}
            className="flex items-center  bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center relative">
              <Image src={item.image} alt="Bitcoin" className="w-8 h-8 mr-3" width={50} height={50} />

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.symbol}
                </p>
              </div>
              <button
              onClick={()=>{removeFavorite(item.id)}}
                title="видалите монету"
                className="text-red-500 hover:text-red-700 absolute -top-1 left-28 flex justify-center cursor-pointer"
              >
                <FaTrash size={12} />
              </button>
            </div>
          </li>
        ))}

        {/* Добавляй свои монеты тут */}
      </ul>
    </div>
  );
}
