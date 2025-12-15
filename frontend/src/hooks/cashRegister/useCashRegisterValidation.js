export const useCashRegisterValidation = () => {
  const validateOpenData = (data) => {
    const errors = {};

    // Validar monto inicial
    if (data.monto_inicial === undefined || data.monto_inicial === null || data.monto_inicial === '') {
      errors.monto_inicial = 'El monto inicial es requerido';
    } else if (isNaN(data.monto_inicial)) {
      errors.monto_inicial = 'El monto inicial debe ser un número válido';
    } else if (Number(data.monto_inicial) < 0) {
      errors.monto_inicial = 'El monto inicial debe ser mayor o igual a 0';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateCloseData = (data) => {
    const errors = {};

    // Validar efectivo contado
    if (data.efectivo_contado === undefined || data.efectivo_contado === null || data.efectivo_contado === '') {
      errors.efectivo_contado = 'El efectivo contado es requerido';
    } else if (isNaN(data.efectivo_contado)) {
      errors.efectivo_contado = 'El efectivo contado debe ser un número válido';
    } else if (Number(data.efectivo_contado) < 0) {
      errors.efectivo_contado = 'El efectivo contado debe ser mayor o igual a 0';
    }

    // Validar observaciones (opcional pero si existe, validar longitud)
    if (data.observaciones && data.observaciones.length > 500) {
      errors.observaciones = 'Las observaciones no pueden exceder 500 caracteres';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateTransaction = (data) => {
    const errors = {};

    // Validar monto
    if (data.monto === undefined || data.monto === null || data.monto === '') {
      errors.monto = 'El monto es requerido';
    } else if (isNaN(data.monto)) {
      errors.monto = 'El monto debe ser un número válido';
    } else if (Number(data.monto) <= 0) {
      errors.monto = 'El monto debe ser mayor a 0';
    }

    // Validar concepto
    if (!data.concepto || data.concepto.trim() === '') {
      errors.concepto = 'El concepto es requerido';
    } else if (data.concepto.length < 3) {
      errors.concepto = 'El concepto debe tener al menos 3 caracteres';
    } else if (data.concepto.length > 200) {
      errors.concepto = 'El concepto no puede exceder 200 caracteres';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return {
    validateOpenData,
    validateCloseData,
    validateTransaction
  };
};
