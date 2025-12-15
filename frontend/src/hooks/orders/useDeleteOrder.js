import { useState } from 'react';

export const useDeleteOrder = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteOrder = async (orderId) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Deleting order:', orderId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Pedido eliminado exitosamente' };
    } catch (err) {
      console.error('Error deleting order:', err);
      setError('Error al eliminar el pedido');
      return { success: false, message: 'Error al eliminar el pedido' };
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Canceling order:', orderId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Pedido cancelado exitosamente' };
    } catch (err) {
      console.error('Error canceling order:', err);
      setError('Error al cancelar el pedido');
      return { success: false, message: 'Error al cancelar el pedido' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteOrder,
    cancelOrder,
    isLoading,
    error
  };
};
