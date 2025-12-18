import { InboxIcon, AlertCircle } from 'lucide-react';

const EmptyState = ({ 
  isError = false,
  title = "No hay información disponible",
  description = "No se encontraron resultados que coincidan con los filtros aplicados.",
  icon: Icon = null
}) => {
  const DefaultIcon = isError ? AlertCircle : InboxIcon;
  const DisplayIcon = Icon || DefaultIcon;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className={`rounded-full p-3 mb-4 ${isError ? 'bg-red-100' : 'bg-gray-100'}`}>
        <DisplayIcon className={`h-8 w-8 ${isError ? 'text-red-600' : 'text-gray-400'}`} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-slate-400 text-center max-w-md">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
