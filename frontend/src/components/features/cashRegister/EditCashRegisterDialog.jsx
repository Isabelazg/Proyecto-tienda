import { useState, useEffect } from 'react';
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
  onClose, 
  onConfirm,
  cashRegister = null,
  mode = 'close', // 'close' o 'transaction'
  transactionType = 'ingreso'
}) => {
  const [formData, setFormData] = useState({
    efectivo_contado: '',
    notas: '',
    tipo: transactionType,
    monto: '',
    concepto: ''
  });

  const [errors, setErrors] = useState({});

  const efectivo_esperado = cashRegister 
    ? cashRegister.monto_inicial + 
      cashRegister.total_ventas + 
      cashRegister.total_ingresos - 
      cashRegister.total_egresos
    : 0;

  const diferencia = mode === 'close' && formData.efectivo_contado 
    ? parseFloat(formData.efectivo_contado) - efectivo_esperado
    : null;

  useEffect(() => {
    if (mode === 'transaction') {
      setFormData(prev => ({ ...prev, tipo: transactionType }));
    }
  }, [mode, transactionType]);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'close') {
      if (!formData.efectivo_contado || formData.efectivo_contado.trim() === '') {
        newErrors.efectivo_contado = 'El efectivo contado es requerido';
      } else {
        const monto = parseFloat(formData.efectivo_contado);
        if (isNaN(monto) || monto < 0) {
          newErrors.efectivo_contado = 'El monto debe ser un número válido no negativo';
        }
      }
    }

    if (mode === 'transaction') {
      if (!formData.tipo) {
        newErrors.tipo = 'El tipo de transacción es requerido';
      }
      if (!formData.monto || formData.monto.trim() === '') {
        newErrors.monto = 'El monto es requerido';
      } else {
        const monto = parseFloat(formData.monto);
        if (isNaN(monto) || monto <= 0) {
          newErrors.monto = 'El monto debe ser mayor a 0';
        }
      }
      if (!formData.concepto || formData.concepto.trim().length < 3) {
        newErrors.concepto = 'El concepto debe tener al menos 3 caracteres';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    let data = {};
    if (mode === 'close') {
      data = {
        efectivo_contado: parseFloat(formData.efectivo_contado),
        diferencia: diferencia,
        notas_cierre: formData.notas.trim()
      };
    } else if (mode === 'transaction') {
      data = {
        tipo: formData.tipo,
        monto: parseFloat(formData.monto),
        concepto: formData.concepto.trim()
      };
    }

    const result = onConfirm(data);
    if (result?.success !== false) {
      handleClose();
    }
  };

  const handleOpenChange = (open) => {
    if (!open) {
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      efectivo_contado: '',
      notas: '',
      tipo: transactionType,
      monto: '',
      concepto: ''
    });
    setErrors({});
    onClose();
  };

  const isFormValid = () => {
    const hasErrors = Object.values(errors).some(error => error);
    
    if (mode === 'close') {
      return !hasErrors && formData.efectivo_contado;
    }
    
    if (mode === 'transaction') {
      return !hasErrors && formData.tipo && formData.monto && formData.concepto?.trim().length >= 3;
    }
    
    return false;
  };

  const getTitle = () => {
    if (mode === 'close') return 'Cerrar Caja';
    if (mode === 'transaction') {
      return formData.tipo === 'ingreso' ? 'Agregar Ingreso' : 'Agregar Egreso';
    }
    return 'Gestión de Caja';
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title={getTitle()}
      description={mode === 'close' ? 'Registra el efectivo contado y cierra la caja' : 'Registra una transacción de efectivo'}
      onSubmit={handleSubmit}
      submitText={mode === 'close' ? 'Cerrar Caja' : (formData.tipo === 'ingreso' ? 'Registrar Ingreso' : 'Registrar Egreso')}
      cancelText="Cancelar"
      maxWidth={mode === 'close' ? 'max-w-3xl' : 'max-w-2xl'}
      isLoading={false}
      submitDisabled={!isFormValid()}
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
              value={formatCurrency(efectivo_esperado)}
              variant="lime"
              className="border-2"
            />

            <FormInput
              label="Efectivo Contado"
              id="efectivo_contado"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.efectivo_contado}
              onChange={(e) => handleChange('efectivo_contado', e.target.value)}
              error={errors.efectivo_contado}
              icon={DollarSign}
              required
            />

            {diferencia !== null && !isNaN(diferencia) && (
              <>
                <FormDifferenceBox
                  diferencia={
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
              id="notas"
              placeholder="Observaciones sobre el cierre de caja..."
              value={formData.notas}
              onChange={(e) => handleChange('notas', e.target.value)}
              rows={3}
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
              value={formData.tipo}
              onChange={(e) => handleChange('tipo', e.target.value)}
              error={errors.tipo}
              required
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
              value={formData.monto}
              onChange={(e) => handleChange('monto', e.target.value)}
              error={errors.monto}
              icon={DollarSign}
              required
            />

            <FormTextarea
              label="Concepto"
              id="concepto"
              placeholder="Describe el motivo de la transacción..."
              value={formData.concepto}
              onChange={(e) => handleChange('concepto', e.target.value)}
              error={errors.concepto}
              rows={3}
              required
            />
          </>
        )}
      </div>
    </FormDialog>
  );
};
