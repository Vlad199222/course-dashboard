"use client";

import { sortOptions } from "@/lib/sortOptions";

interface SortProps {
  onChange: (value: string) => void;
}

export default function Sort({ onChange }: SortProps) {
  return (
    <div className="block w-40 sm:ml-4">
      <label
        htmlFor="countries"
        className="block mb-1 text-sm font-medium text-gray-600 w-full"
      >
        Сортування по:
      </label>
      <select
        onChange={(e) => onChange(e.target.value)}
        defaultValue="market-cap_desc"
        id="countries"
        className="h-10 border border-gray-300 text-gray-600 text-light rounded-lg block w-full py-2 px-2 focus:outline-none"
      >
        {sortOptions.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
