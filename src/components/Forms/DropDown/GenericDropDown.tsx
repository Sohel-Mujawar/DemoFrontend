import React, {useState} from 'react';
import {Controller, Control} from 'react-hook-form';
import {DownIcon} from '../../../icons';

interface Option {
  value: string;
  label: string;
}

interface GenericDropdownProps {
  name: string;
  label: string;
  options: Option[];
  defaultOption?: string;
  control?: Control<Record<string, unknown>>; // Specify the correct type based on your form setup
}

const GenericDropdown: React.FC<GenericDropdownProps> = ({
  name,
  label,
  options,
  defaultOption = '',
  control,
}) => {
  const [isOptionSelected, setIsOptionSelected] =
    useState<boolean>(!!defaultOption);

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur, value, name}}) => (
        <div>
          <label className="mb-3 block text-black dark:text-white">
            {label}
          </label>

          <div className="relative z-20 bg-white dark:bg-form-input">
            <select
              name={name}
              value={
                typeof value === 'string' || typeof value === 'number'
                  ? value
                  : ''
              }
              onChange={(e) => {
                setIsOptionSelected(true);
                onChange(e.target.value);
              }}
              onBlur={onBlur}
              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                isOptionSelected ? 'text-black dark:text-white' : ''
              }`}
            >
              <option
                value=""
                disabled
                className="text-body dark:text-bodydark"
              >
                {defaultOption || `Select ${label}`}
              </option>
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-body dark:text-bodydark"
                >
                  {option.label}
                </option>
              ))}
            </select>

            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
              <DownIcon />
            </span>
          </div>
        </div>
      )}
    />
  );
};

export default GenericDropdown;
