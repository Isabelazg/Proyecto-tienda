import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const useForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    setGeneralError('');

    try {
      // TODO: Reemplazar con llamada real al backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Solicitud de recuperación enviada para:', data.correo);
      setIsSuccess(true);

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);
    } catch (error) {
      console.error('Error al enviar correo de recuperación:', error);
      setGeneralError('Error al enviar el correo. Por favor intenta de nuevo.');
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    generalError,
    isSuccess
  };
};
