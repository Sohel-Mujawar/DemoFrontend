import {SearchProps} from '@/types';

const Search: React.FC<SearchProps> = ({searchQuery, onSearchChange}) => {
  return (
    <input
      type="text"
      className="rounded-md border border-stroke bg-transparent px-4 py-2 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
      placeholder="Search..."
      value={searchQuery}
      onChange={onSearchChange}
    />
  );
};

export default Search;
