/**
 * Componente de campo de solo lectura para vistas
 * @param {string} label - Etiqueta del campo
 * @param {string} value - Valor del campo
 * @param {string} placeholder - Placeholder cuando no hay valor
 * @param {string} className - Clases CSS adicionales
 */
const FormViewField = ({ 
  label, 
  value, 
  placeholder = "No disponible",
  className = "" 
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
        {label}
      </label>
      <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
        <p className="text-sm text-gray-900 dark:text-white">
          {value || placeholder}
        </p>
      </div>
    </div>
  );
};

export default FormViewField;
