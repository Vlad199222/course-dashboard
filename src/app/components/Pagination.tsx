import { useState } from "react";

interface PaginationProps {
  onPageChange: (page: number) => void;
  page: number;
}
export default function Pagination({ onPageChange, page }: PaginationProps) {
  const handleNext = () => {
    onPageChange(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };
  return (
    <div>
      <div className="flex">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className=" cursor-pointer disabled:opacity-50 flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Назад
        </button>

        <button
          onClick={handleNext}
          className="cursor-pointer flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Вперед
        </button>
      </div>
    </div>
  );
}
