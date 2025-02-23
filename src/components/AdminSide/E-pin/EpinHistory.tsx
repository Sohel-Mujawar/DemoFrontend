import React, {useEffect, useState} from 'react';
import {usegetEpinHistory} from '@/lib/react-query/Admin/Epin/epin';

const EpinHistory: React.FC = () => {
  const {data} = usegetEpinHistory();
  // console.log('Epin  :', data);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of rows per page

  // Calculate pagination data
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {}, [data]);

  return (
    <div className="mt-5 h-screen overflow-x-auto bg-white p-8 dark:bg-boxdark">
      <h1 className="mb-4 text-xl font-bold dark:text-white">Epin History</h1>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {[
                {label: 'Date & Time'},
                {label: 'Customer Name'},
                {label: 'CRN'},
                {label: 'Paid Amount'},
                {label: 'Status'},
                {label: 'Image'},
              ].map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-2 font-medium text-black dark:text-white"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData && paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-boxhoverdark"
                >
                  <td className="px-4 py-2 dark:text-white">
                    {new Intl.DateTimeFormat('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    }).format(new Date(item.createdAt))}
                  </td>
                  <td className="px-4 py-2 dark:text-white">
                    {`${item.customer?.firstName || 'N/A'} ${
                      item.customer?.lastName || ''
                    }`}
                  </td>
                  <td className="px-4 py-2 dark:text-white">
                    {item.customer?.crnNo || 'N/A'}
                  </td>
                  <td className="px-4 py-2 dark:text-white">
                    ₹{item.paidAmount}
                  </td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      item.isApproved
                        ? 'text-green-500'
                        : item.isPending
                          ? 'text-gray-500'
                          : 'text-red-500'
                    }`}
                  >
                    {item.isApproved
                      ? 'Approved'
                      : item.isPending
                        ? 'Pending'
                        : 'Rejected'}
                  </td>
                  <td className="px-4 py-2 dark:text-white">
                    <img
                      src={item.image}
                      alt="Payment Proof"
                      className="h-12 w-12 cursor-pointer rounded object-cover"
                      onClick={() => window.open(item.image, '_blank')}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-2 text-center dark:text-white"
                >
                  No Epin History Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded px-3 py-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded px-3 py-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EpinHistory;
