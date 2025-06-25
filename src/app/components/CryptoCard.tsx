import { CryptoCoin } from "../types/coin";

interface CryptoCardProps {
  coin: CryptoCoin;
}

export default function CryptoCard({ coin }: CryptoCardProps) {
  const { name, symbol, current_price, price_change_percentage_24h, image } =
    coin;

  const isPositive = price_change_percentage_24h >= 0;
  return (
    <div
      className={`bg-white dark:bg-zinc-900 rounded-3xl shadow-lg p-6 flex items-center space-x-6 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out`}
    >
      <div>
        <img
          src={image}
          alt="cypto"
          className="w-16 h-16  rounded-full object-contain border border-gray-300 dark:border-zinc-700"
        />
      </div>

      <div className="flex flex-col">
        <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-wide">
          {name}
        </h2>
        <p className="text-sm uppercase text-zinc-500 dark:text-zinc-400 tracking-wide">
          {symbol}
        </p>
      </div>

      <div className="ml-auto flex flex-col items-end space-y-1">
        <span className="text-2xl font-semibold text-zinc-900 dark:text-white">
          $ {current_price !== null ?  current_price.toLocaleString(): "N/A"}
        </span>
      </div>

      <div
        className={`text-xl font-semibold flex items-center gap-1 ${
          isPositive ? "text-emerald-500" : "text-rose-500"
        }`}
      >
        {isPositive ? "\u25B2" : "\u25BC"}{" "}
        {price_change_percentage_24h !== null ? price_change_percentage_24h.toFixed(2):"N/A"}%
      </div>
    </div>
  );
}
