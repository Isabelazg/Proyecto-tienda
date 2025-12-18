/**
 * Banner de estado con acciones
 * @param {string} variant - Variante de color
 * @param {React.Component} icon - Componente de icono
 * @param {string} title - Título del banner
 * @param {string} subtitle - Subtítulo del banner
 * @param {React.ReactNode} actions - Acciones del banner
 * @param {React.ReactNode} children - Contenido adicional
 */
const FormStatusBanner = ({ 
  variant = 'info',
  icon: Icon,
  title,
  subtitle,
  actions,
  children
}) => {
  const variantClasses = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
  };

  const iconBgClasses = {
    success: 'bg-green-100 dark:bg-green-800/30',
    warning: 'bg-yellow-100 dark:bg-yellow-800/30',
    info: 'bg-blue-100 dark:bg-blue-800/30',
    error: 'bg-red-100 dark:bg-red-800/30'
  };

  const iconColors = {
    success: 'text-green-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
    error: 'text-red-600'
  };

  const titleColors = {
    success: 'text-green-700 dark:text-green-300',
    warning: 'text-yellow-700 dark:text-yellow-300',
    info: 'text-blue-700 dark:text-blue-300',
    error: 'text-red-700 dark:text-red-300'
  };

  const subtitleColors = {
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-blue-600 dark:text-blue-400',
    error: 'text-red-600 dark:text-red-400'
  };

  return (
    <div className={`border rounded-lg p-4 ${variantClasses[variant]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`p-3 rounded-full ${iconBgClasses[variant]}`}>
              <Icon className={`h-6 w-6 ${iconColors[variant]}`} />
            </div>
          )}
          <div>
            {title && (
              <p className={`text-sm font-medium ${titleColors[variant]}`}>{title}</p>
            )}
            {subtitle && (
              <p className={`text-xs ${subtitleColors[variant]}`}>{subtitle}</p>
            )}
            {children}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormStatusBanner;
