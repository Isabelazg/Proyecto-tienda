import { useState } from 'react';

export const useCancelSale = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelSale = async (ventaId) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch(`/api/ventas/${ventaId}/anular`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Error al anular la venta');
      // }

      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Canceling sale:', ventaId);

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

  const validateCancel = (sale) => {
    if (!sale) {
      return { isValid: false, error: 'Venta no encontrada' };
    }

    if (sale.estado === 'anulada') {
      return { isValid: false, error: 'La venta ya está anulada' };
    }

    if (sale.estado !== 'completada') {
      return { isValid: false, error: 'Solo se pueden anular ventas completadas' };
    }

    return { isValid: true };
  };

  return {
    cancelSale,
    validateCancel,
    isLoading,
    error
  };
};
