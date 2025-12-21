import { UserCircle, Mail, Lock, Shield } from 'lucide-react';
import { FormDialog, FormInput, FormSelect } from '@/components/common';
import { ROLES } from '@/utils/roles';

export const EditUserDialog = ({
  isOpen,
  setIsOpen,
  formData = {},
  errors = {},
  isLoading = false,
  isFormValid = false,
  handleFieldChange,
  handleSubmit
}) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await handleSubmit();
      if (result?.success === true) {
        setIsOpen(false);
      }
    } catch {
      // No cerrar el diálogo en caso de error
    }
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title="Editar Usuario"
      description="Actualiza la información del usuario"
      onSubmit={handleFormSubmit}
      submitText={isLoading ? 'Guardando...' : 'Guardar Cambios'}
      cancelText="Cancelar"
      maxWidth="2xl"
      isLoading={isLoading}
      submitDisabled={!isFormValid || isLoading}
    >
      <div className="space-y-4">
        <FormInput
          label="Nombre Completo"
          id="nombre"
          placeholder="Ej: Juan Pérez"
          value={formData.nombre || ''}
          onChange={(e) => handleFieldChange('nombre', e.target.value)}
          error={errors.nombre}
          icon={UserCircle}
          required
          disabled={isLoading}
          autoFocus
        />

        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="usuario@tienda.com"
          value={formData.email || ''}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          error={errors.email}
          icon={Mail}
          required
          disabled={isLoading}
        />

        <FormInput
          label="Nueva Contraseña (dejar vacío para no cambiar)"
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password || ''}
          onChange={(e) => handleFieldChange('password', e.target.value)}
          error={errors.password}
          icon={Lock}
          disabled={isLoading}
        />

        <FormSelect
          label="Rol"
          id="role_id"
          value={formData.role_id ?? 2}
          onChange={(e) => handleFieldChange('role_id', Number(e.target.value))}
          error={errors.role_id}
          icon={Shield}
          required
          disabled={isLoading}
        >
          <option value={1}>{ROLES.ADMINISTRADOR}</option>
          <option value={2}>{ROLES.EMPLEADO}</option>
          <option value={3}>{ROLES.MESERO}</option>
        </FormSelect>
      </div>
    </FormDialog>
  );
};
