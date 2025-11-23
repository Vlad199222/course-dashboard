import CryptoCard from "./CryptoCard";
import { CryptoListProps } from "@/app/types/coin";

export default function CryptoList({ data }: CryptoListProps) {
  return (
    <ul className="grid grid-cols-1 ">
      <li className="max-w-full lg:w-auto  align-center  bg-white dark:bg-gray-900 shadow-sm  py-2 px-16  lg:px-20  flex flex-row items-center  flex  ">
        <div className="flex   ">
          <div className="hidden sm:block text-gray-900 font-semibold w-6 text-left  ">
            #
          </div>
          <h2 className=" font-semibold text-gray-900 dark:text-gray-100 w-10 ml-12 sm:ml-20 md:ml-15 lg:ml-25  ">
            Name
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row justify-center max-w-60  w-full gap-0 sm:gap-6  lg:gap-10  ml-22 xs:ml-20  sm:ml-40  md:ml-50 lg:ml-90 ">
          <p className="text-md font-base  sm:font-semibold text-gray-900 dark:text-gray-100  w-20  ">
            Price
          </p>
          <div className="  font-base  sm:font-semibold w-full lg:w-auto">
            24h %
          </div>
        </div>
      </li>
      {data.map((coin, index) => (
        <li key={index}>
          <CryptoCard key={index} coin={coin} rank={index + 1} />
        </li>
      ))}
    </ul>
  );
}
