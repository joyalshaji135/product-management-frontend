import React from 'react'

type TechnicalSnapProps = {
  title: string;
};

const TechnicalSnap: React.FC<TechnicalSnapProps> = ({ title }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50/80 to-teal-50/80 rounded-2xl border border-white/30 overflow-hidden group transform transition-all duration-500 hover:shadow-xl backdrop-blur-sm hover:backdrop-blur-md">
      {/* 3D Floating Elements */}
      <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-blue-400/10 rounded-full filter blur-xl"></div>
      <div className="absolute -top-5 -left-5 w-28 h-28 bg-teal-400/10 rounded-full filter blur-xl"></div>
      
      {/* Header with Glass Effect */}
      <div className="bg-gradient-to-r from-blue-500/15 to-teal-500/15 border-b border-white/30 px-5 py-2 rounded-t-2xl backdrop-blur-md">
        <h3 className="text-sm font-bold text-blue-900/90 uppercase tracking-wider">
          {title}
        </h3>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
        {/* Audit Card */}
        <div className="relative bg-white/80 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-5 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-blue-200/40 group hover:z-10">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl"></div>
          <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none"></div>
          <div className="text-3xl mb-3 text-blue-600">📋</div>
          <h3 className="text-xs font-bold text-blue-900/90 uppercase tracking-wider">Audit</h3>
          <p className="text-2xl font-extrabold text-blue-900 mt-1">85%</p>
          <p className="text-xs text-blue-800/80 mt-1">Pass rate this month</p>
          <div className="mt-3 flex items-center text-xs text-red-600 bg-red-50/50 px-2 py-1 rounded-full w-fit border border-red-100">
            <span className="mr-1">⚠️</span> 3 non-compliance issues
          </div>
        </div>

        {/* Trend Card */}
        <div className="relative bg-white/80 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-5 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-teal-200/40 group hover:z-10">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-t-xl"></div>
          <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none"></div>
          <div className="text-3xl mb-3 text-teal-600">📉</div>
          <h3 className="text-xs font-bold text-teal-900/90 uppercase tracking-wider">Trend</h3>
          <p className="text-2xl font-extrabold text-teal-900 mt-1">↓ 30%</p>
          <p className="text-xs text-teal-800/80 mt-1">Rodent activity decline</p>
          <div className="mt-3 flex items-center text-xs text-green-600 bg-green-50/50 px-2 py-1 rounded-full w-fit border border-green-100">
            <span className="mr-1">↑</span> Steady drop this quarter
          </div>
        </div>

        {/* Visit Card */}
        <div className="relative bg-white/80 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg p-5 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-cyan-200/40 group hover:z-10">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-t-xl"></div>
          <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none"></div>
          <div className="text-3xl mb-3 text-cyan-600">📍</div>
          <h3 className="text-xs font-bold text-cyan-900/90 uppercase tracking-wider">Visits</h3>
          <p className="text-2xl font-extrabold text-cyan-900 mt-1">120</p>
          <p className="text-xs text-cyan-800/80 mt-1">Visits completed this week</p>
          <div className="mt-3 flex items-center text-xs text-amber-600 bg-amber-50/50 px-2 py-1 rounded-full w-fit border border-amber-100">
            <span className="mr-1">⏳</span> 5 visits delayed
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSnap;