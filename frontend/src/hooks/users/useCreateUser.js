import { useState } from 'react';
import { useUserValidation } from './useUserValidation';

export const useCreateUser = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateUserData } = useUserValidation();

  const createUser = async (userData) => {
    const validation = validateUserData(userData);
    
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Creating user:', userData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Usuario creado exitosamente' };
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Error al crear el usuario');
      return { success: false, message: 'Error al crear el usuario' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUser,
    isLoading,
    error
  };
};
