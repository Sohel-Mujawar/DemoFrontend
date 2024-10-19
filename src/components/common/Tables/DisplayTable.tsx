import {TableProps} from '@/types';
import {Pagination} from '@/components/common/Pagination';
import {IoEyeOutline} from 'react-icons/io5';
import {HiOutlineTrash} from 'react-icons/hi2';
import {AiOutlineEdit} from 'react-icons/ai';

const Table = <T extends object>({
  // Basic Table Setup
  columns,
  data,
  idKey,
  // Pagination
  currentPage,
  totalPages,
  // Search
  // Pagination and Search Handlers
  onPageChange,
  // Actions
  onDetail,
  onEdit,
  onDelete,
  isLoading,
}: TableProps<T>) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white"
                >
                  {column.header}
                </th>
              ))}
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                    >
                      {column.cell
                        ? column.cell(String(row[column.accessor]))
                        : String(row[column.accessor])}
                    </td>
                  ))}

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => onDetail?.(String(row[idKey]))}
                      >
                        <IoEyeOutline size={20} />
                      </button>

                      <button
                        className="hover:text-warning"
                        onClick={() => onEdit?.(String(row[idKey]))}
                      >
                        <AiOutlineEdit size={20} />
                      </button>
                      <button
                        className="fill-current hover:text-danger"
                        onClick={() => onDelete?.(String(row[idKey]))}
                      >
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                {isLoading ? (
                  <td colSpan={columns.length + 1} className="py-4 text-center">
                    Loading....
                  </td>
                ) : (
                  <td colSpan={columns.length + 1} className="py-4 text-center">
                    No data available
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Table;
