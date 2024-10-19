import React, {useState} from 'react';
import {FaAngleDown} from 'react-icons/fa6';
import {FiSearch} from 'react-icons/fi';

interface item {
  value: string;
  label: string;
}

interface ListItemType {
  items: item[];
}

const Select = ({items}: ListItemType) => {
  const [searchItem, setSearchItem] = useState<string>('');
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  // filtering out content on search
  const filterdlist = items?.filter((item: item) =>
    item.value.toLowerCase().includes(searchItem?.toLowerCase()),
  );

  return (
    <div>
      <div
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        onClick={() => setShowDropDown((prev) => !prev)}
      >
        <p className="mr-2">select from list</p>
        <FaAngleDown />
      </div>
      {showDropDown && (
        <div className="relative mt-4">
          <span className="absolute right-4 top-4">
            <FiSearch size={22} />
          </span>
          <input
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder="Search in the list"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchItem(event.target.value)
            }
            value={searchItem}
          />
          <div className="bg-white-500">
            {filterdlist?.map((item, i) => (
              <p key={i} className="color-white p-2 hover:bg-sky-200">
                {item.value}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
