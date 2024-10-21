/* eslint-disable */
import React, {useState} from 'react';
import {FaAngleDown, FaAngleRight} from 'react-icons/fa6';

interface ChildItem {
  id: number;
  name: string;
  value: string; // You can modify the fields based on your data structure
}

interface CategoryItem {
  categoryName: string;
  children: ChildItem[];
}

interface Column {
  header: string;
  accessor: keyof ChildItem; // Use keyof to access properties from ChildItem
}
interface ExpandableTableProps {
  data: CategoryItem[];
  columns: Column[];
  title?: string; // Optional title for the table
}

const GenericExpandTable: React.FC<ExpandableTableProps> = ({
  data,
  columns,
  title,
}) => {
  const [expanded, setExpanded] = useState<{[key: string]: boolean}>({});

  const toggleExpand = (category: string) => {
    setExpanded((prev) => ({...prev, [category]: !prev[category]}));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
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
            {data.map((category, _index) => (
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
