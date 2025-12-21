import { CreditCard, FileText, Mail, MapPin, Phone, User } from 'lucide-react';
import { FormDialog, FormInput, FormSelect, FormTextarea } from '@/components/common';

export const CreateCustomerDialog = ({ 
  isOpen,
  setIsOpen,
  formData,
  errors,
  isLoading = false,
  isFormValid,
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
      title="Registrar Nuevo Cliente"
      description="Completa los siguientes campos para registrar un cliente"
      onSubmit={handleFormSubmit}
      submitText={isLoading ? 'Registrando...' : 'Registrar Cliente'}
      cancelText="Cancelar"
      maxWidth="2xl"
      isLoading={isLoading}
      submitDisabled={!isFormValid || isLoading}
    >
      <div className="space-y-4">
        <FormInput
          label="Nombre Completo"
          id="nombre"
          placeholder="Ej: María García Rodríguez"
          value={formData?.nombre || ''}
          onChange={(e) => handleFieldChange('nombre', e.target.value)}
          error={errors?.nombre}
          icon={User}
          required
          disabled={isLoading}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            label="Tipo de Documento"
            id="tipo_documento"
            value={formData?.tipo_documento || 'CC'}
            onChange={(e) => handleFieldChange('tipo_documento', e.target.value)}
            error={errors?.tipo_documento}
            icon={FileText}
            required
            disabled={isLoading}
            options={[
              { value: 'CC', label: 'Cédula de Ciudadanía' },
              { value: 'CE', label: 'Cédula de Extranjería' },
              { value: 'NIT', label: 'NIT' },
              { value: 'PP', label: 'Pasaporte' }
            ]}
          />

          <FormInput
            label="Número de Documento"
            id="documento"
            placeholder="1234567890"
            value={formData?.documento || ''}
            onChange={(e) => handleFieldChange('documento', e.target.value)}
            error={errors?.documento}
            icon={CreditCard}
            required
            disabled={isLoading}
          />
        </div>

        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="ejemplo@email.com"
          value={formData?.email || ''}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          error={errors?.email}
          icon={Mail}
          required
          disabled={isLoading}
        />

        <FormInput
          label="Teléfono"
          id="telefono"
          type="tel"
          placeholder="3101234567"
          value={formData?.telefono || ''}
          onChange={(e) => handleFieldChange('telefono', e.target.value)}
          error={errors?.telefono}
          icon={Phone}
          required
          maxLength={10}
          disabled={isLoading}
        />

        <FormTextarea
          label="Dirección"
          id="direccion"
          placeholder="Calle 45 #12-34, Bogotá"
          value={formData?.direccion || ''}
          onChange={(e) => handleFieldChange('direccion', e.target.value)}
          error={errors?.direccion}
          icon={MapPin}
          rows={2}
          disabled={isLoading}
        />
      </div>
    </FormDialog>
  );
};
