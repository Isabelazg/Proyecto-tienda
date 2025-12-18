/**
 * Componente de tarjeta de resumen con label y valor
 * @param {string} label - Etiqueta del resumen
 * @param {string} value - Valor del resumen
 * @param {string} variant - Variante de color
 * @param {string} className - Clases CSS adicionales
 */
const FormSummaryCard = ({ label, value, variant = "default", className = "" }) => {
  const variantClasses = {
    default: "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700",
    success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
    warning: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700",
    lime: "bg-lime-50 dark:bg-lime-900/20 border-lime-300 dark:border-lime-700",
    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700"
  };

  const textVariants = {
    default: "text-gray-900 dark:text-white",
    success: "text-green-600",
    info: "text-blue-600",
    warning: "text-orange-600 dark:text-orange-400",
    lime: "text-lime-700 dark:text-lime-400",
    purple: "text-purple-600"
  };

  return (
    <div className={`p-3 rounded-lg border ${variantClasses[variant]} ${className}`}>
      <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">{label}</p>
      <p className={`text-lg font-semibold ${textVariants[variant]}`}>
        {value}
      </p>
    </div>
  );
};

export default FormSummaryCard;
