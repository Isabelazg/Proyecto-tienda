import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Campo de input para formularios de autenticación
 * @param {string} id - ID del input
 * @param {string} label - Etiqueta del input
 * @param {string} type - Tipo de input
 * @param {string} placeholder - Placeholder del input
 * @param {React.Component} icon - Componente de icono
 * @param {string} autoComplete - Atributo autocomplete
 * @param {string} error - Mensaje de error
 * @param {object} register - Función de registro de react-hook-form
 * @param {React.ReactNode} rightElement - Elemento a mostrar a la derecha (ej: botón de ver contraseña)
 */
const AuthInputField = ({ 
  id, 
  label, 
  type = "text", 
  placeholder, 
  icon: Icon, 
  autoComplete,
  error,
  register = {},
  rightElement,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${Icon ? 'pl-10' : 'pl-3'} ${rightElement ? 'pr-10' : 'pr-3'} h-12`}
          {...register}
          {...props}
        />
        {rightElement}
      </div>
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
};

export default AuthInputField;
