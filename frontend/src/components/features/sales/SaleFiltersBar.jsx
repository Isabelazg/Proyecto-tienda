import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select/Select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { PAYMENT_METHODS, SALE_STATUS } from '@/utils/constants';

export const SaleFiltersBar = ({ 
  filters, 
  totalItems,
  isLoading,
  onSearch, 
  onFilterChange,
  onReset
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Label>Buscar</Label>
          <SearchBar
            value={filters.search}
            onChange={onSearch}
            placeholder="Buscar por ID, usuario o producto..."
          />
        </div>

        {/* Estado */}
        <div>
          <Label>Estado</Label>
          <Select
            value={filters.estado}
            onChange={(e) => onFilterChange('estado', e.target.value)}
            disabled={isLoading}
          >
            <option value="">Todos</option>
            {Object.entries(SALE_STATUS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
        </div>

        {/* Método de Pago */}
        <div>
          <Label>Método de Pago</Label>
          <Select
            value={filters.metodo_pago_id}
            onChange={(e) => onFilterChange('metodo_pago_id', e.target.value)}
            disabled={isLoading}
          >
            <option value="">Todos</option>
            {Object.entries(PAYMENT_METHODS).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        </div>

        {/* Fecha Desde */}
        <div>
          <Label>Fecha Desde</Label>
          <Input
            type="date"
            value={filters.fecha_desde}
            onChange={(e) => onFilterChange('fecha_desde', e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Fecha Hasta */}
        <div>
          <Label>Fecha Hasta</Label>
          <Input
            type="date"
            value={filters.fecha_hasta}
            onChange={(e) => onFilterChange('fecha_hasta', e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Info y acciones */}
      <div className="flex items-center justify-between pt-4 border-t">
        <p className="text-sm text-gray-600">
          {totalItems} {totalItems === 1 ? 'venta encontrada' : 'ventas encontradas'}
        </p>
        
        <Button
          variant="ghost"
          size="sm"
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
