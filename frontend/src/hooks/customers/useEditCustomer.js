import { useState } from 'react';
import { useCustomerValidation } from './useCustomerValidation';

export const useEditCustomer = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateCustomerData } = useCustomerValidation();

  const updateCustomer = async (customerId, customerData) => {
    const validation = validateCustomerData(customerData);
    
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

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

  return {
    updateCustomer,
    isLoading,
    error
  };
};
