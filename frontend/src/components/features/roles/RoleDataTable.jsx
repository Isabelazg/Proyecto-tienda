import React from 'react';
import { Edit, Trash2, Eye, Shield, Users } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty } from '@/components/ui/table/Table';
import { EmptyState } from '@/components/ui/empty-state/EmptyState';
import { LoadingOverlay } from '@/components/ui/spinner/Spinner';
import { formatDate } from '@/utils/format';
import { Badge } from '@/components/ui/badge/Badge';
import { Plus, Check, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const RoleDataTable = ({ 
  roles, 
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
          <TableHead 
            sortable 
            sortDirection={sortConfig.key === 'nombre' ? sortConfig.direction : null}
            onSort={() => onSort('nombre')}
          >
            Rol
          </TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead className="text-center">Permisos</TableHead>
          <TableHead 
            sortable 
            sortDirection={sortConfig.key === 'total_usuarios' ? sortConfig.direction : null}
            onSort={() => onSort('total_usuarios')}
            className="text-center"
          >
            Usuarios
          </TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableEmpty colSpan={6}>
            <LoadingOverlay>Cargando roles...</LoadingOverlay>
          </TableEmpty>
        ) : roles.length === 0 ? (
          <TableEmpty colSpan={6}>
            <EmptyState
              icon={Shield}
              title="No se encontraron roles"
              description="Intenta ajustar los filtros o crea un nuevo rol"
              action={
                <Button
                  onClick={onCreateNew}
                  className="bg-black text-white hover:bg-gray-900"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Rol
                </Button>
              }
            />
          </TableEmpty>
        ) : (
          roles.map(role => (
            <TableRow key={role.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{role.nombre}</p>
                    <p className="text-xs text-gray-500">
                      Creado: {formatDate(role.created_at)}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {role.descripcion}
                </p>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="info">
                  {role.permisos.length} permisos
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold text-gray-900">
                    {role.total_usuarios}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={role.estado ? 'success' : 'error'}>
                  {role.estado ? 'Activo' : 'Inactivo'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(role)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Ver permisos"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(role)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onToggleStatus(role.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      role.estado
                        ? 'text-yellow-600 hover:bg-yellow-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                    title={role.estado ? 'Desactivar' : 'Activar'}
                  >
                    {role.estado ? <XIcon className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => onDelete(role)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                    disabled={role.id <= 3} // No permitir eliminar roles básicos
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
