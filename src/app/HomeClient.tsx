"use client";

import { useEffect, useState } from "react";
import { CryptoCoin } from "./types/coin";
import { HiOutlineSearch } from "react-icons/hi";
import { fetchCryptoList } from "./lib/cryptoApi";
import SearchBar from "./components/SearchBar";
import CryptoList from "./components/CryptoList";
import Sort from "./components/Sort";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";

import { useSearchParams, useRouter } from "next/navigation";

export default function HomeClient() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const pageParam = searchParams.get("page") || "1";
  const sortParam = searchParams.get("sort") || "market-cap-desc";
  const page = parseInt(pageParam);
  const currentPage = isNaN(page) ? 1 : page;
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const filterCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    const loadCoins = async () => {
      setIsLoading(true);
      try {
        const result = await fetchCryptoList({
          sort: sortParam,
          page: currentPage,
          perPage: 12,
        });
        setCoins(result.coins);
        setTotalPages(Math.ceil(result.total / 12));
      } catch {
        console.error;
      } finally {
        setIsLoading(false);
      }
    };

    loadCoins();
  }, [pageParam, sortParam]);

  useEffect(() => {
    if (totalPages < 1) return;
    if (currentPage < 1) {
      router.replace(`?page=1&sort=${sortParam}`);
    } else if (currentPage > totalPages) {
      router.replace(`?page=${totalPages}&sort=${sortParam}`);
    }
  }, [currentPage, totalPages, sortParam]);
  const handleSortChange = (value: string) =>
    router.push(`?page=1&sort=${value}`);

  const handlePageChange = (newPage: number) =>
    router.push(`?page=${newPage}&sort=${sortParam}`);

  return (
    <main>
      <div className="flex mt-10">
        <Sort onChange={handleSortChange} />
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
      <Pagination
        page={parseInt(pageParam || "1")}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </main>
  );
}
