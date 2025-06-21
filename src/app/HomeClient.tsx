"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CryptoList from "./components/CryptoList";
import { CryptoCoin } from "./types/coin";
import { HiOutlineSearch } from "react-icons/hi";

export default function HomeClient({ coins }: { coins: CryptoCoin[] }) {
  const [search, setSearch] = useState("");
  const filterCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <main>
      <SearchBar search={search} setSearch={setSearch} />
      {filterCoins.length > 0 ? (
        <CryptoList data={filterCoins} />
      ) : (
        <div className="flex flex-col items-center justify-center text-zinc-500  dark:text-zinc-400 text-xl mt-10">
          <HiOutlineSearch />
          Нічого не знайдено
        </div>
      )}
    </main>
  );
}
