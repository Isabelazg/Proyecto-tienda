import React from 'react';
import { Eye, Edit, ArrowRight, Send } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge/Badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { ClipboardList } from 'lucide-react';

const getOrderStatusBadge = (status) => {
  const statusConfig = {
    pendiente: { variant: 'warning', label: 'Pendiente' },
    en_preparacion: { variant: 'info', label: 'En Preparación' },
    entregado: { variant: 'success', label: 'Entregado' },
    pagado: { variant: 'default', label: 'Pagado' }
  };

  const config = statusConfig[status] || statusConfig.pendiente;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export const OrderDataTable = ({ 
  orders, 
  isLoading, 
  sortConfig,
  onSort,
  onView,
  onEdit,
  onChangeStatus,
  onSendToCashier
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No se encontraron pedidos"
        description="Crea un nuevo pedido para comenzar"
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              sortable 
              sortDirection={sortConfig.key === 'id' ? sortConfig.direction : null}
              onSort={() => onSort('id')}
            >
              Pedido
            </TableHead>
            <TableHead>Mesa</TableHead>
            <TableHead>Mesero</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead 
              sortable 
              sortDirection={sortConfig.key === 'created_at' ? sortConfig.direction : null}
              onSort={() => onSort('created_at')}
            >
              Fecha
            </TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>
                <span className="font-semibold text-gray-900">#{order.id}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-lime-100 rounded-lg flex items-center justify-center">
                    <span className="text-lime-700 font-bold text-sm">{order.mesa_numero}</span>
                  </div>
                  <span className="text-gray-700">Mesa {order.mesa_numero}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-gray-700">{order.mesero}</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-600">{order.items.length} productos</span>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-bold text-gray-900">
                  {formatCurrency(order.total)}
                </span>
              </TableCell>
              <TableCell>
                <div 
                  className="cursor-pointer inline-block"
                  onClick={() => onChangeStatus(order)}
                >
                  {getOrderStatusBadge(order.estado)}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {formatDateTime(order.created_at)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(order)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  {order.estado !== 'pagado' && (
                    <button
                      onClick={() => onEdit(order)}
                      className="p-2 text-lime-600 hover:bg-lime-50 rounded-lg transition-colors"
                      title="Editar pedido"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  )}
                  {order.estado === 'entregado' && (
                    <button
                      onClick={() => onSendToCashier(order)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Enviar a caja"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  )}
                  {order.estado !== 'pagado' && (
                    <button
                      onClick={() => onChangeStatus(order)}
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title="Cambiar estado"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
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
