import React, { useState } from 'react';
import { FormDialog, FormInput, FormTextarea, FormInfoBanner } from '@/components/common/Form';
import { DollarSign } from 'lucide-react';

export const CreateCashRegisterDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm
}) => {
  const [formData, setFormData] = useState({
    monto_inicial: '',
    notas: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.monto_inicial || formData.monto_inicial.trim() === '') {
      newErrors.monto_inicial = 'El monto inicial es requerido';
    } else {
      const monto = parseFloat(formData.monto_inicial);
      if (isNaN(monto)) {
        newErrors.monto_inicial = 'El monto debe ser un número válido';
      } else if (monto < 0) {
        newErrors.monto_inicial = 'El monto no puede ser negativo';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const data = {
      monto_inicial: parseFloat(formData.monto_inicial),
      notas: formData.notas.trim()
    };

    const result = onConfirm(data);
    if (result?.success !== false) {
      handleClose();
    }
  };

  const handleOpenChange = (open) => {
    if (!open) {
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      monto_inicial: '',
      notas: ''
    });
    setErrors({});
    onClose();
  };

  const isFormValid = () => {
    const hasErrors = Object.values(errors).some(error => error);
    return !hasErrors && formData.monto_inicial;
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title="Abrir Caja"
      description="Registra el monto inicial para comenzar operaciones"
      onSubmit={handleSubmit}
      submitText="Abrir Caja"
      cancelText="Cancelar"
      maxWidth="max-w-2xl"
      isLoading={false}
      submitDisabled={!isFormValid()}
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
          value={formData.monto_inicial}
          onChange={(e) => handleChange('monto_inicial', e.target.value)}
          error={errors.monto_inicial}
          icon={DollarSign}
          required
        />

        <FormTextarea
          label="Notas (Opcional)"
          id="notas"
          placeholder="Observaciones sobre la apertura..."
          value={formData.notas}
          onChange={(e) => handleChange('notas', e.target.value)}
          rows={3}
        />
      </div>
    </FormDialog>
  );
};
