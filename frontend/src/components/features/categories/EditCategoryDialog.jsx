import { FolderOpen, FileText } from 'lucide-react';
import { FormDialog, FormInput, FormTextarea } from '@/components/common';

export const EditCategoryDialog = ({ 
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
      title="Editar Categoría"
      description="Actualiza la información de la categoría"
      onSubmit={handleFormSubmit}
      submitText={isLoading ? 'Guardando...' : 'Guardar Cambios'}
      cancelText="Cancelar"
      maxWidth="2xl"
      isLoading={isLoading}
      submitDisabled={!isFormValid || isLoading}
    >
      <div className="space-y-4">
        <FormInput
          label="Nombre"
          id="nombre"
          placeholder="Ej: Bebidas, Comida, Postres"
          value={formData.nombre || ''}
          onChange={(e) => handleFieldChange('nombre', e.target.value)}
          error={errors.nombre}
          icon={FolderOpen}
          required
          disabled={isLoading}
          autoFocus
        />

        <FormTextarea
          label="Descripción"
          id="descripcion"
          placeholder="Describe el tipo de productos que incluye esta categoría"
          value={formData.descripcion || ''}
          onChange={(e) => handleFieldChange('descripcion', e.target.value)}
          error={errors.descripcion}
          icon={FileText}
          rows={4}
          disabled={isLoading}
        />
      </div>
    </FormDialog>
  );
};
