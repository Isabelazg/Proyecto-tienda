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

export const EditCustomerDialog = ({ 
  isOpen, 
  customer, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    documento: '',
    tipo_documento: 'CC',
    estado: true,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen && customer) {
      setFormData({
        nombre: customer.nombre,
        email: customer.email,
        telefono: customer.telefono,
        direccion: customer.direccion,
        documento: customer.documento,
        tipo_documento: customer.tipo_documento,
        estado: customer.estado,
      });
      setFormErrors({});
    }
  }, [isOpen, customer]);

  const validateForm = () => {
    const errors = {};

    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    if (!formData.telefono.trim()) {
      errors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.telefono)) {
      errors.telefono = 'El teléfono debe tener 10 dígitos';
    }

    if (!formData.documento.trim()) {
      errors.documento = 'El documento es requerido';
    }

    if (!formData.tipo_documento) {
      errors.tipo_documento = 'El tipo de documento es requerido';
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
        <ModalTitle>Editar Cliente</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre Completo *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej: María García Rodríguez"
            />
            {formErrors.nombre && (
              <p className="text-red-600 text-sm mt-1">{formErrors.nombre}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipo_documento">Tipo de Documento *</Label>
              <Select
                id="tipo_documento"
                value={formData.tipo_documento}
                onChange={(e) => setFormData({ ...formData, tipo_documento: e.target.value })}
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="NIT">NIT</option>
                <option value="PP">Pasaporte</option>
              </Select>
              {formErrors.tipo_documento && (
                <p className="text-red-600 text-sm mt-1">{formErrors.tipo_documento}</p>
              )}
            </div>

            <div>
              <Label htmlFor="documento">Número de Documento *</Label>
              <Input
                id="documento"
                value={formData.documento}
                onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                placeholder="1234567890"
              />
              {formErrors.documento && (
                <p className="text-red-600 text-sm mt-1">{formErrors.documento}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ejemplo@email.com"
            />
            {formErrors.email && (
              <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="telefono">Teléfono *</Label>
            <Input
              id="telefono"
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              placeholder="3101234567"
              maxLength="10"
            />
            {formErrors.telefono && (
              <p className="text-red-600 text-sm mt-1">{formErrors.telefono}</p>
            )}
          </div>

          <div>
            <Label htmlFor="direccion">Dirección</Label>
            <Textarea
              id="direccion"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              placeholder="Calle 45 #12-34, Bogotá"
              rows={2}
            />
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
          Guardar Cambios
        </Button>
      </ModalFooter>
    </Modal>
  );
};
