import React, {useState, useEffect} from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import {DownIcon, GlobeIcon} from '../../../icons';

interface Option {
  value: string;
  label: string;
}

interface GenericSearchDropdownProps {
  name: string;
  label?: string;
  options: Option[];
  defaultOption?: string;
}

const GenericSearchDropdown: React.FC<GenericSearchDropdownProps> = ({
  name,
  label,
  options,
  defaultOption = '',
}) => {
  const {control, getValues, setError, clearErrors, formState} =
    useFormContext();
  const [searchTerm, setSearchTerm] = useState<string>(defaultOption);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Debounce the search term to improve performance
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);

  // Handle debounced search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  // Sync `searchTerm` with the selected form value
  useEffect(() => {
    const currentValue = getValues(name);
    const selectedOption = options.find(
      (option) => option.value === currentValue,
    );
    if (selectedOption) {
      setSearchTerm(selectedOption.label);
    } else {
      setSearchTerm('');
    }
  }, [name, options, getValues]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultOption}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <div className="relative">
          <label className="mb-2.5 block text-black dark:text-white">
            {label}
          </label>

          <div className="relative bg-white dark:bg-form-input">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <GlobeIcon />
            </span>

            <input
              type="text"
              placeholder={`Search ${label}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={() => {
                setSearchTerm(''); // Clear value on click
                onChange(''); // Reset the form value
                setIsOpen(true); // Open dropdown
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to handle onBlur
              className={`w-full rounded border-[1.5px] px-12 py-3 outline-none transition focus:border-primary ${
                error ? 'border-primary' : 'border-stroke'
              } dark:border-form-strokedark dark:bg-form-input dark:text-white`}
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-controls={`${name}-dropdown`}
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2">
              <DownIcon />
            </span>

            {isOpen && (
              <div
                id={`${name}-dropdown`}
                className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded border border-stroke bg-white shadow-lg dark:bg-form-input"
                role="listbox"
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      onMouseDown={() => {
                        onChange(option.value); // Update form value
                        setSearchTerm(option.label); // Update searchTerm
                        setIsOpen(false); // Close dropdown
                      }}
                      className="hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer p-2"
                      role="option"
                      aria-selected={value === option.value}
                    >
                      {option.label}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 p-2">
                    No options found
                  </div>
                )}
              </div>
            )}
          </div>

          {error && (
            <span className="mt-1 block text-sm text-red-500">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default GenericSearchDropdown;
