import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={cn(
        'relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden',
        'animate-in fade-in-0 zoom-in-95',
        className
      )}>
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = ({ children, onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      )}
    </div>
  );
};

export const ModalTitle = ({ children }) => {
  return (
    <h2 className="text-xl font-semibold text-gray-900">
      {children}
    </h2>
  );
};

export const ModalBody = ({ children, className }) => {
  return (
    <div className={cn('p-6 overflow-y-auto max-h-[calc(90vh-180px)]', className)}>
      {children}
    </div>
  );
};

export const ModalFooter = ({ children, className }) => {
  return (
    <div className={cn(
      'flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50',
      className
    )}>
      {children}
    </div>
  );
};
