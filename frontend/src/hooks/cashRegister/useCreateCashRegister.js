import { useEffect, useState } from 'react';
import { useCashRegisterValidation } from './useCashRegisterValidation';

const initialFormData = {
  monto_inicial: '',
  notas: '',
};

export const useCreateCashRegister = ({ isOpen, onSuccess } = {}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { validateOpenData } = useCashRegisterValidation();

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      return;
    }

    setFormData(initialFormData);
    setErrors({});
  }, [isOpen]);

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const validation = validateOpenData({ monto_inicial: formData.monto_inicial });
    setErrors(validation.errors || {});
    return validation.isValid;
  };

  const openCashRegister = async (payload) => {
    setIsLoading(true);
    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newCashRegister = {
        id: Date.now(),
        usuario: 'Usuario Actual',
        fecha_apertura: new Date().toISOString(),
        fecha_cierre: null,
        monto_inicial: Number(payload.monto_inicial),
        total_ventas: 0,
        total_ingresos: 0,
        total_egresos: 0,
        efectivo_esperado: Number(payload.monto_inicial),
        efectivo_contado: null,
        diferencia: null,
        estado: 'abierta',
        transacciones: [],
      };

      if (onSuccess) {
        await onSuccess(newCashRegister);
      }

      return { success: true, message: 'Caja abierta exitosamente', data: newCashRegister };
    } catch (err) {
      console.error('Error al abrir caja:', err);
      return { success: false, message: 'Error al abrir la caja' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return { success: false, errors };
    }

    const payload = {
      monto_inicial: Number(formData.monto_inicial),
      notas: (formData.notas || '').trim(),
    };

    const result = await openCashRegister(payload);

    if (result?.success === true) {
      setFormData(initialFormData);
      setErrors({});
    } else if (result?.errors) {
      setErrors(result.errors);
    }

    return result;
  };

  const isFormValid = () => {
    const hasErrors = errors && Object.values(errors).some(Boolean);
    return !hasErrors && String(formData.monto_inicial || '').trim() !== '';
  };

  return {
    formData,
    errors,
    isLoading,
    handleFieldChange,
    handleSubmit,
    isFormValid,
  };
};
