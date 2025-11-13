const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex overflow-hidden rounded-md border border-gray-300 shadow-sm w-min mx-auto">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 text-gray-500 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
      >
        «
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            px-4 py-2 text-sm font-medium border-l border-gray-300 cursor-pointer
            ${
              currentPage === page
                ? "bg-blue-600 text-white hover:bg-blue-700" // Active state
                : "bg-white text-blue-600 hover:bg-gray-100" // Default state
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-gray-500 bg-white border-l border-gray-300 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
