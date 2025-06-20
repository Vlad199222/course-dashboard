import CryptoCard from "./CryptoCard";

export default function CryptoList() {
  const mockData = [
    {
      id: "bitt",
      name: "Bitcoin",
      symbol: "BTC",
      current_price: 67342,
      price_change_percentage_24h: 2.14,
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    },
    {
      id: "bitt22",
      name: "Ethereum",
      symbol: "ETH",
      current_price: 3412,
      price_change_percentage_24h: -1.07,
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    },
    {
      id: "bitt3",
      name: "Solana",
      symbol: "SOL",
      current_price: 144.72,
      price_change_percentage_24h: 3.84,
      image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {mockData.map((coin, index) => (
        <CryptoCard key={index} coin={coin} />
      ))}
    </div>
  );
}
