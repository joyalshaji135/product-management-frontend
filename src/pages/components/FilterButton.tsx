import React, { useState, useEffect } from 'react';

function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when offcanvas is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close when clicking backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative z-50">
      {/* Trigger Button - Enhanced with better hover and active states */}
     <button
  onClick={() => setIsOpen(true)}
  className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 active:scale-95 transition-all duration-150 shadow-sm cursor-pointer"
>
  <svg 
    className="w-4 h-4 text-gray-600" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
    />
  </svg>
  Filters
</button>

      {/* Off-canvas and Backdrop with smooth animations */}
      {isOpen && (
        <div
          id="backdrop"
className="fixed inset-0  flex justify-end z-40 transition-opacity duration-300"
style={{ minHeight: '185%' }}
          onClick={handleBackdropClick}
        >
          <div
            className={`h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header with better styling */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">Filter Options</h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className=" cursor-pointer text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 transition-colors duration-150"
                aria-label="Close filter"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body with enhanced form elements */}
            <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input 
                  type="text" 
                  placeholder="Search customers..." 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="space-y-2">
                  {['Pending', 'Completed', 'Cancelled'].map((status) => (
                    <label key={status} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                      />
                      <span className="text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with better button styling */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className=" cursor-pointer text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150 font-medium text-gray-700"
              >
                Reset
              </button>
              <button 
                className="text-sm cursor-pointer px-4 py-2 bg-green-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterButton;