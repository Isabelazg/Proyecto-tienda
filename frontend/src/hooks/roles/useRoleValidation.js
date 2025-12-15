export const useRoleValidation = () => {
  const validateRoleData = (data) => {
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
    if (!data.descripcion || data.descripcion.trim() === '') {
      errors.descripcion = 'La descripción es requerida';
    } else if (data.descripcion.length < 10) {
      errors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    } else if (data.descripcion.length > 200) {
      errors.descripcion = 'La descripción no puede exceder 200 caracteres';
    }

    // Validar permisos
    if (!data.permisos || !Array.isArray(data.permisos)) {
      errors.permisos = 'Los permisos son requeridos';
    } else if (data.permisos.length === 0) {
      errors.permisos = 'Debe seleccionar al menos un permiso';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return {
    validateRoleData
  };
};
