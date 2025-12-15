export const useOrderValidation = () => {
  const validateOrderData = (data) => {
    const errors = {};

    // Validar mesa
    if (!data.mesa_id) {
      errors.mesa_id = 'La mesa es requerida';
    }

    // Validar mesero
    if (!data.mesero || data.mesero.trim() === '') {
      errors.mesero = 'El nombre del mesero es requerido';
    } else if (data.mesero.length < 2) {
      errors.mesero = 'El nombre del mesero debe tener al menos 2 caracteres';
    } else if (data.mesero.length > 100) {
      errors.mesero = 'El nombre del mesero no puede exceder 100 caracteres';
    }

    // Validar items
    if (!data.items || data.items.length === 0) {
      errors.items = 'Debe agregar al menos un producto al pedido';
    } else {
      // Validar cada item
      const itemErrors = [];
      data.items.forEach((item, index) => {
        const itemError = {};

        if (!item.producto_id) {
          itemError.producto_id = 'El producto es requerido';
        }

        if (!item.cantidad || item.cantidad <= 0) {
          itemError.cantidad = 'La cantidad debe ser mayor a 0';
        } else if (!Number.isInteger(item.cantidad)) {
          itemError.cantidad = 'La cantidad debe ser un número entero';
        }

        if (!item.precio || item.precio <= 0) {
          itemError.precio = 'El precio debe ser mayor a 0';
        }

        if (Object.keys(itemError).length > 0) {
          itemErrors[index] = itemError;
        }
      });

      if (itemErrors.length > 0) {
        errors.itemErrors = itemErrors;
      }
    }

    // Validar estado (si se proporciona)
    const validStates = ['pendiente', 'en_preparacion', 'entregado', 'pagado', 'cancelado'];
    if (data.estado && !validStates.includes(data.estado)) {
      errors.estado = 'Estado inválido';
    }

    // Validar notas (opcional)
    if (data.notas && data.notas.length > 500) {
      errors.notas = 'Las notas no pueden exceder 500 caracteres';
    }

    // Validar total
    if (data.items && data.items.length > 0) {
      const calculatedTotal = data.items.reduce((sum, item) => {
        return sum + (item.cantidad * item.precio);
      }, 0);

      if (data.total && Math.abs(data.total - calculatedTotal) > 0.01) {
        errors.total = 'El total no coincide con la suma de los items';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateOrderStatus = (currentStatus, newStatus) => {
    const validTransitions = {
      pendiente: ['en_preparacion', 'cancelado'],
      en_preparacion: ['entregado', 'cancelado'],
      entregado: ['pagado'],
      pagado: [],
      cancelado: []
    };

    const allowedStates = validTransitions[currentStatus] || [];
    
    if (!allowedStates.includes(newStatus)) {
      return {
        isValid: false,
        error: `No se puede cambiar de '${currentStatus}' a '${newStatus}'`
      };
    }

    return {
      isValid: true
    };
  };

  return {
    validateOrderData,
    validateOrderStatus
  };
};
