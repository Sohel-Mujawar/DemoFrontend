import React, {useEffect} from 'react';
import flatpickr from 'flatpickr';
import {CalendarIcon} from '../../../../icons';

interface GenericDatePickerProps {
  id: string;
  placeholder?: string;
  dateFormat?: string;
  initialDate?: Date | string;
  onDateChange?: (selectedDate: Date[]) => void;
}

const GenericDatePicker: React.FC<GenericDatePickerProps> = ({
  id,
  placeholder = 'mm/dd/yyyy',
  dateFormat = 'M j, Y',
  initialDate,
  onDateChange,
}) => {
  useEffect(() => {
    // Initialize flatpickr
    const fp = flatpickr(`#${id}`, {
      mode: 'single',
      static: true,
      defaultDate: initialDate,
      dateFormat,
      onChange: onDateChange,
      monthSelectorType: 'static',
      prevArrow:
        '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    } as const);
    return () => {
      (fp as flatpickr.Instance).destroy(); // Clean up the flatpickr instance
    };
  }, [id, initialDate, dateFormat, onDateChange]);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-3 block text-sm font-medium text-black dark:text-white"
      >
        Date picker
      </label>
      <div className="relative">
        <input
          id={id}
          className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          placeholder={placeholder}
        />

        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          <CalendarIcon />
        </div>
      </div>
    </div>
  );
};

export default GenericDatePicker;
