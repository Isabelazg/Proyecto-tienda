import { useState } from 'react';
import { useRoleValidation } from './useRoleValidation';

export const useCreateRole = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateRoleData } = useRoleValidation();

  const createRole = async (roleData) => {
    const validation = validateRoleData(roleData);
    
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Creating role:', roleData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Rol creado exitosamente' };
    } catch (err) {
      console.error('Error creating role:', err);
      setError('Error al crear el rol');
      return { success: false, message: 'Error al crear el rol' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createRole,
    isLoading,
    error
  };
};
