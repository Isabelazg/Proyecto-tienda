import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar, FilterSelect, FilterInput } from '@/components/common';
import { PAYMENT_METHODS, SALE_STATUS } from '@/utils/constants';

export const SaleFiltersBar = ({ 
  filters = {}, 
  totalItems = 0,
  isLoading = false,
  onSearch, 
  onFilterChange,
  onReset
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <SearchBar
            value={filters.search || ''}
            onChange={onSearch}
            placeholder="Buscar por ID, usuario o producto..."
          />
        </div>

        {/* Estado */}
        <div>
          <FilterSelect
            value={filters.estado || ''}
            onChange={(e) => onFilterChange('estado', e.target.value)}
            disabled={isLoading}
          >
            <option value="">Todos los estados</option>
            {Object.entries(SALE_STATUS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </FilterSelect>
        </div>

        {/* Método de Pago */}
        <div>
          <FilterSelect
            value={filters.metodo_pago_id || ''}
            onChange={(e) => onFilterChange('metodo_pago_id', e.target.value)}
            disabled={isLoading}
          >
            <option value="">Todos los métodos</option>
            {Object.entries(PAYMENT_METHODS).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </FilterSelect>
        </div>

        {/* Fecha Desde */}
        <div>
          <FilterInput
            type="date"
            value={filters.fecha_desde || ''}
            onChange={(e) => onFilterChange('fecha_desde', e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Fecha Hasta */}
        <div>
          <FilterInput
            type="date"
            value={filters.fecha_hasta || ''}
            onChange={(e) => onFilterChange('fecha_hasta', e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {isLoading ? 'Cargando...' : `${totalItems} ${totalItems === 1 ? 'venta encontrada' : 'ventas encontradas'}`}
        </div>
        
        <Button
          variant="outline"
          onClick={onReset}
          disabled={isLoading}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Limpiar Filtros
        </Button>
      </div>
    </div>
  );
};
