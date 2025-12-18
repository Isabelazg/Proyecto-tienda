import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs/Tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert/Alert';
import TablePagination from '@/components/common/TablePagination/TablePagination';
import { POSInterface } from './POSInterface';
import { SaleDataTable } from './SaleDataTable';
import { SaleFiltersBar } from './SaleFiltersBar';
import { ViewSaleDialog } from './ViewSaleDialog';
import { CancelSaleDialog } from './CancelSaleDialog';
import { useSaleTable } from '@/hooks/sales/useSaleTable';
import { usePOS } from '@/hooks/sales/usePOS';
import { useCancelSale } from '@/hooks/sales/useCancelSale';
import { ShoppingCart, History } from 'lucide-react';

export const SaleManagementForm = () => {
  // Hook para la tabla de ventas (historial)
  const {
    sales,
    isLoading: isLoadingTable,
    error: tableError,
    filters,
    pagination,
    sortConfig,
    handleFilterChange,
    handleSort,
    handlePageChange,
    refetch,
    resetFilters
  } = useSaleTable();

  // Hook para el POS (carrito y productos)
  const {
    products,
    cart,
    selectedPaymentMethod,
    selectedWaiter,
    selectedCustomer,
    cartSubtotal,
    cartTotal,
    isLoading: isLoadingPOS,
    error: posError,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setSelectedPaymentMethod,
    setSelectedWaiter,
    setSelectedCustomer,
    completeSale
  } = usePOS();

  // Hook para cancelar ventas
  const {
    cancelSale,
    isLoading: isLoadingCancel
  } = useCancelSale(refetch);

  const [activeTab, setActiveTab] = useState('pos');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Combinar estados de loading y error
  const isLoading = isLoadingTable || isLoadingPOS || isLoadingCancel;
  const error = tableError || posError;

  // Handlers para modales
  const handleOpenViewModal = (sale) => {
    setSelectedSale(sale);
    setIsViewModalOpen(true);
  };

  const handleOpenCancelModal = (sale) => {
    setSelectedSale(sale);
    setIsCancelModalOpen(true);
  };

  const handleCompleteSale = async () => {
    const success = await completeSale();
    if (success) {
      setSuccessMessage('¡Venta completada exitosamente!');
      setTimeout(() => setSuccessMessage(''), 3000);
      // Refrescar el historial y cambiar a la pestaña de historial
      refetch();
      setActiveTab('history');
    }
    return success;
  };

  const handleConfirmCancel = async () => {
    if (selectedSale) {
      const result = await cancelSale(selectedSale.venta_id);
      if (result.success) {
        setSuccessMessage(result.message);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
    setIsCancelModalOpen(false);
    setSelectedSale(null);
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  const handleSearch = (value) => {
    handleFilterChange('search', value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ventas</h1>
          <p className="text-gray-600">
            Gestiona las ventas y el punto de venta del sistema
          </p>
        </div>

        {/* Mensaje de éxito */}
        {successMessage && (
          <Alert variant="success" className="mb-6">
            <AlertTitle>Éxito</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="pos">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Punto de Venta
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              Historial de Ventas
            </TabsTrigger>
          </TabsList>

          {/* Tab: Punto de Venta */}
          <TabsContent value="pos">
            <POSInterface
              products={products}
              cart={cart}
              selectedPaymentMethod={selectedPaymentMethod}
              selectedWaiter={selectedWaiter}
              selectedCustomer={selectedCustomer}
              cartSubtotal={cartSubtotal}
              cartTotal={cartTotal}
              isLoading={isLoading}
              error={error}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onUpdateQuantity={updateCartQuantity}
              onClearCart={clearCart}
              onPaymentMethodChange={setSelectedPaymentMethod}
              onWaiterChange={setSelectedWaiter}
              onCustomerChange={setSelectedCustomer}
              onCompleteSale={handleCompleteSale}
            />
          </TabsContent>

          {/* Tab: Historial */}
          <TabsContent value="history">
            <SaleFiltersBar
              filters={filters}
              totalItems={pagination.totalItems}
              isLoading={isLoading}
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />

            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              {error && (
                <Alert variant="error">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <SaleDataTable
                sales={sales}
                isLoading={isLoading}
                sortConfig={sortConfig}
                onSort={handleSort}
                onView={handleOpenViewModal}
                onCancel={handleOpenCancelModal}
              />
            </div>

            {pagination.totalPages > 1 && (
              <TablePagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={handlePageChange}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modales */}
      <ViewSaleDialog
        isOpen={isViewModalOpen}
        sale={selectedSale}
        onClose={() => setIsViewModalOpen(false)}
      />

      <CancelSaleDialog
        isOpen={isCancelModalOpen}
        sale={selectedSale}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
      />
    </>
  );
};

export default SaleManagementForm;
