/**
 * Componente de grid de resumen financiero
 * @param {string} title - Título del grid
 * @param {React.Component} IconComponent - Componente de icono
 * @param {React.ReactNode} children - Contenido del grid
 * @param {number} cols - Número de columnas
 * @param {string} className - Clases adicionales para el contenedor
 * @param {string} gridClassName - Clases adicionales para el grid interno (útil para responsive)
 */
const FormSummaryGrid = ({ title, IconComponent, children, cols = 2, className = "", gridClassName = "" }) => {
  const colsClassName = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4"
  }[Number(cols)] || "grid-cols-2";

  return (
    <div className={`bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4 ${className}`}
    >
      {title && (
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          {IconComponent && <IconComponent className="h-4 w-4" />}
          {title}
        </h4>
      )}
      <div className={`grid ${gridClassName || colsClassName} gap-3`}>
        {children}
      </div>
    </div>
  );
};

export default FormSummaryGrid;
