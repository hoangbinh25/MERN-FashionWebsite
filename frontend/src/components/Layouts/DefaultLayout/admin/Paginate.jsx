import React from "react";

export default function Paginate({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const maxShown = 5;
    let start = Math.max(1, currentPage - Math.floor(maxShown / 2));
    let end = Math.min(totalPages, start + maxShown - 1);

    if (end - start < maxShown - 1) {
      start = Math.max(1, end - maxShown + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="flex justify-center my-4">
      <ul className="inline-flex items-center space-x-1">
        <li>
          <button
            className="px-3 py-1 rounded-l bg-gray-200 hover:bg-gray-300"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
        </li>
        {getPages().map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-1 rounded ${page === currentPage
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
                }`}
              onClick={() => onPageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className="px-3 py-1 rounded-r bg-gray-200 hover:bg-gray-300"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
}