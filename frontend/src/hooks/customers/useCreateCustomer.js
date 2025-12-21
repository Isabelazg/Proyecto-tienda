import { useEffect, useMemo, useState } from 'react';
import { useCustomerValidation } from './useCustomerValidation';

const buildInitialFormData = () => ({
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  documento: '',
  tipo_documento: 'CC',
  estado: true,
});

export const useCreateCustomer = ({ isOpen, onSuccess } = {}) => {
  const [formData, setFormData] = useState(buildInitialFormData());
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { validateCustomerData } = useCustomerValidation();

  useEffect(() => {
    if (!isOpen) return;
    setFormData(buildInitialFormData());
    setErrors({});
    setError(null);
  }, [isOpen]);

  const validate = (nextData) => {
    const validation = validateCustomerData(nextData);
    setErrors(validation.errors || {});
    return validation;
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      validate(next);
      return next;
    });
  };

  const createCustomer = async (customerData) => {
    const validation = validateCustomerData(customerData);

    if (!validation.isValid) {
      setErrors(validation.errors || {});
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log('Creating customer:', customerData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Cliente creado exitosamente' };
    } catch (err) {
      console.error('Error creating customer:', err);
      setError('Error al crear el cliente');
      return { success: false, message: 'Error al crear el cliente' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const validation = validate(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const result = await createCustomer(formData);

    if (result?.success === false && result?.errors) {
      setErrors(result.errors);
    }

    return result;
  };

  const isFormValid = useMemo(() => {
    const hasErrors = errors && Object.values(errors).some((err) => String(err || '').trim() !== '');

    const requiredFieldsFilled =
      formData?.nombre?.trim() &&
      formData?.email?.trim() &&
      formData?.telefono?.trim() &&
      formData?.documento?.trim() &&
      String(formData?.tipo_documento || '').trim();

    return !hasErrors && Boolean(requiredFieldsFilled);
  }, [errors, formData]);

  return {
    formData,
    errors,
    isLoading,
    error,
    isFormValid,
    handleFieldChange,
    handleSubmit,
    createCustomer,
  };
};
