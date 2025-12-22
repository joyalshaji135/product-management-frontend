import { useState } from 'react';

function ExportButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExport = () => {
    // Your export logic here
    console.log('Exporting...');
    setIsModalOpen(false);
  };

  return (
    <div>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200 cursor-pointer"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
        </svg>
        Export
      </button>

      {/* Confirmation Modal */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-start justify-center z-50 transition-opacity duration-300 animate-fadeIn pt-8">
    <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100 opacity-100 border border-green-100 animate-slideUp">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-green-100 text-green-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Export Confirmation</h3>
        </div>
        <button 
          onClick={() => setIsModalOpen(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <p className="mb-6 pl-2 text-gray-600">Are you sure you want to export this data? This action will generate a downloadable file.</p>
      
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setIsModalOpen(false)}
          className="cursor-pointer px-5 py-2.5 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleExport}
          className=" cursor-pointer px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Now
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default ExportButton;