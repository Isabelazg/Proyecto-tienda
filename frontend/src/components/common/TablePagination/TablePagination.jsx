import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TablePagination = ({
  meta = {},
  links = {},
  itemsPerPage,
  onLimitChange,
  onPreviousPage,
  onNextPage,
  onGoToPage,
  getPageNumbers,
  itemName = "items"
}) => {
  const { current_page = 1, last_page = 1, from = 0, to = 0, total = 0 } = meta;
  const pageNumbers = getPageNumbers ? getPageNumbers(current_page, last_page) : [];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
      {/* Info de registros */}
      <div className="text-sm text-gray-600 dark:text-slate-400">
        Mostrando <span className="font-medium text-gray-900 dark:text-white">{from}</span> a{' '}
        <span className="font-medium text-gray-900 dark:text-white">{to}</span> de{' '}
        <span className="font-medium text-gray-900 dark:text-white">{total}</span> {itemName}
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center gap-2">
        {/* Botón anterior */}
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviousPage}
          disabled={!links.prev || current_page === 1}
          className="text-gray-700 dark:text-slate-300"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>

        {/* Números de página */}
        <div className="hidden sm:flex gap-1">
          {pageNumbers.map((pageNum, index) => {
            if (pageNum === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-1 text-gray-500 dark:text-slate-400"
                >
                  ...
                </span>
              );
            }

            return (
              <Button
                key={pageNum}
                variant={current_page === pageNum ? 'default' : 'outline'}
                size="sm"
                onClick={() => onGoToPage(pageNum)}
                className={
                  current_page === pageNum
                    ? 'bg-lime-600 text-white hover:bg-lime-700'
                    : 'text-gray-700 dark:text-slate-300'
                }
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        {/* Botón siguiente */}
        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={!links.next || current_page === last_page}
          className="text-gray-700 dark:text-slate-300"
        >
          Siguiente
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
