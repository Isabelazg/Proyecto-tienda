import { useState } from 'react';

export const useDeleteProduct = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProduct = async (productId) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Deleting product:', productId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Producto eliminado exitosamente' };
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error al eliminar el producto');
      return { success: false, message: 'Error al eliminar el producto' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteProduct,
    isLoading,
    error
  };
};
