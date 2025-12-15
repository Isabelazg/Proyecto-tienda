import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty } from '@/components/ui/table/Table';
import { EmptyState } from '@/components/ui/empty-state/EmptyState';
import { LoadingOverlay } from '@/components/ui/spinner/Spinner';
import { formatDate } from '@/utils/format';
import { Badge } from '@/components/ui/badge/Badge';
import { UserCog, Plus, Check, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const getRoleBadge = (roleName) => {
  const variants = {
    'Administrador': 'info',
    'Empleado': 'lime',
    'Mesero': 'default',
  };
  return <Badge variant={variants[roleName] || 'default'}>{roleName}</Badge>;
};

export const UsersDataTable = ({ 
  users, 
  isLoading, 
  sortConfig,
  onSort,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  onCreateNew
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead sortable sortDirection={sortConfig.key === 'nombre' ? sortConfig.direction : null} onSort={() => onSort('nombre')}>
            Nombre
          </TableHead>
          <TableHead>Email</TableHead>
          <TableHead sortable sortDirection={sortConfig.key === 'role' ? sortConfig.direction : null} onSort={() => onSort('role')}>
            Rol
          </TableHead>
          <TableHead>Último Acceso</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableEmpty colSpan={6}><LoadingOverlay>Cargando usuarios...</LoadingOverlay></TableEmpty>
        ) : users.length === 0 ? (
          <TableEmpty colSpan={6}>
            <EmptyState icon={UserCog} title="No se encontraron usuarios" description="Intenta ajustar los filtros o crea un nuevo usuario"
              action={<Button onClick={onCreateNew} className="bg-black text-white hover:bg-gray-900"><Plus className="h-4 w-4 mr-2" />Crear Usuario</Button>} />
          </TableEmpty>
        ) : (
          users.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <div><p className="font-medium text-gray-900">{user.nombre}</p><p className="text-xs text-gray-500">ID: {user.id}</p></div>
              </TableCell>
              <TableCell><p className="text-sm text-gray-900">{user.email}</p></TableCell>
              <TableCell>{getRoleBadge(user.role.nombre)}</TableCell>
              <TableCell><p className="text-sm text-gray-600">{formatDate(user.ultimo_acceso)}</p></TableCell>
              <TableCell><Badge variant={user.estado ? 'success' : 'error'}>{user.estado ? 'Activo' : 'Inactivo'}</Badge></TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => onView(user)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver detalles"><Eye className="h-4 w-4" /></button>
                  <button onClick={() => onEdit(user)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Editar"><Edit className="h-4 w-4" /></button>
                  <button onClick={() => onToggleStatus(user.id)} className={`p-2 rounded-lg transition-colors ${user.estado ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'}`} title={user.estado ? 'Desactivar' : 'Activar'}>
                    {user.estado ? <XIcon className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  </button>
                  <button onClick={() => onDelete(user)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar"><Trash2 className="h-4 w-4" /></button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
