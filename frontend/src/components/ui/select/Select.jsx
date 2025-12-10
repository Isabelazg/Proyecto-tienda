import React from 'react';
import { cn } from '@/lib/utils';

export const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        'w-full h-10 px-3 py-2 border border-gray-300 rounded-lg',
        'focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent',
        'bg-white text-gray-900',
        'disabled:bg-gray-100 disabled:cursor-not-allowed',
        'transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';
