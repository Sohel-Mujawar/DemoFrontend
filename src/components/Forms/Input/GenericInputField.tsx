import React from 'react';
import {useFormContext, RegisterOptions} from 'react-hook-form';

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  validation?: RegisterOptions;
  disabled?: boolean;
}

const GenericInputField: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  validation,
  disabled = false,
}) => {
  const {
    register,
    formState: {errors},
    setValue,
  } = useFormContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    if (type === 'number') {
      setValue(name, Number(value));
    }
  };

  return (
    <div className="w-full">
      <label className="mb-2.5 block text-black dark:text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded border-[1.7px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        disabled={disabled}
        {...register(name, validation)}
        onChange={handleInputChange} // Handle the number conversion for number types
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default GenericInputField;
