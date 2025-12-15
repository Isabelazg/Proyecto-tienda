import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select/Select';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  ModalFooter 
} from '@/components/ui/modal/Modal';

export const CreateProductDialog = ({ 
  isOpen, 
  categories,
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria_id: '',
    imagen: '',
    estado: true,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria_id: '',
        imagen: '',
        estado: true,
      });
      setFormErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const errors = {};

    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    }

    if (!formData.precio || formData.precio <= 0) {
      errors.precio = 'El precio debe ser mayor a 0';
    }

    if (formData.stock === '' || formData.stock < 0) {
      errors.stock = 'El stock debe ser mayor o igual a 0';
    }

    if (!formData.categoria_id) {
      errors.categoria_id = 'La categoría es requerida';
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
        <ModalTitle>Crear Nuevo Producto</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej: Café Colombiano Premium"
            />
            {formErrors.nombre && (
              <p className="text-red-600 text-sm mt-1">{formErrors.nombre}</p>
            )}
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Descripción del producto"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="precio">Precio (COP) *</Label>
              <Input
                id="precio"
                type="number"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                placeholder="25000"
                min="0"
              />
              {formErrors.precio && (
                <p className="text-red-600 text-sm mt-1">{formErrors.precio}</p>
              )}
            </div>

            <div>
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="50"
                min="0"
              />
              {formErrors.stock && (
                <p className="text-red-600 text-sm mt-1">{formErrors.stock}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="categoria">Categoría *</Label>
            <Select
              id="categoria"
              value={formData.categoria_id}
              onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
            >
              <option value="">Seleccionar categoría</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </Select>
            {formErrors.categoria_id && (
              <p className="text-red-600 text-sm mt-1">{formErrors.categoria_id}</p>
            )}
          </div>

          <div>
            <Label htmlFor="imagen">URL de Imagen</Label>
            <Input
              id="imagen"
              value={formData.imagen}
              onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="estado"
              checked={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.checked })}
              className="w-4 h-4 text-lime-600 border-gray-300 rounded focus:ring-lime-500"
            />
            <Label htmlFor="estado" className="mb-0">Producto activo</Label>
          </div>
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
          Crear Producto
        </Button>
      </ModalFooter>
    </Modal>
  );
};
