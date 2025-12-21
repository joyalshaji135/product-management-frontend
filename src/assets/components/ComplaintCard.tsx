import React from 'react';

type ComplaintData = {
  commercial: {
    July: number;
    June: number;
    Older: number;
  };
  residential: {
    July: number;
    June: number;
    Older: number;
  };
  total: number;
  open: number;
};

type ComplaintCardProps = {
  title: string;
  data: ComplaintData;
};

const ComplaintCard: React.FC<ComplaintCardProps> = ({ data, title }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50/80 to-teal-50/80 rounded-2xl border border-white/30 overflow-hidden group transform transition-all duration-500 hover:shadow-xl backdrop-blur-sm hover:backdrop-blur-md">
      {/* 3D Floating Elements */}
      <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-blue-400/10 rounded-full filter blur-xl"></div>
      <div className="absolute -top-5 -left-5 w-28 h-28 bg-teal-400/10 rounded-full filter blur-xl"></div>
      
      {/* Header with Glass Effect */}
      <div className="bg-gradient-to-r from-blue-500/15 to-teal-500/15 border-b border-white/30 px-5 py-2 rounded-t-2xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-blue-900/90 uppercase tracking-wider">
            {title}
          </h3>
          {/* <div className="flex items-center space-x-1">
            <span className="text-blue-600">📊</span>
            <span className="text-teal-600">📝</span>
          </div> */}
        </div>
      </div>

      <div className="p-6 space-y-5 bg-white/10 backdrop-blur-sm">
        {/* Summary with Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center bg-white/80 px-4 py-2 rounded-lg border border-blue-200 shadow-sm">
            <span className="text-red-500 mr-2">⚠️</span>
            <span className="text-[15px] font-semibold text-blue-900">
              <span className="text-red-600">MTD Total</span> – {data.total}
            </span>
          </div>
          <div className="flex items-center bg-white/80 px-4 py-2 rounded-lg border border-teal-200 shadow-sm">
            <span className="text-orange-500 mr-2">⏳</span>
            <span className="text-[15px] font-semibold text-blue-900">
              <span className="text-teal-600">Open</span> – {data.open}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden border border-blue-200/80 shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-4 text-center text-sm bg-gradient-to-r from-blue-100 to-teal-100 text-blue-900 font-semibold">
            <div className="py-2.5 bg-white/90 text-blue-900 flex items-center pl-3">
              <span className="mr-2">🏢</span> Category
            </div>
            <div className="py-2.5 flex items-center justify-center">
              <span className="mr-1">📅</span> July
            </div>
            <div className="py-2.5 flex items-center justify-center">
              <span className="mr-1">📅</span> June
            </div>
            <div className="py-2.5 flex items-center justify-center">
              <span className="mr-1">⏮️</span> Older
            </div>
          </div>

          {/* Commercial Row */}
          <div className="grid grid-cols-4 text-center text-[14px] bg-white/80 text-blue-900 font-medium border-t border-blue-200/50">
            <div className="py-3 pl-3 text-left flex items-center">
              <span className="mr-2 text-blue-600">🏭</span> Commercial
            </div>
            <div className="py-3 font-semibold text-blue-700">{data.commercial.July}</div>
            <div className="py-3 font-semibold text-blue-700">{data.commercial.June}</div>
            <div className="py-3 font-semibold text-blue-700">{data.commercial.Older}</div>
          </div>

          {/* Residential Row */}
          <div className="grid grid-cols-4 text-center text-[14px] bg-white/60 text-teal-900 font-medium border-t border-blue-200/50">
            <div className="py-3 pl-3 text-left flex items-center">
              <span className="mr-2 text-teal-600">🏠</span> Residential
            </div>
            <div className="py-3 font-semibold text-teal-700">{data.residential.July}</div>
            <div className="py-3 font-semibold text-teal-700">{data.residential.June}</div>
            <div className="py-3 font-semibold text-teal-700">{data.residential.Older}</div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <div className="flex items-center text-xs bg-red-100/70 text-red-700 px-3 py-1.5 rounded-full border border-red-200">
            <span className="mr-1">❗</span> Urgent: {Math.round(data.open * 0.3)} cases
          </div>
          <div className="flex items-center text-xs bg-amber-100/70 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200">
            <span className="mr-1">⚠️</span> Pending: {Math.round(data.open * 0.5)} cases
          </div>
          <div className="flex items-center text-xs bg-blue-100/70 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200">
            <span className="mr-1">📈</span> MTD Change: {Math.round((data.total / (data.total - data.open)) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;