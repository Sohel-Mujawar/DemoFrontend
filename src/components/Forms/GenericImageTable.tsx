import React, {ReactNode} from 'react';

type Action<T> = {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  className?: string;
};

export type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  render?: (item: T) => ReactNode;
  className?: string;
};

type GenericImageTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  title?: string;
  actions?: Action<T>[]; // Customizable actions array
};

const GenericImageTable = <T,>({
  data,
  columns,
  title,
  actions = [], // Default to empty array if no actions are passed
}: GenericImageTableProps<T>) => {
  return (
    <div className="mt-4 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`min-w-[120px] px-4 py-4 font-medium text-black dark:text-white ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
              {actions.length > 0 && <th className="px-4 py-4">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 dark:hover:bg-meta-4"
                >
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
                          : (value as ReactNode)}
                      </td>
                    );
                  })}
                  {actions.length > 0 && (
                    <td className="px-4 py-4">
                      <div className="space-x-2">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => action.onClick(item)}
                            className={`rounded px-3 py-2 ${action.className || ''}`}
                          >
                            {action.icon || action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="text-gray-500 dark:text-gray-400 py-3 text-center"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenericImageTable;
