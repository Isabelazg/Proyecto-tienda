import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useForgotPasswordForm } from '@/hooks/auth/useForgotPasswordForm';

const ForgotPasswordForm = ({ className, ...props }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    generalError,
    isSuccess
  } = useForgotPasswordForm();

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 to-green-50 p-4">
        <div className={cn(
          "w-full max-w-md mx-auto rounded-xl shadow-lg p-8 bg-white text-center",
          className
        )}>
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Correo Enviado
          </h2>
          <p className="text-gray-600 mb-6">
            Se ha enviado un enlace de recuperación a tu correo electrónico. Por favor revisa tu bandeja de entrada.
          </p>
          <Link to="/auth/login">
            <Button className="w-full bg-black text-white hover:bg-gray-900">
              Volver al inicio de sesión
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold">Recuperar Contraseña</h1>
          <p className="text-sm text-gray-500 mt-2">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="correo">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="correo"
                type="email"
                placeholder="correo@ejemplo.com"
                autoComplete="email"
                className="pl-10 h-12"
                {...register("correo", {
                  required: "El correo es obligatorio",
                  pattern: { 
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                    message: "Correo no válido" 
                  }
                })}
              />
            </div>
            {errors.correo && (
              <span className="text-red-500 text-sm">{errors.correo.message}</span>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </Button>

          <Link to="/auth/login">
            <Button
              type="button"
              variant="ghost"
              className="w-full h-12 text-base"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio de sesión
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
