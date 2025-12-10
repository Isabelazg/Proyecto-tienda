import { useState } from 'react';

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validaciones básicas
    const newErrors = {};
    if (!formData.email) newErrors.email = 'El correo es requerido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Aquí iría la lógica de autenticación con el backend
    console.log('Login:', formData);
    setIsLoading(false);
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit
  };
};