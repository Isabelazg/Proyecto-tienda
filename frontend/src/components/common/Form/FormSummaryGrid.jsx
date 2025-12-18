/**
 * Componente de grid de resumen financiero
 * @param {string} title - Título del grid
 * @param {React.Component} IconComponent - Componente de icono
 * @param {React.ReactNode} children - Contenido del grid
 * @param {number} cols - Número de columnas
 */
const FormSummaryGrid = ({ title, IconComponent, children, cols = 2 }) => {
  return (
    <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4">
      {title && (
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          {IconComponent && <IconComponent className="h-4 w-4" />}
          {title}
        </h4>
      )}
      <div className={`grid grid-cols-${cols} gap-3`}>
        {children}
      </div>
    </div>
  );
};

export default FormSummaryGrid;
