import { FormConfirmDialog } from '@/components/common';

export const DeleteRoleDialog = ({ isOpen, role, onClose, onConfirm, isLoading = false }) => {
  if (!role) return null;

  const hasUsers = Number(role.total_usuarios || 0) > 0;
  const isSystemRole = role.id <= 3;

  if (isSystemRole) {
    return (
      <FormConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Acción no permitida"
        message="No se puede eliminar este rol"
        description={role?.nombre || ''}
        onConfirm={onClose}
        confirmText="Entendido"
        cancelText="Cerrar"
        isLoading={false}
        variant="info"
      />
    );
  }

  const descriptionParts = [role?.nombre ? role.nombre : null];
  if (hasUsers) {
    descriptionParts.push(`Este rol tiene ${role.total_usuarios} usuario(s) asignado(s).`);
    descriptionParts.push('Los usuarios podrían quedar sin rol asignado.');
  } else {
    descriptionParts.push('Esta acción no se puede deshacer.');
  }

  return (
    <FormConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Eliminación"
      message="¿Estás seguro de eliminar este rol?"
      description={descriptionParts.filter(Boolean).join('\n')}
      onConfirm={onConfirm}
      confirmText="Eliminar Rol"
      cancelText="Cancelar"
      isLoading={isLoading}
      variant={hasUsers ? 'warning' : 'danger'}
    />
  );
};
