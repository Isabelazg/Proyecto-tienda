import * as React from "react"

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'w-full px-3 py-2 border border-gray-300 rounded-lg',
        'focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent',
        'bg-white text-gray-900 placeholder:text-gray-400',
        'disabled:bg-gray-100 disabled:cursor-not-allowed',
        'resize-none transition-colors',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea"

export { Textarea };
