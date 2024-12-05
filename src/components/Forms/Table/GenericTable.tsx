import React, {useState} from 'react';
import {FiEdit} from 'react-icons/fi';
import {GrFormNext, GrFormPrevious} from 'react-icons/gr';
import {MdDelete} from 'react-icons/md';

type Button<T> = {
  label: string;
  onClick: (item: T) => void;
  className?: string;
  icon?: React.ReactNode;
};

export type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  render?: (item: T) => React.ReactNode;
  className?: string;
  buttons?: Button<T>[]; // Add buttons as an optional property
  sortable?: boolean; // Add sortable flag
  action?: boolean; // Add action flag
  onEdit?: (item: T) => void; // Add edit function
  onDelete?: (item: T) => void; // Add delete function
};

type GenericTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  searchAble?: boolean;
  title?: string;
  action?: boolean; // Add action flag
  // Optionally pass number of items per page
  onEdit?: (item: T) => void; // Add edit function
  onDelete?: (item: T) => void; // Add delete function
};

const GenericTable = <T,>({
  data,
  columns,
  itemsPerPage = 5,
  searchAble,
  action,
  title,
  onEdit: handleEdit,
  onDelete: handleDelete,
}: GenericTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Sorting logic
  const sortedData = React.useMemo(() => {
    const sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue =
          typeof sortConfig.key === 'function'
            ? (sortConfig.key as (a: T) => string | number | boolean)(a)
            : a[sortConfig.key];
        const bValue =
          typeof sortConfig.key === 'function'
            ? (sortConfig.key as (a: T) => string | number | boolean)(b)
            : b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // Handle sorting when header is clicked
  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({key, direction});
  };

  // Filter data based on search query
  const filteredData = sortedData.filter((item) =>
    columns.some((column) => {
      const value =
        typeof column.accessor === 'function'
          ? column.accessor(item)
          : item[column.accessor];
      return value
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }),
  );

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
      {searchAble && (
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      )}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`min-w-[120px] px-4 py-4 font-medium text-black dark:text-white ${column.className || ''}`}
                  onClick={
                    column.sortable
                      ? () => handleSort(column.accessor as keyof T)
                      : undefined
                  } // Attach sorting function
                  style={{cursor: column.sortable ? 'pointer' : 'default'}}
                >
                  {column.header}{' '}
                  {sortConfig?.key === column.accessor
                    ? sortConfig.direction === 'asc'
                      ? '↑'
                      : '↓'
                    : null}
                </th>
              ))}
              {action && <th className="px-4 py-4">Action</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => {
                  const value =
                    typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : item[column.accessor];

                  return (
                    <td
                      key={colIndex}
                      className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                    >
                      {column.render
                        ? column.render(item)
                        : typeof value === 'string'
                          ? value
                          : JSON.stringify(value)}
                      {column.buttons && (
                        <div className="mt-2 space-x-2">
                          {column.buttons.map((button, btnIndex) => (
                            <button
                              key={btnIndex}
                              onClick={() => button.onClick(item)}
                              className={`rounded px-3 py-1 ${button.className || ''}`}
                            >
                              {button.icon || button.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  );
                })}
                {action && (
                  <td className="px-4 py-4">
                    <div className="space-x-2">
                      <button
                        className="rounded px-3 py-4"
                        onClick={() => handleEdit?.(item)}
                      >
                        <FiEdit className="h-5 w-5" />
                      </button>
                      <button
                        className="rounded px-3 py-4"
                        onClick={() => handleDelete?.(item)}
                      >
                        <MdDelete className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            className="rounded px-3 py-4"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GrFormPrevious style={{fontSize: '1.25rem'}} />
          </button>
          <button
            className="rounded px-3 py-4"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <GrFormNext style={{fontSize: '1.25rem'}} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericTable;
