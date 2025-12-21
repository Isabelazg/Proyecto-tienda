import { FormConfirmDialog } from '@/components/common';

export const DeleteProductDialog = ({ 
  isOpen, 
  product, 
  onClose, 
  onConfirm,
  isLoading = false
}) => {
  return (
    <FormConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Eliminación"
      message="¿Estás seguro de eliminar este producto?"
      description={product ? `${product.nombre}\n\nEsta acción no se puede deshacer` : "Esta acción no se puede deshacer"}
      onConfirm={onConfirm}
      confirmText="Eliminar Producto"
      cancelText="Cancelar"
      isLoading={isLoading}
      variant="danger"
    />
  );
};
