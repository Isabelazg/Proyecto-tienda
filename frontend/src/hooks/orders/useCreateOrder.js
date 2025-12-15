import { useState } from 'react';
import { useOrderValidation } from './useOrderValidation';

export const useCreateOrder = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateOrderData } = useOrderValidation();

  const createOrder = async (orderData) => {
    const validation = validateOrderData(orderData);
    
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Creating order:', orderData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Pedido creado exitosamente' };
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Error al crear el pedido');
      return { success: false, message: 'Error al crear el pedido' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createOrder,
    isLoading,
    error
  };
};
