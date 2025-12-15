export const useUserValidation = () => {
  const validateUserData = (data) => {
    const errors = {};

    // Validar nombre
    if (!data.nombre || data.nombre.trim() === '') {
      errors.nombre = 'El nombre es requerido';
    } else if (data.nombre.length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    } else if (data.nombre.length > 100) {
      errors.nombre = 'El nombre no puede exceder 100 caracteres';
    }

    // Validar email
    if (!data.email || data.email.trim() === '') {
      errors.email = 'El email es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        errors.email = 'El email no es válido';
      } else if (data.email.length > 100) {
        errors.email = 'El email no puede exceder 100 caracteres';
      }
    }

    // Validar password (solo en creación o si se proporciona)
    if (data.password !== undefined && data.password !== null && data.password !== '') {
      if (data.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
      } else if (data.password.length > 255) {
        errors.password = 'La contraseña no puede exceder 255 caracteres';
      }
    }

    // Validar role_id
    if (!data.role_id) {
      errors.role_id = 'El rol es requerido';
    } else if (typeof data.role_id !== 'number' || data.role_id < 1) {
      errors.role_id = 'El rol seleccionado no es válido';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return {
    validateUserData
  };
};
