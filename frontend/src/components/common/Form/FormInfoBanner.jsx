/**
 * Componente de banner informativo con icono
 * @param {string} variant - Variante de color (info, warning)
 * @param {string} title - Título del banner
 * @param {string} message - Mensaje del banner
 * @param {React.Component} IconComponent - Componente de icono
 */
const FormInfoBanner = ({ 
  variant = "info", 
  title, 
  message, 
  IconComponent 
}) => {
  const variantClasses = {
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
    warning: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700"
  };

  const iconColors = {
    info: "text-blue-600",
    warning: "text-orange-600"
  };

  const titleColors = {
    info: "text-blue-900 dark:text-blue-300",
    warning: "text-orange-900 dark:text-orange-300"
  };

  const messageColors = {
    info: "text-blue-700 dark:text-blue-400",
    warning: "text-orange-700 dark:text-orange-400"
  };

  return (
    <div className={`border rounded-lg p-4 ${variantClasses[variant]}`}>
      <div className="flex items-start gap-3">
        {IconComponent && (
          <IconComponent className={`h-5 w-5 mt-0.5 ${iconColors[variant]}`} />
        )}
        <div>
          <h4 className={`text-sm font-semibold mb-1 ${titleColors[variant]}`}>
            {title}
          </h4>
          <p className={`text-sm ${messageColors[variant]}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormInfoBanner;
