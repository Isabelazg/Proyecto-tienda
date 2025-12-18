/**
 * Encabezado de detalles genérico con icono y título
 * Reutilizable para cualquier tipo de entidad (categorías, productos, usuarios, etc.)
 * @param {Object} props
 * @param {string} props.title - Título principal
 * @param {string} [props.subtitle] - Subtítulo opcional
 * @param {React.ReactNode} props.icon - Icono de Lucide React
 * @param {string} [props.iconBgColor] - Color de fondo del icono (Tailwind class)
 * @param {string} [props.iconColor] - Color del icono (Tailwind class)
 */
const DetailsHeader = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  iconBgColor = 'bg-lime-100 dark:bg-lime-900/20', 
  iconColor = 'text-lime-600' 
}) => {
  return (
    <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-slate-700">
      <div className={`${iconBgColor} p-4 rounded-xl`}>
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailsHeader;
