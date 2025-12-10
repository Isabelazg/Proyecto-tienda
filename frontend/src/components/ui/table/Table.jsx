import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Table = ({ children, className }) => {
  return (
    <div className="w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, className }) => {
  return (
    <thead className={cn('bg-gray-50', className)}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className }) => {
  return (
    <tbody className={cn('divide-y divide-gray-200', className)}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className, onClick }) => {
  return (
    <tr 
      className={cn(
        'border-b transition-colors hover:bg-gray-50',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export const TableHead = ({ children, className, sortable, sortDirection, onSort }) => {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-gray-700 uppercase text-xs tracking-wider',
        sortable && 'cursor-pointer select-none hover:bg-gray-100',
        className
      )}
      onClick={sortable ? onSort : undefined}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortable && (
          <div className="flex flex-col">
            <ChevronUp 
              className={cn(
                'h-3 w-3 -mb-1',
                sortDirection === 'asc' ? 'text-lime-600' : 'text-gray-400'
              )} 
            />
            <ChevronDown 
              className={cn(
                'h-3 w-3',
                sortDirection === 'desc' ? 'text-lime-600' : 'text-gray-400'
              )} 
            />
          </div>
        )}
      </div>
    </th>
  );
};

export const TableCell = ({ children, className }) => {
  return (
    <td className={cn('p-4 align-middle', className)}>
      {children}
    </td>
  );
};

export const TableEmpty = ({ children, colSpan }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="p-8 text-center text-gray-500">
        {children}
      </td>
    </tr>
  );
};
