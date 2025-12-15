import { useState } from 'react';
import { useCategoryValidation } from './useCategoryValidation';

export const useEditCategory = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateCategoryData } = useCategoryValidation();

  const updateCategory = async (categoryId, categoryData) => {
    const validation = validateCategoryData(categoryData);
    
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Updating category:', categoryId, categoryData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Categoría actualizada exitosamente' };
    } catch (err) {
      console.error('Error updating category:', err);
      setError('Error al actualizar la categoría');
      return { success: false, message: 'Error al actualizar la categoría' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateCategory,
    isLoading,
    error
  };
};
