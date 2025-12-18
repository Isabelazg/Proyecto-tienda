import { cn } from "@/lib/utils";

/**
 * Contenedor principal para páginas de autenticación
 * @param {React.ReactNode} children - Contenido del contenedor
 * @param {string} className - Clases CSS adicionales
 */
const AuthContainer = ({ children, className }) => {
  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 to-green-50 p-4",
      className
    )}>
      {children}
    </div>
  );
};

export default AuthContainer;
