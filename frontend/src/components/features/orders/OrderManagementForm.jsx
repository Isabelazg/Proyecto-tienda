import { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { SearchBar, ItemsPerPageSelector, FilterSelect } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useOrderTable } from '@/hooks/orders/useOrderTable';
import { useCreateOrder } from '@/hooks/orders/useCreateOrder';
import { useEditOrder } from '@/hooks/orders/useEditOrder';
import { OrderDataTable } from './OrderDataTable';
import { CreateOrderDialog } from './CreateOrderDialog';
import { EditOrderDialog } from './EditOrderDialog';
import { ViewOrderDialog } from './ViewOrderDialog';
import { ChangeOrderStatusDialog } from './ChangeOrderStatusDialog';

export const OrderManagementForm = () => {
  const {
    orders,
    products,
    tables,
    isLoading,
    error: tableError,
    filters,
    pagination,
    sortConfig,
    handleFilterChange,
    handleSort,
    handlePageChange,
    refetch,
    updateOrderStatus
  } = useOrderTable();

  const [successMessage, setSuccessMessage] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const {
    createOrder,
    isLoading: isCreating,
    orderData: createOrderData,
    errors: createErrors,
    searchTerm: createSearchTerm,
    setSearchTerm: setCreateSearchTerm,
    filteredProducts: createFilteredProducts,
    handleFieldChange: handleCreateFieldChange,
    addProduct: addCreateProduct,
    removeProduct: removeCreateProduct,
    updateQuantity: updateCreateQuantity,
    total: createTotal,
    handleSubmit: handleCreateSubmit,
  } = useCreateOrder({
    isOpen: isCreateDialogOpen,
    products,
    onSuccess: refetch,
  });

  const {
    updateOrder,
    changeOrderStatus,
    sendOrderToCashier,
    isLoading: isUpdating,
    orderData: editOrderData,
    errors: editErrors,
    searchTerm: editSearchTerm,
    setSearchTerm: setEditSearchTerm,
    filteredProducts: editFilteredProducts,
    handleFieldChange: handleEditFieldChange,
    addProduct: addEditProduct,
    removeProduct: removeEditProduct,
    updateQuantity: updateEditQuantity,
    total: editTotal,
    handleSubmit: handleEditSubmit,
  } = useEditOrder({
    isOpen: isEditDialogOpen,
    order: selectedOrder,
    products,
    onSuccess: refetch,
  });

  const openCreateDialog = () => {
    setSelectedOrder(null);
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (order) => {
    setSelectedOrder(order);
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const openStatusDialog = (order) => {
    setSelectedOrder(order);
    setIsStatusDialogOpen(true);
  };

  const closeDialogs = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setIsStatusDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleCreateSuccess = (result) => {
    if (result?.success) {
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(''), 3000);
      setIsCreateDialogOpen(false);
    }
  };

  const handleUpdateSuccess = (result) => {
    if (result?.success) {
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(''), 3000);
      setIsEditDialogOpen(false);
      setSelectedOrder(null);
    }
  };

  const handleStatusChange = async (newStatus) => {
    const result = await changeOrderStatus(selectedOrder.id, selectedOrder.estado, newStatus);
    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(''), 3000);
      updateOrderStatus(selectedOrder.id, newStatus);
      closeDialogs();
    }
  };

  const handleSendToCashierSuccess = async (order) => {
    const result = await sendOrderToCashier(order.id);
    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(''), 3000);
      updateOrderStatus(order.id, 'pagado');
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Pedidos</h1>
            <p className="text-gray-600">Administra los pedidos de las mesas del restaurante</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {tableError && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {tableError}
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div className="md:col-span-2">
                <SearchBar
                  value={filters.search}
                  onChange={(value) => handleFilterChange('search', value)}
                  placeholder="Buscar por pedido, mesa o mesero..."
                />
              </div>

              {/* Estado Filter */}
              <div>
                <FilterSelect
                  value={filters.estado}
                  onChange={(e) => handleFilterChange('estado', e.target.value)}
                >
                  <option value="">Todos los estados</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="en_preparacion">En Preparación</option>
                  <option value="entregado">Entregado</option>
                  <option value="pagado">Pagado</option>
                </FilterSelect>
              </div>

              {/* Mesa Filter */}
              <div>
                <FilterSelect
                  value={filters.mesa}
                  onChange={(e) => handleFilterChange('mesa', e.target.value)}
                >
                  <option value="">Todas las mesas</option>
                  {tables.map(table => (
                    <option key={table.id} value={table.id}>
                      Mesa {table.numero} - {table.ubicacion}
                    </option>
                  ))}
                </FilterSelect>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  {isLoading ? 'Cargando...' : `${pagination?.totalItems || 0} pedidos encontrados`}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Mostrar:</span>
                  <ItemsPerPageSelector
                    value={pagination.itemsPerPage}
                    onChange={(value) => handlePageChange(1, value)}
                    options={[5, 10, 20, 50, 100]}
                  />
                </div>
              </div>
              <Button
                onClick={openCreateDialog}
                className="bg-black text-white hover:bg-gray-900"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Pedido
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <OrderDataTable
              orders={orders}
              isLoading={isLoading}
              sortConfig={sortConfig}
              onSort={handleSort}
              onView={openViewDialog}
              onEdit={openEditDialog}
              onChangeStatus={openStatusDialog}
              onSendToCashier={handleSendToCashierSuccess}
            />
          </div>

          {/* Diálogos */}
          <CreateOrderDialog
            isOpen={isCreateDialogOpen}
            setIsOpen={setIsCreateDialogOpen}
            orderData={createOrderData}
            tables={tables}
            errors={createErrors}
            isLoading={isCreating}
            handleSubmit={(e) => handleCreateSubmit(e, handleCreateSuccess)}
            handleFieldChange={handleCreateFieldChange}
            searchTerm={createSearchTerm}
            setSearchTerm={setCreateSearchTerm}
            filteredProducts={createFilteredProducts}
            addProduct={addCreateProduct}
            removeProduct={removeCreateProduct}
            updateQuantity={updateCreateQuantity}
            total={createTotal}
          />

          <EditOrderDialog
            isOpen={isEditDialogOpen}
            order={selectedOrder}
            setIsOpen={setIsEditDialogOpen}
            orderData={editOrderData}
            tables={tables}
            errors={editErrors}
            isLoading={isUpdating}
            handleSubmit={(e) => handleEditSubmit(e, handleUpdateSuccess)}
            handleFieldChange={handleEditFieldChange}
            searchTerm={editSearchTerm}
            setSearchTerm={setEditSearchTerm}
            filteredProducts={editFilteredProducts}
            addProduct={addEditProduct}
            removeProduct={removeEditProduct}
            updateQuantity={updateEditQuantity}
            total={editTotal}
          />

          <ViewOrderDialog
            isOpen={isViewDialogOpen}
            order={selectedOrder}
            onClose={closeDialogs}
          />

          <ChangeOrderStatusDialog
            isOpen={isStatusDialogOpen}
            order={selectedOrder}
            onClose={closeDialogs}
            onConfirm={handleStatusChange}
            isLoading={isUpdating}
          />
        </div>
      </div>
    </>
  );
};
