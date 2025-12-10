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
import { formatCurrency } from '@/utils/format';

export const ViewProductDialog = ({ 
  isOpen, 
  product, 
  onClose 
}) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>Detalles del Producto</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-4">
          {product.imagen && (
            <div className="flex justify-center">
              <img
                src={product.imagen}
                alt={product.nombre}
                className="w-48 h-48 object-cover rounded-lg"
              />
            </div>
          )}
          <div>
            <Label>Nombre</Label>
            <p className="text-gray-900 font-medium">{product.nombre}</p>
          </div>
          <div>
            <Label>Descripción</Label>
            <p className="text-gray-600">{product.descripcion}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Precio</Label>
              <p className="text-gray-900 font-semibold">
                {formatCurrency(product.precio)}
              </p>
            </div>
            <div>
              <Label>Stock</Label>
              <p className="text-gray-900 font-semibold">{product.stock}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Categoría</Label>
              <p className="text-gray-900">{product.categoria_nombre}</p>
            </div>
            <div>
              <Label>Estado</Label>
              <p className={product.estado ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {product.estado ? 'Activo' : 'Inactivo'}
              </p>
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
