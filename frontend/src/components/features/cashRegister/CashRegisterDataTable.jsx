import { MoreHorizontal, Eye, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell
} from '@/components/ui/table/Table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { FormStatusBadge, FormAmountBadge } from '@/components/common/Form';
import { formatCurrency, formatDateTime } from '@/utils/format';
import LoadingState from '@/components/common/LoadingState';
import EmptyState from '@/components/common/EmptyState';

const CASH_REGISTER_STATUS_CONFIG = {
  abierta: { variant: 'success', label: 'Abierta' },
  cerrada: { variant: 'default', label: 'Cerrada' }
};

const getDifferenceBadge = (diferencia) => {
  if (diferencia === null || diferencia === undefined) {
    return <FormAmountBadge amount="N/A" variant="default" />;
  }

  if (diferencia === 0) {
    return <FormAmountBadge amount="Exacto" variant="success" />;
  }

  if (diferencia > 0) {
    return <FormAmountBadge amount={formatCurrency(diferencia)} variant="success" prefix="+" />;
  }

  return <FormAmountBadge amount={formatCurrency(diferencia)} variant="error" />;
};

export const CashRegisterDataTable = ({ 
  cashRegisters, 
  isLoading, 
  sortConfig,
  onSort,
  onView
}) => {
  if (isLoading) {
    return <LoadingState message="Cargando cajas registradoras..." />;
  }

  if (!Array.isArray(cashRegisters) || cashRegisters.length === 0) {
    return (
      <EmptyState
        icon={DollarSign}
        title="No se encontraron cajas"
        description="No hay cajas registradas que coincidan con los filtros aplicados."
        isError={!Array.isArray(cashRegisters)}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-slate-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-center">ID</TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-center">Usuario</TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-center">Apertura</TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-center">Cierre</TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-right">Monto Inicial</TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-right">Total Ventas</TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-right">Efectivo Esperado</TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-center">Diferencia</TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-center">Estado</TableHead>
            <TableHead className="font-semibold text-gray-700 dark:text-slate-300 text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cashRegisters.map((cashRegister) => (
            <TableRow key={cashRegister.id} className="transition-colors border-slate-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/30">
              <TableCell className="font-medium text-gray-600 dark:text-slate-300 text-center">
                #{cashRegister.id}
              </TableCell>
              <TableCell className="text-gray-900 dark:text-white text-center">
                {cashRegister.usuario}
              </TableCell>
              <TableCell className="text-gray-900 dark:text-white text-center">
                <span className="text-sm">{formatDateTime(cashRegister.fecha_apertura)}</span>
              </TableCell>
              <TableCell className="text-center">
                {cashRegister.fecha_cierre ? (
                  <span className="text-sm text-gray-600">{formatDateTime(cashRegister.fecha_cierre)}</span>
                ) : (
                  <FormAmountBadge amount="En curso" variant="warning" />
                )}
              </TableCell>
              <TableCell className="text-right text-gray-900 dark:text-white">
                {formatCurrency(cashRegister.monto_inicial)}
              </TableCell>
              <TableCell className="text-right font-semibold text-gray-900 dark:text-white">
                {formatCurrency(cashRegister.total_ventas)}
              </TableCell>
              <TableCell className="text-right font-bold text-lime-600">
                {formatCurrency(cashRegister.efectivo_esperado)}
              </TableCell>
              <TableCell className="text-center">
                {getDifferenceBadge(cashRegister.diferencia)}
              </TableCell>
              <TableCell className="text-center">
                <FormStatusBadge status={cashRegister.estado} config={CASH_REGISTER_STATUS_CONFIG} />
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost"
                      size="sm" 
                      className="text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600" align="end">
                    <DropdownMenuItem
                      onClick={() => onView(cashRegister)}
                      className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver detalles
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
