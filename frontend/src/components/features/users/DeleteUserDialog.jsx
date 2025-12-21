import { FormConfirmDialog } from '@/components/common';

export const DeleteUserDialog = ({ isOpen, user, onClose, onConfirm, isLoading = false }) => {
  const description = user
    ? `${user.nombre}\n${user.email}\n\nEsta acción no se puede deshacer.`
    : 'Esta acción no se puede deshacer.';

  return (
    <FormConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Eliminación"
      message="¿Estás seguro de eliminar este usuario?"
      description={description}
      onConfirm={onConfirm}
      confirmText="Eliminar Usuario"
      cancelText="Cancelar"
      isLoading={isLoading}
      variant="danger"
    />
  );
};
