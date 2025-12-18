import { Loader2 } from 'lucide-react';

const LoadingState = ({ message = "Cargando..." }) => {
  return (
    <div className="flex flex-col justify-center items-center py-12 space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-lime-600" />
      <p className="text-gray-600 dark:text-slate-400">{message}</p>
    </div>
  );
};

export default LoadingState;
