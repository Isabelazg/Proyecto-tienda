import { useState } from 'react';
import { useCashRegisterValidation } from './useCashRegisterValidation';

export const useAddTransaction = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validateTransaction } = useCashRegisterValidation();

  const addTransaction = async (cashRegisterId, transactionData) => {
    const validation = validateTransaction(transactionData);
    
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Agregando transacción:', cashRegisterId, transactionData);

      // Simular creación de transacción
      const newTransaction = {
        id: Date.now(),
        caja_id: cashRegisterId,
        tipo: transactionData.tipo, // 'ingreso' o 'egreso'
        monto: Number(transactionData.monto),
        concepto: transactionData.concepto,
        fecha: new Date().toISOString()
      };

      if (onSuccess) {
        await onSuccess(newTransaction);
      }

      const transactionType = transactionData.tipo === 'ingreso' ? 'Ingreso' : 'Egreso';
      return { success: true, message: `${transactionType} registrado exitosamente`, data: newTransaction };
    } catch (err) {
      console.error('Error al registrar transacción:', err);
      setError('Error al registrar la transacción');
      return { success: false, message: 'Error al registrar la transacción' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addTransaction,
    isLoading,
    error
  };
};
