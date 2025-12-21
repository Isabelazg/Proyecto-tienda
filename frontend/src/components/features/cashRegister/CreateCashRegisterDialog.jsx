import { FormDialog, FormInput, FormTextarea, FormInfoBanner } from '@/components/common';
import { DollarSign } from 'lucide-react';

export const CreateCashRegisterDialog = ({ 
  isOpen, 
  setIsOpen,
  formData = {},
  errors = {},
  isLoading = false,
  handleFieldChange,
  handleSubmit,
  isFormValid
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

  const canSubmit = typeof isFormValid === 'function' ? isFormValid() : true;

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title="Abrir Caja"
      description="Registra el monto inicial para comenzar operaciones"
      onSubmit={handleFormSubmit}
      submitText="Abrir Caja"
      cancelText="Cancelar"
      maxWidth="max-w-2xl"
      isLoading={isLoading}
      submitDisabled={!canSubmit || isLoading}
    >
      <div className="space-y-4">
        <FormInfoBanner
          variant="info"
          title="Apertura de Caja"
          message="Ingresa el monto inicial con el que abres la caja. Este monto será el punto de partida para los cálculos del día."
          IconComponent={DollarSign}
        />

        <FormInput
          label="Monto Inicial"
          id="monto_inicial"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.monto_inicial || ''}
          onChange={(e) => handleFieldChange('monto_inicial', e.target.value)}
          error={errors.monto_inicial}
          icon={DollarSign}
          required
          disabled={isLoading}
        />

        <FormTextarea
          label="Notas (Opcional)"
          id="notas"
          placeholder="Observaciones sobre la apertura..."
          value={formData.notas || ''}
          onChange={(e) => handleFieldChange('notas', e.target.value)}
          rows={3}
          disabled={isLoading}
        />
      </div>
    </FormDialog>
  );
};
