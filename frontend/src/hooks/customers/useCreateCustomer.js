import { useState } from 'react';
import { useCustomerValidation } from './useCustomerValidation';

export const useCreateCustomer = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateCustomerData } = useCustomerValidation();

  const createCustomer = async (customerData) => {
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

  return {
    createCustomer,
    isLoading,
    error
  };
};
