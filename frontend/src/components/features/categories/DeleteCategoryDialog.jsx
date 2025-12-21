import { FormConfirmDialog } from '@/components/common';

export const DeleteCategoryDialog = ({ 
  isOpen, 
  category, 
  onClose, 
  onConfirm,
  isLoading = false
}) => {
  const hasProducts = (category?.total_productos ?? 0) > 0;

  const description = category
    ? hasProducts
      ? `${category.nombre}\n\n⚠️ Esta categoría tiene ${category.total_productos} producto(s) asociado(s).\nLos productos quedarán sin categoría asignada.`
      : `${category.nombre}\n\nEsta acción no se puede deshacer.`
    : 'Esta acción no se puede deshacer.';

  return (
    <FormConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Eliminación"
      message="¿Estás seguro de eliminar esta categoría?"
      description={description}
      onConfirm={onConfirm}
      confirmText="Eliminar Categoría"
      cancelText="Cancelar"
      isLoading={isLoading}
      variant={hasProducts ? 'warning' : 'danger'}
    />
  );
};
