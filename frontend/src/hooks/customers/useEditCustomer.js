import { useEffect, useMemo, useState } from 'react';
import { useCustomerValidation } from './useCustomerValidation';

const buildInitialFormData = (customer) => ({
  nombre: customer?.nombre || '',
  email: customer?.email || '',
  telefono: customer?.telefono || '',
  direccion: customer?.direccion || '',
  documento: customer?.documento || '',
  tipo_documento: customer?.tipo_documento || 'CC',
  estado: customer?.estado ?? true,
});

export const useEditCustomer = ({ isOpen, customer, onSuccess } = {}) => {
  const [formData, setFormData] = useState(buildInitialFormData(customer));
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const { validateCustomerData } = useCustomerValidation();

  useEffect(() => {
    if (!isOpen) return;
    setFormData(buildInitialFormData(customer));
    setErrors({});
    setError(null);
  }, [isOpen, customer]);

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

  const updateCustomer = async (customerId, customerData) => {
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

      console.log('Updating customer:', customerId, customerData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Cliente actualizado exitosamente' };
    } catch (err) {
      console.error('Error updating customer:', err);
      setError('Error al actualizar el cliente');
      return { success: false, message: 'Error al actualizar el cliente' };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCustomer = async (customerId) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log('Deleting customer:', customerId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Cliente eliminado exitosamente' };
    } catch (err) {
      console.error('Error deleting customer:', err);
      setDeleteError('Error al eliminar el cliente');
      return { success: false, message: 'Error al eliminar el cliente' };
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async () => {
    const validation = validate(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    if (!customer?.id) {
      return { success: false, message: 'Cliente inválido' };
    }

    const result = await updateCustomer(customer.id, formData);

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
    // edit dialog API
    formData,
    errors,
    isLoading,
    error,
    isFormValid,
    handleFieldChange,
    handleSubmit,

    // raw actions
    updateCustomer,
    deleteCustomer,
    isDeleting,
    deleteError,
  };
};
