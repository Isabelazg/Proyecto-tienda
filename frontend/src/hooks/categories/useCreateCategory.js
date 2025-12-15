import { useState } from 'react';
import { useCategoryValidation } from './useCategoryValidation';

export const useCreateCategory = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateCategoryData } = useCategoryValidation();

  const createCategory = async (categoryData) => {
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

      console.log('Creating category:', categoryData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Categoría creada exitosamente' };
    } catch (err) {
      console.error('Error creating category:', err);
      setError('Error al crear la categoría');
      return { success: false, message: 'Error al crear la categoría' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCategory,
    isLoading,
    error
  };
};
