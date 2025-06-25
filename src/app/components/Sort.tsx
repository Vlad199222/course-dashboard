"use client";
import { sortOptions } from "../lib/sortOptions";
interface SortProps {
  onChange: (value: string) => void;
}

export default function Sort({ onChange }: SortProps) {
  return (
    <div className="block w-50">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-600 w-full"
      >
        Сортування по:
      </label>
      <select
        onChange={(e) => onChange(e.target.value)}
        defaultValue="market-cap_desc"
        id="countries"
        className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
      >
        {sortOptions.map((option) => (
          <option key={option.label} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
