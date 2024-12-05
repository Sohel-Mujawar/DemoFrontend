import React, {useState, useEffect, useRef} from 'react';
import {useFormContext, Controller} from 'react-hook-form';

interface Suggestion {
  id?: string; // id is optional
  name?: string; // name is optional
  description?: string;
  categoryId?: string;
  languageId?: string;
  caterorId?: string;
  priority?: string;
}

interface SearchInputWithSuggestionsProps {
  name: string;
  label?: string;
  placeholder?: string;
  suggestions: Suggestion[]; // Accepts an empty array as well
  onDishSearch?: (dishId: string, dishName: string) => void; // Updated to accept dishId
}

const SearchInputWithSuggestions: React.FC<SearchInputWithSuggestionsProps> = ({
  name,
  label,
  placeholder,
  suggestions = [], // Default to an empty array if no suggestions are provided
  onDishSearch,
}) => {
  const {control} = useFormContext();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Suggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);

  // Filter suggestions based on search term with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        const results = suggestions.filter(
          (suggestion) =>
            suggestion.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            false, // Ensure it's safe
        );
        setFilteredOptions(results);
      } else {
        setFilteredOptions([]); // No search term, clear the suggestions
      }
    }, 300);

    return () => clearTimeout(timer); // Clear timeout when searchTerm or suggestions change
  }, [searchTerm, suggestions]);

  const handleSelectSuggestion = (id?: string, dishName?: string) => {
    if (dishName) {
      setSearchTerm(dishName);
      setFilteredOptions([]); // Clear suggestions after selecting one
      if (onDishSearch && id) {
        onDishSearch(id, dishName); // Pass id along with the name to the parent
      }
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setTimeout(() => setIsFocused(false), 200);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(e.target as Node) &&
      suggestionsRef.current &&
      !suggestionsRef.current.contains(e.target as Node)
    ) {
      setIsFocused(false); // Close the suggestion list if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({field}) => (
        <div className="relative">
          {label && (
            <label className="mb-2.5 block text-black dark:text-white">
              {label}
            </label>
          )}

          <input
            {...field}
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              field.onChange(e.target.value); // Update form value
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            aria-expanded={!!filteredOptions.length}
            aria-haspopup="listbox"
          />

          {/* Show the suggestions list if there are filtered options */}
          {isFocused && filteredOptions.length > 0 && (
            <ul
              ref={suggestionsRef}
              className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded border border-stroke bg-white shadow-lg dark:bg-form-input"
              role="listbox"
            >
              {filteredOptions.map((option) => (
                <li
                  key={option.id || Math.random()} // Use id for the key or fallback to a random key
                  onClick={() => handleSelectSuggestion(option.id, option.name)} // Pass id and name
                  className="hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer p-2"
                  role="option"
                  aria-selected={searchTerm === option.name}
                >
                  {option.name || 'Unnamed Dish'}{' '}
                  {/* Display default if name is missing */}
                </li>
              ))}
            </ul>
          )}

          {/* If no results found */}
          {isFocused && filteredOptions.length === 0 && searchTerm && (
            <div className="absolute z-10 mt-2 w-full rounded border border-stroke bg-white shadow-lg dark:bg-form-input">
              <p className="text-gray-600 p-2">No results found</p>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default SearchInputWithSuggestions;
