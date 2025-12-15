import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { getRolePermissions } from '@/utils/roles';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [generalError, setGeneralError] = useState('');
  const [fieldValues, setFieldValues] = useState({
    login: '',
    password: ''
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm();

  // Watch form values
  const loginValue = watch('login', '');
  const passwordValue = watch('password', '');

  // Update field values for button disable logic
  useEffect(() => {
    setFieldValues({
      login: loginValue,
      password: passwordValue
    });
  }, [loginValue, passwordValue]);

  const handleFieldChange = (fieldName) => (e) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: e.target.value
    }));
    // Clear general error when user starts typing
    if (generalError) {
      setGeneralError('');
    }
  };

  const isButtonDisabled = !fieldValues.login || !fieldValues.password || isSubmitting;

  const onSubmit = async (data) => {
    setGeneralError('');

    try {
      // TODO: Reemplazar con llamada real al backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulación de respuesta del backend
      // En producción, esto vendría del API
      const mockUser = {
        id: 1,
        nombre: 'Administrador del Sistema',
        email: data.login,
        role: {
          id: 1,
          nombre: 'Administrador',
          permisos: getRolePermissions('Administrador'),
        },
        estado: true,
      };

      const mockToken = 'mock-jwt-token-12345';

      // Guardar en el store
      setAuth(mockUser, mockToken);

      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en login:', error);
      setGeneralError('Credenciales inválidas. Por favor intenta de nuevo.');
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    generalError,
    handleFieldChange,
    isButtonDisabled
  };
};

export default useLoginForm;