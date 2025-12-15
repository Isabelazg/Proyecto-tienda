import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert/Alert';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { UserFiltersBar } from './UserFiltersBar';
import { UsersDataTable } from './UserDataTable';
import { CreateUserDialog } from './CreateUserDialog';
import { EditUserDialog } from './EditUserDialog';
import { ViewUserDialog } from './ViewUserDialog';
import { DeleteUserDialog } from './DeleteUserDialog';
import { useUserTable } from '@/hooks/users/useUserTable';
import { useCreateUser } from '@/hooks/users/useCreateUser';
import { useEditUser } from '@/hooks/users/useEditUser';
import { useDeleteUser } from '@/hooks/users/useDeleteUser';

const UserManagementForm = () => {
  const { users, isLoading, error, pagination, filters, sortConfig, handleSearch, handleFilterChange, handleSort, handlePageChange, toggleUserStatus, refetch } = useUserTable();
  const { createUser } = useCreateUser(refetch);
  const { updateUser } = useEditUser(refetch);
  const { deleteUser } = useDeleteUser(refetch);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenCreateModal = () => { setSelectedUser(null); setIsCreateModalOpen(true); };
  const handleOpenEditModal = (user) => { setSelectedUser(user); setIsEditModalOpen(true); };
  const handleOpenViewModal = (user) => { setSelectedUser(user); setIsViewModalOpen(true); };
  const handleOpenDeleteModal = (user) => { setSelectedUser(user); setIsDeleteModalOpen(true); };

  const handleCreateSubmit = async (formData) => {
    const result = await createUser(formData);
    if (result.success) { setIsCreateModalOpen(false); setSelectedUser(null); }
  };

  const handleEditSubmit = async (formData) => {
    const result = await updateUser(selectedUser.id, formData);
    if (result.success) { setIsEditModalOpen(false); setSelectedUser(null); }
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) { 
      const result = await deleteUser(selectedUser.id); 
      if (result.success) { setIsDeleteModalOpen(false); setSelectedUser(null); }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h1>
            <p className="text-gray-600">Administra los usuarios y roles del sistema</p>
          </div>
          <UserFiltersBar filters={filters} totalItems={pagination.totalItems} isLoading={isLoading} onSearch={handleSearch} onFilterChange={handleFilterChange} onCreateNew={handleOpenCreateModal} />
          {error && <Alert variant="error" className="mb-6"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <UsersDataTable users={users} isLoading={isLoading} sortConfig={sortConfig} onSort={handleSort} onView={handleOpenViewModal} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteModal} onToggleStatus={toggleUserStatus} onCreateNew={handleOpenCreateModal} />
          </div>
          {pagination.totalPages > 1 && <div className="mt-6"><Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} onPageChange={handlePageChange} /></div>}
        </div>
      </div>
      <CreateUserDialog isOpen={isCreateModalOpen} onClose={() => { setIsCreateModalOpen(false); setSelectedUser(null); }} onSubmit={handleCreateSubmit} />
      <EditUserDialog isOpen={isEditModalOpen} user={selectedUser} onClose={() => { setIsEditModalOpen(false); setSelectedUser(null); }} onSubmit={handleEditSubmit} />
      <ViewUserDialog isOpen={isViewModalOpen} user={selectedUser} onClose={() => { setIsViewModalOpen(false); setSelectedUser(null); }} />
      <DeleteUserDialog isOpen={isDeleteModalOpen} user={selectedUser} onClose={() => { setIsDeleteModalOpen(false); setSelectedUser(null); }} onConfirm={handleConfirmDelete} />
    </>
  );
};

export default UserManagementForm;
