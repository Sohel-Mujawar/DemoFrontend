import React from 'react';

interface GenericRadioButtonProps {
  id: string;
  name: string;
  labelText: string;
  value: string;
  isChecked: boolean; // Make this a required prop
  onChange: (value: string) => void;
}

const GenericRadioButton: React.FC<GenericRadioButtonProps> = ({
  id,
  name,
  labelText,
  value,
  isChecked,
  onChange,
}) => {
  const handleChange = () => {
    if (!isChecked) {
      onChange(value);
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            className="sr-only"
            checked={isChecked}
            onChange={handleChange}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked ? 'border-primary bg-gray dark:bg-transparent' : ''
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-primary opacity-0 ${
                isChecked ? 'opacity-100' : ''
              }`}
            ></span>
          </div>
        </div>
        {labelText}
      </label>
    </div>
  );
};

export default GenericRadioButton;
