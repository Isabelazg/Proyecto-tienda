import{ useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { Card } from '@/components/ui/card/Card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert/Alert';
import TablePagination from '@/components/common/TablePagination/TablePagination';
import { useOrderTable } from '@/hooks/orders/useOrderTable';
import { useCreateOrder } from '@/hooks/orders/useCreateOrder';
import { useEditOrder } from '@/hooks/orders/useEditOrder';
import { OrderFiltersBar } from './OrderFiltersBar';
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

  const { createOrder, isLoading: isCreating } = useCreateOrder(refetch);
  const { 
    updateOrder, 
    changeOrderStatus, 
    sendOrderToCashier,
    isLoading: isUpdating 
  } = useEditOrder(refetch);

  const [successMessage, setSuccessMessage] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

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

  const handleCreateSuccess = async (orderData) => {
    const result = await createOrder(orderData);
    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(''), 3000);
      closeDialogs();
    }
  };

  const handleUpdateSuccess = async (orderData) => {
    const result = await updateOrder(selectedOrder.id, orderData);
    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(''), 3000);
      closeDialogs();
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
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Título */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Pedidos</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            Administra los pedidos de las mesas del restaurante
          </p>
        </div>

        {/* Mensajes de éxito */}
        {successMessage && (
          <Alert variant="success">
            {successMessage}
          </Alert>
        )}

        {/* Mensajes de error */}
        {tableError && (
          <Alert variant="error">
            {tableError}
          </Alert>
        )}

        {/* Filtros */}
        <OrderFiltersBar
          filters={filters}
          tables={tables}
          onFilterChange={handleFilterChange}
          onCreateNew={openCreateDialog}
          onRefresh={refetch}
        />

        {/* Contenido Principal */}
        <Card>
          <div className="p-6">
            {/* Tabla de Datos */}
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

            {/* Paginación */}
            {!isLoading && orders.length > 0 && (
              <TablePagination
                meta={{
                  page: pagination.currentPage,
                  limit: pagination.itemsPerPage,
                  total: pagination.totalItems
                }}
                itemName="pedidos"
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </Card>

      {/* Diálogos */}
      <CreateOrderDialog
        isOpen={isCreateDialogOpen}
        products={products}
        tables={tables}
        onClose={closeDialogs}
        onSubmit={handleCreateSuccess}
      />

      <EditOrderDialog
        isOpen={isEditDialogOpen}
        order={selectedOrder}
        products={products}
        tables={tables}
        onClose={closeDialogs}
        onSubmit={handleUpdateSuccess}
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
      />
      </div>
    </>
  );
};
