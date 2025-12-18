/**
 * Componente de alerta para formularios
 * @param {string} variant - Variante de color (success, info, warning, error)
 * @param {string} title - Título de la alerta
 * @param {string} message - Mensaje de la alerta
 * @param {React.Component} IconComponent - Componente de icono
 * @param {React.ReactNode} children - Contenido adicional
 */
const FormAlertBox = ({ 
  variant = "info", 
  title, 
  message, 
  IconComponent,
  children 
}) => {
  const variantClasses = {
    success: "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-900 dark:text-green-300",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-300",
    warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-300",
    error: "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-900 dark:text-red-300"
  };

  const iconColors = {
    success: "text-green-600",
    info: "text-blue-600",
    warning: "text-yellow-600",
    error: "text-red-600"
  };

  const messageColors = {
    success: "text-green-700 dark:text-green-400",
    info: "text-blue-700 dark:text-blue-400",
    warning: "text-yellow-700 dark:text-yellow-400",
    error: "text-red-700 dark:text-red-400"
  };

  return (
    <div className={`border rounded-lg p-3 ${variantClasses[variant]}`}>
      <div className="flex items-start gap-2">
        {IconComponent && (
          <IconComponent className={`h-5 w-5 mt-0.5 ${iconColors[variant]}`} />
        )}
        <div className="flex-1">
          {title && (
            <h5 className="text-sm font-semibold mb-1">{title}</h5>
          )}
          {message && (
            <p className={`text-sm ${messageColors[variant]}`}>{message}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormAlertBox;
