import React from 'react';
import {PaginationProps} from '@/types';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa6';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-between border-t border-stroke px-8 pt-5 dark:border-strokedark">
      <p className="font-medium">
        Showing {currentPage} of {totalPages} pages
      </p>
      <div className="flex items-center">
        {/* Previous Page Button */}
        <button
          aria-label="Previous page"
          className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft className="fill-current" size={18} />
        </button>

        {/* Page Numbers */}
        {Array.from({length: totalPages}, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              aria-label={`Go to page ${page}`}
              className={`mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary hover:text-white'
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ),
        )}

        {/* Next Page Button */}
        <button
          aria-label="Next page"
          className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight className="fill-current" size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
