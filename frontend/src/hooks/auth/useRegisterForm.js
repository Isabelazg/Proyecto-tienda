import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm();

  const onSubmit = async (data) => {
    setGeneralError('');

    try {
      // TODO: Reemplazar con llamada real al backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Registro exitoso:', data);
      
      // Redirigir al login después del registro
      navigate('/auth/login');
    } catch (error) {
      console.error('Error en registro:', error);
      setGeneralError('Error al crear la cuenta. Por favor intenta de nuevo.');
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    generalError,
    isSubmitting,
    watch
  };
};

export default useRegisterForm;