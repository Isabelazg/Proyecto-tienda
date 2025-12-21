import { FormViewDialog, FormViewField } from '@/components/common';
import { formatDate } from '@/utils/format';

export const ViewUserDialog = ({ isOpen, user, onClose }) => {
  return (
    <FormViewDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Detalles del Usuario"
    >
      {user ? (
        <div className="space-y-4">
          <FormViewField label="Nombre Completo" value={user.nombre} />

          <div className="grid grid-cols-2 gap-4">
            <FormViewField label="Email" value={user.email} />
            <FormViewField label="Rol" value={user.role?.nombre || '-'} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormViewField
              label="Último Acceso"
              value={user.ultimo_acceso ? formatDate(user.ultimo_acceso) : '-'}
            />
            <FormViewField
              label="Fecha de Registro"
              value={user.created_at ? formatDate(user.created_at) : '-'}
            />
          </div>

          <FormViewField
            label="Estado"
            value={
              <span className={user.estado ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {user.estado ? 'Activo' : 'Inactivo'}
              </span>
            }
          />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No hay información disponible
        </div>
      )}
    </FormViewDialog>
  );
};
