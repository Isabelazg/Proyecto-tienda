import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select/Select';
import { SearchBar } from '@/components/common';

export const CategoryFiltersBar = ({ 
  filters, 
  totalItems,
  isLoading,
  onSearch, 
  onFilterChange,
  onCreateNew 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Search */}
        <div className="md:col-span-2">
          <SearchBar
            value={filters.search}
            onChange={onSearch}
            placeholder="Buscar categorías por nombre o descripción..."
          />
        </div>

        {/* Status Filter */}
        <div>
          <Select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activas</option>
            <option value="inactive">Inactivas</option>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {isLoading ? 'Cargando...' : `${totalItems} categorías encontradas`}
        </div>
        <Button
          onClick={onCreateNew}
          className="bg-black text-white hover:bg-gray-900"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Categoría
        </Button>
      </div>
    </div>
  );
};
