import { useState } from 'react';

export const useDeleteCustomer = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCustomer = async (customerId) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Deleting customer:', customerId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Cliente eliminado exitosamente' };
    } catch (err) {
      console.error('Error deleting customer:', err);
      setError('Error al eliminar el cliente');
      return { success: false, message: 'Error al eliminar el cliente' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteCustomer,
    isLoading,
    error
  };
};
