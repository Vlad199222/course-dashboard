import CryptoCard from "./CryptoCard";
import { CryptoListProps } from "../types/coin";

export default function CryptoList({ data }: CryptoListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-1 px-4">
      {data.map((coin, index) => (
        <li key={index} >
          <CryptoCard key={index} coin={coin} />
        </li>
      ))}
    </ul>
  );
}
