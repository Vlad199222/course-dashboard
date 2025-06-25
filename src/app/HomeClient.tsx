"use client";

import { useEffect, useState } from "react";
import { CryptoCoin } from "./types/coin";
import { HiOutlineSearch } from "react-icons/hi";
import { fetchCryptoList } from "./lib/cryptoApi";
import SearchBar from "./components/SearchBar";
import CryptoList from "./components/CryptoList";
import Sort from "./components/Sort";
import Loader from "./components/Loader";

export default function HomeClient() {
  const [search, setSearch] = useState("");
  const [optionValue, setOptionValue] = useState("market-cap-desc");
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const filterCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    const loadCoins = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCryptoList(optionValue);

        setCoins(data);
      } catch {
        console.error;
      } finally {
        setIsLoading(false);
      }
    };

    loadCoins();
  }, [optionValue]);

  return (
    <main>
      <div className="flex mt-10">
        <Sort onChange={setOptionValue} />
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : filterCoins.length > 0 ? (
          <CryptoList data={filterCoins} />
        ) : (
          <div className="flex flex-col items-center justify-center text-zinc-500  dark:text-zinc-400 text-xl mt-10">
            <HiOutlineSearch />
            Нічого не знайдено
          </div>
        )}
      </div>
    </main>
  );
}
