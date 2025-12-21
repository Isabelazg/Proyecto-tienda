import { useEffect, useMemo, useState } from 'react';
import { useOrderValidation } from './useOrderValidation';

export const useEditOrder = ({ isOpen, order = null, products = [], onSuccess } = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const [formData, setFormData] = useState({
    mesa_id: '',
    items: [],
    notas: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});

  const { validateOrderData, validateOrderStatus } = useOrderValidation();

  const clearForm = () => {
    setFormData({ mesa_id: '', items: [], notas: '' });
    setErrors({});
    setSearchTerm('');
  };

  useEffect(() => {
    if (!isOpen) return;

    if (!order) {
      clearForm();
      return;
    }

    setFormData({
      mesa_id: order.mesa_id ? String(order.mesa_id) : '',
      items: (order.items || []).map((item) => ({
        producto_id: item.producto_id,
        nombre: item.producto,
        precio: item.precio,
        cantidad: item.cantidad,
      })),
      notas: order.notas || '',
    });
    setErrors({});
    setSearchTerm('');
  }, [isOpen, order]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return (products || []).filter((product) => product?.nombre?.toLowerCase().includes(term));
  }, [products, searchTerm]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const addProduct = (product) => {
    if (!product) return;

    setFormData((prev) => {
      const existingItem = prev.items.find((item) => item.producto_id === product.id);

      if (existingItem) {
        return {
          ...prev,
          items: prev.items.map((item) =>
            item.producto_id === product.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        };
      }

      return {
        ...prev,
        items: [
          ...prev.items,
          {
            producto_id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: 1,
          },
        ],
      };
    });

    if (errors.items) {
      setErrors((prev) => ({ ...prev, items: '' }));
    }
  };

  const removeProduct = (producto_id) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.producto_id !== producto_id),
    }));
  };

  const updateQuantity = (producto_id, cantidad) => {
    if (cantidad <= 0) {
      removeProduct(producto_id);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.producto_id === producto_id ? { ...item, cantidad } : item
      ),
    }));
  };

  const total = useMemo(() => {
    return formData.items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }, [formData.items]);

  const validate = () => {
    const nextErrors = {};

    if (!formData.mesa_id) {
      nextErrors.mesa_id = 'Debes seleccionar una mesa';
    }

    if (!formData.items || formData.items.length === 0) {
      nextErrors.items = 'Debes agregar al menos un producto';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildOrderData = () => ({
    ...formData,
    mesa_id: parseInt(formData.mesa_id, 10),
    total,
  });

  const updateOrder = async (orderId, orderData) => {
    const validation = validateOrderData(orderData);

    if (!validation.isValid) {
      setErrors(validation.errors || {});
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

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

  const handleSubmit = async (e, submitOnSuccess) => {
    e.preventDefault();

    if (!order?.id) {
      return { success: false, message: 'Pedido inválido' };
    }

    if (!validate()) {
      return { success: false };
    }

    const payload = buildOrderData();
    const result = await updateOrder(order.id, payload);

    if (result?.success === true) {
      if (submitOnSuccess) {
        await submitOnSuccess(result);
      }
      clearForm();
    }

    return result;
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
      await new Promise((resolve) => setTimeout(resolve, 500));

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
      await new Promise((resolve) => setTimeout(resolve, 500));

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

  const deleteOrder = async (orderId) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log('Deleting order:', orderId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Pedido eliminado exitosamente' };
    } catch (err) {
      console.error('Error deleting order:', err);
      setDeleteError('Error al eliminar el pedido');
      return { success: false, message: 'Error al eliminar el pedido' };
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelOrder = async (orderId) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log('Canceling order:', orderId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Pedido cancelado exitosamente' };
    } catch (err) {
      console.error('Error canceling order:', err);
      setDeleteError('Error al cancelar el pedido');
      return { success: false, message: 'Error al cancelar el pedido' };
    } finally {
      setIsDeleting(false);
    }
  };

  const isFormValid = Boolean(formData.mesa_id) && formData.items.length > 0;

  return {
    updateOrder,
    changeOrderStatus,
    sendOrderToCashier,
    deleteOrder,
    cancelOrder,
    isLoading,
    error,
    isDeleting,
    deleteError,
    orderData: formData,
    errors,
    isFormValid,
    searchTerm,
    setSearchTerm,
    filteredProducts,
    handleFieldChange,
    addProduct,
    removeProduct,
    updateQuantity,
    total,
    handleSubmit,
  };
};
