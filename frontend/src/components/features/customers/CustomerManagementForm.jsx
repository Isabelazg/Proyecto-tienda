import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert/Alert';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { CustomerFiltersBar } from './CustomerFiltersBar';
import { CustomerDataTable } from './CustomerDataTable';
import { CreateCustomerDialog } from './CreateCustomerDialog';
import { EditCustomerDialog } from './EditCustomerDialog';
import { ViewCustomerDialog } from './ViewCustomerDialog';
import { DeleteCustomerDialog } from './DeleteCustomerDialog';
import { CustomerPurchaseHistoryDialog } from './CustomerPurchaseHistoryDialog';
import { useCustomerTable } from '@/hooks/customers/useCustomerTable';
import { useCreateCustomer } from '@/hooks/customers/useCreateCustomer';
import { useEditCustomer } from '@/hooks/customers/useEditCustomer';
import { useDeleteCustomer } from '@/hooks/customers/useDeleteCustomer';

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
    toggleCustomerStatus,
    refetch
  } = useCustomerTable();

  const { createCustomer } = useCreateCustomer(refetch);
  const { updateCustomer } = useEditCustomer(refetch);
  const { deleteCustomer } = useDeleteCustomer(refetch);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleOpenCreateModal = () => {
    setSelectedCustomer(null);
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleOpenViewModal = (customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleOpenHistoryModal = (customer) => {
    setSelectedCustomer(customer);
    setIsHistoryModalOpen(true);
    setIsViewModalOpen(false); // Cerrar el modal de vista si está abierto
  };

  const handleOpenDeleteModal = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleCreateSubmit = async (formData) => {
    const result = await createCustomer(formData);
    if (result.success) {
      setIsCreateModalOpen(false);
    }
  };

  const handleEditSubmit = async (formData) => {
    const result = await updateCustomer(selectedCustomer.id, formData);
    if (result.success) {
      setIsEditModalOpen(false);
      setSelectedCustomer(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedCustomer) {
      await deleteCustomer(selectedCustomer.id);
      setIsDeleteModalOpen(false);
      setSelectedCustomer(null);
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
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
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
              onToggleStatus={toggleCustomerStatus}
              onCreateNew={handleOpenCreateModal}
            />
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-6">
              <Pagination
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
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <EditCustomerDialog
        isOpen={isEditModalOpen}
        customer={selectedCustomer}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSubmit={handleEditSubmit}
      />

      <ViewCustomerDialog
        isOpen={isViewModalOpen}
        customer={selectedCustomer}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCustomer(null);
        }}
        onViewHistory={handleOpenHistoryModal}
      />

      <CustomerPurchaseHistoryDialog
        isOpen={isHistoryModalOpen}
        customer={selectedCustomer}
        onClose={() => {
          setIsHistoryModalOpen(false);
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
      />
    </>
  );
};

export default CustomerManagementForm;
