import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface DropdownProps {
  label?: string;
  name?: string; // Add name prop
  value: string | number | null;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  searchable?: boolean;
}

function Dropdowns({ label, name, value, onChange, options, searchable = false }: DropdownProps)  {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const handleOptionClick = (optionValue: string | number) => {
    const event = {
      target: {
        name: name || '', // Pass the name
        value: optionValue,
        type: 'select-one' // Add type
      }
    } as unknown as React.ChangeEvent<HTMLSelectElement>;
    onChange(event);
    setIsOpen(false);
    setSearchTerm('');
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && optionsRef.current && value !== null) {
      const selectedElement = optionsRef.current.querySelector(`[data-value="${value}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen, value]);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.value === value);

  // const handleOptionClick = (optionValue: string | number) => {
  //   const event = {
  //     target: { value: optionValue }
  //   } as React.ChangeEvent<HTMLSelectElement>;
  //   onChange(event);
  //   setIsOpen(false);
  //   setSearchTerm('');
  // };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} <span className="text-red-500">*</span>
        </label>
      )}
      
      <div 
        className={`w-full px-4 py-2.5 border ${isOpen ? 'border-green-500 ring-1 ring-gray-500' : 'border-gray-300'} rounded-lg text-sm focus:outline-none bg-white flex items-center justify-between cursor-pointer transition-all duration-150`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`truncate ${!selectedOption ? 'text-gray-400' : 'text-gray-700'}`}>
          {selectedOption ? selectedOption.label : 'Select an option'}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-green-200 rounded-lg shadow-lg overflow-hidden">
          {searchable && (
            <div className="p-2 border-b border-green-100 bg-green-50">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 text-sm border border-green-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          )}
          
          <div className="max-h-60 overflow-y-auto" ref={optionsRef}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  data-value={option.value}
                  className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-green-50 transition-colors duration-100 ${
                    value === option.value 
                      ? 'bg-green-100 text-green-800 font-medium' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500 italic">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdowns;