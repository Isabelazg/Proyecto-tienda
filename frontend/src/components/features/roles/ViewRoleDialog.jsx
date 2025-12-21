import { FormViewDialog, FormViewField } from '@/components/common';
import { formatDate } from '@/utils/format';
import { Shield } from 'lucide-react';

// Mapeo de permisos a nombres legibles
const PERMISSION_LABELS = {
  'productos.ver': 'Ver productos',
  'productos.crear': 'Crear productos',
  'productos.editar': 'Editar productos',
  'productos.eliminar': 'Eliminar productos',
  'categorias.ver': 'Ver categorías',
  'categorias.crear': 'Crear categorías',
  'categorias.editar': 'Editar categorías',
  'categorias.eliminar': 'Eliminar categorías',
  'ventas.ver': 'Ver ventas',
  'ventas.crear': 'Crear ventas',
  'ventas.anular': 'Anular ventas',
  'clientes.ver': 'Ver clientes',
  'clientes.crear': 'Crear clientes',
  'clientes.editar': 'Editar clientes',
  'clientes.eliminar': 'Eliminar clientes',
  'usuarios.ver': 'Ver usuarios',
  'usuarios.crear': 'Crear usuarios',
  'usuarios.editar': 'Editar usuarios',
  'usuarios.eliminar': 'Eliminar usuarios',
  'reportes.ver': 'Ver reportes',
  'reportes.exportar': 'Exportar reportes',
  'dashboard.ver': 'Ver dashboard',
};

const groupPermissionsByModule = (permissions) => {
  const grouped = {};
  permissions.forEach(permission => {
    const [module] = permission.split('.');
    if (!grouped[module]) {
      grouped[module] = [];
    }
    grouped[module].push(permission);
  });
  return grouped;
};

export const ViewRoleDialog = ({ isOpen, role, onClose }) => {
  if (!role) return null;

  const groupedPermissions = groupPermissionsByModule(role.permisos);

  return (
    <FormViewDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Detalles del Rol"
      IconComponent={Shield}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        <FormViewField label="Nombre" value={role.nombre} />
        <FormViewField label="Descripción" value={role.descripcion} />

        <div className="grid grid-cols-2 gap-4">
          <FormViewField label="Usuarios asignados" value={String(role.total_usuarios ?? 0)} />
          <FormViewField label="Cantidad de permisos" value={String(role.permisos?.length ?? 0)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormViewField label="Fecha de creación" value={role.created_at ? formatDate(role.created_at) : ''} />
          <FormViewField label="Estado" value={role.estado ? 'Activo' : 'Inactivo'} />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Permisos</label>
          <div className="mt-2 space-y-3">
            {Object.entries(groupedPermissions).map(([module, permissions]) => (
              <div key={module} className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2 capitalize">{module}</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {permissions.map((permission) => (
                    <div key={permission} className="text-sm text-gray-700 dark:text-slate-300">
                      {PERMISSION_LABELS[permission] || permission}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormViewDialog>
  );
};
