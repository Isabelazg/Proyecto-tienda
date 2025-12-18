import React from 'react';
import { SearchBar } from '@/components/common';
import { Select } from '@/components/ui/select/Select';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';

export const OrderFiltersBar = ({ 
  filters, 
  tables,
  onFilterChange,
  onCreateNew,
  onRefresh
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Búsqueda */}
        <div className="md:col-span-2">
          <SearchBar
            value={filters.search}
            onChange={(value) => onFilterChange('search', value)}
            placeholder="Buscar por pedido, mesa o mesero..."
          />
        </div>

        {/* Filtro por Estado */}
        <div>
          <Select
            value={filters.estado}
            onChange={(e) => onFilterChange('estado', e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_preparacion">En Preparación</option>
            <option value="entregado">Entregado</option>
            <option value="pagado">Pagado</option>
          </Select>
        </div>

        {/* Filtro por Mesa */}
        <div>
          <Select
            value={filters.mesa}
            onChange={(e) => onFilterChange('mesa', e.target.value)}
          >
            <option value="">Todas las mesas</option>
            {tables.map(table => (
              <option key={table.id} value={table.id}>
                Mesa {table.numero} - {table.ubicacion}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onRefresh}
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
        <Button
          onClick={onCreateNew}
          className="bg-lime-600 hover:bg-lime-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Pedido
        </Button>
      </div>
    </div>
  );
};
