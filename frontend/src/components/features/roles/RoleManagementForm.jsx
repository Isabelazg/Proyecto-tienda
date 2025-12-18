import React, { useState } from 'react';
import { Card } from '@/components/ui/card/Card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner/Spinner';
import { Alert } from '@/components/ui/alert/Alert';
import { Plus } from 'lucide-react';
import { useRoleTable } from '@/hooks/roles/useRoleTable';
import { useCreateRole } from '@/hooks/roles/useCreateRole';
import { useEditRole } from '@/hooks/roles/useEditRole';
import { useDeleteRole } from '@/hooks/roles/useDeleteRole';
import Navbar from '@/components/layout/Navbar/Navbar';
import TablePagination from '@/components/common/TablePagination/TablePagination';
import { RoleFiltersBar } from './RoleFiltersBar';
import { RoleDataTable } from './RoleDataTable';
import { CreateRoleDialog } from './CreateRoleDialog';
import { EditRoleDialog } from './EditRoleDialog';
import { ViewRoleDialog } from './ViewRoleDialog';
import { DeleteRoleDialog } from './DeleteRoleDialog';

export const RoleManagementForm = () => {
  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Table data
  const {
    roles,
    isLoading,
    error,
    filters,
    pagination,
    sortConfig,
    handleFilterChange,
    handlePageChange,
    handleSort,
    refetch,
  } = useRoleTable();

  // CRUD operations
  const { createRole } = useCreateRole(refetch);
  const { updateRole } = useEditRole(refetch);
  const { deleteRole } = useDeleteRole(refetch);

  // Dialog control functions
  const openCreateDialog = () => {
    setSelectedRole(null);
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (role) => {
    setSelectedRole(role);
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (role) => {
    setSelectedRole(role);
    setIsViewDialogOpen(true);
  };

  const openDeleteDialog = (role) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };

  const closeDialogs = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedRole(null);
  };

  // CRUD handlers
  const handleCreateRole = async (roleData) => {
    const result = await createRole(roleData);
    if (result.success) {
      closeDialogs();
    }
    return result;
  };

  const handleUpdateRole = async (roleData) => {
    const result = await updateRole(selectedRole.id, roleData);
    if (result.success) {
      closeDialogs();
    }
    return result;
  };

  const handleDeleteRole = async () => {
    const result = await deleteRole(selectedRole.id);
    if (result.success) {
      closeDialogs();
    }
    return result;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Título y Botón de Crear */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Roles</h1>
            <p className="text-gray-600 dark:text-slate-400 mt-1">
              Administra los roles y permisos del sistema
            </p>
          </div>
          <Button
            onClick={openCreateDialog}
            className="bg-lime-500 text-black hover:bg-lime-600 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nuevo Rol
          </Button>
        </div>

        {/* Alertas */}
        {error && (
          <Alert variant="error" onClose={() => {}}>
            {error}
          </Alert>
        )}

        {/* Contenido Principal */}
        <Card>
          <div className="p-6">
            {/* Barra de Filtros */}
            <RoleFiltersBar filters={filters} onFilterChange={handleFilterChange} />

            {/* Tabla de Datos */}
            <RoleDataTable
              columns={[
                { key: 'nombre', label: 'Nombre' },
                { key: 'descripcion', label: 'Descripción' },
                { key: 'permisos', label: 'Permisos' },
                { key: 'created_at', label: 'Fecha de Creación' },
                { key: 'estado', label: 'Estado' },
                { key: 'acciones', label: 'Acciones' }
              ]}
              data={roles}
              isLoading={isLoading}
              loadingMessage="Cargando roles..."
              emptyTitle="No hay roles"
              emptyDescription="No se encontraron roles con los filtros seleccionados."
              emptyIcon="users"
              onView={openViewDialog}
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
            />

            {/* Paginación */}
            {!isLoading && roles.length > 0 && (
              <TablePagination
                meta={{
                  page: pagination.currentPage,
                  limit: pagination.itemsPerPage,
                  total: pagination.totalItems
                }}
                onPageChange={handlePageChange}
                itemName="roles"
              />
            )}
          </div>
        </Card>

        {/* Diálogos */}
        <CreateRoleDialog
          isOpen={isCreateDialogOpen}
          onClose={closeDialogs}
          onSubmit={handleCreateRole}
        />

        <EditRoleDialog
          isOpen={isEditDialogOpen}
          role={selectedRole}
          onClose={closeDialogs}
          onSubmit={handleUpdateRole}
        />

        <ViewRoleDialog
          isOpen={isViewDialogOpen}
          role={selectedRole}
          onClose={closeDialogs}
        />

        <DeleteRoleDialog
          isOpen={isDeleteDialogOpen}
          role={selectedRole}
          onClose={closeDialogs}
          onConfirm={handleDeleteRole}
        />
      </div>
    </>
  );
};
