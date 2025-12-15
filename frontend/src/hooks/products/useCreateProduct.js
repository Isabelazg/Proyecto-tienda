import { useState } from 'react';
import { useProductValidation } from './useProductValidation';

export const useCreateProduct = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateProductData } = useProductValidation();

  const createProduct = async (productData) => {
    const validation = validateProductData(productData);
    
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Creating product:', productData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Producto creado exitosamente' };
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Error al crear el producto');
      return { success: false, message: 'Error al crear el producto' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProduct,
    isLoading,
    error
  };
};
