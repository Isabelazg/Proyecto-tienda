/**
 * Componente de select para filtros
 * Select HTML nativo con estilos globales consistentes
 */
const FilterSelect = ({
  value,
  onChange,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default FilterSelect;
