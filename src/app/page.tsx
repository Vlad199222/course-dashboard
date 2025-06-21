import HomeClient from "./HomeClient";
import { fetchCryptoList } from "./lib/cryptoApi";

export default async function Home() {
  const coins = await fetchCryptoList();

  return (
    <main>
      <HomeClient coins={coins} />
    </main>
  );
}
