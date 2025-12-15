import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, Phone, Lock, Users, Mail, UserCheck, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegisterForm } from '@/hooks/auth/useRegisterForm';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    generalError,
    isSubmitting,
    watch
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 to-green-50 p-4">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-2xl font-bold">Crear cuenta</h1>
          <p className="text-sm text-gray-500 mt-2">
            Completa los siguientes campos para registrarte en el sistema
          </p>
        </div>

        {/* Formulario */}
        <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Primera fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="nombres"
                  placeholder="Nombres"
                  autoComplete="given-name"
                  className="h-12 text-base pl-10 pr-10"
                  {...register("nombres", {
                    required: "El nombre es obligatorio",
                    minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
                    maxLength: { value: 50, message: "No puede tener más de 50 caracteres" },
                    pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: "Solo se permiten letras" }
                  })}
                />
              </div>
              {errors.nombres && (
                <span className="text-red-500 text-sm mb-2">{errors.nombres.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="apellidos"
                  placeholder="Apellidos"
                  autoComplete="family-name"
                  className="h-12 text-base pl-10 pr-10"
                  {...register("apellidos", {
                    required: "El apellido es obligatorio",
                    minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
                    maxLength: { value: 50, message: "No puede tener más de 50 caracteres" },
                    pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: "Solo se permiten letras" }
                  })}
                />
              </div>
              {errors.apellidos && (
                <span className="text-red-500 text-sm mb-2">{errors.apellidos.message}</span>
              )}
            </div>
          </div>

          {/* Segunda fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documento">Documento</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="documento"
                  placeholder="Número de documento"
                  className="h-12 text-base pl-10 pr-10"
                  {...register("documento", {
                    required: "El documento es obligatorio",
                    minLength: { value: 5, message: "Debe tener al menos 5 dígitos" },
                    maxLength: { value: 20, message: "No puede tener más de 20 dígitos" },
                    pattern: { value: /^\d+$/, message: "Solo se permiten números" }
                  })}
                />
              </div>
              {errors.documento && (
                <span className="text-red-500 text-sm mb-2">{errors.documento.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="correo">Correo</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  autoComplete="email"
                  className="h-12 text-base pl-10 pr-10"
                  {...register("correo", {
                    required: "El correo es obligatorio",
                    maxLength: { value: 100, message: "No puede tener más de 100 caracteres" },
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo no válido" }
                  })}
                />
              </div>
              {errors.correo && (
                <span className="text-red-500 text-sm mb-2">{errors.correo.message}</span>
              )}
            </div>
          </div>

          {/* Tercera fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono / Celular</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="telefono"
                  type="tel"
                  placeholder="Número de teléfono"
                  autoComplete="tel"
                  className="h-12 text-base pl-10 pr-10"
                  {...register("telefono", {
                    required: "El teléfono es obligatorio",
                    minLength: { value: 10, message: "Debe tener entre 10 y 15 dígitos" },
                    maxLength: { value: 15, message: "Debe tener entre 10 y 15 dígitos" },
                    pattern: { value: /^\d+$/, message: "Solo se permiten números" }
                  })}
                />
              </div>
              {errors.telefono && (
                <span className="text-red-500 text-sm mb-2">{errors.telefono.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="usuario">Nombre de Usuario</Label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="usuario"
                  placeholder="Nombre de usuario"
                  autoComplete="username"
                  className="h-12 text-base pl-10 pr-10"
                  {...register("nombre_usuario", {
                    required: "El nombre de usuario es obligatorio",
                    minLength: { value: 4, message: "Debe tener al menos 4 caracteres" },
                    maxLength: { value: 50, message: "No puede tener más de 50 caracteres" },
                    pattern: { value: /^[A-Za-z0-9_]+$/, message: "Solo letras, números y guiones bajos" }
                  })}
                />
              </div>
              {errors.nombre_usuario && (
                <span className="text-red-500 text-sm mb-2">{errors.nombre_usuario.message}</span>
              )}
            </div>
          </div>

          {/* Cuarta fila - Contraseñas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contrasena">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="contrasena"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  autoComplete="new-password"
                  className="h-12 text-base pl-10 pr-10"
                  {...register("contrasena", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 8, message: "Debe tener mínimo 8 caracteres" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&!¡?*_\-.,;:])[A-Za-z\d@#$%&!¡?*_\-.,;:]{8,}$/,
                      message: "Debe tener mayúscula, minúscula, número y carácter especial"
                    }
                  })}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.contrasena && (
                <span className="text-red-500 text-sm mb-2">{errors.contrasena.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmar_contrasena">Confirmar contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="confirmar_contrasena"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  autoComplete="new-password"
                  className="h-12 text-base pl-10 pr-10"
                  {...register("confirmar_contrasena", {
                    required: "Debes confirmar la contraseña",
                    validate: value =>
                      value === watch('contrasena') ||
                      "Las contraseñas no coinciden"
                  })}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmar_contrasena && (
                <span className="text-red-500 text-sm mb-2">{errors.confirmar_contrasena.message}</span>
              )}
            </div>
          </div>

          {generalError && <span className="text-red-500">{generalError}</span>}

          <Button
            type="submit"
            className="block w-full h-12 text-base bg-black text-white hover:bg-gray-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </Button>
        </form>

        <div className="text-center text-sm mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/auth/login" className="text-lime-600 font-semibold hover:underline">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;