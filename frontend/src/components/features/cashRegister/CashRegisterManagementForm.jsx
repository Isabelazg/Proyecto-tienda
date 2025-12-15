import React, { useState } from 'react';
import { Card } from '@/components/ui/card/Card';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { CashRegisterFiltersBar } from './CashRegisterFiltersBar';
import { CashRegisterDataTable } from './CashRegisterDataTable';
import { CreateCashRegisterDialog } from './CreateCashRegisterDialog';
import { EditCashRegisterDialog } from './EditCashRegisterDialog';
import { ViewCashRegisterDialog } from './ViewCashRegisterDialog';
import { useCashRegisterTable } from '@/hooks/cashRegister/useCashRegisterTable';
import { useOpenCashRegister } from '@/hooks/cashRegister/useOpenCashRegister';
import { useCloseCashRegister } from '@/hooks/cashRegister/useCloseCashRegister';
import { useAddTransaction } from '@/hooks/cashRegister/useAddTransaction';

export const CashRegisterManagementForm = () => {
  const {
    cashRegisters,
    isLoading,
    error,
    pagination,
    filters,
    sortConfig,
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePageChange,
    checkActiveCashRegister,
    refetch
  } = useCashRegisterTable();

  const { openCashRegister } = useOpenCashRegister(refetch);
  const { closeCashRegister } = useCloseCashRegister(refetch);
  const { addTransaction } = useAddTransaction(refetch);

  // Local state for modals and selected data
  const [isOpenDialogOpen, setIsOpenDialogOpen] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('ingreso');
  const [selectedCashRegister, setSelectedCashRegister] = useState(null);

  // Get active cash register
  const activeCashRegister = checkActiveCashRegister();

  // Handler functions
  const handleOpenDialog = () => {
    setIsOpenDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (activeCashRegister) {
      setSelectedCashRegister(activeCashRegister);
      setIsCloseDialogOpen(true);
    }
  };

  const handleAddIncomeDialog = () => {
    if (activeCashRegister) {
      setTransactionType('ingreso');
      setIsTransactionDialogOpen(true);
    }
  };

  const handleAddExpenseDialog = () => {
    if (activeCashRegister) {
      setTransactionType('egreso');
      setIsTransactionDialogOpen(true);
    }
  };

  const handleViewCashRegister = (cashRegister) => {
    setSelectedCashRegister(cashRegister);
    setIsViewDialogOpen(true);
  };

  const handleOpenCashRegister = async (data) => {
    const result = await openCashRegister(data);
    if (result.success) {
      setIsOpenDialogOpen(false);
    }
    return result;
  };

  const handleCloseCashRegister = async (data) => {
    if (activeCashRegister) {
      const result = await closeCashRegister(activeCashRegister.id, data);
      if (result.success) {
        setIsCloseDialogOpen(false);
        setSelectedCashRegister(null);
      }
      return result;
    }
    return { success: false, message: 'No hay caja activa' };
  };

  const handleAddTransaction = async (data) => {
    if (activeCashRegister) {
      const transactionData = {
        ...data,
        tipo: transactionType
      };
      const result = await addTransaction(activeCashRegister.id, transactionData);
      if (result.success) {
        setIsTransactionDialogOpen(false);
      }
      return result;
    }
    return { success: false, message: 'No hay caja activa' };
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
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

      {/* Data Table */}
      <Card>
        <CashRegisterDataTable
          cashRegisters={cashRegisters}
          isLoading={isLoading}
          sortConfig={sortConfig}
          onSort={handleSort}
          onView={handleViewCashRegister}
        />

        {/* Pagination */}
        {!isLoading && cashRegisters.length > 0 && (
          <div className="border-t p-4">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              pageSize={pagination.itemsPerPage}
              totalItems={pagination.totalItems}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Card>

      {/* Dialogs */}
      <CreateCashRegisterDialog
        isOpen={isOpenDialogOpen}
        onClose={() => setIsOpenDialogOpen(false)}
        onConfirm={handleOpenCashRegister}
      />

      <EditCashRegisterDialog
        isOpen={isCloseDialogOpen || isTransactionDialogOpen}
        onClose={() => {
          setIsCloseDialogOpen(false);
          setIsTransactionDialogOpen(false);
        }}
        onConfirm={isCloseDialogOpen ? handleCloseCashRegister : handleAddTransaction}
        cashRegister={activeCashRegister}
        mode={isCloseDialogOpen ? 'close' : 'transaction'}
        transactionType={transactionType}
      />

      <ViewCashRegisterDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        cashRegister={selectedCashRegister}
      />
    </div>
  );
};
