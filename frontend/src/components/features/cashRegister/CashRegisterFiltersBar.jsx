import { SearchBar } from '@/components/common';
import { FormStatusBanner } from '@/components/common';
import { Select } from '@/components/ui/select/Select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export const CashRegisterFiltersBar = ({ 
  filters,
  activeCashRegister,
  onFilterChange,
  onOpenCashRegister,
  onCloseCashRegister,
  onAddIncome,
  onAddExpense,
  onRefresh
}) => {
  return (
    <div className="space-y-4">
      {/* Estado de la caja actual */}
      {activeCashRegister ? (
        <FormStatusBanner
          variant="success"
          icon={DollarSign}
          title="Caja Abierta"
          subtitle={`Usuario: ${activeCashRegister.usuario} • Apertura: ${new Date(activeCashRegister.fecha_apertura).toLocaleString()}`}
          actions={
            <>
              <Button
                onClick={onAddIncome}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Ingreso
              </Button>
              <Button
                onClick={onAddExpense}
                className="bg-orange-600 hover:bg-orange-700 text-white"
                size="sm"
              >
                <TrendingDown className="h-4 w-4 mr-2" />
                Egreso
              </Button>
              <Button
                onClick={onCloseCashRegister}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Cerrar Caja
              </Button>
            </>
          }
        />
      ) : (
        <FormStatusBanner
          variant="warning"
          icon={DollarSign}
          title="No hay caja abierta"
          subtitle="Debes abrir una caja para comenzar a registrar transacciones"
          actions={
            <Button
              onClick={onOpenCashRegister}
              className="bg-lime-600 hover:bg-lime-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Abrir Caja
            </Button>
          }
        />
      )}

      {/* Filtros de búsqueda */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {/* Búsqueda */}
          <div className="md:col-span-2">
            <SearchBar
              value={filters.search}
              onChange={(value) => onFilterChange('search', value)}
              placeholder="Buscar por ID o usuario..."
            />
          </div>

          {/* Filtro por Estado */}
          <div>
            <Select
              value={filters.estado}
              onChange={(e) => onFilterChange('estado', e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="abierta">Abiertas</option>
              <option value="cerrada">Cerradas</option>
            </Select>
          </div>

          {/* Fecha desde */}
          <div>
            <Input
              type="date"
              value={filters.fecha_desde}
              onChange={(e) => onFilterChange('fecha_desde', e.target.value)}
              placeholder="Desde"
            />
          </div>

          {/* Fecha hasta */}
          <div>
            <Input
              type="date"
              value={filters.fecha_hasta}
              onChange={(e) => onFilterChange('fecha_hasta', e.target.value)}
              placeholder="Hasta"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={onRefresh}
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>
      </div>
    </div>
  );
};
