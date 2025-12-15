import React from 'react';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { Select } from '@/components/ui/select/Select';

const TableFilters = ({
  searchPlaceholder = "Buscar...",
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
  itemsPerPage,
  onLimitChange,
  showStatusFilter = false,
  customFilters = null
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      {/* Buscador */}
      <div className="flex-1">
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      </div>

      {/* Filtro de estado */}
      {showStatusFilter && (
        <div className="w-full sm:w-48">
          <Select
            value={statusValue}
            onChange={(e) => onStatusChange(e.target.value)}
            options={[
              { value: 'all', label: 'Todos los estados' },
              { value: 'active', label: 'Activos' },
              { value: 'inactive', label: 'Inactivos' }
            ]}
          />
        </div>
      )}

      {/* Filtros personalizados */}
      {customFilters}

      {/* Items por página */}
      <div className="w-full sm:w-32">
        <Select
          value={itemsPerPage}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          options={[
            { value: 5, label: '5 items' },
            { value: 10, label: '10 items' },
            { value: 20, label: '20 items' },
            { value: 50, label: '50 items' }
          ]}
        />
      </div>
    </div>
  );
};

export default TableFilters;
