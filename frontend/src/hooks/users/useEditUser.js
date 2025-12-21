import { useEffect, useMemo, useState } from 'react';
import { useUserValidation } from './useUserValidation';

const buildInitialFormData = (user) => ({
  nombre: user?.nombre || '',
  email: user?.email || '',
  password: '',
  role_id: user?.role?.id ?? 2,
  estado: user?.estado ?? true,
});

export const useEditUser = (arg) => {
  const options = typeof arg === 'function' ? { onSuccess: arg } : (arg || {});
  const { isOpen, user, onSuccess } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(buildInitialFormData(user));
  const [errors, setErrors] = useState({});
  const { validateUserData } = useUserValidation();

  useEffect(() => {
    if (!isOpen) return;
    setFormData(buildInitialFormData(user));
    setErrors({});
    setError(null);
  }, [isOpen, user]);

  const validate = (nextData) => {
    const validation = validateUserData(nextData);
    setErrors(validation.errors || {});
    return validation;
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      validate(next);
      return next;
    });
  };

  const updateUser = async (userId, userData) => {
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

      console.log('Updating user:', userId, userData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Usuario actualizado exitosamente' };
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Error al actualizar el usuario');
      return { success: false, message: 'Error al actualizar el usuario' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const validation = validate(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    if (!user?.id) {
      return { success: false, message: 'Usuario inválido' };
    }

    const result = await updateUser(user.id, formData);

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
      Number(formData?.role_id) > 0;

    return !hasErrors && Boolean(requiredFieldsFilled);
  }, [errors, formData]);

  return {
    updateUser,
    isLoading,
    error,
    formData,
    errors,
    isFormValid,
    handleFieldChange,
    handleSubmit,
  };
};
