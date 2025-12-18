import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell
} from '@/components/ui/table/Table';
import LoadingState from '../LoadingState/LoadingState';
import EmptyState from '../EmptyState/EmptyState';

/**
 * Componente de tabla de datos reutilizable
 * @param {array} columns - Configuración de columnas [{key, label, align, className, render}]
 * @param {array} data - Datos a mostrar
 * @param {boolean} isLoading - Estado de carga
 * @param {string} loadingMessage - Mensaje de carga
 * @param {string} emptyTitle - Título cuando no hay datos
 * @param {string} emptyDescription - Descripción cuando no hay datos
 * @param {React.Component} emptyIcon - Icono cuando no hay datos
 * @param {function} onRowClick - Función al hacer click en una fila
 * @param {function} getRowKey - Función para obtener la key de la fila
 */
const DataTable = ({ 
  columns = [],
  data = [],
  isLoading = false,
  loadingMessage = "Cargando datos...",
  emptyTitle = "No hay datos",
  emptyDescription = "No se encontraron registros.",
  emptyIcon,
  onRowClick,
  getRowKey = (item) => item.id
}) => {
  if (isLoading) {
    return <LoadingState message={loadingMessage} />;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
        isError={!Array.isArray(data)}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-slate-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
            {columns.map((column) => (
              <TableHead 
                key={column.key || column.label}
                className={`font-semibold text-gray-700 dark:text-slate-300 ${
                  column.align === 'center' ? 'text-center' : 
                  column.align === 'right' ? 'text-right' : 
                  'text-left'
                } ${column.headerClassName || ''}`}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow 
              key={getRowKey(item)}
              onClick={() => onRowClick && onRowClick(item)}
              className={`transition-colors border-slate-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/30 ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
            >
              {columns.map((column) => (
                <TableCell 
                  key={column.key || column.label}
                  className={`${
                    column.align === 'center' ? 'text-center' : 
                    column.align === 'right' ? 'text-right' : 
                    'text-left'
                  } ${column.className || 'text-gray-900 dark:text-white'}`}
                >
                  {column.render 
                    ? column.render(item[column.key], item) 
                    : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
