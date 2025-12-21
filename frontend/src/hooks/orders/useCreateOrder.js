import { useEffect, useMemo, useState } from 'react';
import { useOrderValidation } from './useOrderValidation';

export const useCreateOrder = ({ isOpen, products = [], onSuccess } = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    mesa_id: '',
    items: [],
    notas: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});

  const { validateOrderData } = useOrderValidation();

  const clearForm = () => {
    setFormData({ mesa_id: '', items: [], notas: '' });
    setErrors({});
    setSearchTerm('');
  };

  useEffect(() => {
    if (!isOpen) return;
    clearForm();
  }, [isOpen]);

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

  const createOrder = async (orderData) => {
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

  const handleSubmit = async (e, submitOnSuccess) => {
    e.preventDefault();

    if (!validate()) {
      return { success: false };
    }

    const payload = buildOrderData();
    const result = await createOrder(payload);

    if (result?.success === true) {
      if (submitOnSuccess) {
        await submitOnSuccess(result);
      }
      clearForm();
    }

    return result;
  };

  const isFormValid = Boolean(formData.mesa_id) && formData.items.length > 0;

  return {
    createOrder,
    isLoading,
    error,
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
