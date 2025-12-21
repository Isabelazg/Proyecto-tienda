import { useEffect, useMemo, useState } from 'react';
import { useCashRegisterValidation } from './useCashRegisterValidation';

const initialFormData = {
  efectivo_contado: '',
  observaciones: '',
  monto: '',
  concepto: '',
};

export const useEditCashRegister = ({
  isOpen,
  cashRegister,
  mode = 'close',
  transactionType = 'ingreso',
  onSuccess,
} = {}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { validateCloseData, validateTransaction } = useCashRegisterValidation();

  const efectivoEsperado = useMemo(() => {
    if (!cashRegister) return 0;

    return (
      Number(cashRegister.monto_inicial || 0) +
      Number(cashRegister.total_ventas || 0) +
      Number(cashRegister.total_ingresos || 0) -
      Number(cashRegister.total_egresos || 0)
    );
  }, [cashRegister]);

  const diferencia = useMemo(() => {
    if (mode !== 'close') return null;
    const raw = formData.efectivo_contado;
    if (raw === undefined || raw === null || String(raw).trim() === '') return null;

    const efectivoContado = Number(raw);
    if (Number.isNaN(efectivoContado)) return null;

    return efectivoContado - efectivoEsperado;
  }, [efectivoEsperado, formData.efectivo_contado, mode]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setErrors({});
      return;
    }

    setErrors({});

    if (mode === 'transaction') {
      setFormData((prev) => ({
        ...prev,
        monto: prev.monto ?? '',
        concepto: prev.concepto ?? '',
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      efectivo_contado: prev.efectivo_contado ?? '',
      observaciones: prev.observaciones ?? '',
    }));
  }, [isOpen, mode]);

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    if (mode === 'close') {
      const validation = validateCloseData({
        efectivo_contado: formData.efectivo_contado,
        observaciones: formData.observaciones,
      });

      setErrors(validation.errors || {});
      return validation.isValid;
    }

    const validation = validateTransaction({
      monto: formData.monto,
      concepto: formData.concepto,
    });

    const nextErrors = { ...(validation.errors || {}) };

    if (!transactionType) {
      nextErrors.tipo = 'El tipo de transacción es requerido';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const closeCashRegister = async (cashRegisterId, payload) => {
    setIsLoading(true);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      const closedCashRegister = {
        id: cashRegisterId,
        fecha_cierre: new Date().toISOString(),
        efectivo_contado: Number(payload.efectivo_contado),
        observaciones: payload.observaciones || '',
        diferencia: payload.diferencia ?? null,
      };

      if (onSuccess) {
        await onSuccess(closedCashRegister);
      }

      return { success: true, message: 'Caja cerrada exitosamente', data: closedCashRegister };
    } catch (err) {
      console.error('Error al cerrar caja:', err);
      return { success: false, message: 'Error al cerrar la caja' };
    } finally {
      setIsLoading(false);
    }
  };

  const addTransaction = async (cashRegisterId, payload) => {
    setIsLoading(true);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newTransaction = {
        id: Date.now(),
        caja_id: cashRegisterId,
        tipo: payload.tipo,
        monto: Number(payload.monto),
        concepto: payload.concepto,
        fecha: new Date().toISOString(),
      };

      if (onSuccess) {
        await onSuccess(newTransaction);
      }

      const label = payload.tipo === 'ingreso' ? 'Ingreso' : 'Egreso';
      return { success: true, message: `${label} registrado exitosamente`, data: newTransaction };
    } catch (err) {
      console.error('Error al registrar transacción:', err);
      return { success: false, message: 'Error al registrar la transacción' };
    } finally {
      setIsLoading(false);
    }
  };

  const buildPayload = () => {
    if (mode === 'close') {
      return {
        efectivo_contado: Number(formData.efectivo_contado),
        observaciones: (formData.observaciones || '').trim(),
        diferencia,
      };
    }

    return {
      tipo: transactionType,
      monto: Number(formData.monto),
      concepto: (formData.concepto || '').trim(),
    };
  };

  const handleSubmit = async () => {
    if (!cashRegister?.id) {
      return { success: false, message: 'No hay caja activa' };
    }

    if (!validate()) {
      return { success: false, errors };
    }

    const payload = buildPayload();

    if (mode === 'close') {
      const result = await closeCashRegister(cashRegister.id, payload);
      if (result?.success === true) {
        setFormData(initialFormData);
        setErrors({});
      }
      return result;
    }

    const result = await addTransaction(cashRegister.id, payload);
    if (result?.success === true) {
      setFormData((prev) => ({ ...prev, monto: '', concepto: '' }));
      setErrors({});
    }

    return result;
  };

  const isFormValid = () => {
    const hasErrors = errors && Object.values(errors).some(Boolean);

    if (mode === 'close') {
      return !hasErrors && String(formData.efectivo_contado || '').trim() !== '';
    }

    return (
      !hasErrors &&
      transactionType &&
      String(formData.monto || '').trim() !== '' &&
      String(formData.concepto || '').trim().length >= 3
    );
  };

  const title =
    mode === 'close' ? 'Cerrar Caja' : transactionType === 'ingreso' ? 'Agregar Ingreso' : 'Agregar Egreso';

  const description = mode === 'close' ? 'Registra el efectivo contado y cierra la caja' : 'Registra una transacción de efectivo';

  const submitText =
    mode === 'close'
      ? isLoading
        ? 'Cerrando...'
        : 'Cerrar Caja'
      : isLoading
        ? 'Registrando...'
        : transactionType === 'ingreso'
          ? 'Registrar Ingreso'
          : 'Registrar Egreso';

  return {
    formData,
    errors,
    isLoading,
    efectivoEsperado,
    diferencia,
    title,
    description,
    submitText,
    handleFieldChange,
    handleSubmit,
    isFormValid,
  };
};
