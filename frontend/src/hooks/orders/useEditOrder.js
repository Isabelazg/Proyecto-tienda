import { useState } from 'react';
import { useOrderValidation } from './useOrderValidation';

export const useEditOrder = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateOrderData, validateOrderStatus } = useOrderValidation();

  const updateOrder = async (orderId, orderData) => {
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

      console.log('Updating order:', orderId, orderData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Pedido actualizado exitosamente' };
    } catch (err) {
      console.error('Error updating order:', err);
      setError('Error al actualizar el pedido');
      return { success: false, message: 'Error al actualizar el pedido' };
    } finally {
      setIsLoading(false);
    }
  };

  const changeOrderStatus = async (orderId, currentStatus, newStatus) => {
    const validation = validateOrderStatus(currentStatus, newStatus);
    
    if (!validation.isValid) {
      setError(validation.error);
      return { success: false, message: validation.error };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Changing order status:', orderId, 'from', currentStatus, 'to', newStatus);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Estado actualizado exitosamente' };
    } catch (err) {
      console.error('Error changing order status:', err);
      setError('Error al cambiar el estado del pedido');
      return { success: false, message: 'Error al cambiar el estado del pedido' };
    } finally {
      setIsLoading(false);
    }
  };

  const sendOrderToCashier = async (orderId) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Sending order to cashier:', orderId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Pedido enviado a caja exitosamente' };
    } catch (err) {
      console.error('Error sending order to cashier:', err);
      setError('Error al enviar el pedido a caja');
      return { success: false, message: 'Error al enviar el pedido a caja' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateOrder,
    changeOrderStatus,
    sendOrderToCashier,
    isLoading,
    error
  };
};
