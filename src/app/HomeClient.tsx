"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { scroller, Element } from "react-scroll";

import { fetchCryptoList } from "./lib/cryptoApi";
import { CryptoCoin } from "./types/coin";
import { HiOutlineSearch } from "react-icons/hi";

import SearchBar from "@/components/ui/SearchBar";
import CryptoList from "@/components/CryptoList";
import Sort from "@/components/ui/Sort";
import Pagination from "@/components/ui/Pagination";
import SkeletonCard from "@/components/ui/SkeletonCard";
import Favoritessidebar from "@/components/ui/FavoritesSidebar";
import { useFavoritesStore } from "@/hooks/useFavorites";

export default function HomeClient() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const hasfavorites = favorites.length > 0;

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || "1";
  const sortParam = searchParams.get("sort") || "market-cap-desc";

  const router = useRouter();
  const page = parseInt(pageParam);
  const currentPage = isNaN(page) ? 1 : page;
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const filterCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  const loadCoins = async () => {
    setIsLoading(true);
    try {
      const result = await fetchCryptoList({
        sort: sortParam,
        page: currentPage,
        perPage: 20,
      });
      setCoins(result.coins);
      setTotalPages(Math.ceil(result.total / 20));
    } catch {
      console.error;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadCoins();
  }, [sortParam, currentPage]);

  useEffect(() => {
    if (totalPages < 1) return;

    if (currentPage < 1 || currentPage > totalPages) {
      const validPage = Math.min(Math.max(currentPage, 1), totalPages);
      router.replace(`?page=${validPage}&sort=${sortParam}`);
    }
  }, [currentPage, totalPages, sortParam]);

  useEffect(() => {
    if (coins.length > 0) {
      scroller.scrollTo("top", {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [coins]);
  const handleSortChange = (value: string) =>
    router.push(`?page=1&sort=${value}`);

  const handlePageChange = (newPage: number) =>
    router.push(`?page=${newPage}&sort=${sortParam}`);

  return (
    <>
      <Favoritessidebar />
      <main className={`transition-all duration-300 ease-in-out ${hasfavorites ? "pr-80" : "pr-0"}`}>
        <div className="flex mt-10">
          <Sort onChange={handleSortChange} />
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <Element name="top">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-1 px-4">
              {[...Array(12)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filterCoins.length > 0 ? (
            <div className="mt-10">
              <CryptoList data={filterCoins} />
            </div>
          ) : coins.length > 0 ? (
            <div className="flex flex-col items-center justify-center text-zinc-500  dark:text-zinc-400 text-xl mt-10">
              <HiOutlineSearch />
              Нічого не знайдено
            </div>
          ) : null}
        </Element>
        <Pagination
          page={parseInt(pageParam || "1")}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </main>
    </>
  );
}
