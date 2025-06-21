import CryptoList from "./components/CryptoList";
import { fetchCryptoList } from "./lib/cryptoApi";

export default async function Home() {
  const coins = await fetchCryptoList();

 
  return (
    <>
      <CryptoList data={coins} />
    </>
  );
}
