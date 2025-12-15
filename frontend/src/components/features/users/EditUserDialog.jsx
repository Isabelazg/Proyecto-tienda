import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select/Select';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/ui/modal/Modal';
import { ROLES } from '@/utils/roles';

export const EditUserDialog = ({ isOpen, user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    role_id: 2,
    estado: true,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        nombre: user.nombre,
        email: user.email,
        password: '',
        role_id: user.role.id,
        estado: user.estado,
      });
      setFormErrors({});
    }
  }, [isOpen, user]);

  const validateForm = () => {
    const errors = {};
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) errors.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Email inválido';
    if (formData.password && formData.password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres';
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
        <ModalTitle>Editar Usuario</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre Completo *</Label>
            <Input id="nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ej: Juan Pérez" />
            {formErrors.nombre && <p className="text-red-600 text-sm mt-1">{formErrors.nombre}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="usuario@tienda.com" />
            {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
          </div>
          <div>
            <Label htmlFor="password">Nueva Contraseña (dejar vacío para no cambiar)</Label>
            <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" />
            {formErrors.password && <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>}
          </div>
          <div>
            <Label htmlFor="role">Rol *</Label>
            <Select id="role" value={formData.role_id} onChange={(e) => setFormData({ ...formData, role_id: parseInt(e.target.value) })}>
              <option value={1}>{ROLES.ADMINISTRADOR}</option>
              <option value={2}>{ROLES.EMPLEADO}</option>
              <option value={3}>{ROLES.MESERO}</option>
            </Select>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} variant="ghost">Cancelar</Button>
        <Button onClick={handleSubmit} className="bg-black text-white hover:bg-gray-900">
          Guardar Cambios
        </Button>
      </ModalFooter>
    </Modal>
  );
};
