import { FaRegStar, FaStar } from "react-icons/fa";
import { CryptoCoin } from "@/app/types/coin";
import { useFavoritesStore } from "@/hooks/useFavorites";
import Image from "next/image";

interface CryptoCardProps {
  coin: CryptoCoin;
  rank: number;
}

export default function CryptoCard({ coin, rank }: CryptoCardProps) {
  const { name, symbol, current_price, price_change_percentage_24h, image } =
    coin;

  const favorites = useFavoritesStore((state) => state.favorites);
  const toggle = useFavoritesStore((state) => state.toggle);
  const isFavorite = favorites.some((item) => item.id === coin.id);
  const isPositive = price_change_percentage_24h >= 0;

  return (
    <div
      className="max-w-full lg:w-auto 
         bg-white dark:bg-gray-900 shadow-sm 
         p-2 flex flex-row items-center 
         sm:gap-2 md:gap-6 lg:gap-10 transition-all duration-200 
         hover:bg-gray-200 dark:hover:bg-gray-800 "
    >
      {/* Кнопка избранного слева */}
      <button
        onClick={() => toggle(coin)}
        className="cursor-pointer p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition flex items-center justify-center"
      >
        {isFavorite ? (
          <FaStar className="text-yellow-400 w-5 h-5" />
        ) : (
          <FaRegStar className="text-gray-400 w-5 h-5" />
        )}
      </button>

      {/* Левая часть: Ранг + Картинка + Название */}
      <div className="flex    items-center max-w-[200px]   lg:max-w-[400px] w-full ">
        <div className="hidden sm:block text-gray-900 font-semibold w-6 text-left">{rank}</div>
        <div className="relative w-10 h-10 flex-shrink-0  sm:ml-5 lg:ml-10">
          <Image
            src={image}
            alt={name}
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
        <div className="flex items-center gap-1  ">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 ml-4">
            {name}
          </h2>
          <p className="text-medium ml-1 uppercase text-gray-500 dark:text-gray-400">
            {symbol}
          </p>
        </div>
      </div>

      {/* Цена и изменение */}
      <div className="flex flex-col sm:flex-row   items-center  max-w-60 w-full  ml-4 lg:ml-12 justify-center">
        <p className="text-base font-normal text-gray-800 dark:text-gray-100 ">
          {current_price !== null
            ? current_price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "N/A"}
        </p>
        <div
          className={`font-medium ${
            isPositive ? "text-emerald-500" : "text-rose-500"
          } ml-4`}
        >
          {isPositive ? "▲" : "▼"}{" "}
          {price_change_percentage_24h !== null
            ? price_change_percentage_24h.toFixed(2)
            : "N/A"}
          %
        </div>
      </div>
    </div>
  );
}
