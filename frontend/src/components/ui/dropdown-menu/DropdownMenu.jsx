import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../button';

export const DropdownMenu = ({ children }) => {
  return <div className="relative inline-block">{children}</div>;
};

export const DropdownMenuTrigger = ({ children, asChild }) => {
  return asChild ? children : <Button variant="ghost" size="sm">{children}</Button>;
};

export const DropdownMenuContent = ({ children, align = 'end' }) => {
  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0'
  };

  return (
    <div
      className={`absolute ${alignClasses[align]} mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-slate-700`}
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {children}
      </div>
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full text-left px-4 py-2 text-sm flex items-center
        ${
          disabled
            ? 'text-gray-400 dark:text-slate-600 cursor-not-allowed'
            : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer'
        }
        transition-colors duration-150
      `}
      role="menuitem"
    >
      {children}
    </button>
  );
};

// Wrapper component that manages the open/close state
export const DropdownMenuWrapper = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-slate-700">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
          >
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                onClick: (e) => {
                  child.props.onClick?.(e);
                  setIsOpen(false);
                }
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
