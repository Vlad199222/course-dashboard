import { CryptoCoin } from "../types/coin";

interface CryptoCardProps {
  coin: CryptoCoin;
}

export default function CryptoCard({ coin }: CryptoCardProps) {
  const { name, symbol, current_price, price_change_percentage_24h, image } =
    coin;

  const isPositive = price_change_percentage_24h >= 0;
  return (
    <div className="pl-4 pr-12 py-6  rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-gray-100 w-max max-w-sm flex-col">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt="cypto"
          className="w-12 h-12  rounded-full object-contain"
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {name}
          </h2>
          <p className="text-sm uppercase text-zinc-500 dark:text-zinc-400 tracking-wide">
            {symbol}
          </p>
        </div>
      </div>

      <div className="mb-2 text-zinc-700 dark:text-zinc-300">
        <span className="text-2xl font-semibold">
          $ {current_price.toLocaleString()}
        </span>
      </div>

      <div className="flex-col items-center justify-between mt-2">
        <div className=" text-lg text-sm text-zinc-500">Зміна ціни за 24г.</div>
        <div
          className={`text-xl font-semibold flex items-center gap-1 ${
            isPositive ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {isPositive ? "\u25B2" : "\u25BC"}{" "}
          {price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}
