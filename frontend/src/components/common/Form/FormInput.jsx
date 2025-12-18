/**
 * Componente de input de formulario reutilizable
 * @param {string} label - Etiqueta del input
 * @param {string} id - ID del input
 * @param {string} placeholder - Placeholder del input
 * @param {string} value - Valor del input
 * @param {function} onChange - Función para manejar cambios
 * @param {string} error - Mensaje de error
 * @param {React.Component} icon - Componente de icono
 * @param {boolean} required - Campo requerido
 * @param {boolean} disabled - Campo deshabilitado
 * @param {string} type - Tipo de input
 */
const FormInput = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  type = "text",
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
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-slate-600'
          } bg-white dark:bg-slate-800 text-gray-900 dark:text-white`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
