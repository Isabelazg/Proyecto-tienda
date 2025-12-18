import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { Lock, Mail } from 'lucide-react';
import { Label } from "@/components/ui/label";

const LoginForm = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    generalError,
    handleFieldChange,
    isButtonDisabled
  } = useLoginForm();
    
  return (
    <AuthContainer>
      <AuthCard className={className} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AuthHeader 
            title="Bienvenido de nuevo"
            description="Ingresa tus credenciales para continuar"
          />

          <div className="space-y-4">
            <AuthInputField
              id="login"
              label="Usuario, documento o correo"
              type="text"
              placeholder="Usuario, documento o correo"
              icon={Mail}
              autoComplete="username"
              error={errors.login?.message}
              register={register("login", {
                required: "Este campo es obligatorio",
                onChange: handleFieldChange("login")
              })}
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Contraseña</Label>
                <Link to="/auth/forgot-password" className="text-sm text-gray-500 hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <AuthInputField
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                icon={Lock}
                autoComplete="current-password"
                error={errors.password?.message}
                register={register("password", {
                  required: "La contraseña es obligatoria",
                  onChange: handleFieldChange("password")
                })}
                rightElement={
                  <AuthPasswordToggle
                    showPassword={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                  />
                }
              />
            </div>

            <AuthErrorAlert error={generalError} />

            <AuthButton
              isLoading={isSubmitting}
              loadingText="Iniciando sesión..."
              disabled={isButtonDisabled}
              title={isButtonDisabled ? "Debes llenar todos los campos para poder iniciar sesión" : ""}
            >
              Iniciar sesión
            </AuthButton>

            <AuthLink
              to="/auth/register"
              text="¿No tienes una cuenta?"
              linkText="Regístrate aquí"
            />
          </div>
        </form>
      </AuthCard>
    </AuthContainer>
  );
};

export default LoginForm;