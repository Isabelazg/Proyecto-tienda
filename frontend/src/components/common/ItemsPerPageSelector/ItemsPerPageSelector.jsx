/**
 * Selector de elementos por página
 * @param {number} value - Valor actual seleccionado
 * @param {function} onChange - Función a ejecutar cuando cambia la selección
 * @param {Array<number>} options - Array con las opciones disponibles (ej: [5, 10, 20, 50])
 * @returns {JSX.Element}
 */
export default function ItemsPerPageSelector({ value, onChange, options = [5, 10, 20, 50] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="px-3 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors cursor-pointer"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
