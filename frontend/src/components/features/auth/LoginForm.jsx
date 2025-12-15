import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 to-green-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "w-full max-w-md mx-auto rounded-xl shadow-lg p-8 bg-white",
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
          <p className="text-sm text-gray-500 mt-2">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login">Usuario, documento o correo</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="login"
                type="text"
                placeholder="Usuario, documento o correo"
                autoComplete="username"
                className="pl-10 h-12"
                {...register("login", {
                  required: "Este campo es obligatorio",
                  onChange: handleFieldChange("login")
                })}
              />
            </div>
            {errors.login && (
              <span className="text-red-500 text-sm">{errors.login.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Contraseña</Label>
              <Link to="/auth/forgot-password" className="text-sm text-gray-500 hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                autoComplete="current-password"
                className="pl-10 pr-10 h-12"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  onChange: handleFieldChange("password")
                })}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {generalError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-red-600 text-sm">{generalError}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-base bg-black text-white hover:bg-gray-900"
            disabled={isButtonDisabled}
            title={isButtonDisabled ? "Debes llenar todos los campos para poder iniciar sesión" : ""}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>

          <div className="text-center text-sm mt-4">
            ¿No tienes una cuenta?{' '}
            <Link to="/auth/register" className="text-lime-600 font-semibold hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;