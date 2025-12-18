import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal/Modal';

export const DeleteCategoryDialog = ({ 
  isOpen, 
  category, 
  onClose, 
  onConfirm 
}) => {
  if (!category) return null;

  const hasProducts = category.total_productos > 0;

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
            ¿Estás seguro de eliminar esta categoría?
          </p>
          <p className="text-gray-600 text-sm mb-1">
            {category.nombre}
          </p>
          {hasProducts ? (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                ⚠️ Esta categoría tiene {category.total_productos} producto(s) asociado(s)
              </p>
              <p className="text-yellow-700 text-xs mt-1">
                Los productos quedarán sin categoría asignada
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm mt-4">
              Esta acción no se puede deshacer
            </p>
          )}
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
          Eliminar Categoría
        </Button>
      </ModalFooter>
    </Modal>
  );
};
