/**
 * Componente para mostrar diferencias de caja (sobrante/faltante)
 * @param {number} diferencia - Diferencia calculada
 * @param {string|number} displayValue - Valor a mostrar (opcional)
 * @param {object} IconComponents - Iconos para cada estado
 * @param {object} labels - Etiquetas para cada estado
 */
const FormDifferenceBox = ({ 
  diferencia, 
  displayValue,
  IconComponents = { exact: null, surplus: null, deficit: null },
  labels = { exact: "Caja Cuadrada", surplus: "Sobrante", deficit: "Faltante" }
}) => {
  const isExact = diferencia === 0;
  const isSurplus = diferencia > 0;
  
  const variant = isExact ? "success" : isSurplus ? "info" : "error";
  const Icon = isExact ? IconComponents.exact : isSurplus ? IconComponents.surplus : IconComponents.deficit;
  const label = isExact ? labels.exact : isSurplus ? labels.surplus : labels.deficit;
  
  const variantClasses = {
    success: "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700",
    error: "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700"
  };

  const iconColors = {
    success: "text-green-600",
    info: "text-blue-600",
    error: "text-red-600"
  };

  const titleColors = {
    success: "text-green-900 dark:text-green-300",
    info: "text-blue-900 dark:text-blue-300",
    error: "text-red-900 dark:text-red-300"
  };

  const valueColors = {
    success: "text-green-700 dark:text-green-400",
    info: "text-blue-700 dark:text-blue-400",
    error: "text-red-700 dark:text-red-400"
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${variantClasses[variant]}`}>
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon className={`h-5 w-5 ${iconColors[variant]}`} />}
        <h4 className={`text-sm font-semibold ${titleColors[variant]}`}>
          {label}
        </h4>
      </div>
      <p className={`text-2xl font-bold ${valueColors[variant]}`}>
        {displayValue ?? diferencia}
      </p>
    </div>
  );
};

export default FormDifferenceBox;
