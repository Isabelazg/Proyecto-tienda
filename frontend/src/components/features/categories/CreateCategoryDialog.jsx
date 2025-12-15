import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal/Modal';

export const CreateCategoryDialog = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: true,
  });
  const [formErrors, setFormErrors] = useState({});

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
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      estado: true,
    });
    setFormErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalHeader onClose={handleClose}>
        <ModalTitle>Crear Nueva Categoría</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre de la Categoría *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej: Bebidas, Comida, Postres"
              autoFocus
            />
            {formErrors.nombre && (
              <p className="text-red-600 text-sm mt-1">{formErrors.nombre}</p>
            )}
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción *</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Describe el tipo de productos que incluye esta categoría"
              rows={4}
            />
            {formErrors.descripcion && (
              <p className="text-red-600 text-sm mt-1">{formErrors.descripcion}</p>
            )}
          </div>
        </form>
      </ModalBody>

      <ModalFooter>
        <Button onClick={handleClose} variant="ghost">
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-black text-white hover:bg-gray-900"
        >
          Crear Categoría
        </Button>
      </ModalFooter>
    </Modal>
  );
};
