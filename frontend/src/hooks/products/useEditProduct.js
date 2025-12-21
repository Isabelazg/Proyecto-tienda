import { useState } from 'react';
import { useProductValidation } from './useProductValidation';

export const useEditProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [errors, setErrors] = useState({});
  const [productData, setProductData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria_id: '',
    imagen: '',
    estado: true
  });
  const { validateProductData } = useProductValidation();

  const handleFieldChange = (field, value) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo al cambiarlo
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const openDialog = (product) => {
    if (product) {
      setProductData({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio || '',
        stock: product.stock || '',
        categoria_id: product.categoria_id || '',
        imagen: product.imagen || '',
        estado: product.estado ?? true,
        id: product.id
      });
    }
    setErrors({});
  };

  const closeDialog = () => {
    setProductData({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      categoria_id: '',
      imagen: '',
      estado: true
    });
    setErrors({});
  };

  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault();
    
    const validation = validateProductData(productData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setIsLoading(true);
    setErrors({});

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Updating product:', productData.id, productData);

      if (onSuccess) {
        await onSuccess();
      }

      closeDialog();
      return { success: true, message: 'Producto actualizado exitosamente' };
    } catch (err) {
      console.error('Error updating product:', err);
      setErrors({ general: 'Error al actualizar el producto' });
      return { success: false, message: 'Error al actualizar el producto' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (product, e, onSuccess) => {
    if (e) e.preventDefault();

    setIsDeleting(true);
    setDeleteError(null);

    try {
      // TODO: Reemplazar con llamada real a la API
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log('Deleting product:', product.id);

      if (onSuccess) {
        await onSuccess();
      }

      return { success: true, message: 'Producto eliminado exitosamente' };
    } catch (err) {
      console.error('Error deleting product:', err);
      setDeleteError('Error al eliminar el producto');
      return { success: false, message: 'Error al eliminar el producto' };
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    productData,
    errors,
    isLoading,
    isDeleting,
    deleteError,
    handleFieldChange,
    openDialog,
    closeDialog,
    handleSubmit,
    handleDelete
  };
};
