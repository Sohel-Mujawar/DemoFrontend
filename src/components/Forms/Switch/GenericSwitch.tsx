import React, {useState} from 'react';

interface SwitchProps {
  id: string;
  label?: string;
  initialState?: boolean;
  onChange?: (checked: boolean) => void;
}

const GenericSwitch: React.FC<SwitchProps> = ({
  id,
  label,
  initialState = false,
  onChange,
}) => {
  const [enabled, setEnabled] = useState(initialState);

  const handleChange = () => {
    setEnabled(!enabled);
    if (onChange) {
      onChange(!enabled);
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
            type="checkbox"
            id={id}
            className="sr-only"
            checked={enabled}
            onChange={handleChange}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
              enabled && '!right-1 !translate-x-full !bg-primary dark:!bg-white'
            }`}
          ></div>
        </div>
        {label && (
          <span className="ml-3 text-black dark:text-white">{label}</span>
        )}
      </label>
    </div>
  );
};

export default GenericSwitch;
