import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Alert = ({ children, variant = 'default', className, ...props }) => {
  const variants = {
    default: 'bg-gray-50 border-gray-200 text-gray-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    warning: 'bg-orange-50 border-orange-200 text-orange-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  };

  const icons = {
    default: Info,
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const Icon = icons[variant];

  return (
    <div
      className={cn(
        'p-4 border-l-4 rounded-lg',
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start">
        <Icon className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export const AlertTitle = ({ children, className, ...props }) => {
  return (
    <h4
      className={cn('font-medium mb-1', className)}
      {...props}
    >
      {children}
    </h4>
  );
};

export const AlertDescription = ({ children, className, ...props }) => {
  return (
    <p
      className={cn('text-sm opacity-90', className)}
      {...props}
    >
      {children}
    </p>
  );
};
