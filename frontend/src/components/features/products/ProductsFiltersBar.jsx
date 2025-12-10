import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select/Select';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';

export const ProductsFiltersBar = ({ 
  filters, 
  categories,
  totalItems,
  isLoading,
  onSearch, 
  onFilterChange,
  onCreateNew 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div className="md:col-span-2">
          <SearchBar
            value={filters.search}
            onChange={onSearch}
            placeholder="Buscar productos..."
          />
        </div>

        {/* Category Filter */}
        <div>
          <Select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <Select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {isLoading ? 'Cargando...' : `${totalItems} productos encontrados`}
        </div>
        <Button
          onClick={onCreateNew}
          className="bg-black text-white hover:bg-gray-900"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>
    </div>
  );
};
