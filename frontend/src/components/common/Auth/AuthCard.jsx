import { cn } from "@/lib/utils";

/**
 * Tarjeta de formulario para autenticación
 * @param {React.ReactNode} children - Contenido de la tarjeta
 * @param {string} className - Clases CSS adicionales
 * @param {string} maxWidth - Ancho máximo de la tarjeta
 */
const AuthCard = ({ children, className, maxWidth = "max-w-md", ...props }) => {
  return (
    <div
      className={cn(
        "w-full mx-auto rounded-xl shadow-lg p-8 bg-white",
        maxWidth,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default AuthCard;
