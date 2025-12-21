import { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import TablePagination from '@/components/common/TablePagination/TablePagination';
import { CategoryFiltersBar } from './CategoryFiltersBar';
import { CategoryDataTable } from './CategoryDataTable';
import { CreateCategoryDialog } from './CreateCategoryDialog';
import { EditCategoryDialog } from './EditCategoryDialog';
import { ViewCategoryDialog } from './ViewCategoryDialog';
import { DeleteCategoryDialog } from './DeleteCategoryDialog';
import { useCategoryTable } from '@/hooks/categories/useCategoryTable';
import { useCreateCategory } from '@/hooks/categories/useCreateCategory';
import { useEditCategory } from '@/hooks/categories/useEditCategory';

const CategoryManagementForm = () => {
  const {
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
    toggleCategoryStatus,
    refetch
  } = useCategoryTable();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const editDialog = useEditCategory({
    isOpen: isEditModalOpen,
    category: selectedCategory,
    onSuccess: refetch
  });

  const createDialog = useCreateCategory({
    isOpen: isFormModalOpen,
    onSuccess: refetch
  });

  const deleteActions = useEditCategory({ onSuccess: refetch });

  const handleOpenCreateModal = () => {
    setSelectedCategory(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleSetIsEditOpen = (open) => {
    setIsEditModalOpen(open);
    if (!open) {
      setSelectedCategory(null);
    }
  };

  const handleOpenViewModal = (category) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCategory) {
      const result = await deleteActions.deleteCategory(selectedCategory.id);
      if (result?.success === true) {
        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
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
              Gestión de Categorías
            </h1>
            <p className="text-gray-600">
              Organiza y administra las categorías de productos de tu tienda
            </p>
          </div>

          {/* Filters */}
          <CategoryFiltersBar
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
            <CategoryDataTable
              categories={categories}
              isLoading={isLoading}
              sortConfig={sortConfig}
              onSort={handleSort}
              onView={handleOpenViewModal}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
              onToggleStatus={toggleCategoryStatus}
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
      <CreateCategoryDialog
        isOpen={isFormModalOpen}
        setIsOpen={setIsFormModalOpen}
        formData={createDialog.formData}
        errors={createDialog.errors}
        isLoading={createDialog.isLoading}
        isFormValid={createDialog.isFormValid}
        handleFieldChange={createDialog.handleFieldChange}
        handleSubmit={createDialog.handleSubmit}
      />

      <EditCategoryDialog
        isOpen={isEditModalOpen}
        setIsOpen={handleSetIsEditOpen}
        formData={editDialog.formData}
        errors={editDialog.errors}
        isLoading={editDialog.isLoading}
        isFormValid={editDialog.isFormValid}
        handleFieldChange={editDialog.handleFieldChange}
        handleSubmit={editDialog.handleSubmit}
      />

      <ViewCategoryDialog
        isOpen={isViewModalOpen}
        category={selectedCategory}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCategory(null);
        }}
      />

      <DeleteCategoryDialog
        isOpen={isDeleteModalOpen}
        category={selectedCategory}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleConfirmDelete}
        isLoading={deleteActions.isDeleting}
      />
    </>
  );
};

export default CategoryManagementForm;
