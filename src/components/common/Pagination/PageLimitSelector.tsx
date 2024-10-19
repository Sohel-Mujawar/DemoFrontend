import {LimitSelectorProps} from '@/types';

const PageLimitSelector: React.FC<LimitSelectorProps> = ({
  pageOptions = [5, 10, 20, 50],
  selectedLimit,
  onLimitChange,
}) => {
  return (
    <div className="flex items-center font-medium">
      <select
        className="rounded-md border border-stroke bg-transparent pl-2 dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
        value={selectedLimit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
      >
        {pageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="pl-2 text-black dark:text-white">Entries Per Page</p>
    </div>
  );
};

export default PageLimitSelector;
