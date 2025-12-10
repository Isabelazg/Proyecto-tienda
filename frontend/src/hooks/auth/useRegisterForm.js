import { useState } from 'react';

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    if (!formData.nombres) newErrors.nombres = 'Los nombres son requeridos';
    if (!formData.apellidos) newErrors.apellidos = 'Los apellidos son requeridos';
    if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.email) newErrors.email = 'El correo es requerido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirma tu contraseña';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Aquí iría la lógica de registro con el backend
    console.log('Registro:', formData);
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