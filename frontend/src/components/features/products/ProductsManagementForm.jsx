import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert/Alert';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { ProductsFiltersBar } from './ProductsFiltersBar';
import { ProductsDataTable } from './ProductsDataTable';
import { CreateEditProductDialog } from './CreateEditProductDialog';
import { ViewProductDialog } from './ViewProductDialog';
import { ConfirmDeleteProductDialog } from './ConfirmDeleteProductDialog';
import { useProductsManagement } from '@/hooks/products/useProductsManagement';

const ProductsManagementForm = () => {
  const {
    products,
    categories,
    isLoading,
    error,
    pagination,
    filters,
    sortConfig,
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePageChange,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
  } = useProductsManagement();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setSelectedProduct(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setIsFormModalOpen(true);
  };

  const handleOpenViewModal = (product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    let result;
    if (modalMode === 'create') {
      result = await createProduct(formData);
    } else {
      result = await updateProduct(selectedProduct.id, formData);
    }

    if (result.success) {
      setIsFormModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id);
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
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
              Gestión de Productos
            </h1>
            <p className="text-gray-600">
              Administra el inventario de productos de tu tienda
            </p>
          </div>

          {/* Filters */}
          <ProductsFiltersBar
            filters={filters}
            categories={categories}
            totalItems={pagination.totalItems}
            isLoading={isLoading}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onCreateNew={handleOpenCreateModal}
          />

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {error && (
              <Alert variant="error">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <ProductsDataTable
              products={products}
              isLoading={isLoading}
              sortConfig={sortConfig}
              onSort={handleSort}
              onView={handleOpenViewModal}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
              onToggleStatus={toggleProductStatus}
              onCreateNew={handleOpenCreateModal}
            />

            {/* Pagination */}
            {!isLoading && products.length > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateEditProductDialog
        isOpen={isFormModalOpen}
        mode={modalMode}
        product={selectedProduct}
        categories={categories}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ViewProductDialog
        isOpen={isViewModalOpen}
        product={selectedProduct}
        onClose={() => setIsViewModalOpen(false)}
      />

      <ConfirmDeleteProductDialog
        isOpen={isDeleteModalOpen}
        product={selectedProduct}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ProductsManagementForm;
