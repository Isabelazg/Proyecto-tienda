import { useState } from 'react';
import { User, FileText, Phone, Lock, Users, Mail, UserCheck } from 'lucide-react';
import { 
  AuthContainer, 
  AuthCard, 
  AuthHeader, 
  AuthInputField, 
  AuthButton, 
  AuthErrorAlert, 
  AuthLink,
  AuthPasswordToggle 
} from '@/components/common';
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
    <AuthContainer>
      <AuthCard maxWidth="max-w-3xl">
        <AuthHeader
          title="Crear cuenta"
          description="Completa los siguientes campos para registrarte en el sistema"
        />

        <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Primera fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AuthInputField
              id="nombres"
              label="Nombres"
              placeholder="Nombres"
              icon={User}
              autoComplete="given-name"
              error={errors.nombres?.message}
              register={register("nombres", {
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
                maxLength: { value: 50, message: "No puede tener más de 50 caracteres" },
                pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: "Solo se permiten letras" }
              })}
            />
            <AuthInputField
              id="apellidos"
              label="Apellidos"
              placeholder="Apellidos"
              icon={Users}
              autoComplete="family-name"
              error={errors.apellidos?.message}
              register={register("apellidos", {
                required: "El apellido es obligatorio",
                minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
                maxLength: { value: 50, message: "No puede tener más de 50 caracteres" },
                pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: "Solo se permiten letras" }
              })}
            />
          </div>

          {/* Segunda fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AuthInputField
              id="documento"
              label="Documento"
              placeholder="Número de documento"
              icon={FileText}
              error={errors.documento?.message}
              register={register("documento", {
                required: "El documento es obligatorio",
                minLength: { value: 5, message: "Debe tener al menos 5 dígitos" },
                maxLength: { value: 20, message: "No puede tener más de 20 dígitos" },
                pattern: { value: /^\d+$/, message: "Solo se permiten números" }
              })}
            />
            <AuthInputField
              id="correo"
              label="Correo"
              type="email"
              placeholder="correo@ejemplo.com"
              icon={Mail}
              autoComplete="email"
              error={errors.correo?.message}
              register={register("correo", {
                required: "El correo es obligatorio",
                maxLength: { value: 100, message: "No puede tener más de 100 caracteres" },
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo no válido" }
              })}
            />
          </div>

          {/* Tercera fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AuthInputField
              id="telefono"
              label="Teléfono / Celular"
              type="tel"
              placeholder="Número de teléfono"
              icon={Phone}
              autoComplete="tel"
              error={errors.telefono?.message}
              register={register("telefono", {
                required: "El teléfono es obligatorio",
                minLength: { value: 10, message: "Debe tener entre 10 y 15 dígitos" },
                maxLength: { value: 15, message: "Debe tener entre 10 y 15 dígitos" },
                pattern: { value: /^\d+$/, message: "Solo se permiten números" }
              })}
            />
            <AuthInputField
              id="usuario"
              label="Nombre de Usuario"
              placeholder="Nombre de usuario"
              icon={UserCheck}
              autoComplete="username"
              error={errors.nombre_usuario?.message}
              register={register("nombre_usuario", {
                required: "El nombre de usuario es obligatorio",
                minLength: { value: 4, message: "Debe tener al menos 4 caracteres" },
                maxLength: { value: 50, message: "No puede tener más de 50 caracteres" },
                pattern: { value: /^[A-Za-z0-9_]+$/, message: "Solo letras, números y guiones bajos" }
              })}
            />
          </div>

          {/* Cuarta fila - Contraseñas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AuthInputField
              id="contrasena"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              icon={Lock}
              autoComplete="new-password"
              error={errors.contrasena?.message}
              register={register("contrasena", {
                required: "La contraseña es obligatoria",
                minLength: { value: 8, message: "Debe tener mínimo 8 caracteres" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&!¡?*_\-.,;:])[A-Za-z\d@#$%&!¡?*_\-.,;:]{8,}$/,
                  message: "Debe tener mayúscula, minúscula, número y carácter especial"
                }
              })}
              rightElement={
                <AuthPasswordToggle
                  showPassword={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
              }
            />
            <AuthInputField
              id="confirmar_contrasena"
              label="Confirmar contraseña"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              icon={Lock}
              autoComplete="new-password"
              error={errors.confirmar_contrasena?.message}
              register={register("confirmar_contrasena", {
                required: "Debes confirmar la contraseña",
                validate: value =>
                  value === watch('contrasena') ||
                  "Las contraseñas no coinciden"
              })}
              rightElement={
                <AuthPasswordToggle
                  showPassword={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
          </div>

          <AuthErrorAlert error={generalError} />

          <AuthButton
            isLoading={isSubmitting}
            loadingText="Registrando..."
          >
            Registrarse
          </AuthButton>
        </form>

        <AuthLink
          to="/auth/login"
          text="¿Ya tienes una cuenta?"
          linkText="Iniciar sesión"
        />
      </AuthCard>
    </AuthContainer>
  );
};

export default RegisterForm;