import React from 'react';
import BackButton from './BackButton';
import AddButton from './AddButton';


interface HeaderComponentProps {
  title: string;
  breadcrumb: string;
  className?: string;
  showBackButton?: boolean;
  showAddButton?: boolean;
  showSearchButton?: boolean;  // Added this
  addButtonLink?: string;
  onSearch?: () => void;      // Added this
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  title,
  breadcrumb,
  className = '',
  showBackButton = true,
  showAddButton = true,
   // Added default value
  addButtonLink = '',
}) => {
  return (
    <div className={`w-full relative rounded-2xl p-5 flex items-center justify-between overflow-hidden ${className}`}
      style={{
        background: 'rgba(93, 106, 125, 0)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(87, 92, 100, 0.18)',
        boxShadow: '0 8px 32px 0 rgba(107, 107, 108, 0.15)',
      }}
    >
      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="space-y-1">
          <h2 className="text-[18px] font-bold text-black-100">{title}</h2>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <div className="flex items-center">
                  <span className="text-xs font-medium text-black-300 hover:text-green-600">
                    {breadcrumb}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex items-center gap-3">
       {showAddButton && <AddButton to={addButtonLink} />}
          {showBackButton && <BackButton />}
        
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;