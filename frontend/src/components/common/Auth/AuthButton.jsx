import { Button } from "@/components/ui/button";

/**
 * Botón principal para formularios de autenticación
 * @param {React.ReactNode} children - Contenido del botón
 * @param {boolean} isLoading - Estado de carga
 * @param {string} loadingText - Texto a mostrar durante la carga
 * @param {boolean} disabled - Estado deshabilitado
 * @param {string} title - Título del botón (tooltip)
 */
const AuthButton = ({ 
  children, 
  isLoading, 
  loadingText = "Cargando...", 
  disabled,
  title,
  ...props 
}) => {
  return (
    <Button
      type="submit"
      className="w-full h-12 text-base bg-black text-white hover:bg-gray-900"
      disabled={disabled || isLoading}
      title={title}
      {...props}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default AuthButton;
