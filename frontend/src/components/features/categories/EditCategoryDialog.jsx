import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal/Modal';
import { FormInput, FormTextarea } from '@/components/common';

export const EditCategoryDialog = ({ 
  isOpen, 
  category, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: true,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({
        nombre: category.nombre,
        descripcion: category.descripcion,
        estado: category.estado,
      });
    }
    setFormErrors({});
  }, [category, isOpen]);

  const validateForm = () => {
    const errors = {};

    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    }

    if (!formData.descripcion.trim()) {
      errors.descripcion = 'La descripción es requerida';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>Editar Categoría</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            id="nombre"
            label="Nombre de la Categoría"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Ej: Bebidas, Comida, Postres"
            required
            error={formErrors.nombre}
            autoFocus
          />

          <FormTextarea
            id="descripcion"
            label="Descripción"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            placeholder="Describe el tipo de productos que incluye esta categoría"
            required
            error={formErrors.descripcion}
            rows={4}
          />
        </form>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose} variant="ghost">
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-black text-white hover:bg-gray-900"
        >
          Guardar Cambios
        </Button>
      </ModalFooter>
    </Modal>
  );
};
