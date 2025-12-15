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
import { formatDate } from '@/utils/format';
import { FolderTree, Package, CheckCircle, Calendar } from 'lucide-react';

export const ViewCategoryDialog = ({ 
  isOpen, 
  category, 
  onClose 
}) => {
  if (!category) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>Detalles de la Categoría</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-6">
          {/* Encabezado con icono */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <div className="bg-lime-100 p-4 rounded-xl">
              <FolderTree className="h-8 w-8 text-lime-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">{category.nombre}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Categoría de productos
              </p>
            </div>
          </div>

          {/* Información General */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Información General</h4>
            <div className="space-y-3">
              <div>
                <Label>Descripción</Label>
                <p className="text-gray-700 mt-1">{category.descripcion}</p>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Fecha de Creación
                </Label>
                <p className="text-gray-900 mt-1">{formatDate(category.created_at)}</p>
              </div>

              <div>
                <Label>Estado</Label>
                <p className={`font-medium mt-1 ${category.estado ? 'text-green-600' : 'text-red-600'}`}>
                  {category.estado ? 'Activa' : 'Inactiva'}
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas de Productos */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Productos Asociados</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <Label className="flex items-center gap-2 text-blue-700">
                  <Package className="h-4 w-4" />
                  Total de Productos
                </Label>
                <p className="text-3xl font-bold text-blue-900 mt-2">
                  {category.total_productos}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <Label className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  Productos Activos
                </Label>
                <p className="text-3xl font-bold text-green-900 mt-2">
                  {category.productos_activos}
                </p>
              </div>
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
