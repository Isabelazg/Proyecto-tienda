import React from 'react';
import { cn } from '@/lib/utils';

export const Badge = ({ children, variant = 'default', className, ...props }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    error: 'bg-red-100 text-red-800 hover:bg-red-200',
    warning: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    info: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    lime: 'bg-lime-100 text-lime-800 hover:bg-lime-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
