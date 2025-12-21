import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { 
  FormDialog, 
  FormInput, 
  FormTextarea, 
  FormSelect,
  FormSummaryGrid,
  FormSummaryCard,
  FormDifferenceBox,
  FormAlertBox,
  FormInfoBanner
} from '@/components/common';
import { formatCurrency } from '@/utils/format';

export const EditCashRegisterDialog = ({ 
  isOpen, 
  setIsOpen,
  cashRegister = null,
  mode = 'close', // 'close' o 'transaction'
  transactionType = 'ingreso',
  formData = {},
  errors = {},
  isLoading = false,
  efectivoEsperado = 0,
  diferencia = null,
  title = 'Gestión de Caja',
  description = '',
  submitText = 'Guardar',
  handleFieldChange,
  handleSubmit,
  isFormValid
}) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await handleSubmit();
      if (result?.success === true) {
        setIsOpen(false);
      }
    } catch {
      // No cerrar el diálogo en caso de error
    }
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  const canSubmit = typeof isFormValid === 'function' ? isFormValid() : true;

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title={title}
      description={description}
      onSubmit={handleFormSubmit}
      submitText={submitText}
      cancelText="Cancelar"
      maxWidth={mode === 'close' ? 'max-w-3xl' : 'max-w-2xl'}
      isLoading={isLoading}
      submitDisabled={!canSubmit || isLoading}
    >
      <div className="space-y-4">
        {/* Cerrar Caja */}
        {mode === 'close' && cashRegister && (
          <>
            <FormSummaryGrid title="Resumen de Caja" IconComponent={DollarSign} cols={2}>
              <FormSummaryCard 
                label="Monto Inicial" 
                value={formatCurrency(cashRegister.monto_inicial)} 
              />
              <FormSummaryCard 
                label="Total Ventas" 
                value={`+${formatCurrency(cashRegister.total_ventas)}`}
                variant="success"
              />
              <FormSummaryCard 
                label="Total Ingresos" 
                value={`+${formatCurrency(cashRegister.total_ingresos)}`}
                variant="info"
              />
              <FormSummaryCard 
                label="Total Egresos" 
                value={`-${formatCurrency(cashRegister.total_egresos)}`}
                variant="warning"
              />
            </FormSummaryGrid>

            <FormSummaryCard 
              label="Efectivo Esperado" 
              value={formatCurrency(efectivoEsperado)}
              variant="lime"
              className="border-2"
            />

            <FormInput
              label="Efectivo Contado"
              id="efectivo_contado"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.efectivo_contado || ''}
              onChange={(e) => handleFieldChange('efectivo_contado', e.target.value)}
              error={errors.efectivo_contado}
              icon={DollarSign}
              required
              disabled={isLoading}
            />

            {diferencia !== null && !isNaN(diferencia) && (
              <>
                <FormDifferenceBox
                  diferencia={diferencia}
                  displayValue={
                    diferencia === 0
                      ? 'Exacto'
                      : (diferencia > 0 ? '+' : '') + formatCurrency(diferencia)
                  }
                  IconComponents={{
                    exact: DollarSign,
                    surplus: TrendingUp,
                    deficit: TrendingDown
                  }}
                />

                {Math.abs(diferencia) > 10 && (
                  <FormAlertBox
                    variant="warning"
                    title="Diferencia Significativa"
                    message="La diferencia supera los $10. Por favor, verifica el conteo antes de cerrar la caja."
                    IconComponent={AlertTriangle}
                  />
                )}
              </>
            )}

            <FormTextarea
              label="Notas de Cierre (Opcional)"
              id="observaciones"
              placeholder="Observaciones sobre el cierre de caja..."
              value={formData.observaciones || ''}
              onChange={(e) => handleFieldChange('observaciones', e.target.value)}
              rows={3}
              disabled={isLoading}
            />
          </>
        )}

        {/* Agregar Transacción */}
        {mode === 'transaction' && (
          <>
            <FormInfoBanner
              variant={formData.tipo === 'ingreso' ? 'info' : 'warning'}
              title={formData.tipo === 'ingreso' ? 'Registro de Ingreso' : 'Registro de Egreso'}
              message={
                formData.tipo === 'ingreso' 
                  ? 'Registra dinero adicional que ingresa a la caja (no incluye ventas).'
                  : 'Registra dinero que sale de la caja (gastos, retiros, etc.).'
              }
              IconComponent={formData.tipo === 'ingreso' ? TrendingUp : TrendingDown}
            />

            <FormSelect
              label="Tipo de Transacción"
              id="tipo"
              value={transactionType}
              onChange={() => {}}
              error={errors.tipo}
              required
              disabled
              options={[
                { value: '', label: 'Seleccionar tipo' },
                { value: 'ingreso', label: 'Ingreso' },
                { value: 'egreso', label: 'Egreso' }
              ]}
            />

            <FormInput
              label="Monto"
              id="monto"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.monto || ''}
              onChange={(e) => handleFieldChange('monto', e.target.value)}
              error={errors.monto}
              icon={DollarSign}
              required
              disabled={isLoading}
            />

            <FormTextarea
              label="Concepto"
              id="concepto"
              placeholder="Describe el motivo de la transacción..."
              value={formData.concepto || ''}
              onChange={(e) => handleFieldChange('concepto', e.target.value)}
              error={errors.concepto}
              rows={3}
              required
              disabled={isLoading}
            />
          </>
        )}
      </div>
    </FormDialog>
  );
};
