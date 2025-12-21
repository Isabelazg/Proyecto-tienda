import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import TablePagination from '@/components/common/TablePagination/TablePagination';
import { POSInterface } from './POSInterface';
import { SaleDataTable } from './SaleDataTable';
import { SaleFiltersBar } from './SaleFiltersBar';
import { ViewSaleDialog } from './ViewSaleDialog';
import { CancelSaleDialog } from './CancelSaleDialog';
import { useSaleTable } from '@/hooks/sales/useSaleTable';
import { useCreateSale } from '@/hooks/sales/useCreateSale';
import { useEditSale } from '@/hooks/sales/useEditSale';
import { ShoppingCart, History } from 'lucide-react';

export const SaleManagementForm = () => {
  const [activeTab, setActiveTab] = useState('pos');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Hook para la tabla de ventas (historial)
  const {
    sales,
    isLoading: isLoadingTable,
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
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setSelectedPaymentMethod,
    setSelectedWaiter,
    setSelectedCustomer,
    completeSale
  } = useCreateSale({ onSuccess: refetch });

  // Hook para cancelar ventas
  const {
    cancelSale,
    isLoading: isLoadingCancel
  } = useEditSale({ onSuccess: refetch });

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
      refetch();
      setActiveTab('history');
    }
    return success;
  };

  const handleConfirmCancel = async () => {
    if (selectedSale) {
      const result = await cancelSale(selectedSale);
      if (result.success) {
        setSuccessMessage(result.message);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
    setIsCancelModalOpen(false);
    setSelectedSale(null);
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ventas</h1>
            <p className="text-gray-600">Gestiona las ventas y el punto de venta del sistema</p>
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
                isLoading={isLoadingPOS}
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
                isLoading={isLoadingTable}
                onSearch={(value) => handleFilterChange('search', value)}
                onFilterChange={handleFilterChange}
                onReset={resetFilters}
              />

              {/* Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <SaleDataTable
                  sales={sales}
                  isLoading={isLoadingTable}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  onView={handleOpenViewModal}
                  onCancel={handleOpenCancelModal}
                />
              </div>

              {/* Pagination */}
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

          {/* Modal de ver venta */}
          <ViewSaleDialog
            isOpen={isViewModalOpen}
            sale={selectedSale}
            onClose={() => setIsViewModalOpen(false)}
          />

          {/* Modal de cancelar venta */}
          <CancelSaleDialog
            isOpen={isCancelModalOpen}
            sale={selectedSale}
            onClose={() => setIsCancelModalOpen(false)}
            onConfirm={handleConfirmCancel}
            isLoading={isLoadingCancel}
          />
        </div>
      </div>
    </>
  );
};

export default SaleManagementForm;
