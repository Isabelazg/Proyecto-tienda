import SearchInput from '../SearchInput';
import StatusFilter from '../StatusFilter';
import { ItemsPerPageSelector } from '@/components/common';

/**
 * Componente de filtros reutilizable para tablas
 * @param {string} searchPlaceholder - Placeholder del buscador
 * @param {string} searchValue - Valor de búsqueda
 * @param {function} onSearchChange - Función para cambio de búsqueda
 * @param {string} statusValue - Valor del filtro de estado
 * @param {function} onStatusChange - Función para cambio de estado
 * @param {number} itemsPerPage - Elementos por página
 * @param {function} onLimitChange - Función para cambio de límite
 * @param {array} additionalFilters - Filtros adicionales como roles
 * @param {boolean} showStatusFilter - Mostrar filtro de estado
 */
const TableFilters = ({
  searchPlaceholder = "Buscar...",
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
  itemsPerPage,
  onLimitChange,
  additionalFilters = [],
  showStatusFilter = false
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      {/* Buscador */}
      <SearchInput
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={onSearchChange}
      />

      {/* Filtros adicionales (como roles) */}
      {additionalFilters.map((filter, index) => (
        <div key={index}>
          {filter}
        </div>
      ))}

      {/* Filtro de estado */}
      {showStatusFilter && (
        <StatusFilter
          value={statusValue}
          onChange={onStatusChange}
        />
      )}

      {/* Items por página */}
      <ItemsPerPageSelector
        value={itemsPerPage}
        onChange={onLimitChange}
        options={[5, 10, 20, 50]}
      />
    </div>
  );
};

export default TableFilters;
