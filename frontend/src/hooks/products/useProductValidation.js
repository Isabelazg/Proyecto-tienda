export const useProductValidation = () => {
  const validateProductData = (data) => {
    const errors = {};

    // Validar nombre
    if (!data.nombre || data.nombre.trim() === '') {
      errors.nombre = 'El nombre es requerido';
    } else if (data.nombre.length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    } else if (data.nombre.length > 100) {
      errors.nombre = 'El nombre no puede exceder 100 caracteres';
    }

    // Validar descripción
    if (data.descripcion && data.descripcion.length > 255) {
      errors.descripcion = 'La descripción no puede exceder 255 caracteres';
    }

    // Validar precio
    if (!data.precio && data.precio !== 0) {
      errors.precio = 'El precio es requerido';
    } else if (isNaN(data.precio)) {
      errors.precio = 'El precio debe ser un número válido';
    } else if (parseFloat(data.precio) < 0) {
      errors.precio = 'El precio no puede ser negativo';
    }

    // Validar stock
    if (!data.stock && data.stock !== 0) {
      errors.stock = 'El stock es requerido';
    } else if (isNaN(data.stock)) {
      errors.stock = 'El stock debe ser un número válido';
    } else if (parseInt(data.stock) < 0) {
      errors.stock = 'El stock no puede ser negativo';
    } else if (!Number.isInteger(parseFloat(data.stock))) {
      errors.stock = 'El stock debe ser un número entero';
    }

    // Validar categoría
    if (!data.categoria_id) {
      errors.categoria_id = 'La categoría es requerida';
    }

    // Validar imagen (opcional, pero si está presente debe ser una URL válida)
    if (data.imagen && data.imagen.trim() !== '') {
      try {
        new URL(data.imagen);
      } catch (e) {
        errors.imagen = 'La URL de la imagen no es válida';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return {
    validateProductData
  };
};
