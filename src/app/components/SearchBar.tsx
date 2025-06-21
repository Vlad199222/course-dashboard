'use client';

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Пошук криптовалюти..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ouline-none focus:ring-2 focus:ring-emerald-500 transition-all"
    />
  );
}
