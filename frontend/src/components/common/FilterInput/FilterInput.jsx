/**
 * Componente de input para filtros
 * Input HTML nativo con estilos globales consistentes
 */
const FilterInput = ({
  type = 'text',
  value,
  onChange,
  disabled = false,
  placeholder,
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
};

export default FilterInput;
