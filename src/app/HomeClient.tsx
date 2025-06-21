"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CryptoList from "./components/CryptoList";
import {  CryptoCoin,  } from "./types/coin";

export default function HomeClient({coins}:{coins:CryptoCoin[]}) {
  const [search, setSearch] = useState('');
  const filterCoins = coins.filter((coin)=>{
  return  coin.name.toLowerCase().includes(search.toLowerCase())
  })
 
  return (
    <main>
      <SearchBar search={search} setSearch={setSearch} />
            <CryptoList data={filterCoins} />
      
    </main>
  );
}
