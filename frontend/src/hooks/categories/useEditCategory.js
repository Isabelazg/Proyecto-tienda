import { useEffect, useMemo, useState } from 'react';
import { useCategoryValidation } from './useCategoryValidation';

const buildInitialFormData = (category) => ({
  nombre: category?.nombre || '',
  descripcion: category?.descripcion || '',
  estado: category?.estado ?? true,
});

export const useEditCategory = ({ isOpen, category, onSuccess } = {}) => {
  const [formData, setFormData] = useState(buildInitialFormData(category));
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const { validateCategoryData } = useCategoryValidation();

  useEffect(() => {
    if (!isOpen) return;
    setFormData(buildInitialFormData(category));
    setErrors({});
    setError(null);
  }, [isOpen, category]);

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

  const updateCategory = async (categoryId, categoryData) => {
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

      console.log('Updating category:', categoryId, categoryData);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Categoría actualizada exitosamente' };
    } catch (err) {
      console.error('Error updating category:', err);
      setError('Error al actualizar la categoría');
      return { success: false, message: 'Error al actualizar la categoría' };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log('Deleting category:', categoryId);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Categoría eliminada exitosamente' };
    } catch (err) {
      console.error('Error deleting category:', err);
      setDeleteError('Error al eliminar la categoría');
      return { success: false, message: 'Error al eliminar la categoría' };
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async () => {
    const validation = validate(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    if (!category?.id) {
      return { success: false, message: 'Categoría inválida' };
    }

    const result = await updateCategory(category.id, formData);

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
    // edit dialog API
    formData,
    errors,
    isLoading,
    error,
    isFormValid,
    handleFieldChange,
    handleSubmit,

    // raw actions
    updateCategory,
    deleteCategory,
    isDeleting,
    deleteError,
  };
};
