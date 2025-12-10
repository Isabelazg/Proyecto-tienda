import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs/Tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert/Alert';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { POSInterface } from './POSInterface';
import { SalesDataTable } from './SalesDataTable';
import { SalesFiltersBar } from './SalesFiltersBar';
import { ViewSaleDialog } from './ViewSaleDialog';
import { CancelSaleDialog } from './CancelSaleDialog';
import { useSalesManagement } from '@/hooks/sales/useSalesManagement';
import { ShoppingCart, History } from 'lucide-react';

export const SalesManagementForm = () => {
  const {
    sales,
    products,
    cart,
    selectedPaymentMethod,
    isLoading,
    error,
    filters,
    pagination,
    sortConfig,
    cartSubtotal,
    cartTotal,
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePageChange,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setSelectedPaymentMethod,
    completeSale,
    cancelSale,
    refreshSales
  } = useSalesManagement();

  const [activeTab, setActiveTab] = useState('pos');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

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
      // Cambiar a la pestaña de historial para ver la venta
      setActiveTab('history');
    }
    return success;
  };

  const handleConfirmCancel = async () => {
    if (selectedSale) {
      const success = await cancelSale(selectedSale.venta_id);
      if (success) {
        setSuccessMessage('Venta anulada exitosamente');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
    setIsCancelModalOpen(false);
    setSelectedSale(null);
  };

  const handleResetFilters = () => {
    refreshSales();
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
              cartSubtotal={cartSubtotal}
              cartTotal={cartTotal}
              isLoading={isLoading}
              error={error}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onUpdateQuantity={updateCartQuantity}
              onClearCart={clearCart}
              onPaymentMethodChange={setSelectedPaymentMethod}
              onCompleteSale={handleCompleteSale}
            />
          </TabsContent>

          {/* Tab: Historial */}
          <TabsContent value="history">
            <SalesFiltersBar
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

              <SalesDataTable
                sales={sales}
                isLoading={isLoading}
                sortConfig={sortConfig}
                onSort={handleSort}
                onView={handleOpenViewModal}
                onCancel={handleOpenCancelModal}
              />
            </div>

            {pagination.totalPages > 1 && (
              <Pagination
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
