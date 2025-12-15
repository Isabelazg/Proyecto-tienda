import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/ui/modal/Modal';
import { formatDate } from '@/utils/format';
import { Shield, Users, Calendar, CheckCircle } from 'lucide-react';

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
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <ModalHeader onClose={onClose}>
        <ModalTitle>Detalles del Rol</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-6">
          {/* Encabezado con icono */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <div className="bg-indigo-100 p-4 rounded-xl">
              <Shield className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">{role.nombre}</h3>
              <p className="text-sm text-gray-500 mt-1">{role.descripcion}</p>
            </div>
          </div>

          {/* Información General */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Información General</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <Label className="flex items-center gap-2 text-blue-700">
                  <Users className="h-4 w-4" />
                  Usuarios Asignados
                </Label>
                <p className="text-3xl font-bold text-blue-900 mt-2">{role.total_usuarios}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <Label className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  Permisos
                </Label>
                <p className="text-3xl font-bold text-green-900 mt-2">{role.permisos.length}</p>
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                Fecha de Creación
              </Label>
              <p className="text-gray-900 mt-1">{formatDate(role.created_at)}</p>
            </div>
            <div>
              <Label>Estado</Label>
              <p className={`font-medium mt-1 ${role.estado ? 'text-green-600' : 'text-red-600'}`}>
                {role.estado ? 'Activo' : 'Inactivo'}
              </p>
            </div>
          </div>

          {/* Permisos por Módulo */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Permisos Asignados</h4>
            <div className="space-y-3">
              {Object.entries(groupedPermissions).map(([module, permissions]) => (
                <div key={module} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2 capitalize">{module}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {permissions.map(permission => (
                      <div key={permission} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {PERMISSION_LABELS[permission] || permission}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
