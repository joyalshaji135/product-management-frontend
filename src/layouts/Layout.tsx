import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { DarkModeProvider } from '../contexts/DarkModeContext';

const LayoutContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F7F7] dark:bg-gray-900 transition-colors duration-200">
      {/* Overlay for mobile sidebar */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar with mobile positioning */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${!isMobile && !isSidebarOpen ? 'w-0' : ''}
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-2">
          <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
        <main className="flex-1 rounded-xl mx-1 mb-1 overflow-y-auto overflow-x-auto bg-white dark:bg-gray-800/95 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const Layout: React.FC = () => {
  return (
    <DarkModeProvider>
      <LayoutContent />
    </DarkModeProvider>
  );
};

export default Layout;