// components/ActionButton.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ActionButtonProps {
  view?: boolean;
  edit?: boolean;
  delete?: boolean;
  viewLink?: string;
  editLink?: string;
  deleteLink?: string;
  onViewClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  dropdownPosition?: 'left' | 'right';
  dropdownTitle?: string;
  buttonStyle?: 'default' | 'minimal' | 'filled';
  iconColor?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  view = true,
  edit = true,
  delete: deleteProp = true,
  viewLink = '',
  editLink = '',
  deleteLink = '',
  onViewClick,
  onEditClick,
  onDeleteClick,
  size = 'md',
  dropdownPosition = 'right',
  dropdownTitle = 'Actions',
  buttonStyle = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Size classes mapping
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  // Button style classes
  const buttonStyles = {
    default: 'p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200',
    minimal: 'p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200',
    filled: 'p-1.5 rounded-md bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors duration-200',
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`${buttonStyles[buttonStyle]} focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50`}
        title="Actions"
        aria-label="Actions"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <DotsVerticalIcon className={sizeClasses[size]} />
      </button>

   {(isOpen) && (
  <div 
    className={`absolute ${dropdownPosition === 'left' ? 'right-0' : 'left-7'} z-20 top-[-15px] w-56 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-gray-100/10 focus:outline-none animate-fadeIn`}
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
  >
    {dropdownTitle && (
      <div className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-t-xl">
        <p className="text-sm font-semibold text-white">{dropdownTitle}</p>
      </div>
    )}
    <div className="py-1.5">
      {view && (
        onViewClick ? (
          <button
            onClick={() => {
              onViewClick();
              closeDropdown();
            }}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-all duration-200 group"
            title="View"
            aria-label="View"
          >
            <div className="mr-3 p-1 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-200">
              <EyeIcon className="h-5 w-5 text-emerald-600" />
            </div>
            <span>View Details</span>
            <span className="ml-auto text-xs text-gray-400">⌘V</span>
          </button>
        ) : (
          <Link 
            to={viewLink}
            onClick={closeDropdown}
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-all duration-200 group"
            title="View"
            aria-label="View"
          >
            <div className="mr-3 p-1 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-200">
              <EyeIcon className="h-5 w-5 text-emerald-600" />
            </div>
            <span>View Details</span>
            <span className="ml-auto text-xs text-gray-400">⌘V</span>
          </Link>
        )
      )}

      {edit && (
        onEditClick ? (
          <button
            onClick={() => {
              onEditClick();
              closeDropdown();
            }}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-200 group"
            title="Edit"
            aria-label="Edit"
          >
            <div className="mr-3 p-1 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
              <PencilIcon className="h-5 w-5 text-blue-600" />
            </div>
            <span>Edit</span>
            <span className="ml-auto text-xs text-gray-400">⌘E</span>
          </button>
        ) : (
          <Link 
            to={editLink}
            onClick={closeDropdown}
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-200 group"
            title="Edit"
            aria-label="Edit"
          >
            <div className="mr-3 p-1 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
              <PencilIcon className="h-5 w-5 text-blue-600" />
            </div>
            <span>Edit</span>
            <span className="ml-auto text-xs text-gray-400">⌘E</span>
          </Link>
        )
      )}

      {deleteProp && (
        onDeleteClick ? (
          <button
            onClick={() => {
              onDeleteClick();
              closeDropdown();
            }}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-800 transition-all duration-200 group"
            title="Delete"
            aria-label="Delete"
          >
            <div className="mr-3 p-1 rounded-lg bg-rose-100 group-hover:bg-rose-200 transition-colors duration-200">
              <TrashIcon className="h-5 w-5 text-rose-600" />
            </div>
            <span>Delete</span>
            <span className="ml-auto text-xs text-gray-400">⌘D</span>
          </button>
        ) : (
          <Link 
            to={deleteLink}
            onClick={closeDropdown}
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-800 transition-all duration-200 group"
            title="Delete"
            aria-label="Delete"
          >
            <div className="mr-3 p-1 rounded-lg bg-rose-100 group-hover:bg-rose-200 transition-colors duration-200">
              <TrashIcon className="h-5 w-5 text-rose-600" />
            </div>
            <span>Delete</span>
            <span className="ml-auto text-xs text-gray-400">⌘D</span>
          </Link>
        )
      )}
    </div>
  </div>
)}
    </div>
  );
};

// Icon components with improved styling
interface IconProps {
  className?: string;
}

const EyeIcon: React.FC<IconProps> = ({ className = 'h-5 w-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

const PencilIcon: React.FC<IconProps> = ({ className = 'h-5 w-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

const TrashIcon: React.FC<IconProps> = ({ className = 'h-5 w-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const DotsVerticalIcon: React.FC<IconProps> = ({ className = 'h-5 w-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

export default ActionButton;