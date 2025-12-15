export const useSaleValidation = () => {
  const validateSaleData = (data) => {
    const errors = {};

    // Validar items
    if (!data.items || data.items.length === 0) {
      errors.items = 'Debe agregar al menos un producto a la venta';
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

        // Validar stock disponible
        if (item.stock && item.cantidad > item.stock) {
          itemError.cantidad = `Stock insuficiente. Disponible: ${item.stock}`;
        }

        if (Object.keys(itemError).length > 0) {
          itemErrors[index] = itemError;
        }
      });

      if (itemErrors.length > 0) {
        errors.itemErrors = itemErrors;
      }
    }

    // Validar método de pago
    if (!data.metodo_pago_id) {
      errors.metodo_pago_id = 'El método de pago es requerido';
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

    // Validar mesero (opcional)
    if (data.mesero_id && typeof data.mesero_id !== 'string' && typeof data.mesero_id !== 'number') {
      errors.mesero_id = 'El ID del mesero es inválido';
    }

    // Validar cliente (opcional)
    if (data.cliente_id && typeof data.cliente_id !== 'string' && typeof data.cliente_id !== 'number') {
      errors.cliente_id = 'El ID del cliente es inválido';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateCartItem = (item, stock) => {
    const errors = {};

    if (!item.producto_id) {
      errors.producto_id = 'Producto inválido';
    }

    if (!item.cantidad || item.cantidad <= 0) {
      errors.cantidad = 'La cantidad debe ser mayor a 0';
    } else if (!Number.isInteger(item.cantidad)) {
      errors.cantidad = 'La cantidad debe ser un número entero';
    } else if (stock && item.cantidad > stock) {
      errors.cantidad = `Stock insuficiente. Disponible: ${stock}`;
    }

    if (!item.precio || item.precio <= 0) {
      errors.precio = 'El precio debe ser mayor a 0';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const validateSaleStatus = (currentStatus, newStatus) => {
    const validTransitions = {
      completada: ['anulada'],
      anulada: []
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

  const validateCancelSale = (sale) => {
    const errors = {};

    if (!sale) {
      errors.sale = 'Venta no encontrada';
      return {
        isValid: false,
        errors
      };
    }

    if (sale.estado === 'anulada') {
      errors.estado = 'La venta ya está anulada';
    }

    if (sale.estado !== 'completada') {
      errors.estado = 'Solo se pueden anular ventas completadas';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return {
    validateSaleData,
    validateCartItem,
    validateSaleStatus,
    validateCancelSale
  };
};
