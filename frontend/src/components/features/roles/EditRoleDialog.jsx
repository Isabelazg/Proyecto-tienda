import { useEffect, useMemo, useState } from 'react';
import { FormDialog, FormInput, FormTextarea } from '@/components/common';
import { PERMISSIONS } from '@/utils/roles';
import { FileText, Shield } from 'lucide-react';
import { useRoleValidation } from '@/hooks/roles/useRoleValidation';

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

export const EditRoleDialog = ({ isOpen, role, setIsOpen, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    permisos: [],
    estado: true,
  });
  const [formErrors, setFormErrors] = useState({});
  const { validateRoleData } = useRoleValidation();

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

  const validate = (nextData) => {
    const validation = validateRoleData(nextData);
    setFormErrors(validation.errors || {});
    return validation;
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      validate(next);
      return next;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validation = validate(formData);
    if (!validation.isValid) return;

    try {
      const result = await onSubmit?.(formData);
      if (result?.success === true) {
        setIsOpen(false);
      }
    } catch {
      // no-op
    }
  };

  const togglePermission = (permission) => {
    setFormData(prev => {
      const next = {
      ...prev,
      permisos: prev.permisos.includes(permission)
        ? prev.permisos.filter(p => p !== permission)
        : [...prev.permisos, permission]
      };
      validate(next);
      return next;
    });
  };

  const toggleAllInCategory = (permissions) => {
    const permissionKeys = permissions.map(p => p.key);
    const allSelected = permissionKeys.every(p => formData.permisos.includes(p));
    
    if (allSelected) {
      setFormData(prev => {
        const next = {
          ...prev,
          permisos: prev.permisos.filter(p => !permissionKeys.includes(p))
        };
        validate(next);
        return next;
      });
    } else {
      setFormData(prev => {
        const next = {
          ...prev,
          permisos: [...new Set([...prev.permisos, ...permissionKeys])]
        };
        validate(next);
        return next;
      });
    }
  };

  const isFormValid = useMemo(() => {
    const hasErrors =
      formErrors && Object.values(formErrors).some((err) => String(err || '').trim() !== '');

    const requiredFieldsFilled =
      formData?.nombre?.trim() &&
      formData?.descripcion?.trim() &&
      Array.isArray(formData?.permisos) &&
      formData.permisos.length > 0;

    return !hasErrors && Boolean(requiredFieldsFilled);
  }, [formErrors, formData]);

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="Editar Rol"
      description="Actualiza la información del rol"
      onSubmit={handleFormSubmit}
      submitText={isLoading ? 'Guardando...' : 'Guardar Cambios'}
      cancelText="Cancelar"
      maxWidth="max-w-3xl"
      isLoading={isLoading}
      submitDisabled={!isFormValid || isLoading}
    >
      <div className="space-y-4">
        <FormInput
          label="Nombre del Rol"
          id="nombre"
          placeholder="Ej: Supervisor, Cajero"
          value={formData.nombre}
          onChange={(e) => handleFieldChange('nombre', e.target.value)}
          error={formErrors.nombre}
          icon={Shield}
          required
          disabled={isLoading}
        />

        <FormTextarea
          label="Descripción"
          id="descripcion"
          placeholder="Describe las responsabilidades y alcance de este rol"
          value={formData.descripcion}
          onChange={(e) => handleFieldChange('descripcion', e.target.value)}
          error={formErrors.descripcion}
          icon={FileText}
          rows={3}
          required
          disabled={isLoading}
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Permisos ({formData.permisos.length} seleccionados)
            </label>
            {formErrors.permisos && (
              <span className="text-sm text-red-600">{formErrors.permisos}</span>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto space-y-4">
            {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => {
              const allSelected = permissions.every((p) => formData.permisos.includes(p.key));

              return (
                <div key={category} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{category}</h4>
                    <button
                      type="button"
                      onClick={() => toggleAllInCategory(permissions)}
                      className="text-xs text-gray-600 hover:text-gray-900"
                      disabled={isLoading}
                    >
                      {allSelected ? 'Deseleccionar todos' : 'Seleccionar todos'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {permissions.map((permission) => (
                      <label
                        key={permission.key}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.permisos.includes(permission.key)}
                          onChange={() => togglePermission(permission.key)}
                          className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-gray-300"
                          disabled={isLoading}
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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="estado"
            checked={formData.estado}
            onChange={(e) => handleFieldChange('estado', e.target.checked)}
            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-gray-300"
            disabled={isLoading}
          />
          <label htmlFor="estado" className="text-sm font-medium text-gray-700">
            Rol activo
          </label>
        </div>
      </div>
    </FormDialog>
  );
};
