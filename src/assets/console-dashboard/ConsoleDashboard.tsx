import { useState } from 'react';
import TechnicalSnap from "../components/TechnicalSanp";
import ComplaintCard from "../components/ComplaintCard";
import { FcBullish } from 'react-icons/fc';

type ComplaintData = {
  commercial: { July: number; June: number; Older: number };
  residential: { July: number; June: number; Older: number };
  total: number;
  open: number;
};

const ConsoleDashboard: React.FC = () => {
  const [currentDashboard] = useState("Operations");
  
  const complaintData: ComplaintData = {
    commercial: { July: 4, June: 3, Older: 12 },
    residential: { July: 4, June: 3, Older: 11 },
    total: 31,
    open: 10,
  };

  return (
    <div className="p-4">
      {/* Mobile friendly header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 px-1">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-xl sm:text-[22px] text-gray-800 dark:text-gray-200 font-inter flex items-center gap-2">
            <span>Product Management Dashboard</span>
            <FcBullish className="text-[22px] sm:text-[26px]" />
          </h1>
        </div>
        
        {/* Mobile dashboard switcher */}
        <div className="w-full sm:w-auto">
          <select 
            className="w-full sm:w-48 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={currentDashboard}
            onChange={(e) => {}}
          >
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
            <option value="Service">Service</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-[#F7F7F7] dark:bg-gray-900/50 rounded-xl p-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <TechnicalSnap title="Technical Snap" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <ComplaintCard title="Complaints" data={complaintData} />
        </div>
      </div>

      {/* Additional mobile-friendly stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Products</div>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">156</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Low Stock</div>
          <div className="text-xl font-bold text-orange-600 dark:text-orange-400">12</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Categories</div>
          <div className="text-xl font-bold text-green-600 dark:text-green-400">8</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Revenue</div>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400">$12.5K</div>
        </div>
      </div>
    </div>
  );
};

export default ConsoleDashboard;