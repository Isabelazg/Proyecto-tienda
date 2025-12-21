import { useEffect, useMemo, useState } from 'react';
import { useCategoryValidation } from './useCategoryValidation';

const buildInitialFormData = () => ({
  nombre: '',
  descripcion: '',
  estado: true,
});

export const useCreateCategory = ({ isOpen, onSuccess } = {}) => {
  const [formData, setFormData] = useState(buildInitialFormData());
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { validateCategoryData } = useCategoryValidation();

  useEffect(() => {
    if (!isOpen) return;
    setFormData(buildInitialFormData());
    setErrors({});
    setError(null);
  }, [isOpen]);

  const validate = (nextData) => {
    const validation = validateCategoryData(nextData);
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

  const createCategory = async (categoryData) => {
    const validation = validateCategoryData(categoryData);

    if (!validation.isValid) {
      setErrors(validation.errors || {});
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log('Creating category:', categoryData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Categoría creada exitosamente' };
    } catch (err) {
      console.error('Error creating category:', err);
      setError('Error al crear la categoría');
      return { success: false, message: 'Error al crear la categoría' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const validation = validate(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const result = await createCategory(formData);

    if (result?.success === false && result?.errors) {
      setErrors(result.errors);
    }

    return result;
  };

  const isFormValid = useMemo(() => {
    const hasErrors = errors && Object.values(errors).some((err) => String(err || '').trim() !== '');
    const requiredFieldsFilled = formData?.nombre?.trim();
    return !hasErrors && Boolean(requiredFieldsFilled);
  }, [errors, formData]);

  return {
    formData,
    errors,
    isLoading,
    error,
    isFormValid,
    handleFieldChange,
    handleSubmit,
    createCategory,
  };
};
