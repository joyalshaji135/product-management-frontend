import React from 'react';
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { HiMiniBars3BottomLeft } from 'react-icons/hi2';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function Header({ isOpen, setIsOpen }: HeaderProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { user } = useAuth();

  return (
    <header className="py-1 px-1 flex items-center justify-between bg-white dark:bg-gray-800 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Left Section - Toggle and Branding */}
      <div className="flex items-center space-x-3 md:space-x-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full text-gray-500 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-gray-700 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer"
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? <HiMiniBars3BottomLeft size={20} /> : <FiMenu size={20} />}
        </button>
        <div className="text-gray-600 dark:text-gray-300 text-sm">
          Welcome,{' '}
          <span className="font-medium text-[#1957A4] dark:text-blue-400">
            {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
          </span>{' '}
          👋
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* User Info */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
            {user ? user.firstName.charAt(0) + user.lastName.charAt(0) : 'U'}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              {user ? `${user.firstName} ${user.lastName}` : 'User'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {user?.role || 'Role'}
            </span>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>
    </header>
  );
}

export default Header;