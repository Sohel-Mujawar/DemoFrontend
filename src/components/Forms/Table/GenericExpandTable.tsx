import React, {useState} from 'react';
import {FaAngleDown, FaAngleRight} from 'react-icons/fa6';

interface ChildItem {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
// Define CategoryItem interface
interface CategoryItem {
  categoryName: string;
  children: ChildItem[];
}

// Define Column interface
export interface Column {
  header: string;
  accessor: string; // Allow accessor to be any string
}

// Define ExpandableTableProps interface
interface ExpandableTableProps {
  data: CategoryItem[];
  columns: Column[];
  title?: string; // Optional title for the table
  searchable?: boolean; // Prop to control search functionality
  onSearch?: (searchTerm: string) => void; // Optional function to handle search term
}

const GenericExpandTable: React.FC<ExpandableTableProps> = ({
  data,
  columns,
  title,
  searchable = false, // Default to false if not provided
  onSearch,
}) => {
  const [expanded, setExpanded] = useState<{[key: string]: boolean}>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  const toggleExpand = (category: string) => {
    setExpanded((prev) => ({...prev, [category]: !prev[category]}));
  };

  // Filter data based on the search term
  const filteredData = data.filter((category) => {
    const categoryMatches = category.categoryName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const childrenMatch = category.children.some((child) =>
      child.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return categoryMatches || childrenMatch;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term); // Call the external search handler if provided
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
      {searchable && (
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      )}
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Sr
              </th>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-4 font-medium text-black dark:text-white"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((category) => (
              <React.Fragment key={category.categoryName}>
                <tr
                  className="bg-gray-100 dark:bg-gray-800 cursor-pointer"
                  onClick={() => toggleExpand(category.categoryName)}
                >
                  <td className="flex items-center px-4 py-4 font-bold">
                    <span className="mr-2">
                      {expanded[category.categoryName] ? (
                        <FaAngleDown />
                      ) : (
                        <FaAngleRight />
                      )}
                    </span>
                    <span>{category.categoryName}</span>
                  </td>
                  {columns.map((_col, colIndex) => (
                    <td key={colIndex} className="px-4 py-4"></td>
                  ))}
                </tr>
                {expanded[category.categoryName] &&
                  category.children.map((child, childIndex) => (
                    <tr key={childIndex} className="bg-white dark:bg-boxdark">
                      <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
                        {childIndex + 1}
                      </td>
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className="border-b border-[#eee] px-4 py-2 dark:border-strokedark"
                        >
                          {child[col.accessor]}
                        </td>
                      ))}
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenericExpandTable;
