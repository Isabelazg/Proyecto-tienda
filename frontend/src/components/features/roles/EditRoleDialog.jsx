import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/ui/modal/Modal';
import { PERMISSIONS } from '@/utils/roles';
import { Check } from 'lucide-react';

const PERMISSION_CATEGORIES = {
  'Productos': [
    { key: PERMISSIONS.PRODUCTOS_VER, label: 'Ver productos' },
    { key: PERMISSIONS.PRODUCTOS_CREAR, label: 'Crear productos' },
    { key: PERMISSIONS.PRODUCTOS_EDITAR, label: 'Editar productos' },
    { key: PERMISSIONS.PRODUCTOS_ELIMINAR, label: 'Eliminar productos' },
  ],
  'Categorías': [
    { key: PERMISSIONS.CATEGORIAS_VER, label: 'Ver categorías' },
    { key: PERMISSIONS.CATEGORIAS_CREAR, label: 'Crear categorías' },
    { key: PERMISSIONS.CATEGORIAS_EDITAR, label: 'Editar categorías' },
    { key: PERMISSIONS.CATEGORIAS_ELIMINAR, label: 'Eliminar categorías' },
  ],
  'Ventas': [
    { key: PERMISSIONS.VENTAS_VER, label: 'Ver ventas' },
    { key: PERMISSIONS.VENTAS_CREAR, label: 'Crear ventas' },
    { key: PERMISSIONS.VENTAS_ANULAR, label: 'Anular ventas' },
  ],
  'Clientes': [
    { key: PERMISSIONS.CLIENTES_VER, label: 'Ver clientes' },
    { key: PERMISSIONS.CLIENTES_CREAR, label: 'Crear clientes' },
    { key: PERMISSIONS.CLIENTES_EDITAR, label: 'Editar clientes' },
    { key: PERMISSIONS.CLIENTES_ELIMINAR, label: 'Eliminar clientes' },
  ],
  'Usuarios': [
    { key: PERMISSIONS.USUARIOS_VER, label: 'Ver usuarios' },
    { key: PERMISSIONS.USUARIOS_CREAR, label: 'Crear usuarios' },
    { key: PERMISSIONS.USUARIOS_EDITAR, label: 'Editar usuarios' },
    { key: PERMISSIONS.USUARIOS_ELIMINAR, label: 'Eliminar usuarios' },
  ],
  'Reportes': [
    { key: PERMISSIONS.REPORTES_VER, label: 'Ver reportes' },
    { key: PERMISSIONS.REPORTES_EXPORTAR, label: 'Exportar reportes' },
  ],
  'Dashboard': [
    { key: PERMISSIONS.DASHBOARD_VER, label: 'Ver dashboard' },
  ],
};

export const EditRoleDialog = ({ isOpen, role, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    permisos: [],
    estado: true,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen && role) {
      setFormData({
        nombre: role.nombre,
        descripcion: role.descripcion,
        permisos: role.permisos || [],
        estado: role.estado,
      });
      setFormErrors({});
    }
  }, [isOpen, role]);

  const validateForm = () => {
    const errors = {};
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es requerido';
    if (!formData.descripcion.trim()) errors.descripcion = 'La descripción es requerida';
    if (formData.permisos.length === 0) errors.permisos = 'Debe seleccionar al menos un permiso';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
  };

  const togglePermission = (permission) => {
    setFormData(prev => ({
      ...prev,
      permisos: prev.permisos.includes(permission)
        ? prev.permisos.filter(p => p !== permission)
        : [...prev.permisos, permission]
    }));
  };

  const toggleAllInCategory = (permissions) => {
    const permissionKeys = permissions.map(p => p.key);
    const allSelected = permissionKeys.every(p => formData.permisos.includes(p));
    
    if (allSelected) {
      setFormData(prev => ({
        ...prev,
        permisos: prev.permisos.filter(p => !permissionKeys.includes(p))
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permisos: [...new Set([...prev.permisos, ...permissionKeys])]
      }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <ModalHeader onClose={onClose}>
        <ModalTitle>Editar Rol</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="nombre">Nombre del Rol *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej: Supervisor, Cajero"
            />
            {formErrors.nombre && <p className="text-red-600 text-sm mt-1">{formErrors.nombre}</p>}
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción *</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Describe las responsabilidades y alcance de este rol"
              rows={3}
            />
            {formErrors.descripcion && <p className="text-red-600 text-sm mt-1">{formErrors.descripcion}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Permisos * ({formData.permisos.length} seleccionados)</Label>
              {formErrors.permisos && <p className="text-red-600 text-sm">{formErrors.permisos}</p>}
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto space-y-4">
              {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => {
                const allSelected = permissions.every(p => formData.permisos.includes(p.key));

                return (
                  <div key={category} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{category}</h4>
                      <button
                        type="button"
                        onClick={() => toggleAllInCategory(permissions)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        {allSelected ? 'Deseleccionar todos' : 'Seleccionar todos'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {permissions.map(permission => (
                        <label
                          key={permission.key}
                          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                        >
                          <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                            formData.permisos.includes(permission.key)
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300'
                          }`}>
                            {formData.permisos.includes(permission.key) && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            checked={formData.permisos.includes(permission.key)}
                            onChange={() => togglePermission(permission.key)}
                            className="sr-only"
                          />
                          <span className="text-sm text-gray-700">{permission.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
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
