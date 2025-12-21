import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
} from '@/components/ui/Table';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { getSaleStatusBadge, getPaymentMethodBadge } from '@/utils/badges';
import { Printer } from 'lucide-react';
import { printReceipt } from '@/utils/printReceipt';

export const ViewSaleDialog = ({ 
  isOpen, 
  sale, 
  onClose 
}) => {
  if (!sale) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <ModalHeader onClose={onClose}>
        <ModalTitle>Detalles de Venta #{sale.venta_id}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {/* Información General */}
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
          <div>
            <Label className="text-gray-600 text-sm">Fecha</Label>
            <p className="font-medium">{formatDateTime(sale.fecha)}</p>
          </div>
          
          <div>
            <Label className="text-gray-600 text-sm">Usuario</Label>
            <p className="font-medium">{sale.usuario}</p>
          </div>
          
          {sale.mesero && (
            <div>
              <Label className="text-gray-600 text-sm">Mesero</Label>
              <p className="font-medium">{sale.mesero}</p>
            </div>
          )}
          
          <div>
            <Label className="text-gray-600 text-sm">Método de Pago</Label>
            <div className="mt-1">
              {getPaymentMethodBadge(sale.metodo_pago)}
            </div>
          </div>
          
          <div>
            <Label className="text-gray-600 text-sm">Estado</Label>
            <div className="mt-1">
              {getSaleStatusBadge(sale.estado)}
            </div>
          </div>
        </div>

        {/* Detalles de productos */}
        <div className="mb-6">
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
              {sale.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.producto}</TableCell>
                  <TableCell className="text-center">{item.cantidad}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.precio_unitario)}
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
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-lime-600">
              {formatCurrency(sale.total)}
            </span>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button 
          onClick={() => printReceipt(sale)}
          className="bg-lime-600 hover:bg-lime-700 text-white"
        >
          <Printer className="h-4 w-4 mr-2" />
          Imprimir Comprobante
        </Button>
        <Button onClick={onClose} variant="ghost">
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};
