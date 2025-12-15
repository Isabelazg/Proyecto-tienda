import { useState } from 'react';

export const useDeleteUser = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (userId) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Deleting user:', userId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Usuario eliminado exitosamente' };
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Error al eliminar el usuario');
      return { success: false, message: 'Error al eliminar el usuario' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteUser,
    isLoading,
    error
  };
};
