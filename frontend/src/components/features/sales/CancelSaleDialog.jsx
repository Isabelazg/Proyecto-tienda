import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal/Modal';
import { formatCurrency } from '@/utils/format';

export const CancelSaleDialog = ({ 
  isOpen, 
  sale, 
  onClose, 
  onConfirm 
}) => {
  if (!sale) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>Anular Venta</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="text-center py-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-gray-900 font-medium mb-2">
            ¿Estás seguro de anular esta venta?
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left my-4">
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">ID:</span> #{sale.venta_id}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Usuario:</span> {sale.usuario}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Total:</span> {formatCurrency(sale.total)}
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            Esta acción no se puede deshacer. Los productos volverán al inventario.
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} variant="ghost">
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Anular Venta
        </Button>
      </ModalFooter>
    </Modal>
  );
};
