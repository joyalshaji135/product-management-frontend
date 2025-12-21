import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Loading from './Loading';
interface TableColumn {
  key: string;
  header: string;
  render?: (item: any, index: number) => React.ReactNode;
  className?: string;
  sortable?: boolean;
}

interface TableListProps {
  columns: TableColumn[];
  data: any[];
  skip?: number;
  noDataMessage?: React.ReactNode;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
}

const TableList: React.FC<TableListProps> = ({
  columns,
  data,
  skip = 0,
  noDataMessage = 'No data available',
  onSort,
}) => {
  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'} | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    setSortConfig({ key, direction });
    if (onSort) {
      onSort(key, direction);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white min-h-[550px]">
          <Loading/>
      <table className="min-w-full divide-y divide-gray-200">
    
        <thead className="bg-gradient-to-r from-gray-50 to-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-[12px] font-semibold text-gray-800 uppercase tracking-wider ${
                  column.className || ''
                } ${column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                onClick={() => column.sortable !== false && handleSort(column.key)}
              >
                <div className="flex items-center">
                  <span>{column.header}</span>
                  {sortConfig?.key === column.key && (
                    <span className="ml-2 text-gray-500">
                      {sortConfig.direction === 'asc' ? (
                        <FiChevronUp size={14} />
                      ) : (
                        <FiChevronDown size={14} />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr 
                key={item._id || index} 
                className="hover:bg-gray-50 transition-colors duration-150 even:bg-gray-50/50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 text-sm text-gray-700 ${column.className || ''} ${
                      column.key === 'email' ? 'truncate max-w-[200px]' : ''
                    }`}
                  >
                    {column.render
                      ? column.render(item, index)
                      : column.key === 'slno'
                      ? skip + index + 1
                      : item[column.key] || <span className="text-gray-400">-</span>}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center">
                {noDataMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;