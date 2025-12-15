import { useState } from 'react';
import { useRoleValidation } from './useRoleValidation';

export const useEditRole = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateRoleData } = useRoleValidation();

  const updateRole = async (roleId, roleData) => {
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

      console.log('Updating role:', roleId, roleData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Rol actualizado exitosamente' };
    } catch (err) {
      console.error('Error updating role:', err);
      setError('Error al actualizar el rol');
      return { success: false, message: 'Error al actualizar el rol' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateRole,
    isLoading,
    error
  };
};
