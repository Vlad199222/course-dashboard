import Image from "next/image";
import CryptoCard from "./components/CryptoCard";

export default function Home() {
  const cardCoin = {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    current_price: 76656,
    price_change_percentage_24h: 1.23,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
  };
  return (
    <>
      <CryptoCard coin={cardCoin} />
    </>
  );
}
