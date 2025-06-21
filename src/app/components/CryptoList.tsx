import CryptoCard from "./CryptoCard";
import { CryptoListProps } from "../types/coin";

export default function CryptoList({ data }: CryptoListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
      {data.map((coin, index) => (
        <li >
          <CryptoCard key={index} coin={coin} />
        </li>
      ))}
    </ul>
  );
}
