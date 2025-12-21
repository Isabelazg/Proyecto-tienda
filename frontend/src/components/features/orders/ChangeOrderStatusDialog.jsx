import { FormDialog, FormSelect } from '@/components/common';
import { formatCurrency } from '@/utils/format';
import { useEffect, useMemo, useState } from 'react';

const DEFAULT_STATUSES = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en_preparacion', label: 'En Preparación' },
  { value: 'entregado', label: 'Entregado' },
  { value: 'pagado', label: 'Pagado' },
];

export const ChangeOrderStatusDialog = ({
  isOpen,
  order,
  availableStatuses = [],
  onClose,
  onConfirm,
  onSubmit,
  isLoading = false,
}) => {
  const handleOpenChange = (open) => {
    if (!open) onClose();
  };

  const [selectedStatus, setSelectedStatus] = useState(order?.estado || '');

  useEffect(() => {
    if (!isOpen || !order) return;
    setSelectedStatus(order.estado || '');
  }, [isOpen, order]);

  const statusOptions = useMemo(() => {
    return availableStatuses.length > 0 ? availableStatuses : DEFAULT_STATUSES;
  }, [availableStatuses]);

  const currentStatusLabel =
    statusOptions.find((s) => s.value === order?.estado)?.label || order?.estado;
  const nextStatusLabel =
    statusOptions.find((s) => s.value === selectedStatus)?.label || selectedStatus;

  const isFormValid = Boolean(selectedStatus) && selectedStatus !== order?.estado;

  if (!order) return null;

  const submitHandler = onSubmit ?? onConfirm;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submitHandler) return;
    submitHandler(selectedStatus);
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title="Cambiar Estado del Pedido"
      description={order ? `Pedido #${order.id}` : 'Cambiar estado del pedido'}
      onSubmit={handleSubmit}
      submitText={isLoading ? 'Guardando...' : 'Guardar'}
      cancelText="Cancelar"
      isLoading={isLoading}
      submitDisabled={!isFormValid || isLoading}
    >
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Pedido</p>
              <p className="font-semibold text-gray-900">#{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Mesa</p>
              <p className="font-semibold text-gray-900">{order.mesa_numero}</p>
            </div>
          </div>
          <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-200">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="font-semibold text-gray-900">{formatCurrency(order.total)}</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Estado actual</p>
          <p className="font-medium text-gray-900">{currentStatusLabel}</p>
        </div>

        <FormSelect
          label="Nuevo Estado"
          id="status"
          required
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Seleccionar estado</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </FormSelect>

        {selectedStatus && selectedStatus !== order.estado && (
          <div className="border-l-4 border-gray-300 bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-800">
              El estado cambiará a{' '}
              <span className="font-semibold text-gray-900">{nextStatusLabel}</span>.
            </p>
          </div>
        )}
      </div>
    </FormDialog>
  );
};
