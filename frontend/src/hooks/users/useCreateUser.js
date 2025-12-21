import { useEffect, useMemo, useState } from 'react';
import { useUserValidation } from './useUserValidation';

const buildInitialFormData = () => ({
  nombre: '',
  email: '',
  password: '',
  role_id: 2,
  estado: true,
});

export const useCreateUser = (arg) => {
  const options = typeof arg === 'function' ? { onSuccess: arg } : (arg || {});
  const { isOpen, onSuccess } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(buildInitialFormData());
  const [errors, setErrors] = useState({});
  const { validateUserData } = useUserValidation();

  useEffect(() => {
    if (!isOpen) return;
    setFormData(buildInitialFormData());
    setErrors({});
    setError(null);
  }, [isOpen]);

  const validate = (nextData) => {
    const baseValidation = validateUserData(nextData);
    const nextErrors = { ...(baseValidation.errors || {}) };

    if (!String(nextData?.password || '')) {
      nextErrors.password = 'La contraseña es requerida';
    }

    const isValid = Object.keys(nextErrors).length === 0;
    setErrors(nextErrors);
    return { isValid, errors: nextErrors };
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      validate(next);
      return next;
    });
  };

  const createUser = async (userData) => {
    const validation = validateUserData(userData);
    
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Creating user:', userData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Usuario creado exitosamente' };
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Error al crear el usuario');
      return { success: false, message: 'Error al crear el usuario' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const validation = validate(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const result = await createUser(formData);

    if (result?.success === false && result?.errors) {
      setErrors(result.errors);
    }

    return result;
  };

  const isFormValid = useMemo(() => {
    const hasErrors =
      errors &&
      Object.values(errors).some((errValue) => String(errValue || '').trim() !== '');

    const requiredFieldsFilled =
      formData?.nombre?.trim() &&
      formData?.email?.trim() &&
      String(formData?.password || '').trim() &&
      Number(formData?.role_id) > 0;

    return !hasErrors && Boolean(requiredFieldsFilled);
  }, [errors, formData]);

  return {
    createUser,
    isLoading,
    error,
    formData,
    errors,
    isFormValid,
    handleFieldChange,
    handleSubmit,
  };
};
