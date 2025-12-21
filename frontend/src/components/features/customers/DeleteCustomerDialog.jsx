import { FormConfirmDialog } from '@/components/common';

export const DeleteCustomerDialog = ({ 
  isOpen, 
  customer, 
  onClose, 
  onConfirm,
  isLoading = false
}) => {
  const description = customer
    ? `${customer.nombre}\n${customer.email} • ${customer.telefono}\n\nEsta acción no se puede deshacer y se perderá todo el historial de compras del cliente.`
    : 'Esta acción no se puede deshacer.';

  return (
    <FormConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Eliminación"
      message="¿Estás seguro de eliminar este cliente?"
      description={description}
      onConfirm={onConfirm}
      confirmText="Eliminar Cliente"
      cancelText="Cancelar"
      isLoading={isLoading}
      variant="danger"
    />
  );
};
