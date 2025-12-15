import { useState } from 'react';

export const useDeleteCategory = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCategory = async (categoryId) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Deleting category:', categoryId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Categoría eliminada exitosamente' };
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Error al eliminar la categoría');
      return { success: false, message: 'Error al eliminar la categoría' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteCategory,
    isLoading,
    error
  };
};
