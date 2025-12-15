import { useState } from 'react';
import { useCashRegisterValidation } from './useCashRegisterValidation';

export const useOpenCashRegister = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateOpenData } = useCashRegisterValidation();

  const openCashRegister = async (data) => {
    const validation = validateOpenData(data);
    
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Abriendo caja:', data);

      // Simular creación de nueva caja
      const newCashRegister = {
        id: Date.now(),
        usuario: 'Usuario Actual',
        fecha_apertura: new Date().toISOString(),
        fecha_cierre: null,
        monto_inicial: Number(data.monto_inicial),
        total_ventas: 0,
        total_ingresos: 0,
        total_egresos: 0,
        efectivo_esperado: Number(data.monto_inicial),
        efectivo_contado: null,
        diferencia: null,
        estado: 'abierta',
        transacciones: []
      };

      if (onSuccess) {
        await onSuccess(newCashRegister);
      }

      return { success: true, message: 'Caja abierta exitosamente', data: newCashRegister };
    } catch (err) {
      console.error('Error al abrir caja:', err);
      setError('Error al abrir la caja');
      return { success: false, message: 'Error al abrir la caja' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    openCashRegister,
    isLoading,
    error
  };
};
