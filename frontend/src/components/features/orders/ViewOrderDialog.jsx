import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge/Badge';
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal/Modal';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table/Table';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { ClipboardList, User, Clock, StickyNote } from 'lucide-react';

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

export const ViewOrderDialog = ({ 
  isOpen, 
  order, 
  onClose 
}) => {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <ModalHeader onClose={onClose}>
        <ModalTitle>Detalles del Pedido #{order.id}</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-6">
          {/* Encabezado con información general */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <div className="bg-lime-100 p-4 rounded-xl">
              <ClipboardList className="h-8 w-8 text-lime-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">Pedido #{order.id}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Mesa {order.mesa_numero}
              </p>
            </div>
            <div>
              {getOrderStatusBadge(order.estado)}
            </div>
          </div>

          {/* Información del pedido */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center gap-2 text-gray-600 text-sm">
                <User className="h-4 w-4" />
                Mesero
              </Label>
              <p className="font-medium text-gray-900 mt-1">{order.mesero}</p>
            </div>

            <div>
              <Label className="flex items-center gap-2 text-gray-600 text-sm">
                <Clock className="h-4 w-4" />
                Fecha de Creación
              </Label>
              <p className="font-medium text-gray-900 mt-1">
                {formatDateTime(order.created_at)}
              </p>
            </div>

            <div>
              <Label className="text-gray-600 text-sm">Última Actualización</Label>
              <p className="font-medium text-gray-900 mt-1">
                {formatDateTime(order.updated_at)}
              </p>
            </div>

            <div>
              <Label className="text-gray-600 text-sm">Total de Items</Label>
              <p className="font-medium text-gray-900 mt-1">
                {order.items.length} productos
              </p>
            </div>
          </div>

          {/* Notas */}
          {order.notas && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <Label className="flex items-center gap-2 text-yellow-800 font-semibold mb-2">
                <StickyNote className="h-4 w-4" />
                Notas del Pedido
              </Label>
              <p className="text-yellow-900">{order.notas}</p>
            </div>
          )}

          {/* Productos */}
          <div>
            <Label className="text-lg font-semibold mb-3 block">Productos</Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-center">Cantidad</TableHead>
                  <TableHead className="text-right">Precio Unit.</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.producto}</TableCell>
                    <TableCell className="text-center">{item.cantidad}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.precio)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(item.subtotal)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Total */}
          <div className="bg-lime-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-900">Total:</span>
              <span className="text-3xl font-bold text-lime-600">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose} className="bg-black text-white hover:bg-gray-900">
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};
