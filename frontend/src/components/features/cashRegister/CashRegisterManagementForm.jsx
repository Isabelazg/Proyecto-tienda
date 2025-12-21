import { useState } from 'react';
import Navbar from '@/components/layout/Navbar/Navbar';
import TablePagination from '@/components/common/TablePagination/TablePagination';
import { CashRegisterFiltersBar } from './CashRegisterFiltersBar';
import { CashRegisterDataTable } from './CashRegisterDataTable';
import { CreateCashRegisterDialog } from './CreateCashRegisterDialog';
import { EditCashRegisterDialog } from './EditCashRegisterDialog';
import { ViewCashRegisterDialog } from './ViewCashRegisterDialog';
import { useCashRegisterTable } from '@/hooks/cashRegister/useCashRegisterTable';
import { useCreateCashRegister } from '@/hooks/cashRegister/useCreateCashRegister';
import { useEditCashRegister } from '@/hooks/cashRegister/useEditCashRegister';

export const CashRegisterManagementForm = () => {
  const {
    cashRegisters,
    isLoading,
    error,
    pagination,
    filters,
    sortConfig,
    handleFilterChange,
    handleSort,
    handlePageChange,
    checkActiveCashRegister,
    refetch,
  } = useCashRegisterTable();

  const [isOpenDialogOpen, setIsOpenDialogOpen] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('ingreso');
  const [selectedCashRegister, setSelectedCashRegister] = useState(null);

  const activeCashRegister = checkActiveCashRegister();

  const isEditDialogOpen = isCloseDialogOpen || isTransactionDialogOpen;
  const editMode = isCloseDialogOpen ? 'close' : 'transaction';

  const createHook = useCreateCashRegister({
    isOpen: isOpenDialogOpen,
    onSuccess: refetch,
  });

  const editHook = useEditCashRegister({
    isOpen: isEditDialogOpen,
    cashRegister: activeCashRegister,
    mode: editMode,
    transactionType,
    onSuccess: refetch,
  });

  const handleOpenDialog = () => {
    setIsOpenDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (!activeCashRegister) return;
    setSelectedCashRegister(activeCashRegister);
    setIsCloseDialogOpen(true);
  };

  const handleAddIncomeDialog = () => {
    if (!activeCashRegister) return;
    setTransactionType('ingreso');
    setIsTransactionDialogOpen(true);
  };

  const handleAddExpenseDialog = () => {
    if (!activeCashRegister) return;
    setTransactionType('egreso');
    setIsTransactionDialogOpen(true);
  };

  const handleViewCashRegister = (cashRegister) => {
    setSelectedCashRegister(cashRegister);
    setIsViewDialogOpen(true);
  };

  const setIsEditOpen = (open) => {
    if (!open) {
      setIsCloseDialogOpen(false);
      setIsTransactionDialogOpen(false);
      return;
    }

    if (editMode === 'close') {
      setIsCloseDialogOpen(true);
      setIsTransactionDialogOpen(false);
      return;
    }

    setIsCloseDialogOpen(false);
    setIsTransactionDialogOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Caja</h1>
            <p className="text-gray-600">Administra las cajas registradoras y sus transacciones</p>
          </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

          {/* Filters Bar */}
          <CashRegisterFiltersBar
            filters={filters}
            activeCashRegister={activeCashRegister}
            onFilterChange={handleFilterChange}
            onOpenCashRegister={handleOpenDialog}
            onCloseCashRegister={handleCloseDialog}
            onAddIncome={handleAddIncomeDialog}
            onAddExpense={handleAddExpenseDialog}
            onRefresh={refetch}
          />

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <CashRegisterDataTable
                cashRegisters={cashRegisters}
                isLoading={isLoading}
                sortConfig={sortConfig}
                onSort={handleSort}
                  onView={handleViewCashRegister}
              />

              {/* Pagination */}
              {!isLoading && cashRegisters.length > 0 && (
                <TablePagination
                  meta={{
                    page: pagination.currentPage,
                    limit: pagination.itemsPerPage,
                    total: pagination.totalItems
                  }}
                  itemName="cajas"
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>

          {/* Dialogs */}
          <CreateCashRegisterDialog
            isOpen={isOpenDialogOpen}
            setIsOpen={setIsOpenDialogOpen}
            formData={createHook.formData}
            errors={createHook.errors}
            isLoading={createHook.isLoading}
            handleFieldChange={createHook.handleFieldChange}
            handleSubmit={createHook.handleSubmit}
            isFormValid={createHook.isFormValid}
          />

          <EditCashRegisterDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditOpen}
            cashRegister={activeCashRegister}
            mode={editMode}
            transactionType={transactionType}
            formData={editHook.formData}
            errors={editHook.errors}
            isLoading={editHook.isLoading}
            efectivoEsperado={editHook.efectivoEsperado}
            diferencia={editHook.diferencia}
            title={editHook.title}
            description={editHook.description}
            submitText={editHook.submitText}
            handleFieldChange={editHook.handleFieldChange}
            handleSubmit={editHook.handleSubmit}
            isFormValid={editHook.isFormValid}
          />

          <ViewCashRegisterDialog
            isOpen={isViewDialogOpen}
            onClose={() => setIsViewDialogOpen(false)}
            cashRegister={selectedCashRegister}
          />
        </div>
      </div>
    </>
  );
};
