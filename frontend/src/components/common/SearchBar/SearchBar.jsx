import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/**
 * Componente de barra de búsqueda reutilizable
 * @param {string} value - Valor del input de búsqueda
 * @param {function} onChange - Función para manejar cambios en el input
 * @param {string} placeholder - Texto placeholder del input
 * @param {string} className - Clases CSS adicionales
 */
const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'Buscar...', 
  className,
  ...props 
}) => {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
        {...props}
      />
    </div>
  );
};

export default SearchBar;
