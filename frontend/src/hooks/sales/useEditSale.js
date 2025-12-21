import { useState } from 'react';
import { useSaleValidation } from './useSaleValidation';

export const useEditSale = ({ onSuccess } = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { validateCancelSale } = useSaleValidation();

  const cancelSale = async (sale) => {
    const validation = validateCancelSale(sale);

    if (!validation.isValid) {
      const message =
        validation.errors?.estado ||
        validation.errors?.sale ||
        'No se puede anular la venta';
      setError(message);
      return { success: false, message };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log('Canceling sale:', sale.venta_id);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Venta anulada exitosamente' };
    } catch (err) {
      console.error('Error canceling sale:', err);
      const errorMessage = err.message || 'Error al anular la venta';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cancelSale,
    isLoading,
    error,
  };
};
