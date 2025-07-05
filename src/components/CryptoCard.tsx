import { FaRegStar, FaStar } from "react-icons/fa";
import { CryptoCoin } from "@/app/types/coin";
import { useFavorites } from "@/hooks/useFavorites";

interface CryptoCardProps {
  coin: CryptoCoin;
}

export default function CryptoCard({ coin }: CryptoCardProps) {
  const { name, symbol, current_price, price_change_percentage_24h, image } =
    coin;

  const { isFavorite, toggle } = useFavorites(coin.id);
  const isPositive = price_change_percentage_24h >= 0;
  return (
    <div>
      <div className="bg-slate-200 w-fit m-5 rounded-2xl p-4">
        <div className="rounded-2xl bg-white p-4 relative">
          <button
            onClick={toggle}
            className=" absolute right-2 top-1 h-8 w-8 cursor-pointer p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800 transition flex justify-center items-center"
          >
            {isFavorite ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar className="w-4 h-4" />
            )}
          </button>
          <div className="flex items-center">
            <div className="relative rounded-xl bg-blue-400 p-4">
              <img className="w-12" src={image} alt={name} />
            </div>
            <div>
              <h2 className="text-xl font-bold ml-2 text-black">{name}</h2>
              <p className=" text-sm uppercase text-zinc-500 dark:text-zinc-400 ml-2 tracking-wide">
                {symbol}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <p className="my-4 text-left text-4xl font-bold text-gray-700">
              {current_price !== null ? current_price.toLocaleString() : "N/A"}
              <span className="text-sm"> $ </span>
            </p>
            <div className="flex items-center text-sm text-green-500">
              <div
                className={`text-xl font-semibold flex items-center gap-1 ${
                  isPositive ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {isPositive ? "\u25B2" : "\u25BC"}{" "}
                {price_change_percentage_24h !== null
                  ? price_change_percentage_24h.toFixed(2)
                  : "N/A"}
                %
              </div>

              <span> </span>
              <span className="ml-2 text-gray-400"> останні 24 г. </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
