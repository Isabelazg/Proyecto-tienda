import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

/**
 * Menú dropdown de acciones para tablas
 * @param {array} actions - Array de acciones {icon, label, onClick, variant}
 * @param {string} align - Alineación del menú
 */
const TableActionsDropdown = ({ actions = [], align = "end" }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost"
          size="sm" 
          className="text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600" 
        align={align}
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick}
              className={`cursor-pointer ${
                action.variant === 'destructive' 
                  ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                  : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600'
              }`}
            >
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActionsDropdown;
