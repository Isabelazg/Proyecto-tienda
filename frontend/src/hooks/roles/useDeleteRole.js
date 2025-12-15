import { useState } from 'react';

export const useDeleteRole = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRole = async (roleId) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Deleting role:', roleId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Rol eliminado exitosamente' };
    } catch (err) {
      console.error('Error deleting role:', err);
      setError('Error al eliminar el rol');
      return { success: false, message: 'Error al eliminar el rol' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteRole,
    isLoading,
    error
  };
};
