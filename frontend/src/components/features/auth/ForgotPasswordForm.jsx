import { Link } from 'react-router-dom';
import { 
  AuthContainer, 
  AuthCard, 
  AuthHeader, 
  AuthInputField, 
  AuthButton, 
  AuthErrorAlert,
  AuthSuccessMessage 
} from '@/components/common';
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from 'lucide-react';
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
      <AuthSuccessMessage
        title="Correo Enviado"
        message="Se ha enviado un enlace de recuperación a tu correo electrónico. Por favor revisa tu bandeja de entrada."
        buttonText="Volver al inicio de sesión"
        buttonLink="/auth/login"
      />
    );
  }

  return (
    <AuthContainer>
      <AuthCard className={className} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AuthHeader
            title="Recuperar Contraseña"
            description="Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña"
          />

          <div className="space-y-4">
            <AuthInputField
              id="correo"
              label="Correo electrónico"
              type="email"
              placeholder="correo@ejemplo.com"
              icon={Mail}
              autoComplete="email"
              error={errors.correo?.message}
              register={register("correo", {
                required: "El correo es obligatorio",
                pattern: { 
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                  message: "Correo no válido" 
                }
              })}
            />

            <AuthErrorAlert error={generalError} />

            <AuthButton
              isLoading={isSubmitting}
              loadingText="Enviando..."
            >
              Enviar enlace de recuperación
            </AuthButton>

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
      </AuthCard>
    </AuthContainer>
  );
};

export default ForgotPasswordForm;
