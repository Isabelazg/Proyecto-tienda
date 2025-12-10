import React from 'react';
import { Eye, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  TableEmpty 
} from '@/components/ui/table/Table';
import { EmptyState } from '@/components/ui/empty-state/EmptyState';
import { LoadingOverlay } from '@/components/ui/spinner/Spinner';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { getSaleStatusBadge, getPaymentMethodBadge, getCountBadge } from '@/utils/badges';
import { ShoppingBag } from 'lucide-react';

export const SalesDataTable = ({ 
  sales, 
  isLoading, 
  sortConfig,
  onSort,
  onView,
  onCancel
}) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '⇅';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (isLoading && sales.length === 0) {
    return <LoadingOverlay message="Cargando ventas..." />;
  }

  if (!isLoading && sales.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="No hay ventas registradas"
        description="Las ventas aparecerán aquí una vez que se completen"
      />
    );
  }

  return (
    <div className="relative">
      {isLoading && <LoadingOverlay />}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('venta_id')}
            >
              ID {getSortIcon('venta_id')}
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('fecha')}
            >
              Fecha {getSortIcon('fecha')}
            </TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Items</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onSort('total')}
            >
              Total {getSortIcon('total')}
            </TableHead>
            <TableHead>Método Pago</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.venta_id}>
              <TableCell className="font-medium">
                #{sale.venta_id}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {formatDateTime(sale.fecha)}
              </TableCell>
              <TableCell>{sale.usuario}</TableCell>
              <TableCell>
                {getCountBadge(sale.items.length, 'items')}
              </TableCell>
              <TableCell className="font-semibold text-lime-600">
                {formatCurrency(sale.total)}
              </TableCell>
              <TableCell>
                {getPaymentMethodBadge(sale.metodo_pago)}
              </TableCell>
              <TableCell>
                {getSaleStatusBadge(sale.estado)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(sale)}
                    title="Ver detalles"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  {sale.estado === 'completada' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCancel(sale)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Anular venta"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
