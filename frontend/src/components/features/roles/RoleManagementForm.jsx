import { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import TablePagination from '@/components/common/TablePagination/TablePagination';

import { useRoleTable } from '@/hooks/roles/useRoleTable';
import { useCreateRole } from '@/hooks/roles/useCreateRole';
import { useEditRole } from '@/hooks/roles/useEditRole';
import { useDeleteRole } from '@/hooks/roles/useDeleteRole';

import { RoleFiltersBar } from './RoleFiltersBar';
import { RoleDataTable } from './RoleDataTable';
import { CreateRoleDialog } from './CreateRoleDialog';
import { EditRoleDialog } from './EditRoleDialog';
import { ViewRoleDialog } from './ViewRoleDialog';
import { DeleteRoleDialog } from './DeleteRoleDialog';

export const RoleManagementForm = () => {
  const {
    roles,
    isLoading,
    error,
    pagination,
    filters,
    sortConfig,
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePageChange,
    toggleRoleStatus,
    refetch,
  } = useRoleTable();

  const { createRole, isLoading: isCreating } = useCreateRole(refetch);
  const { updateRole, isLoading: isEditing } = useEditRole(refetch);
  const { deleteRole, isLoading: isDeleting } = useDeleteRole(refetch);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleOpenCreateModal = () => {
    setSelectedRole(null);
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleOpenViewModal = (role) => {
    setSelectedRole(role);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (role) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  };

  const handleSetIsEditOpen = (open) => {
    setIsEditModalOpen(open);
    if (!open) setSelectedRole(null);
  };

  const handleCreateRole = async (roleData) => {
    const result = await createRole(roleData);
    if (result?.success === true) {
      setIsCreateModalOpen(false);
      setSelectedRole(null);
    }
    return result;
  };

  const handleUpdateRole = async (roleData) => {
    if (!selectedRole?.id) return { success: false, message: 'Rol inválido' };

    const result = await updateRole(selectedRole.id, roleData);
    if (result?.success === true) {
      setIsEditModalOpen(false);
      setSelectedRole(null);
    }
    return result;
  };

  const handleConfirmDelete = async () => {
    if (!selectedRole?.id) return;

    const result = await deleteRole(selectedRole.id);
    if (result?.success === true) {
      setIsDeleteModalOpen(false);
      setSelectedRole(null);
    }
    return result;
  };

  const handleToggleStatus = async (roleId) => {
    if (typeof toggleRoleStatus !== 'function') return;
    return toggleRoleStatus(roleId);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Roles</h1>
            <p className="text-gray-600">Administra los roles y permisos del sistema</p>
          </div>

          <RoleFiltersBar
            filters={filters}
            totalItems={pagination?.totalItems || 0}
            isLoading={isLoading}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onCreateNew={handleOpenCreateModal}
          />

          {error && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <RoleDataTable
              roles={roles}
              isLoading={isLoading}
              sortConfig={sortConfig}
              onSort={handleSort}
              onView={handleOpenViewModal}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
              onToggleStatus={handleToggleStatus}
            />
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-6">
              <TablePagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          <CreateRoleDialog
            isOpen={isCreateModalOpen}
            setIsOpen={setIsCreateModalOpen}
            onSubmit={handleCreateRole}
            isLoading={isCreating}
          />

          <EditRoleDialog
            isOpen={isEditModalOpen}
            setIsOpen={handleSetIsEditOpen}
            role={selectedRole}
            onSubmit={handleUpdateRole}
            isLoading={isEditing}
          />

          <ViewRoleDialog
            isOpen={isViewModalOpen}
            role={selectedRole}
            onClose={() => {
              setIsViewModalOpen(false);
              setSelectedRole(null);
            }}
          />

          <DeleteRoleDialog
            isOpen={isDeleteModalOpen}
            role={selectedRole}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedRole(null);
            }}
            onConfirm={handleConfirmDelete}
            isLoading={isDeleting}
          />
        </div>
      </div>
    </>
  );
};
