export const useCustomerValidation = () => {
  const validateCustomerData = (data) => {
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

    // Validar teléfono
    if (!data.telefono || data.telefono.trim() === '') {
      errors.telefono = 'El teléfono es requerido';
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(data.telefono.replace(/\s/g, ''))) {
        errors.telefono = 'El teléfono debe tener 10 dígitos';
      }
    }

    // Validar documento
    if (!data.documento || data.documento.trim() === '') {
      errors.documento = 'El documento es requerido';
    } else if (data.documento.length < 6) {
      errors.documento = 'El documento debe tener al menos 6 caracteres';
    } else if (data.documento.length > 20) {
      errors.documento = 'El documento no puede exceder 20 caracteres';
    }

    // Validar tipo de documento
    if (!data.tipo_documento || String(data.tipo_documento).trim() === '') {
      errors.tipo_documento = 'El tipo de documento es requerido';
    }

    // Validar dirección (opcional)
    if (data.direccion && data.direccion.length > 200) {
      errors.direccion = 'La dirección no puede exceder 200 caracteres';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return {
    validateCustomerData
  };
};
