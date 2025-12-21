import Navbar from "@/components/layout/Navbar/Navbar";
import { useProductTable } from "@/hooks/products/useProductTable";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";
import { useEditProduct } from "@/hooks/products/useEditProduct";
import { CreateProductDialog } from "./CreateProductDialog";
import { EditProductDialog } from "./EditProductDialog";
import { ViewProductDialog } from "./ViewProductDialog";
import { DeleteProductDialog } from "./DeleteProductDialog";
import { ProductDataTable } from "./ProductDataTable";
import { ProductFiltersBar } from "./ProductFiltersBar";

export default function ProductsTable({ className, ...props }) {
  const {
    products,
    categories,
    isLoading,
    error,
    pagination,
    filters,
    sortConfig,
    searchTerm,
    statusFilter,
    categoryFilter,
    productPerPage,
    currentPage,
    showCreateModal,
    showEditModal,
    showViewModal,
    showDeleteModal,
    selectedProduct,
    setShowCreateModal,
    setShowEditModal,
    setShowViewModal,
    setShowDeleteModal,
    handleSearchChange,
    handleStatusChange,
    handleCategoryChange,
    handleLimitChange,
    handleViewProduct,
    handleSort,
    setCurrentPage,
    getPageNumbers,
    refreshProducts,
    toggleProductStatus,
  } = useProductTable();

  // Hook para crear producto
  const {
    productData,
    errors: createErrors,
    isLoading: isCreating,
    handleFieldChange: handleCreateFieldChange,
    clearForm,
    handleSubmit: handleCreateSubmit,
  } = useCreateProduct();

  // Handler para el éxito de la creación
  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    clearForm();
    if (typeof refreshProducts === 'function') refreshProducts();
  };

  // Hook para editar producto
  const {
    productData: editProductData,
    errors: editErrors,
    isLoading: isEditing,
    isDeleting,
    handleFieldChange: handleEditFieldChange,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog,
    handleSubmit: handleEditSubmit,
    handleDelete: handleDeleteProduct,
  } = useEditProduct();

  // Handler para el éxito de la edición
  const handleEditSuccess = () => {
    setShowEditModal(false);
    closeEditDialog();
    if (typeof refreshProducts === 'function') refreshProducts();
  };

  // Handler personalizado para abrir modal de edición
  const handleEditProductAction = (product) => {
    openEditDialog(product);
    setShowEditModal(true);
  };

  // Handler para el éxito de la eliminación
  const handleDeleteSuccess = () => {
    setShowDeleteModal(false);
    if (typeof refreshProducts === 'function') refreshProducts();
  };

  // Handler para cambio de estado que refresca la tabla automáticamente
  const handleChangeEstado = async (product) => {
    const result = await toggleProductStatus(product);
    if (result.success && typeof refreshProducts === 'function') {
      refreshProducts();
    }
    return result;
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Productos</h1>
            <p className="text-gray-600">Administra el inventario de productos de tu tienda</p>
          </div>

          {/* Filters */}
          <ProductFiltersBar
            filters={{
              search: searchTerm,
              category: categoryFilter || '',
              status: statusFilter || 'all'
            }}
            categories={categories}
            totalItems={pagination?.totalItems || 0}
            isLoading={isLoading}
            itemsPerPage={productPerPage}
            onSearch={handleSearchChange}
            onFilterChange={(key, value) => {
              if (key === 'category') return handleCategoryChange(value);
              if (key === 'status') return handleStatusChange(value);
            }}
            onItemsPerPageChange={handleLimitChange}
            onCreateNew={() => setShowCreateModal(true)}
          />

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <ProductDataTable
              products={products}
              isLoading={isLoading}
              sortConfig={sortConfig}
              onSort={handleSort}
              onView={handleViewProduct}
              onEdit={handleEditProductAction}
              onDelete={(product) => {
                setSelectedProduct(product);
                setShowDeleteModal(true);
              }}
              onToggleStatus={handleChangeEstado}
            />
          </div>

          {/* Modal de crear producto */}
          <CreateProductDialog
            isOpen={showCreateModal}
            setIsOpen={setShowCreateModal}
            productData={productData}
            categories={categories}
            errors={createErrors}
            isLoading={isCreating}
            handleSubmit={(e) => handleCreateSubmit(e, handleCreateSuccess)}
            handleFieldChange={handleCreateFieldChange}
          />

          {/* Modal de editar producto */}
          <EditProductDialog
            isOpen={showEditModal}
            setIsOpen={setShowEditModal}
            productData={editProductData}
            categories={categories}
            errors={editErrors}
            isLoading={isEditing}
            handleSubmit={(e) => handleEditSubmit(e, handleEditSuccess)}
            handleFieldChange={handleEditFieldChange}
          />

          {/* Modal de ver producto */}
          <ViewProductDialog
            isOpen={showViewModal}
            onClose={() => setShowViewModal(false)}
            product={selectedProduct}
          />

          {/* Modal de eliminar producto */}
          <DeleteProductDialog
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            product={selectedProduct}
            onConfirm={(e) => handleDeleteProduct(selectedProduct, e, handleDeleteSuccess)}
            isLoading={isDeleting}
          />
        </div>
      </div>
    </>
  );
}