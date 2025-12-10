import React from 'react';
import { cn } from '@/lib/utils';

export const Spinner = ({ size = 'default', className, ...props }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-lime-600 border-t-transparent',
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

export const LoadingOverlay = ({ children, className }) => {
  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <Spinner />
      {children && <span className="ml-3 text-gray-600">{children}</span>}
    </div>
  );
};
