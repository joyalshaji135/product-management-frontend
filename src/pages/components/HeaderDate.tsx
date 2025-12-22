import { useEffect, useState } from 'react';

function HeaderDate({ }) {
  const [today, setToday] = useState('');

  useEffect(() => {
    const current = new Date();
    const formatted = current.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setToday(formatted);
  }, []);

  return (
    <div className="flex flex-col space-y-1">
  
      <div className="relative">
        <input
          type="date"
          value={today}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700 font-medium bg-gray-50 cursor-not-allowed appearance-none"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default HeaderDate;