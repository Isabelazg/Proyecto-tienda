import { FolderOpen, FileText } from 'lucide-react';
import { FormDialog, FormInput, FormTextarea } from '@/components/common';

export const CreateCategoryDialog = ({ 
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
      title="Crear Nueva Categoría"
      description="Completa los siguientes campos para registrar una categoría"
      onSubmit={handleFormSubmit}
      submitText={isLoading ? 'Creando...' : 'Crear Categoría'}
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
