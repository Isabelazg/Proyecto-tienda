/**
 * Componente de textarea de formulario reutilizable
 * @param {string} label - Etiqueta del textarea
 * @param {string} id - ID del textarea
 * @param {string} placeholder - Placeholder del textarea
 * @param {string} value - Valor del textarea
 * @param {function} onChange - Función para manejar cambios
 * @param {string} error - Mensaje de error
 * @param {boolean} required - Campo requerido
 * @param {boolean} disabled - Campo deshabilitado
 * @param {number} rows - Número de filas
 */
const FormTextarea = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 3,
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label 
        htmlFor={id} 
        className="text-sm font-medium text-gray-700 dark:text-slate-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 dark:border-slate-600'
        } bg-white dark:bg-slate-800 text-gray-900 dark:text-white`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormTextarea;
