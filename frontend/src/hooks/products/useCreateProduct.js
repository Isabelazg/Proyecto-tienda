import { useState } from 'react';
import { useProductValidation } from './useProductValidation';

export const useCreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [productData, setProductData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria_id: '',
    imagen: '',
    estado: true
  });
  const { validateProductData } = useProductValidation();

  const handleFieldChange = (field, value) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo al cambiarlo
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const clearForm = () => {
    setProductData({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      categoria_id: '',
      imagen: '',
      estado: true
    });
    setErrors({});
  };

  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault();
    
    const validation = validateProductData(productData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setErrors({});

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Creating product:', productData);

      if (onSuccess) {
        await onSuccess();
      }

      clearForm();
      return { success: true, message: 'Producto creado exitosamente' };
    } catch (err) {
      console.error('Error creating product:', err);
      setErrors({ general: 'Error al crear el producto' });
      return { success: false, message: 'Error al crear el producto' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    productData,
    errors,
    isLoading,
    handleFieldChange,
    clearForm,
    handleSubmit
  };
};
