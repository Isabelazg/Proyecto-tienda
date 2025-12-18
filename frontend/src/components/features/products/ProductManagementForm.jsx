import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert/Alert';
import TablePagination from '@/components/common/TablePagination/TablePagination';
import { ProductFiltersBar } from './ProductFiltersBar';
import { ProductDataTable } from './ProductDataTable';
import { CreateProductDialog } from './CreateProductDialog';
import { EditProductDialog } from './EditProductDialog';
import { ViewProductDialog } from './ViewProductDialog';
import { DeleteProductDialog } from './DeleteProductDialog';
import { useProductTable } from '@/hooks/products/useProductTable';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';
import { useEditProduct } from '@/hooks/products/useEditProduct';
import { useDeleteProduct } from '@/hooks/products/useDeleteProduct';

const ProductManagementForm = () => {
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
    toggleProductStatus,
    refetch
  } = useProductTable();

  const { createProduct } = useCreateProduct(refetch);
  const { updateProduct } = useEditProduct(refetch);
  const { deleteProduct } = useDeleteProduct(refetch);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenCreateModal = () => {
    setSelectedProduct(null);
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleOpenViewModal = (product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCreateSubmit = async (formData) => {
    const result = await createProduct(formData);
    if (result.success) {
      setIsCreateModalOpen(false);
    }
  };

  const handleEditSubmit = async (formData) => {
    const result = await updateProduct(selectedProduct.id, formData);
    if (result.success) {
      setIsEditModalOpen(false);
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
          <ProductFiltersBar
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

            <ProductDataTable
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
              <TablePagination
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
      <CreateProductDialog
        isOpen={isCreateModalOpen}
        categories={categories}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <EditProductDialog
        isOpen={isEditModalOpen}
        product={selectedProduct}
        categories={categories}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleEditSubmit}
      />

      <ViewProductDialog
        isOpen={isViewModalOpen}
        product={selectedProduct}
        onClose={() => setIsViewModalOpen(false)}
      />

      <DeleteProductDialog
        isOpen={isDeleteModalOpen}
        product={selectedProduct}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ProductManagementForm;
