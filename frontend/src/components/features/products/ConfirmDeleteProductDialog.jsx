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

export const ConfirmDeleteProductDialog = ({ 
  isOpen, 
  product, 
  onClose, 
  onConfirm 
}) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>Confirmar Eliminación</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="text-center py-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-gray-900 font-medium mb-2">
            ¿Estás seguro de eliminar este producto?
          </p>
          <p className="text-gray-600 text-sm">
            {product.nombre}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Esta acción no se puede deshacer
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
          Eliminar Producto
        </Button>
      </ModalFooter>
    </Modal>
  );
};
