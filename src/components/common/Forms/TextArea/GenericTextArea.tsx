import React from 'react';
import {useFormContext, RegisterOptions} from 'react-hook-form';

interface TextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  validation?: RegisterOptions;
  rows?: number;
  disabled?: boolean;
}

const GenericTextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  placeholder,
  validation,
  rows = 6,
  disabled = false,
}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        disabled={disabled}
        {...register(name, validation)}
      ></textarea>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors.root?.message}</p>
      )}
    </div>
  );
};

export default GenericTextArea;
