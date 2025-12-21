import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar, ItemsPerPageSelector, FilterSelect } from '@/components/common';

export const OrderFiltersBar = ({ 
  filters, 
  tables = [],
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div className="md:col-span-2">
          <SearchBar
            value={filters.search || ''}
            onChange={onSearch}
            placeholder="Buscar por pedido, mesa o mesero..."
          />
        </div>

        {/* Estado Filter */}
        <div>
          <FilterSelect
            value={filters.estado || ''}
            onChange={(e) => onFilterChange('estado', e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_preparacion">En Preparación</option>
            <option value="entregado">Entregado</option>
            <option value="pagado">Pagado</option>
          </FilterSelect>
        </div>

        {/* Mesa Filter */}
        <div>
          <FilterSelect
            value={filters.mesa || ''}
            onChange={(e) => onFilterChange('mesa', e.target.value)}
          >
            <option value="">Todas las mesas</option>
            {tables.map(table => (
              <option key={table.id} value={table.id}>
                Mesa {table.numero} - {table.ubicacion}
              </option>
            ))}
          </FilterSelect>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {isLoading ? 'Cargando...' : `${totalItems} pedidos encontrados`}
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
          className="bg-black text-white hover:bg-gray-900"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Pedido
        </Button>
      </div>
    </div>
  );
};
