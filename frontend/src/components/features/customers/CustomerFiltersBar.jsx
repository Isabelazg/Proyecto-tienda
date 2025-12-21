import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar, ItemsPerPageSelector, FilterSelect } from '@/components/common';

export const CustomerFiltersBar = ({ 
  filters, 
  totalItems = 0,
  isLoading = false,
  itemsPerPage = 10,
  onSearch, 
  onFilterChange,
  onItemsPerPageChange,
  onCreateNew 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Search */}
        <div className="md:col-span-2">
          <SearchBar
            value={filters.search || ''}
            onChange={onSearch}
            placeholder="Buscar clientes por nombre, email, teléfono o documento..."
          />
        </div>

        {/* Status Filter */}
        <div>
          <FilterSelect
            value={filters.status || 'all'}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </FilterSelect>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {isLoading ? 'Cargando...' : `${totalItems} clientes encontrados`}
          </div>
          {onItemsPerPageChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Mostrar:</span>
              <ItemsPerPageSelector
                value={itemsPerPage}
                onChange={onItemsPerPageChange}
                options={[5, 10, 20, 50, 100]}
              />
            </div>
          )}
        </div>
        <Button
          onClick={onCreateNew}
          variant="default"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>
    </div>
  );
};
