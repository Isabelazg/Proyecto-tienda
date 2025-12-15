import { useState } from 'react';
import { useCashRegisterValidation } from './useCashRegisterValidation';

export const useCloseCashRegister = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateCloseData } = useCashRegisterValidation();

  const closeCashRegister = async (cashRegisterId, data) => {
    const validation = validateCloseData(data);
    
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Cerrando caja:', cashRegisterId, data);

      // Simular cierre de caja
      const closedCashRegister = {
        id: cashRegisterId,
        fecha_cierre: new Date().toISOString(),
        efectivo_contado: Number(data.efectivo_contado),
        observaciones: data.observaciones || '',
      };

      if (onSuccess) {
        await onSuccess(closedCashRegister);
      }

      return { success: true, message: 'Caja cerrada exitosamente', data: closedCashRegister };
    } catch (err) {
      console.error('Error al cerrar caja:', err);
      setError('Error al cerrar la caja');
      return { success: false, message: 'Error al cerrar la caja' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    closeCashRegister,
    isLoading,
    error
  };
};
