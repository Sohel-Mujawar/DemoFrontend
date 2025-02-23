import Loader from '@/components/common/Loader';
import {useGetProductSalesReport} from '@/lib/react-query/Admin/Home/commission';
import React, {useState} from 'react';
import * as XLSX from 'xlsx';

const ProductSalesReport: React.FC = () => {
  const {data, isSuccess, isError} = useGetProductSalesReport();
  // console.log('data', data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Rows per page

  // Handle errors and loading state
  if (isError) {
    return <div>Error loading sales data</div>;
  }

  if (!isSuccess || !data) {
    return <Loader />;
  }

  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleExport = () => {
    const wsData = data.map((sale) => [
      sale.customer.crnNo,
      `${sale.customer.firstName} ${sale.customer.lastName}`,
      sale.product.name,
      sale.productamount,
      new Date(sale.createdAt).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short', // Changed from 'long' to 'short'
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    ]);

    // Define the worksheet and workbook
    const ws = XLSX.utils.aoa_to_sheet([
      [
        'Customer Id',
        'Customer Name',
        'Product Name',
        'Product Price',
        'Purchased At',
      ], // Header Row
      ...wsData,
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sales Report');

    // Export to Excel
    XLSX.writeFile(wb, 'product_sales_report.xlsx');
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-6 py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Product Sales Report
        </h1>
        <button
          onClick={handleExport}
          className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Export to Excel
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Purchased At
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Customer ID
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Customer Name
              </th>
              <th className="bpx-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Product Name
              </th>
              <th className="px-4 py-4 text-left font-medium text-black dark:border-strokedark dark:text-white">
                Product Price
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((sale, index) => (
              <tr
                key={sale.id}
                className={
                  index % 2 === 0
                    ? 'bg-white dark:bg-boxdark'
                    : 'bg-gray-50 dark:bg-boxlight'
                }
              >
                <td className="px-4 py-5 dark:border-strokedark">
                  {new Date(sale.createdAt).toLocaleString('en-IN', {
                    year: 'numeric',
                    month: 'short', // Changed from 'long' to 'short'
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </td>
                <td className="px-4 py-5 dark:border-strokedark">
                  {sale.customer.crnNo}
                </td>
                <td className="px-4 py-5 dark:border-strokedark">
                  {sale.customer.firstName} {sale.customer.lastName}
                </td>
                <td className="px-4 py-5 dark:border-strokedark">
                  {sale.product.name}
                </td>
                <td className="px-4 py-5 dark:border-strokedark">
                  {sale.productamount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 rounded px-4 py-2 text-black transition disabled:cursor-not-allowed dark:text-white"
        >
          Previous
        </button>
        <span className="text-black dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 rounded px-4 py-2 text-black transition disabled:cursor-not-allowed dark:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductSalesReport;
