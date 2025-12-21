import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import TablePagination from '@/components/common/TablePagination/TablePagination';
import { CustomerFiltersBar } from './CustomerFiltersBar';
import { CustomerDataTable } from './CustomerDataTable';
import { CreateCustomerDialog } from './CreateCustomerDialog';
import { EditCustomerDialog } from './EditCustomerDialog';
import { ViewCustomerDialog } from './ViewCustomerDialog';
import { DeleteCustomerDialog } from './DeleteCustomerDialog';
import { useCustomerTable } from '@/hooks/customers/useCustomerTable';
import { useCreateCustomer } from '@/hooks/customers/useCreateCustomer';
import { useEditCustomer } from '@/hooks/customers/useEditCustomer';

const CustomerManagementForm = () => {
  const {
    customers,
    isLoading,
    error,
    pagination,
    filters,
    sortConfig,
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePageChange,
    handleItemsPerPageChange,
    toggleCustomerStatus,
    refetch
  } = useCustomerTable();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const editDialog = useEditCustomer({
    isOpen: isEditModalOpen,
    customer: selectedCustomer,
    onSuccess: refetch
  });

  const createDialog = useCreateCustomer({
    isOpen: isCreateModalOpen,
    onSuccess: refetch
  });

  const deleteActions = useEditCustomer({ onSuccess: refetch });

  const handleOpenCreateModal = () => {
    setSelectedCustomer(null);
    setIsCreateModalOpen(true);
  };

  const handleSetIsCreateOpen = (open) => {
    setIsCreateModalOpen(open);
  };

  const handleOpenEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleSetIsEditOpen = (open) => {
    setIsEditModalOpen(open);
    if (!open) {
      setSelectedCustomer(null);
    }
  };

  const handleOpenViewModal = (customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCustomer) {
      const result = await deleteActions.deleteCustomer(selectedCustomer.id);
      if (result?.success === true) {
        setIsDeleteModalOpen(false);
        setSelectedCustomer(null);
      }
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestión de Clientes
            </h1>
            <p className="text-gray-600">
              Administra la base de datos de clientes de tu tienda
            </p>
          </div>

          {/* Filters */}
          <CustomerFiltersBar
            filters={filters}
            totalItems={pagination.totalItems}
            isLoading={isLoading}
            itemsPerPage={pagination.itemsPerPage}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            onCreateNew={handleOpenCreateModal}
          />

          {/* Error Message */}
          {error && (
            <Alert variant="error" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <CustomerDataTable
              customers={customers}
              isLoading={isLoading}
              sortConfig={sortConfig}
              onSort={handleSort}
              onView={handleOpenViewModal}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
              onToggleStatus={(customer) => toggleCustomerStatus(customer.id)}
              onCreateNew={handleOpenCreateModal}
            />
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-6">
              <TablePagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateCustomerDialog
        isOpen={isCreateModalOpen}
        setIsOpen={handleSetIsCreateOpen}
        formData={createDialog.formData}
        errors={createDialog.errors}
        isLoading={createDialog.isLoading}
        isFormValid={createDialog.isFormValid}
        handleFieldChange={createDialog.handleFieldChange}
        handleSubmit={createDialog.handleSubmit}
      />

      <EditCustomerDialog
        isOpen={isEditModalOpen}
        setIsOpen={handleSetIsEditOpen}
        formData={editDialog.formData}
        errors={editDialog.errors}
        isLoading={editDialog.isLoading}
        isFormValid={editDialog.isFormValid}
        handleFieldChange={editDialog.handleFieldChange}
        handleSubmit={editDialog.handleSubmit}
      />

      <ViewCustomerDialog
        isOpen={isViewModalOpen}
        customer={selectedCustomer}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCustomer(null);
        }}
      />

      <DeleteCustomerDialog
        isOpen={isDeleteModalOpen}
        customer={selectedCustomer}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={handleConfirmDelete}
        isLoading={deleteActions.isDeleting}
      />
    </>
  );
};

export default CustomerManagementForm;
