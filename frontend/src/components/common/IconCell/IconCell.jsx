/**
 * Celda de tabla genérica con icono, título y subtítulo
 * Reutilizable para cualquier tipo de entidad en tablas
 * @param {Object} props
 * @param {string} props.title - Título principal
 * @param {string} [props.subtitle] - Subtítulo opcional
 * @param {React.ReactNode} props.icon - Icono de Lucide React
 * @param {string} [props.iconBgColor] - Color de fondo del icono (Tailwind class)
 * @param {string} [props.iconColor] - Color del icono (Tailwind class)
 */
const IconCell = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  iconBgColor = 'bg-lime-100 dark:bg-lime-900/20', 
  iconColor = 'text-lime-600' 
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`${iconBgColor} p-2 rounded-lg`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default IconCell;
