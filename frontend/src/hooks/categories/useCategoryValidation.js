export const useCategoryValidation = () => {
  const validateCategoryData = (data) => {
    const errors = {};

    // Validar nombre
    if (!data.nombre || data.nombre.trim() === '') {
      errors.nombre = 'El nombre es requerido';
    } else if (data.nombre.length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    } else if (data.nombre.length > 50) {
      errors.nombre = 'El nombre no puede exceder 50 caracteres';
    }

    // Validar descripción
    if (data.descripcion && data.descripcion.length > 200) {
      errors.descripcion = 'La descripción no puede exceder 200 caracteres';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return {
    validateCategoryData
  };
};
