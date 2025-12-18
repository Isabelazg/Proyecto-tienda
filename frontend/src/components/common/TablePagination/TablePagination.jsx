import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ItemsPerPageSelector } from '@/components/common';

/**
 * Componente de paginación reutilizable para tablas
 * @param {object} meta - Metadatos de paginación {page, limit, total}
 * @param {object} links - Enlaces de navegación {prev, next}
 * @param {number} itemsPerPage - Elementos por página actual
 * @param {function} onLimitChange - Función para cambiar límite
 * @param {function} onPreviousPage - Función para página anterior
 * @param {function} onNextPage - Función para página siguiente
 * @param {function} onGoToPage - Función para ir a página específica
 * @param {function} getPageNumbers - Función para obtener números de página
 * @param {string} itemName - Nombre del elemento (usuarios, cargos, etc.)
 * @param {number} currentPage - Página actual (alternativa a meta.page)
 * @param {number} totalPages - Total de páginas (alternativa a meta.totalPages)
 * @param {function} onPageChange - Función para cambiar de página (alternativa a onGoToPage)
 */
const TablePagination = ({
  meta,
  links,
  itemsPerPage,
  onLimitChange,
  onPreviousPage,
  onNextPage,
  onGoToPage,
  getPageNumbers,
  itemName = "elementos",
  // Props alternativas para compatibilidad con Pagination
  currentPage: currentPageProp,
  totalPages: totalPagesProp,
  onPageChange,
  totalItems: totalItemsProp,
}) => {
  // Determinar estructura de datos (meta o props directas)
  const useMeta = !!meta;
  
  const currentPage = useMeta ? (meta?.page ?? 1) : (currentPageProp ?? 1);
  const limit = useMeta ? (meta?.limit ?? itemsPerPage ?? 10) : (itemsPerPage ?? 10);
  const total = useMeta ? (meta?.total ?? 0) : (totalItemsProp ?? 0);
  const totalPages = useMeta 
    ? (meta?.totalPages ?? Math.max(1, Math.ceil(total / limit))) 
    : (totalPagesProp ?? Math.max(1, Math.ceil(total / limit)));

  // Función interna para generar números de página con elipsis
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas con elipsis
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const pages = typeof getPageNumbers === 'function' 
    ? getPageNumbers() 
    : generatePageNumbers();
  
  const hasPrev = useMeta ? !!links?.prev : currentPage > 1;
  const hasNext = useMeta 
    ? (!!links?.next && currentPage < totalPages) 
    : currentPage < totalPages;

  // Función para manejar el cambio de página (compatible con ambos modos)
  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page);
    } else if (onGoToPage) {
      onGoToPage(page);
    }
  };

  const handlePrevious = () => {
    if (onPreviousPage) {
      onPreviousPage();
    } else if (onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (onNextPage) {
      onNextPage();
    } else if (onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="p-4 border-t border-slate-200 dark:border-slate-700">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Info de registros y selector de items por página */}
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Mostrando <span className="font-medium text-gray-900 dark:text-white">{(currentPage - 1) * limit + 1}</span> a{' '}
            <span className="font-medium text-gray-900 dark:text-white">{Math.min(currentPage * limit, total)}</span> de{' '}
            <span className="font-medium text-gray-900 dark:text-white">{total}</span> {itemName}
          </p>
          {onLimitChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-slate-400">Mostrar:</span>
              <ItemsPerPageSelector
                value={itemsPerPage}
                onChange={onLimitChange}
                options={[5, 10, 20, 50]}
              />
            </div>
          )}
        </div>

        {/* Controles de paginación */}
        <div className="flex items-center gap-2">
          {/* Botón anterior */}
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={!hasPrev}
            className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>

          {/* Números de página */}
          <div className="hidden sm:flex gap-1">
            {pages.map((pageNum, index) => {
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
                  variant={currentPage === pageNum ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={
                    currentPage === pageNum
                      ? 'bg-lime-600 text-white hover:bg-lime-700'
                      : 'bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-600'
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
            onClick={handleNext}
            disabled={!hasNext}
            className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
