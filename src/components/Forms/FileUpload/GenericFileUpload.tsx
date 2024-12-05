import React from 'react';

interface GenericFileUploadProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string; // Optional prop to specify accepted file types
  className?: string; // Optional prop for additional styling
}

const GenericFileUpload: React.FC<GenericFileUploadProps> = ({
  label,
  onChange,
  accept = '*', // Default to accept all file types
  className = '',
}) => {
  return (
    <div>
      <label className={`mb-3 block text-black dark:text-white ${className}`}>
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className={`w-full cursor-pointer rounded-lg border-[1.7px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-white file:px-5 file:py-3 file:hover:bg-graydark focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary ${className}`}
      />
    </div>
  );
};

export default GenericFileUpload;
