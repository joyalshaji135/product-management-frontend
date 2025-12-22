import { useState } from "react";
import { FiGrid, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import logo from "@assets/images/amicare.png";
import { MdLeaderboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiGrid size={18} />,
      link: "/dashboard",
    },
    {
      name: "Category Management",
      icon: <MdLeaderboard size={18} />,
      link: "/category-management-list",
    },
    {
      name: "Product Management",
      icon: <MdLeaderboard size={18} />,
      link: "/product-management-list",
    },
    {
      name: "Settings",
      icon: <FiSettings size={18} />,
      link: "/settings",
    },
  ];

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Use Redux logout action
    setProfileDropdownOpen(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-0"
      } h-screen flex flex-col justify-between transition-all duration-300 relative bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800`}
    >
      {/* Scrollable Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Section - Logo */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800">
            {isOpen ? (
              <img
                src={logo}
                alt="Amicare Logo"
                className="h-10 transition-all duration-300 dark:invert dark:brightness-0 dark:contrast-200"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-50 dark:bg-gray-800">
                <FiGrid
                  size={20}
                  className="text-primary-600 dark:text-blue-400"
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-3 space-y-1 px-2">
            {menuItems.map((item) => (
              <Link to={item.link} key={item.name}>
                <div
                  onClick={() => {
                    setActive(item.name);
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                  className={`flex items-center justify-between p-2 rounded-full cursor-pointer transition-all duration-200 ${
                    active === item.name
                      ? "bg-blue-50 dark:bg-gray-800 border-l-2 border-blue-500 dark:border-blue-400 shadow-sm"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center space-x-2 text-[14px] text-gray-800 dark:text-gray-200 font-medium">
                    <span
                      className={`${
                        active === item.name
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {isOpen && <span>{item.name}</span>}
                  </div>
                  {isOpen && active === item.name && (
                    <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                  )}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex-shrink-0 p-4 relative">
        <div
          onClick={toggleProfileDropdown}
          className={`bg-white dark:bg-gray-800 rounded-xl p-2 flex items-center justify-center shadow-sm cursor-pointer transition-all duration-200 ${
            profileDropdownOpen
              ? "ring-2 ring-gray-100 dark:ring-gray-700"
              : "hover:bg-gray-50 dark:hover:bg-gray-700"
          } ${isOpen ? "px-3" : "px-2"}`}
        >
          <div className="flex items-center">
            <div className="relative">
              <div
                className={`${
                  isOpen ? "w-10 h-10" : "w-8 h-8"
                } rounded-full border-2 border-gray-100 dark:border-gray-700 shadow transition-all duration-300 bg-blue-500 flex items-center justify-center`}
              >
                {user ? (
                  <span className="text-white font-semibold text-sm">
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </span>
                ) : (
                  <span className="text-white font-semibold text-sm">A</span>
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            {isOpen && (
              <div className="text-right flex-1 ml-3 mr-2">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {user ? `${user.firstName} ${user.lastName}` : "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Profile Dropdown Menu */}
        {profileDropdownOpen && (
          <div
            className={`absolute ${
              isOpen ? "left-4 right-4" : "left-2 right-2"
            } bottom-20 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20 overflow-hidden border border-gray-200 dark:border-gray-700`}
          >
            <div className="py-1 divide-y divide-gray-100 dark:divide-gray-700">
              <Link to="/profile" onClick={() => setProfileDropdownOpen(false)}>
                <div className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <FiUser
                    className="mr-3 text-gray-500 dark:text-gray-400"
                    size={16}
                  />
                  <span className="font-medium">Profile</span>
                </div>
              </Link>

              <Link
                to="/account-settings"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <div className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <FiSettings
                    className="mr-3 text-gray-500 dark:text-gray-400"
                    size={16}
                  />
                  <span className="font-medium">Account Settings</span>
                </div>
              </Link>

              <div className="pt-1">
                <div
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors"
                >
                  <FiLogOut className="mr-3" size={16} />
                  <span className="font-medium">Log out</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;