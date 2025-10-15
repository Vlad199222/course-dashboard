interface PaginationProps {
  onPageChange: (page: number) => void;
  page: number;
  totalPages: number;
}

export default function Pagination({
  onPageChange,
  page,
  totalPages,
}: PaginationProps) {
  const getVisiblePages = (currentPage: number, totalPages: number) => {
    const visiblePages = new Set<number>();

    //Перші 3 сторінки
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      visiblePages.add(i);
    }

    //Теперішня сторінка
    for (
      let i = Math.max(currentPage - 1, 1);
      i <= Math.min(currentPage + 1, totalPages);
      i++
    ) {
      visiblePages.add(i);
    }
    // Останні 3 сторінки
    for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++) {
      visiblePages.add(i);
    }

    return Array.from(visiblePages).sort((a, b) => a - b);
  };

  const newPages = getVisiblePages(page, totalPages);

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  return (
    <div className="mt-6">
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button
              onClick={handlePrev}
              disabled={page <= 1}
              className={`flex items-center disabled:opacity-30 justify-center px-4 h-10 ms-0 leading-tight ${
                page <= 1 ? `cursor-not-allowed` : `text-gray-500 bg-white`
              } text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {newPages.map((pageNumber: number, i) => {
            return (
              <li key={i}>
                <button
                  onClick={() => {
                    onPageChange(pageNumber);
                  }}
                  className={`flex items-center justify-center px-4 h-10 leading-tight $ text-gray-500 cursor-pointer ${
                    pageNumber === page
                      ? `bg-blue-400 text-white`
                      : `bg-gray-200 text-black`
                  } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}

          <li>
            <button
              onClick={handleNext}
              disabled={page >= totalPages}
              className={`flex items-center justify-center px-4 h-10 leading-tight  ${
                page >= totalPages
                  ? `cursor-not-allowed disabled:opacity-30`
                  : `text-gray-500 bg-white`
              }  border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
